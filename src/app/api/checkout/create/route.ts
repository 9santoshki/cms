import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

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

    const order = await razorpay.orders.create(options);

    // Here we would typically save the order to our database
    // For now, we'll just return the order info to be used in the frontend

    return NextResponse.json({
      success: true,
      data: {
        razorpay_order_id: order.id,
        amount: order.amount,
        currency: order.currency,
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