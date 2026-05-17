-- Migration: Add per-supplier stock_quantity to supplier_variants
-- Each supplier holds their own quantity for an assigned variant.
-- product_variants.stock_quantity becomes the SUM of all supplier quantities.

ALTER TABLE supplier_variants
  ADD COLUMN IF NOT EXISTS stock_quantity INTEGER NOT NULL DEFAULT 0;

-- Recalculate product_variants.stock_quantity from supplier totals for existing data
-- (safe no-op if supplier_variants is empty or already correct)
UPDATE product_variants pv
SET stock_quantity = COALESCE(
  (SELECT SUM(sv.stock_quantity) FROM supplier_variants sv WHERE sv.variant_id = pv.id),
  0
);

COMMIT;
