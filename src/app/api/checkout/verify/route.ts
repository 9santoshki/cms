import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { query } from '@/lib/db/connection';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { clearCart } from '@/lib/db/cart';
import { sendOrderConfirmationEmail, sendStockDiscrepancyAlert } from '@/lib/email';
import { getOrderItems } from '@/lib/db/orders';
import { deductStockForOrder } from '@/lib/db/suppliers';
import { toErrorMessage } from '@/lib/error-utils';

export async function POST(request: NextRequest) {
  try {
    // ── Authentication check ─────────────────────────────────────────────────
    const session = await getSessionFromCookieWithDB();
    const userId = session?.userId || null;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }
    // ─────────────────────────────────────────────────────────────────────────

    // Initialize Razorpay inside the function to handle missing env vars gracefully
    const razorpayKey = process.env.RAZORPAY_KEY_ID;
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKey || !razorpaySecret) {
      return NextResponse.json(
        { success: false, error: 'Payment gateway not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: razorpayKey,
      key_secret: razorpaySecret,
    });

    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing payment verification parameters' },
        { status: 400 }
      );
    }

    // Verify the payment signature using timing-safe comparison (SECURITY: prevents timing attacks)
    const bodyData = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(bodyData)
      .digest('hex');

    // SECURITY: Use timing-safe comparison to prevent timing attacks
    // Note: timingSafeEqual throws if buffer lengths differ, so check first
    const signatureBuffer = Buffer.from(razorpay_signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (signatureBuffer.length !== expectedBuffer.length) {
      console.error('[checkout/verify] Invalid signature length');
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
    } catch (err: unknown) {
      console.error('Error verifying payment with Razorpay:', err);
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

    // ── User ownership verification ─────────────────────────────────────────────
    // SECURITY: Verify the order belongs to the authenticated user
    if (order.user_id !== userId) {
      console.error(`[checkout/verify] User ${userId} attempted to verify order ${order.id} owned by ${order.user_id}`);
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }
    // ─────────────────────────────────────────────────────────────────────────

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

    // ── Deduct inventory for each variant item ────────────────────────────────
    // Do this synchronously before clearing the cart so any stock-error is
    // visible in logs. We intentionally do NOT fail the HTTP response on stock
    // errors here — the payment has already been captured and the customer must
    // not face an error screen. Log the discrepancy for manual admin review.
    let orderItemsForStock: Awaited<ReturnType<typeof query>> | null = null;
    try {
      orderItemsForStock = await query(
        'SELECT product_id, variant_id, quantity FROM order_items WHERE order_id = $1',
        [order.id]
      );
      for (const item of orderItemsForStock.rows) {
        if (item.variant_id) {
          await deductStockForOrder(
            Number(item.variant_id),
            Number(item.quantity),
            Number(order.id),
            Number(order.user_id)
          );
        }
      }
    } catch (stockErr) {
      // Log but never let a stock error roll back a confirmed payment
      console.error(`[checkout/verify] ⚠️ Stock deduction failed for order ${order.id}:`, stockErr);
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

    // Clear the user's cart after successful payment
    await clearCart(order.user_id);

    // Send order confirmation email (async, don't wait)
    try {
      // Fetch complete order details for email
      const orderDetailsResult = await query(
        `SELECT o.*, u.name as customer_name, u.email as customer_email
         FROM orders o
         JOIN users u ON o.user_id = u.id
         WHERE o.id = $1`,
        [order.id]
      );

      if (orderDetailsResult.rows.length > 0) {
        const orderDetails = orderDetailsResult.rows[0];
        const orderItems = await getOrderItems(order.id);

        // Parse shipping address
        let shippingAddress = null;
        if (orderDetails.shipping_address) {
          try {
            shippingAddress = typeof orderDetails.shipping_address === 'string'
              ? JSON.parse(orderDetails.shipping_address)
              : orderDetails.shipping_address;
          } catch (e) {
            console.error('Error parsing shipping address for email:', e);
          }
        }

        // Send email in background (don't await to avoid delaying response)
        sendOrderConfirmationEmail(orderDetails.customer_email, {
          orderId: orderDetails.id,
          customerName: orderDetails.customer_name,
          customerEmail: orderDetails.customer_email,
          orderDate: orderDetails.created_at,
          items: orderItems.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: parseFloat(item.price),
            image_url: item.image_url ? `${process.env.NEXT_PUBLIC_APP_URL}${item.image_url}` : undefined,
          })),
          totalAmount: parseFloat(orderDetails.total_amount),
          shippingAddress: shippingAddress,
          paymentStatus: orderDetails.payment_status || 'Paid',
        }).catch(emailError => {
          // Log email error but don't fail the request
          console.error('Error sending order confirmation email:', emailError);
        });
      }
    } catch (emailError) {
      // Log email error but don't fail the payment verification
      console.error('Error preparing order confirmation email:', emailError);
    }

    return NextResponse.json({
      success: true,
      data: {
        order_id: order.id,
        message: 'Payment verified and order updated successfully'
      }
    });
  } catch (err: unknown) {
    console.error('Error in payment verification:', err);
    return NextResponse.json(
      { success: false, error: toErrorMessage(err) || 'Internal server error' },
      { status: 500 }
    );
  }
}