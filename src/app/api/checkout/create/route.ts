import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { query, getClient } from '@/lib/db/connection';
import { checkVariantStock } from '@/lib/db/suppliers';
import { getHsnCodesForVariants } from '@/lib/db/variants';
import { getSettings } from '@/lib/db/settings';
import { computeCartTax, type TaxLine } from '@/lib/db/tax';
import { recordUsedAddress } from '@/lib/db/addresses';
import { calculateShippingCost, calculateConvenienceFee } from '@/utils/cartUtils';

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

    const body = await request.json();
    const { items, shipping_address, billing_address } = body;
    const paymentMethod: 'razorpay' | 'upi_qr' = body.payment_method === 'upi_qr' ? 'upi_qr' : 'razorpay';

    // Razorpay is only needed for the gateway path — UPI QR orders are created
    // directly and confirmed manually by an admin later.
    let razorpay: Razorpay | null = null;
    if (paymentMethod === 'razorpay') {
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

      razorpay = new Razorpay({
        key_id: razorpayKey,
        key_secret: razorpaySecret,
      });
    }

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

    if (paymentMethod === 'upi_qr' && !settings.upi.enabled) {
      return NextResponse.json(
        { success: false, error: 'UPI payment is not available' },
        { status: 400 }
      );
    }

    const shipping = calculateShippingCost(subtotal, settings.shipping.flat_rate, settings.shipping.min_order_amount);

    // Resolve each item's own GST rate from its variant's HSN code (never
    // trusted from the client) rather than applying one flat rate to the
    // whole order. Shipping has no HSN of its own, so it's taxed at the
    // site-wide fallback rate via a synthetic line with hsn_code: null.
    // Unlike product prices (already GST-inclusive, MRP-style), the shipping
    // flat rate is a pre-tax base freight cost — GST on it is computed
    // additively (taxMode: 'exclusive') and added to the order total below,
    // rather than backed out of the configured flat rate.
    const itemVariantIds = [...new Set(
      items
        .map((item: Record<string, unknown>) => item.variant_id)
        .filter((v: unknown): v is number => typeof v === 'number')
    )];
    const hsnByVariant = await getHsnCodesForVariants(itemVariantIds);

    const itemTaxLines: TaxLine[] = items.map((item: Record<string, unknown>) => ({
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 0,
      hsn_code: typeof item.variant_id === 'number' ? hsnByVariant.get(item.variant_id) ?? null : null,
    }));
    const taxLines: TaxLine[] = shipping > 0
      ? [...itemTaxLines, { price: shipping, quantity: 1, hsn_code: null, taxMode: 'exclusive' }]
      : itemTaxLines;

    const taxResult = await computeCartTax(taxLines, settings.tax.rate, settings.tax.enabled);
    const tax = taxResult.tax;
    // Product tax is already included in listing prices; shipping tax is not
    // (shipping is exclusive-of-tax) and must be added on top here.
    const preFeeTotal = subtotal + shipping + taxResult.additiveTax;
    // 1% convenience fee for online (gateway) payments — free for UPI QR.
    // Computed on the amount payable before the fee itself, and added on top.
    const convenienceFee = calculateConvenienceFee(preFeeTotal, paymentMethod);
    const totalAmount = preFeeTotal + convenienceFee;

    // Create the Razorpay order first (gateway path only) so we have its ID to store.
    // UPI QR orders skip the gateway entirely — payment_id stays null until an admin
    // confirms the transfer and payment_status starts at 'awaiting_verification'.
    let razorpayOrder: { id: string; amount: string | number; currency: string } | null = null;
    if (paymentMethod === 'razorpay' && razorpay) {
      const options = {
        amount: Math.round(totalAmount * 100), // Amount in paise (lowest currency unit)
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      };
      razorpayOrder = await razorpay.orders.create(options);
    }

    // Create order in our database
    const orderResult = await query(
      `INSERT INTO orders (user_id, total_amount, subtotal_amount, shipping_amount, tax_amount, convenience_fee_amount, status, payment_id, payment_status, payment_method, shipping_address, billing_address, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending', $7, $8, $9, $10, $11, NOW())
       RETURNING id`,
      [
        userId, totalAmount, subtotal, shipping, tax, convenienceFee,
        razorpayOrder?.id || null,
        paymentMethod === 'upi_qr' ? 'awaiting_verification' : null,
        paymentMethod,
        shipping_address,
        billing_address || shipping_address,
      ]
    );

    const orderId = orderResult.rows[0].id;

    // Insert order items in a transaction so a partial failure doesn't leave orphan records
    const itemClient = await getClient();
    try {
      await itemClient.query('BEGIN');
      await Promise.all(
        items.map((item: Record<string, unknown>, idx: number) => {
          // itemTaxLines[idx] / taxResult.lines[idx] correspond 1:1 to items[idx] —
          // itemTaxLines was built directly from items before the shipping line
          // (if any) was appended after it.
          const lineTax = taxResult.lines[idx];
          return itemClient.query(
            `INSERT INTO order_items (order_id, product_id, variant_id, quantity, price, variant_name, hsn_code, gst_rate, tax_amount)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
              orderId,
              item.product_id,
              item.variant_id || null,
              item.quantity,
              item.price,
              item.variant_name || null,
              itemTaxLines[idx].hsn_code,
              lineTax.gstRate,
              lineTax.tax,
            ]
          );
        })
      );
      await itemClient.query('COMMIT');
    } catch (insertErr) {
      await itemClient.query('ROLLBACK');
      throw insertErr;
    } finally {
      itemClient.release();
    }

    // Record these addresses in the user's address book (dedup'd by content,
    // bumps last_used_at on repeat use) so checkout can auto-populate the
    // most recently used address next time. Best-effort: the order is
    // already committed above, so a failure here must never fail checkout.
    try {
      await recordUsedAddress(userId, 'shipping', shipping_address);
      await recordUsedAddress(userId, 'billing', billing_address || shipping_address);
    } catch (addrErr) {
      console.error('[checkout/create] Failed to record address in address book:', addrErr);
    }

    return NextResponse.json({
      success: true,
      data: {
        payment_method: paymentMethod,
        ...(razorpayOrder
          ? { razorpay_order_id: razorpayOrder.id, amount: razorpayOrder.amount, currency: razorpayOrder.currency }
          : {}),
        subtotal,
        shipping,
        tax,
        convenience_fee: convenienceFee,
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
