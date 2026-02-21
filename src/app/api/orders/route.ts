import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getOrdersByUserId, getOrderItems } from '@/lib/db/orders';
import { query } from '@/lib/db/connection';

export async function GET() {
  try {
    // Validate session and get user
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized'
        },
        { status: 401 }
      );
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

    // Fetch items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await getOrderItems(order.id);
        return {
          ...order,
          items
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: ordersWithItems
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
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
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}