/**
 * POST /api/orders/[id]/confirm-payment
 *
 * Admin/moderator-only action for the UPI "Scan and Pay" flow: since a UPI QR
 * payment has no gateway webhook, an order sits as payment_status =
 * 'awaiting_verification' until an admin checks the bank/UPI account and
 * manually confirms it here. This mirrors exactly what the Razorpay
 * verify route does once a payment is captured (same shared function),
 * just with a manual trigger instead of a signature check.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { sendOrderConfirmationEmail } from '@/lib/email';
import {
  findOrderForPaymentConfirmation,
  completeOrderWithStockDeduction,
  getOrderDetailsForEmail,
} from '@/lib/services/checkout-service';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session || (session.role !== 'admin' && session.role !== 'moderator')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    const { id: orderId } = await context.params;
    const order = await findOrderForPaymentConfirmation(orderId);

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }
    if (order.payment_method !== 'upi_qr') {
      return NextResponse.json(
        { success: false, error: 'This order was not placed via UPI Scan & Pay' },
        { status: 400 }
      );
    }
    if (order.payment_status !== 'awaiting_verification') {
      return NextResponse.json(
        { success: false, error: `Payment already ${order.payment_status || 'processed'} for this order` },
        { status: 409 }
      );
    }

    await completeOrderWithStockDeduction(order, `UPI-MANUAL-${orderId}`, {
      source: session.name || 'Admin',
      comment: 'UPI payment confirmed manually by admin',
    });

    // Send the same confirmation email a Razorpay order gets (fire-and-forget)
    try {
      const emailDetails = await getOrderDetailsForEmail(order.id);
      if (emailDetails) {
        sendOrderConfirmationEmail(emailDetails.customerEmail, emailDetails).catch((emailErr) => {
          console.error('[confirm-payment] Email send error:', emailErr);
        });
      }
    } catch (emailErr) {
      console.error('[confirm-payment] Email prep error:', emailErr);
    }

    return NextResponse.json({
      success: true,
      data: { order_id: order.id, payment_status: 'paid', status: 'processing' },
      message: 'Payment confirmed and order moved to processing',
    });
  } catch (err) {
    console.error('[orders/[id]/confirm-payment] Error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
