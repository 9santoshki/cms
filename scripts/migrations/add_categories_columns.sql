-- Migration: Add missing columns to categories table
-- Idempotent: uses ADD COLUMN IF NOT EXISTS

ALTER TABLE categories
  ADD COLUMN IF NOT EXISTS image TEXT,
  ADD COLUMN IF NOT EXISTS show_on_homepage BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS show_in_menu BOOLEAN NOT NULL DEFAULT TRUE;

-- Index for homepage query performance
CREATE INDEX IF NOT EXISTS idx_categories_show_on_homepage
  ON categories (show_on_homepage) WHERE show_on_homepage = TRUE;

CREATE INDEX IF NOT EXISTS idx_categories_show_in_menu
  ON categories (show_in_menu) WHERE show_in_menu = TRUE;
