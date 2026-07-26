/**
 * Computes the real tax for a set of cart lines before checkout, so the cart
 * and checkout pages can show an accurate figure instead of one flat
 * site-wide rate applied to everything.
 *
 * Each line's HSN code is resolved server-side from its variant_id (never
 * trusted from the client) and mapped to its GST rate via hsn_gst_rates,
 * falling back to the site-wide rate for lines with no HSN mapping. This
 * mirrors exactly what checkout/create persists on the resulting order, so
 * the number shown here matches what gets charged.
 */
import { NextRequest } from 'next/server';
import { getSettings } from '@/lib/db/settings';
import { getHsnCodesForVariants } from '@/lib/db/variants';
import { computeCartTax, type TaxLine } from '@/lib/db/tax';
import { ok, badRequest, serverError } from '@/lib/api-response';

interface TaxLineInput {
  price?: unknown;
  quantity?: unknown;
  variant_id?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const items = body.items;
    if (!Array.isArray(items)) return badRequest('items array is required');

    const settings = await getSettings();

    const variantIds = [...new Set(
      items
        .map((i: TaxLineInput) => i.variant_id)
        .filter((v: unknown): v is number => typeof v === 'number')
    )];
    const hsnByVariant = await getHsnCodesForVariants(variantIds);

    const lines: TaxLine[] = items.map((i: TaxLineInput) => ({
      price: Number(i.price) || 0,
      quantity: Number(i.quantity) || 0,
      hsn_code: typeof i.variant_id === 'number' ? hsnByVariant.get(i.variant_id) ?? null : null,
    }));

    const result = await computeCartTax(lines, settings.tax.rate, settings.tax.enabled);
    return ok({ tax: result.tax, taxRate: result.taxRate });
  } catch (err) {
    console.error('[cart/tax] Error:', err);
    return serverError('Failed to compute tax');
  }
}
