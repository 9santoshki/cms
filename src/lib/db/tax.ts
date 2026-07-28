import { getGstRatesForHsnCodes } from './hsnGst';

/**
 * A taxable line — a cart/order item, or a synthetic line for shipping
 * (hsn_code null, since shipping isn't a product and has no HSN mapping).
 * `price` is a unit price; whether it already includes tax depends on
 * `taxMode`.
 */
export interface TaxLine {
  price: number;
  quantity: number;
  hsn_code?: string | null;
  /**
   * 'inclusive' (default): `price` already includes GST — tax is backed out
   * of it for display, not added to the payable total. This is how product
   * prices work (MRP-style).
   * 'exclusive': `price` excludes GST — tax is computed on top and must be
   * ADDED to the payable total. This is how the shipping flat-rate works
   * (freight/logistics GST is charged in addition to the base rate).
   */
  taxMode?: 'inclusive' | 'exclusive';
}

export interface LineTaxResult {
  /** Rate actually applied — from the item's HSN mapping, or the fallback rate. */
  gstRate: number;
  /** Tax amount for this line. Included in price × quantity when inclusive; additional to it when exclusive. */
  tax: number;
  /** True when this line's tax was computed additively (on top of price) rather than backed out of an inclusive price. */
  exclusive: boolean;
}

export interface CartTaxResult {
  /** Total tax across all lines — combined product + shipping tax, for display (e.g. the "Tax" row). */
  tax: number;
  /** Portion of `tax` that comes from exclusive lines and must be ADDED to subtotal+shipping to get the true payable total (product tax is already embedded in its price and isn't part of this). */
  additiveTax: number;
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
      additiveTax: 0,
      taxRate: 0,
      taxableTotal: inclusiveTotal,
      lines: lines.map(() => ({ gstRate: 0, tax: 0, exclusive: false })),
    };
  }

  const hsnCodes = [...new Set(lines.map(l => l.hsn_code).filter((c): c is string => !!c))];
  const rateByHsn = await getGstRatesForHsnCodes(hsnCodes);

  const lineResults: LineTaxResult[] = lines.map(line => {
    const gstRate = (line.hsn_code && rateByHsn.has(line.hsn_code))
      ? rateByHsn.get(line.hsn_code)!
      : fallbackRate;
    const lineTotal = line.price * line.quantity;
    const exclusive = line.taxMode === 'exclusive';
    const tax = gstRate > 0
      ? (exclusive ? lineTotal * gstRate / 100 : lineTotal * gstRate / (100 + gstRate))
      : 0;
    return { gstRate, tax, exclusive };
  });

  const tax = lineResults.reduce((sum, l) => sum + l.tax, 0);
  const additiveTax = lineResults.reduce((sum, l) => sum + (l.exclusive ? l.tax : 0), 0);
  // Taxable base per line: an exclusive line's price already excludes tax
  // (it *is* the base); an inclusive line's tax must be subtracted out of it.
  const taxableTotal = lines.reduce((sum, line, i) => {
    const lineTotal = line.price * line.quantity;
    return sum + (lineResults[i].exclusive ? lineTotal : lineTotal - lineResults[i].tax);
  }, 0);
  const taxRate = taxableTotal > 0 ? (tax / taxableTotal) * 100 : 0;

  return { tax, additiveTax, taxRate, taxableTotal, lines: lineResults };
}
