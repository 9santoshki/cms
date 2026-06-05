-- Migration: Add HSN code and supplier price to product_variants
-- HSN (Harmonized System of Nomenclature) code is used for tax classification in India.
-- Supplier price is the cost price per variant — admin-only, never exposed to customers.

ALTER TABLE product_variants ADD COLUMN IF NOT EXISTS hsn_code VARCHAR(20);
ALTER TABLE product_variants ADD COLUMN IF NOT EXISTS supplier_price DECIMAL(10, 2);

COMMENT ON COLUMN product_variants.hsn_code IS 'Harmonized System of Nomenclature code for tax classification (India)';
COMMENT ON COLUMN product_variants.supplier_price IS 'Cost price from supplier — admin-only, never shown to customers';
