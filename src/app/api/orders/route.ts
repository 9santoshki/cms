import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getOrdersByUserId, getOrderItemsBatch } from '@/lib/db/orders';
import { query } from '@/lib/db/connection';
import { unauthorized, serverError } from '@/lib/api-response';

export async function GET() {
  try {
    // Validate session and get user
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }

    let orders;

    // Admins and moderators can see all orders, regular users see only their own
    if (session.role === 'admin' || session.role === 'moderator') {
      // Fetch all orders with user information
      const result = await query(
        `SELECT o.*, u.name as user_name, u.email as user_email
         FROM orders o
         JOIN users u ON o.user_id = u.id
         ORDER BY o.created_at DESC`
      );
      orders = result.rows;
    } else {
      // Fetch only user's own orders
      orders = await getOrdersByUserId(session.userId);
    }

    // Batch fetch items for all orders (single query, not N+1)
    const orderIds = orders.map((o) => o.id.toString());
    const itemsMap = await getOrderItemsBatch(orderIds);

    const ordersWithItems = orders.map((order) => ({
      ...order,
      items: itemsMap.get(order.id.toString()) || [],
    }));

    return NextResponse.json({
      success: true,
      data: ordersWithItems
    });
  } catch (err: unknown) {
    console.error('Error fetching orders:', err);
    return serverError('Failed to fetch orders');
  }
}

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        success: true,
        data: {}
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('Error creating order:', err);
    return serverError('Failed to create order');
  }
}