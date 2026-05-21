import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  getCartItemWithProduct,
  getCartItem,
} from '@/lib/db/cart';
import { checkVariantStock } from '@/lib/db/suppliers';
import { getCloudflareImageUrl } from '@/lib/cloudflare';
import { unauthorized, badRequest, serverError } from '@/lib/api-response';
import { MAX_CART_QUANTITY, MAX_CART_TOTAL_ITEMS } from '@/lib/constants';

async function getUserId() {
  try {
    const session = await getSessionFromCookieWithDB();
    return session?.userId || null;
  } catch {
    return null;
  }
}

/**
 * Format a cart item for API response.
 */
function formatCartItem(item: Record<string, unknown>) {
  const imageUrl = item.primary_image_id
    ? getCloudflareImageUrl(item.primary_image_id as string)
    : (item.image_url as string) || null;

  return {
    id: item.id,
    product_id: item.product_id,
    variant_id: item.variant_id || null,
    variant_name: (item.variant_name as string) || null,
    quantity: item.quantity,
    name: (item.name as string) || 'Unknown Product',
    description: (item.description as string) || '',
    price: item.price || 0,
    image_url: imageUrl,
    originalPrice: null,
    discount: 0,
  };
}

export async function GET() {
  try {
    const userId = await getUserId();

    if (userId) {
      const cartItems = await getCartItems(userId);

      const formattedCartItems = cartItems.map((item) => {
        const raw = item as unknown as Record<string, unknown>;
        return formatCartItem(raw);
      });

      return NextResponse.json({ success: true, data: formattedCartItems });
    } else {
      return NextResponse.json({ success: true, data: [] });
    }
  } catch (err: unknown) {
    console.error('[cart GET] Error:', err);
    return serverError('Failed to fetch cart');
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return unauthorized('Authentication required');
    }

    const { product_id, variant_id, quantity = 1 } = await request.json();

    if (!product_id || !Number.isInteger(Number(product_id)) || Number(product_id) <= 0) {
      return badRequest('Valid product ID is required');
    }

    if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
      return badRequest('Valid positive quantity is required');
    }

    // SECURITY: Maximum quantity limit to prevent manipulation
    if (quantity > MAX_CART_QUANTITY) {
      return badRequest(`Maximum ${MAX_CART_QUANTITY} units allowed per item in cart`);
    }

    // variant_id can be null for products without variants, or a valid integer for variant products
    const validVariantId = variant_id ? parseInt(variant_id, 10) : null;
    if (variant_id && (validVariantId === null || validVariantId <= 0 || !Number.isInteger(validVariantId))) {
      return badRequest('Valid variant ID is required');
    }

    // Enforce total unique items limit
    const currentItems = await getCartItems(userId);
    const isNewItem = !currentItems.some(
      (ci) => {
        const item = ci as unknown as Record<string, unknown>;
        return item.product_id == product_id &&
          (item.variant_id ?? null) === (validVariantId ?? null);
      }
    );
    if (isNewItem && currentItems.length >= MAX_CART_TOTAL_ITEMS) {
      return badRequest(`Cart is full. Maximum ${MAX_CART_TOTAL_ITEMS} different items allowed.`);
    }

    // ── Soft stock check ─────────────────────────────────────────────────────
    // We check (existing cart qty + newly requested qty) against available stock.
    // This doesn't reserve stock — it just prevents obviously impossible additions.
    if (validVariantId) {
      const existingCartItem = await getCartItem(userId, product_id, validVariantId);
      const currentCartQty = existingCartItem ? (existingCartItem.quantity as number) : 0;
      const totalRequested = currentCartQty + quantity;

      const stockCheck = await checkVariantStock(validVariantId, totalRequested);
      if (!stockCheck.available) {
        if (stockCheck.stock === 0) {
          return badRequest('This item is currently out of stock');
        }
        const remaining = stockCheck.stock - currentCartQty;
        if (remaining <= 0) {
          return badRequest(
            `You already have the maximum available quantity (${stockCheck.stock}) in your cart`
          );
        }
        return badRequest(
          `Only ${remaining} more unit${remaining === 1 ? '' : 's'} available (you have ${currentCartQty} in your cart)`
        );
      }
    }
    // ─────────────────────────────────────────────────────────────────────────

    await addCartItem(userId, product_id, quantity, validVariantId);
    const cartItem = await getCartItemWithProduct(userId, product_id, validVariantId);

    if (!cartItem) {
      return serverError('Failed to add item to cart');
    }

    const rawItem = cartItem as unknown as Record<string, unknown>;
    return NextResponse.json({
      success: true,
      data: formatCartItem(rawItem),
    });
  } catch (err: unknown) {
    console.error('[cart POST] Error:', err);
    return serverError('Failed to add to cart');
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return unauthorized('Authentication required');
    }

    const { product_id, variant_id, quantity } = await request.json();

    if (!product_id || !Number.isInteger(Number(product_id)) || Number(product_id) <= 0) {
      return badRequest('Valid product ID is required');
    }

    if (typeof quantity !== 'number' || isNaN(quantity)) {
      return badRequest('Valid quantity is required');
    }

    const validVariantId = variant_id ? parseInt(variant_id, 10) : null;

    // SECURITY: Maximum quantity limit to prevent manipulation
    if (quantity > MAX_CART_QUANTITY) {
      return badRequest(`Maximum ${MAX_CART_QUANTITY} units allowed per item in cart`);
    }

    if (quantity <= 0) {
      await removeCartItem(userId, product_id, validVariantId);
      return NextResponse.json({ success: true, message: 'Item removed from cart' });
    }

    // Try to update; if the item isn't in the DB yet (local/server state drift), insert it
    const updated = await updateCartItemQuantity(userId, product_id, quantity, validVariantId);
    if (!updated) {
      await addCartItem(userId, product_id, quantity, validVariantId);
    }

    const cartItem = await getCartItemWithProduct(userId, product_id, validVariantId);

    if (!cartItem) {
      return serverError('Failed to update cart item');
    }

    const rawItem = cartItem as unknown as Record<string, unknown>;
    return NextResponse.json({
      success: true,
      data: formatCartItem(rawItem),
    });
  } catch (err: unknown) {
    console.error('[cart PUT] Error:', err);
    return serverError('Failed to update cart');
  }
}

export async function DELETE() {
  try {
    const userId = await getUserId();

    if (userId) {
      await clearCart(userId);
    }

    return NextResponse.json({ success: true, message: 'Cart cleared' });
  } catch (err: unknown) {
    console.error('[cart DELETE] Error:', err);
    return serverError('Failed to clear cart');
  }
}
