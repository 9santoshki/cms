-- Migration: Add brand, rich-text content, and delivery fields to products
-- Idempotent: safe to run multiple times

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS brand              VARCHAR(255),
  ADD COLUMN IF NOT EXISTS delivery_time      VARCHAR(100),
  ADD COLUMN IF NOT EXISTS highlights         TEXT,
  ADD COLUMN IF NOT EXISTS description_html   TEXT,
  ADD COLUMN IF NOT EXISTS faqs_html          TEXT,
  ADD COLUMN IF NOT EXISTS warranty_policy    TEXT;

CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
