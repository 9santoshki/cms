import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getSessionFromCookie } from '@/lib/db/auth';
import { query } from '@/lib/db/connection';

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

export async function POST(request: NextRequest) {
  try {
    // Verify user authentication
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Initialize Razorpay client inside the function to handle missing env vars gracefully
    const razorpayKey = process.env.RAZORPAY_KEY_ID;
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKey || !razorpaySecret) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payment gateway not configured. Please contact the site administrator.'
        },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: razorpayKey,
      key_secret: razorpaySecret,
    });

    const body = await request.json();
    const { items, shipping_address } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart items are required' },
        { status: 400 }
      );
    }

    if (!shipping_address) {
      return NextResponse.json(
        { success: false, error: 'Shipping address is required' },
        { status: 400 }
      );
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      if (typeof item.price === 'number' && typeof item.quantity === 'number') {
        totalAmount += item.price * item.quantity;
      }
    }

    if (totalAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid cart total' },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(totalAmount * 100), // Amount in paise (lowest currency unit)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create order in our database
    const orderResult = await query(
      `INSERT INTO orders (user_id, total_amount, status, payment_id, shipping_address, created_at)
       VALUES ($1, $2, 'pending', $3, $4, NOW())
       RETURNING id`,
      [userId, totalAmount, razorpayOrder.id, shipping_address]
    );

    // Insert order items into the order_items table
    for (const item of items) {
      await query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderResult.rows[0].id, item.product_id, item.quantity, item.price]
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        razorpay_order_id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        total_amount: totalAmount,
      }
    });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}