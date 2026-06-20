-- Add subtotal, shipping, and tax columns to orders table
-- These are nullable so existing orders without stored values are unaffected

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS subtotal_amount DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS shipping_amount DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(10, 2);
