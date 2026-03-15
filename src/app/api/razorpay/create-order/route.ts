// /src/app/api/razorpay/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import razorpay from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { amount, currency = 'INR', receipt } = body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'A valid positive amount is required' },
        { status: 400 }
      );
    }

    // Razorpay expects amount in paise (smallest currency unit)
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (err: unknown) {
    console.error('[razorpay/create-order] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
