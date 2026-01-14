import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { query } from '@/lib/db/connection';
import { clearCart } from '@/lib/db/cart';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing payment verification parameters' },
        { status: 400 }
      );
    }

    // Verify the payment signature
    const bodyData = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(bodyData)
      .digest('hex');

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Verify the payment with Razorpay
    try {
      const payment = await razorpay.payments.fetch(razorpay_payment_id);
      
      if (payment.order_id !== razorpay_order_id) {
        return NextResponse.json(
          { success: false, error: 'Order ID mismatch' },
          { status: 400 }
        );
      }

      if (payment.status !== 'captured') {
        return NextResponse.json(
          { success: false, error: `Payment not captured. Status: ${payment.status}` },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('Error verifying payment with Razorpay:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to verify payment' },
        { status: 500 }
      );
    }

    // Find the order in our database based on the Razorpay order ID
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

    // Update the order status to 'completed'
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

    // Clear the user's cart after successful payment
    await clearCart(order.user_id);

    return NextResponse.json({
      success: true,
      data: {
        order_id: order.id,
        message: 'Payment verified and order updated successfully'
      }
    });
  } catch (error: any) {
    console.error('Error in payment verification:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}