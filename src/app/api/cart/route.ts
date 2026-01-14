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

// Verify user session and get user ID
async function getUserIdFromRequest(request: NextRequest) {
  try {
    const session = await getSessionFromCookie();
    return session?.userId || null;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🛒 API /api/cart GET: Fetching cart items...');
    const userId = await getUserIdFromRequest(request);
    console.log('🛒 API /api/cart GET: User ID from request:', userId);

    if (userId) {
      // Authenticated user - get database cart
      console.log('🛒 API /api/cart GET: Fetching cart items from database...');
      const cartItems = await getCartItems(userId);
      console.log('🛒 API /api/cart GET: Found', cartItems.length, 'cart items');

      // Format the response to match expected format
      const formattedCartItems = cartItems.map((item: any) => {
        // Use Cloudflare image URL if available, otherwise fall back to image_url
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
          originalPrice: null, // Default values for compatibility
          discount: 0,
        };
      });

      console.log('🛒 API /api/cart GET: ✅ Returning', formattedCartItems.length, 'formatted items');
      return NextResponse.json(
        { success: true, data: formattedCartItems },
        { status: 200 }
      );
    } else {
      // Unauthenticated user - return empty cart
      console.log('🛒 API /api/cart GET: No user ID, returning empty cart');
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }
  } catch (error: any) {
    console.error('❌ API /api/cart GET: Error fetching cart:', error);
    console.error('❌ API /api/cart GET: Error message:', error?.message);
    console.error('❌ API /api/cart GET: Error stack:', error?.stack);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);

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

    // Add item to cart (will update if exists)
    await addCartItem(userId, product_id, quantity);

    // Get the updated cart item with product details
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
    const userId = await getUserIdFromRequest(request);

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
      // If quantity is 0 or negative, remove item from cart
      await removeCartItem(userId, product_id);

      return NextResponse.json(
        { success: true, message: 'Item removed from cart' },
        { status: 200 }
      );
    } else {
      // Update quantity
      await updateCartItemQuantity(userId, product_id, quantity);

      // Get the updated cart item with product details
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

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (userId) {
      // Authenticated user - clear database cart
      await clearCart(userId);

      return NextResponse.json(
        { success: true, message: 'Cart cleared' },
        { status: 200 }
      );
    } else {
      // Unauthenticated user - return success for client-side cart handling
      return NextResponse.json(
        { success: true, message: 'Cart cleared' },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}