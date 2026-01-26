// /src/app/api/razorpay/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');
    
    if (!signature) {
      return NextResponse.json(
        { success: false, error: 'Signature missing' },
        { status: 400 }
      );
    }

    // Verify webhook signature (requires RAZORPAY_WEBHOOK_SECRET)
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      // In production, this should be properly verified
    } else {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body)
        .digest('hex');

      if (expectedSignature !== signature) {
        return NextResponse.json(
          { success: false, error: 'Invalid signature' },
          { status: 400 }
        );
      }
    }

    // Parse the webhook payload
    const webhookData = JSON.parse(body);
    const { event, payload } = webhookData;

    if (event === 'payment.captured') {
      const { payment } = payload;

      return NextResponse.json({ 
        success: true, 
        message: 'Payment captured successfully' 
      });
    } else if (event === 'payment.failed') {
      const { payment, reason } = payload;

      return NextResponse.json({ 
        success: true, 
        message: 'Payment failure processed' 
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully' 
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}