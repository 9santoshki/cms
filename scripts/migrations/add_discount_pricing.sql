-- Migration: Add discount pricing columns to products
-- Run with: psql -U sk -d cmsdb -f scripts/migrations/add_discount_pricing.sql

-- Add original_price column (the full/retail price)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS original_price DECIMAL(10, 2);

-- Add sale_price column (the discounted price)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS sale_price DECIMAL(10, 2);

-- Migrate existing data: current price becomes sale_price
-- original_price can be set manually by admin later
UPDATE products
SET sale_price = price
WHERE sale_price IS NULL;

-- Note: The existing 'price' column is kept for backward compatibility
-- Frontend should use sale_price for display, falling back to price if null
