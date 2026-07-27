-- Migration: Maker-checker workflow for products
-- Expands status options and adds reviewer_comment field
-- Idempotent: safe to run multiple times

-- Expand the status CHECK constraint to include pending_review and rejected
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_status_check;
ALTER TABLE products ADD CONSTRAINT products_status_check
  CHECK (status = ANY (ARRAY['draft','published','archived','pending_review','rejected']));

-- Add reviewer comment field (admin feedback to maker)
ALTER TABLE products ADD COLUMN IF NOT EXISTS reviewer_comment TEXT;

-- Change default so new products always start as draft
ALTER TABLE products ALTER COLUMN status SET DEFAULT 'draft';

-- Index for pending_review queue
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
