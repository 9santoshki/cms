-- Migration: add billing_address column to orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_address JSONB;
