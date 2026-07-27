-- Migration: Snapshot per-item HSN code, GST rate, and tax amount on order_items
-- Previously, order tax was a single blended figure computed from one site-wide
-- rate — never tied to each item's actual HSN code. This snapshots what was
-- actually resolved for each line at the time of purchase, so historical
-- invoices stay accurate even if HSN codes or GST rates are edited later.

ALTER TABLE order_items ADD COLUMN IF NOT EXISTS hsn_code VARCHAR(20);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS gst_rate DECIMAL(5, 2);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(10, 2);

COMMENT ON COLUMN order_items.hsn_code IS 'HSN code snapshotted from the variant at time of purchase';
COMMENT ON COLUMN order_items.gst_rate IS 'GST rate (%) resolved for this line at time of purchase — from hsn_gst_rates, or the site-wide fallback rate if the item had no HSN mapping';
COMMENT ON COLUMN order_items.tax_amount IS 'Tax amount for this line at time of purchase (already included in price, which is GST-inclusive)';
