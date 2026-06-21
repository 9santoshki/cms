/**
 * Shared checkout & payment verification logic.
 *
 * Extracted from the duplicated verify/verify-payment route handlers
 * so that signature verification, Razorpay lookups, order-status
 * updates, and inventory deduction run through a single code path.
 */
import crypto from 'crypto';
import { query } from '@/lib/db/connection';
import { getOrderItems, addOrderStatusHistory } from '@/lib/db/orders';
import { deductStockForOrder } from '@/lib/db/suppliers';
import { sendStockDiscrepancyAlert } from '@/lib/email';
import razorpay from '@/lib/razorpay';

export interface VerifyPaymentParams {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifiedOrder {
  id: number;
  user_id: string;
  status: string;
}

/**
 * Verify the Razorpay payment signature using timing-safe comparison.
 * Returns true if the signature is valid.
 */
export function verifyRazorpaySignature(params: VerifyPaymentParams): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return false;

  const body = params.razorpay_order_id + '|' + params.razorpay_payment_id;
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');

  const sigBuf = Buffer.from(params.razorpay_signature);
  const expBuf = Buffer.from(expected);

  if (sigBuf.length !== expBuf.length) return false;

  return crypto.timingSafeEqual(sigBuf, expBuf);
}

/**
 * Fetch the payment from Razorpay and confirm it is captured.
 * Throws on network / API errors; returns null when payment is not captured.
 */
export async function verifyAndCapturePayment(
  razorpay_payment_id: string,
  razorpay_order_id: string,
): Promise<{ captured: boolean; status: string }> {
  const payment = await razorpay.payments.fetch(razorpay_payment_id);

  if (payment.order_id !== razorpay_order_id) {
    return { captured: false, status: 'order_id_mismatch' };
  }

  return {
    captured: payment.status === 'captured',
    status: payment.status,
  };
}

/**
 * Find an order by the Razorpay payment (order) ID.
 */
export async function findOrderByPaymentId(
  paymentId: string,
): Promise<VerifiedOrder | null> {
  const result = await query(
    'SELECT id, user_id, status FROM orders WHERE payment_id = $1',
    [paymentId],
  );
  if (result.rows.length === 0) return null;
  return result.rows[0] as VerifiedOrder;
}

/**
 * Mark the order as processing and deduct inventory for variant items.
 * Inventory errors are logged + alerted but NEVER thrown — the payment
 * is already captured at this point.
 */
export async function completeOrderWithStockDeduction(
  order: VerifiedOrder,
  razorpayPaymentId: string,
): Promise<void> {
  await query(
    `UPDATE orders
     SET status = 'processing', payment_status = 'paid', payment_id = $2, updated_at = NOW()
     WHERE id = $1`,
    [order.id, razorpayPaymentId],
  );

  // History insert and order-items fetch are independent — run in parallel.
  const [, orderItemsResult] = await Promise.all([
    addOrderStatusHistory(
      String(order.id),
      order.status,   // actual status, not assumed 'pending'
      'processing',
      String(order.user_id),
      'Payment Gateway',
      'Payment captured via Razorpay',
    ).catch((err) => console.error('[checkout-service] Status history insert failed:', err)),
    query(
      'SELECT product_id, variant_id, quantity FROM order_items WHERE order_id = $1',
      [order.id],
    ),
  ]);

  try {
    for (const item of orderItemsResult.rows) {
      if (item.variant_id) {
        await deductStockForOrder(
          Number(item.variant_id),
          Number(item.quantity),
          Number(order.id),
          Number(order.user_id),
        );
      }
    }
  } catch (stockErr) {
    console.error(`[checkout-service] ⚠️ Stock deduction failed for order ${order.id}:`, stockErr);
    for (const item of orderItemsResult.rows) {
      if (item.variant_id) {
        await sendStockDiscrepancyAlert({
          orderId: Number(order.id),
          variantId: Number(item.variant_id),
          quantity: Number(item.quantity),
          error: stockErr instanceof Error ? stockErr.message : String(stockErr),
        }).catch(() => {});
      }
    }
  }
}

/**
 * Fetch full order details for the confirmation email.
 */
export async function getOrderDetailsForEmail(orderId: number) {
  const result = await query(
    `SELECT o.*, u.name as customer_name, u.email as customer_email
     FROM orders o
     JOIN users u ON o.user_id = u.id
     WHERE o.id = $1`,
    [orderId],
  );
  if (result.rows.length === 0) return null;

  const order = result.rows[0];
  const items = await getOrderItems(String(orderId));

  let shippingAddress = null;
  if (order.shipping_address) {
    try {
      shippingAddress =
        typeof order.shipping_address === 'string'
          ? JSON.parse(order.shipping_address)
          : order.shipping_address;
    } catch {
      // ignore parse errors
    }
  }

  return {
    orderId: order.id,
    customerName: order.customer_name,
    customerEmail: order.customer_email,
    orderDate: order.created_at,
    items: items.map((item: any) => ({
      name: item.name,
      quantity: item.quantity,
      price: parseFloat(item.price),
      image_url: item.image_url
        ? `${process.env.NEXT_PUBLIC_APP_URL}${item.image_url}`
        : undefined,
    })),
    totalAmount: parseFloat(order.total_amount),
    shippingAddress,
    paymentStatus: order.payment_status || 'Paid',
  };
}
