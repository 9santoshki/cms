import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { query, getClient } from '@/lib/db/connection';
import { checkVariantStock } from '@/lib/db/suppliers';
import { getSettings } from '@/lib/db/settings';
import { calculateShippingCost, backComputeTaxAmount } from '@/utils/cartUtils';

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    const userId = session?.userId || null;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

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
    const { items, shipping_address, billing_address } = body;

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

    // ── Hard stock check ──────────────────────────────────────────────────────
    // Validate every variant item against live DB stock before creating the order.
    // This is the last gate before money changes hands — run all checks in parallel.
    const outOfStock: string[] = [];
    const insufficientStock: string[] = [];

    const variantItems = items.filter((item: Record<string, unknown>) => item.variant_id);
    const stockChecks = await Promise.all(
      variantItems.map((item: Record<string, unknown>) =>
        checkVariantStock(Number(item.variant_id), Number(item.quantity))
          .then(result => ({ item, ...result }))
      )
    );

    for (const { item, available, stock } of stockChecks) {
      if (!available) {
        const label = item.variant_name
          ? `${item.name} (${item.variant_name})`
          : String(item.name || `Variant #${item.variant_id}`);

        if (stock === 0) {
          outOfStock.push(label);
        } else {
          insufficientStock.push(`${label} (requested ${item.quantity}, available ${stock})`);
        }
      }
    }

    if (outOfStock.length > 0 || insufficientStock.length > 0) {
      const parts: string[] = [];
      if (outOfStock.length > 0) {
        parts.push(`Out of stock: ${outOfStock.join(', ')}`);
      }
      if (insufficientStock.length > 0) {
        parts.push(`Insufficient stock: ${insufficientStock.join('; ')}`);
      }
      return NextResponse.json(
        {
          success: false,
          error: `Some items cannot be fulfilled. ${parts.join('. ')} Please update your cart.`,
          outOfStock,
          insufficientStock,
        },
        { status: 409 }
      );
    }
    // ─────────────────────────────────────────────────────────────────────────

    // Calculate total amount (subtotal + shipping + tax)
    let subtotal = 0;
    for (const item of items) {
      if (typeof item.price === 'number' && typeof item.quantity === 'number') {
        subtotal += item.price * item.quantity;
      }
    }

    if (subtotal <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid cart total' },
        { status: 400 }
      );
    }

    const settings = await getSettings();
    const shipping = calculateShippingCost(subtotal, settings.shipping.flat_rate, settings.shipping.min_order_amount);
    const tax = backComputeTaxAmount(subtotal + shipping, settings.tax.rate, settings.tax.enabled);
    const totalAmount = subtotal + shipping; // tax is already included in listing prices

    // Create Razorpay order
    const options = {
      amount: Math.round(totalAmount * 100), // Amount in paise (lowest currency unit)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create order in our database
    const orderResult = await query(
      `INSERT INTO orders (user_id, total_amount, subtotal_amount, shipping_amount, tax_amount, status, payment_id, shipping_address, billing_address, created_at)
       VALUES ($1, $2, $3, $4, $5, 'pending', $6, $7, $8, NOW())
       RETURNING id`,
      [userId, totalAmount, subtotal, shipping, tax, razorpayOrder.id, shipping_address, billing_address || shipping_address]
    );

    const orderId = orderResult.rows[0].id;

    // Insert order items in a transaction so a partial failure doesn't leave orphan records
    const itemClient = await getClient();
    try {
      await itemClient.query('BEGIN');
      await Promise.all(
        items.map((item: Record<string, unknown>) =>
          itemClient.query(
            `INSERT INTO order_items (order_id, product_id, variant_id, quantity, price, variant_name)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              orderId,
              item.product_id,
              item.variant_id || null,
              item.quantity,
              item.price,
              item.variant_name || null,
            ]
          )
        )
      );
      await itemClient.query('COMMIT');
    } catch (insertErr) {
      await itemClient.query('ROLLBACK');
      throw insertErr;
    } finally {
      itemClient.release();
    }

    return NextResponse.json({
      success: true,
      data: {
        razorpay_order_id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        subtotal,
        shipping,
        tax,
        total_amount: totalAmount,
        order_id: orderId,
      }
    });
  } catch (err: unknown) {
    console.error('[checkout/create] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
