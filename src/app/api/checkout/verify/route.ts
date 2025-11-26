import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Using service role to bypass RLS
);

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
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, user_id, status')
      .eq('external_id', razorpay_order_id) // Assuming we store the Razorpay order ID as external_id
      .single();

    if (orderError || !order) {
      console.error('Order not found for Razorpay order ID:', razorpay_order_id, orderError);
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update the order status to 'paid'
    const { error: updateError } = await supabase
      .from('orders')
      .update({ 
        status: 'paid',
        external_payment_id: razorpay_payment_id,
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Error updating order status:', updateError);
      return NextResponse.json(
        { success: false, error: 'Failed to update order status' },
        { status: 500 }
      );
    }

    // Optionally, clear the user's cart after successful payment
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', order.user_id);

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