import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { query } from '@/lib/db/connection';
import { deductStockForOrder } from '@/lib/db/suppliers';
import { sendStockDiscrepancyAlert } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const razorpayKey = process.env.RAZORPAY_KEY_ID;
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKey || !razorpaySecret) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payment gateway not configured. Please contact the site administrator.',
        },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: razorpayKey,
      key_secret: razorpaySecret,
    });

    const session = await getSessionFromCookieWithDB();
    const userId = session?.userId || null;

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

    // Verify the payment signature with timing-safe comparison
    // SECURITY: timingSafeEqual throws if buffer lengths differ, so check first
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', razorpaySecret!)
      .update(body)
      .digest('hex');

    const signatureBuffer = Buffer.from(razorpay_signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (signatureBuffer.length !== expectedBuffer.length) {
      console.error('[checkout/verify-payment] Invalid signature length');
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    const isSignatureValid = crypto.timingSafeEqual(signatureBuffer, expectedBuffer);

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
    } catch (err: unknown) {
      console.error('Error verifying payment with Razorpay:', err);
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

    // ── Deduct inventory ──────────────────────────────────────────────────────
    let orderItemsForStock: Awaited<ReturnType<typeof query>> | null = null;
    try {
      orderItemsForStock = await query(
        'SELECT variant_id, quantity FROM order_items WHERE order_id = $1',
        [order.id]
      );
      for (const item of orderItemsForStock.rows) {
        if (item.variant_id) {
          await deductStockForOrder(
            Number(item.variant_id),
            Number(item.quantity),
            Number(order.id),
            Number(userId)
          );
        }
      }
    } catch (stockErr) {
      console.error(`[verify-payment] ⚠️ Stock deduction failed for order ${order.id}:`, stockErr);
      // Notify admins — payment is captured, inventory must be reconciled manually
      const orderItemsForAlert = orderItemsForStock?.rows ?? [];
      for (const item of orderItemsForAlert) {
        if (item.variant_id) {
          await sendStockDiscrepancyAlert({
            orderId: Number(order.id),
            variantId: Number(item.variant_id),
            quantity: Number(item.quantity),
            error: stockErr instanceof Error ? stockErr.message : String(stockErr),
          }).catch(() => {}); // Never let the alert itself throw
        }
      }
    }
    // ─────────────────────────────────────────────────────────────────────────

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order updated to paid status',
      data: {
        order_id: order.id
      }
    });
  } catch (err: unknown) {
    console.error('[checkout/verify-payment] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}