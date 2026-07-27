import { getGstRatesForHsnCodes } from './hsnGst';

/**
 * A taxable line — a cart/order item, or a synthetic line for shipping
 * (hsn_code null, since shipping isn't a product and has no HSN mapping).
 * `price` is the tax-inclusive unit price, matching how prices are stored
 * and displayed across the app.
 */
export interface TaxLine {
  price: number;
  quantity: number;
  hsn_code?: string | null;
}

export interface LineTaxResult {
  /** Rate actually applied — from the item's HSN mapping, or the fallback rate. */
  gstRate: number;
  /** Tax amount for this line (already included in price × quantity). */
  tax: number;
}

export interface CartTaxResult {
  tax: number;
  /** Blended effective rate across all lines, for display only (e.g. "Tax (12.4%)") — not an input rate, since lines may carry different HSN rates. */
  taxRate: number;
  taxableTotal: number;
  /** Per-line results, same order/length as the input lines. */
  lines: LineTaxResult[];
}

/**
 * Computes real tax per line: each line's own HSN code is resolved to its
 * GST rate via hsn_gst_rates where an active mapping exists, falling back to
 * the site-wide rate otherwise (no HSN code, or an HSN code with no active
 * rate row). Replaces applying one flat rate to the whole order.
 */
export async function computeCartTax(
  lines: TaxLine[],
  fallbackRate: number,
  taxEnabled: boolean
): Promise<CartTaxResult> {
  const inclusiveTotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

  if (!taxEnabled) {
    return {
      tax: 0,
      taxRate: 0,
      taxableTotal: inclusiveTotal,
      lines: lines.map(() => ({ gstRate: 0, tax: 0 })),
    };
  }

  const hsnCodes = [...new Set(lines.map(l => l.hsn_code).filter((c): c is string => !!c))];
  const rateByHsn = await getGstRatesForHsnCodes(hsnCodes);

  const lineResults: LineTaxResult[] = lines.map(line => {
    const gstRate = (line.hsn_code && rateByHsn.has(line.hsn_code))
      ? rateByHsn.get(line.hsn_code)!
      : fallbackRate;
    const lineTotal = line.price * line.quantity;
    const tax = gstRate > 0 ? lineTotal * gstRate / (100 + gstRate) : 0;
    return { gstRate, tax };
  });

  const tax = lineResults.reduce((sum, l) => sum + l.tax, 0);
  const taxableTotal = inclusiveTotal - tax;
  const taxRate = taxableTotal > 0 ? (tax / taxableTotal) * 100 : 0;

  return { tax, taxRate, taxableTotal, lines: lineResults };
}
