import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  // Extract token from headers
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  const token = authHeader.substring(7);
  
  try {
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userId = decodedToken.userId;

    // Get user's orders
    try {
      const query = `
        SELECT id, user_id, total_amount, status, customer, created_at
        FROM orders
        WHERE user_id = $1
        ORDER BY created_at DESC
      `;
      const result = await db.query(query, [userId]);

      return NextResponse.json({ 
        success: true, 
        data: result.rows 
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
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Extract token from headers
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  const token = authHeader.substring(7);
  
  try {
    const decodedToken = await verifyToken(token);
    if (!decodedToken) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userId = decodedToken.userId;
    const body = await request.json();
    const { items, total_amount, customer, status = 'pending' } = body;

    if (!items || !Array.isArray(items) || items.length === 0 || !total_amount || !customer) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Items, total_amount, and customer information are required' 
        },
        { status: 400 }
      );
    }

    // Validate customer information
    const requiredCustomerFields = ['name', 'email', 'phone', 'address', 'city', 'zipCode'];
    for (const field of requiredCustomerFields) {
      if (!customer[field]) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Customer ${field} is required` 
          },
          { status: 400 }
        );
      }
    }

    try {
      // Begin transaction
      await db.query('BEGIN');

      // Create the order
      const orderQuery = `
        INSERT INTO orders (user_id, total_amount, status, customer)
        VALUES ($1, $2, $3, $4)
        RETURNING id, user_id, total_amount, status, customer, created_at
      `;
      const orderResult = await db.query(orderQuery, [userId, total_amount, status, customer]);
      const orderId = orderResult.rows[0].id;

      // Add order items
      const orderItemsPromises = items.map(async (item: any) => {
        const orderItemQuery = `
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES ($1, $2, $3, $4)
          RETURNING *
        `;
        return await db.query(orderItemQuery, [orderId, item.id, item.quantity, item.price]);
      });

      await Promise.all(orderItemsPromises);

      // Clear user's cart after successful order
      await db.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);

      // Commit transaction
      await db.query('COMMIT');

      // Return the created order
      return NextResponse.json(
        { 
          success: true, 
          data: orderResult.rows[0] 
        },
        { status: 201 }
      );
    } catch (error) {
      // Rollback transaction on error
      await db.query('ROLLBACK');
      console.error('Error creating order:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Internal server error' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
}