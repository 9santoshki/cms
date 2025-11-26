import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

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

// Verify JWT token and get user ID
async function getUserIdFromRequest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: number; email: string; role: string };

    // Verify that the user actually exists
    const { data: user, error } = await supabase
      .from('users')
      .select('id')
      .eq('id', decoded.id)
      .single();

    if (error || !user) {
      return null;
    }

    return decoded.id;
  } catch (error) {
    console.error('JWT verification failed:', error);
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
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
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

    // Update the order status in the database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, user_id, status')
      .eq('external_id', razorpay_order_id)
      .single();

    if (orderError || !order) {
      console.error('Order not found for Razorpay order ID:', razorpay_order_id);
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    // Verify that the order belongs to the current user
    if (order.user_id !== userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Update order status to 'paid'
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

    // TODO: Send confirmation email to user
    // This would typically trigger an email service
    console.log(`Sending confirmation email for order ${order.id}`);

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order updated to paid status',
      order_id: order.id
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}