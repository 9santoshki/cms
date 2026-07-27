import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { clearCart } from '@/lib/db/cart';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { toErrorMessage } from '@/lib/error-utils';
import {
  verifyRazorpaySignature,
  verifyAndCapturePayment,
  findOrderByPaymentId,
  completeOrderWithStockDeduction,
  getOrderDetailsForEmail,
} from '@/lib/services/checkout-service';

export async function POST(request: NextRequest) {
  try {
    // ── Authentication ──────────────────────────────────────────────────────
    const session = await getSessionFromCookieWithDB();
    const userId = session?.userId || null;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 },
      );
    }

    // ── Parse & validate params ─────────────────────────────────────────────
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing payment verification parameters' },
        { status: 400 },
      );
    }

    // ── Signature verification ──────────────────────────────────────────────
    if (!verifyRazorpaySignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature })) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 },
      );
    }

    // ── Razorpay verification ───────────────────────────────────────────────
    try {
      const result = await verifyAndCapturePayment(razorpay_payment_id, razorpay_order_id);
      if (!result.captured) {
        return NextResponse.json(
          { success: false, error: `Payment not captured. Status: ${result.status}` },
          { status: 400 },
        );
      }
    } catch (err: unknown) {
      console.error('[checkout/verify] Razorpay verification error:', err);
      return NextResponse.json(
        { success: false, error: 'Failed to verify payment' },
        { status: 500 },
      );
    }

    // ── Find order ─────────────────────────────────────────────────────────
    const order = await findOrderByPaymentId(razorpay_order_id);
    if (!order) {
      console.error('[checkout/verify] Order not found for payment:', razorpay_order_id);
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 },
      );
    }

    // ── Ownership check ─────────────────────────────────────────────────────
    if (order.user_id !== userId) {
      console.error(
        `[checkout/verify] User ${userId} attempted to verify order ${order.id} owned by ${order.user_id}`,
      );
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 },
      );
    }

    // ── Complete order + deduct stock ───────────────────────────────────────
    await completeOrderWithStockDeduction(order, razorpay_payment_id);

    // ── Clear cart ──────────────────────────────────────────────────────────
    await clearCart(order.user_id);

    // ── Send confirmation email (fire-and-forget) ───────────────────────────
    try {
      const emailDetails = await getOrderDetailsForEmail(order.id);
      if (emailDetails) {
        sendOrderConfirmationEmail(emailDetails.customerEmail, emailDetails).catch(
          (emailError) => {
            console.error('[checkout/verify] Email send error:', emailError);
          },
        );
      }
    } catch (emailError) {
      console.error('[checkout/verify] Email prep error:', emailError);
    }

    return NextResponse.json({
      success: true,
      data: {
        order_id: order.id,
        message: 'Payment verified and order updated successfully',
      },
    });
  } catch (err: unknown) {
    console.error('[checkout/verify] Error:', err);
    return NextResponse.json(
      { success: false, error: toErrorMessage(err) || 'Internal server error' },
      { status: 500 },
    );
  }
}
