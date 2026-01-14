import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookie } from '@/lib/db/auth';
import { getOrderById, getOrderItems } from '@/lib/db/orders';

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

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const orderId = params.id;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Verify user authentication
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Fetch order details
    const order = await getOrderById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Verify the order belongs to the user
    if (order.user_id !== userId) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Get order items
    const items = await getOrderItems(orderId);

    // Format the response
    const formattedOrder = {
      ...order,
      items: items.map((item: any) => ({
        ...item,
        product_name: item.name,
        product_image: item.image_url,
      })),
    };

    return NextResponse.json({
      success: true,
      data: formattedOrder,
    });
  } catch (error: any) {
    console.error('Error in order details API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
