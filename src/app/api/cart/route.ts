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
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { product_id, quantity = 1 } = await request.json();

    if (!product_id || !Number.isInteger(Number(product_id)) || Number(product_id) <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid product ID is required' },
        { status: 400 }
      );
    }

    if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid positive quantity is required' },
        { status: 400 }
      );
    }

    await addCartItem(userId, product_id, quantity);
    const cartItem = await getCartItemWithProduct(userId, product_id);

    if (!cartItem) {
      return NextResponse.json(
        { success: false, error: 'Failed to add item to cart' },
        { status: 500 }
      );
    }

    const rawItem = cartItem as unknown as Record<string, unknown>;
    return NextResponse.json({
      success: true,
      data: {
        id: cartItem.id,
        product_id: cartItem.product_id,
        name: (rawItem.name as string) || 'Unknown Product',
        price: cartItem.price || 0,
        quantity: cartItem.quantity,
        image_url: (rawItem.image_url as string) || null,
      },
    });
  } catch (err: unknown) {
    console.error('[cart POST] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { product_id, quantity } = await request.json();

    if (!product_id || !Number.isInteger(Number(product_id)) || Number(product_id) <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid product ID is required' },
        { status: 400 }
      );
    }

    if (typeof quantity !== 'number' || isNaN(quantity)) {
      return NextResponse.json(
        { success: false, error: 'Valid quantity is required' },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      await removeCartItem(userId, product_id);
      return NextResponse.json({ success: true, message: 'Item removed from cart' });
    }

    await updateCartItemQuantity(userId, product_id, quantity);
    const cartItem = await getCartItemWithProduct(userId, product_id);

    if (!cartItem) {
      return NextResponse.json(
        { success: false, error: 'Failed to update cart item' },
        { status: 500 }
      );
    }

    const rawItem2 = cartItem as unknown as Record<string, unknown>;
    return NextResponse.json({
      success: true,
      data: {
        id: cartItem.id,
        product_id: cartItem.product_id,
        name: (rawItem2.name as string) || 'Unknown Product',
        price: cartItem.price || 0,
        quantity: cartItem.quantity,
        image_url: (rawItem2.image_url as string) || null,
      },
    });
  } catch (err: unknown) {
    console.error('[cart PUT] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
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
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
