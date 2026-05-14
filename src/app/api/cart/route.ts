import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  getCartItemWithProduct,
} from '@/lib/db/cart';
import { getCloudflareImageUrl } from '@/lib/cloudflare';
import { unauthorized, badRequest, serverError } from '@/lib/api-response';

async function getUserId() {
  try {
    const session = await getSessionFromCookieWithDB();
    return session?.userId || null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const userId = await getUserId();

    if (userId) {
      const cartItems = await getCartItems(userId);

      const formattedCartItems = cartItems.map((item) => {
        const raw = item as unknown as Record<string, unknown>;
        const imageUrl = raw.primary_image_id
          ? getCloudflareImageUrl(raw.primary_image_id as string)
          : (raw.image_url as string) || null;

        return {
          id: item.id,
          product_id: item.product_id,
          variant_id: item.variant_id || null,
          variant_name: (raw.variant_name as string) || null,
          quantity: item.quantity,
          name: (raw.name as string) || 'Unknown Product',
          description: (raw.description as string) || '',
          price: item.price || 0,
          image_url: imageUrl,
          originalPrice: null,
          discount: 0,
        };
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

    // variant_id can be null for products without variants, or a valid integer for variant products
    const validVariantId = variant_id ? parseInt(variant_id, 10) : null;
    if (variant_id && (validVariantId === null || validVariantId <= 0 || !Number.isInteger(validVariantId))) {
      return badRequest('Valid variant ID is required');
    }

    await addCartItem(userId, product_id, quantity, validVariantId);
    const cartItem = await getCartItemWithProduct(userId, product_id, validVariantId);

    if (!cartItem) {
      return serverError('Failed to add item to cart');
    }

    const rawItem = cartItem as unknown as Record<string, unknown>;
    return NextResponse.json({
      success: true,
      data: {
        id: cartItem.id,
        product_id: cartItem.product_id,
        variant_id: cartItem.variant_id || null,
        variant_name: (rawItem.variant_name as string) || null,
        name: (rawItem.name as string) || 'Unknown Product',
        price: cartItem.price || 0,
        quantity: cartItem.quantity,
        image_url: (rawItem.image_url as string) || null,
      },
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

    if (quantity <= 0) {
      await removeCartItem(userId, product_id, validVariantId);
      return NextResponse.json({ success: true, message: 'Item removed from cart' });
    }

    await updateCartItemQuantity(userId, product_id, quantity, validVariantId);
    const cartItem = await getCartItemWithProduct(userId, product_id, validVariantId);

    if (!cartItem) {
      return serverError('Failed to update cart item');
    }

    const rawItem2 = cartItem as unknown as Record<string, unknown>;
    return NextResponse.json({
      success: true,
      data: {
        id: cartItem.id,
        product_id: cartItem.product_id,
        variant_id: cartItem.variant_id || null,
        variant_name: (rawItem2.variant_name as string) || null,
        name: (rawItem2.name as string) || 'Unknown Product',
        price: cartItem.price || 0,
        quantity: cartItem.quantity,
        image_url: (rawItem2.image_url as string) || null,
      },
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
