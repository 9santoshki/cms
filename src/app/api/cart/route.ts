import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookie } from '@/lib/db/auth';
import {
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  getCartItemWithProduct,
} from '@/lib/db/cart';
import { getCloudflareImageUrl } from '@/lib/cloudflare';

async function getUserIdFromRequest() {
  try {
    const session = await getSessionFromCookie();
    return session?.userId || null;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
}

export async function GET() {
  try {
    const userId = await getUserIdFromRequest();

    if (userId) {
      const cartItems = await getCartItems(userId);

      const formattedCartItems = cartItems.map((item: any) => {
        const imageUrl = item.primary_image_id
          ? getCloudflareImageUrl(item.primary_image_id)
          : item.image_url || null;

        return {
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity,
          name: item.name || 'Unknown Product',
          description: item.description || '',
          price: item.price || 0,
          image_url: imageUrl,
          originalPrice: null,
          discount: 0,
        };
      });

      return NextResponse.json(
        { success: true, data: formattedCartItems },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }
  } catch (error: any) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { product_id, quantity = 1 } = await request.json();

    if (!product_id) {
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

    return NextResponse.json(
      {
        success: true,
        data: {
          id: cartItem.id,
          product_id: cartItem.product_id,
          name: cartItem.name || 'Unknown Product',
          price: cartItem.price || 0,
          quantity: cartItem.quantity,
          image_url: cartItem.image_url || null,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { product_id, quantity } = await request.json();

    if (!product_id) {
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

      return NextResponse.json(
        { success: true, message: 'Item removed from cart' },
        { status: 200 }
      );
    } else {
      await updateCartItemQuantity(userId, product_id, quantity);
      const cartItem = await getCartItemWithProduct(userId, product_id);

      if (!cartItem) {
        return NextResponse.json(
          { success: false, error: 'Failed to update cart item' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          data: {
            id: cartItem.id,
            product_id: cartItem.product_id,
            name: cartItem.name || 'Unknown Product',
            price: cartItem.price || 0,
            quantity: cartItem.quantity,
            image_url: cartItem.image_url || null,
          },
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const userId = await getUserIdFromRequest();

    if (userId) {
      await clearCart(userId);
    }

    return NextResponse.json(
      { success: true, message: 'Cart cleared' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}