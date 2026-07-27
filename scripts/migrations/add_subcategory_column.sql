-- Migration: Add subcategory column to products table
-- Supports category/subcategory navigation (Living Room > Sofas & Sectionals, etc.)
-- Idempotent: safe to run multiple times

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS subcategory VARCHAR(100);

CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(subcategory);
