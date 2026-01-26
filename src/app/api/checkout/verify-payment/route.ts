import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
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

    // Verify user authentication
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing payment parameters' },
        { status: 400 }
      );
    }

    // Verify the payment signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', razorpaySecret!) // Using the local variable instead of env var
      .update(body)
      .digest('hex');

    const isSignatureValid = crypto.timingSafeEqual(
      Buffer.from(razorpay_signature),
      Buffer.from(expectedSignature)
    );

    if (!isSignatureValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Verify the payment with Razorpay
    try {
      const payment = await razorpay.payments.fetch(razorpay_payment_id);

      if (payment.status !== 'captured') {
        return NextResponse.json(
          { success: false, error: 'Payment not captured' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('Error verifying payment with Razorpay:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to verify payment with Razorpay' },
        { status: 500 }
      );
    }

    // Find the order by payment_id
    const orderResult = await query(
      'SELECT id, user_id, status FROM orders WHERE payment_id = $1',
      [razorpay_order_id]
    );

    if (orderResult.rows.length === 0) {
      console.error('Order not found for Razorpay order ID:', razorpay_order_id);
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const order = orderResult.rows[0];

    // Verify that the order belongs to the current user
    if (order.user_id !== userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Update order status to 'completed' and add payment status
    const updateResult = await query(
      `UPDATE orders
       SET status = 'completed', payment_status = 'captured', updated_at = NOW()
       WHERE id = $1`,
      [order.id]
    );

    if (updateResult.rowCount === 0) {
      console.error('Error updating order status');
      return NextResponse.json(
        { success: false, error: 'Failed to update order status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order updated to paid status',
      data: {
        order_id: order.id
      }
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}