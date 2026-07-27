-- Migration: save shipping and billing addresses on user profile
ALTER TABLE users ADD COLUMN IF NOT EXISTS shipping_address JSONB;
ALTER TABLE users ADD COLUMN IF NOT EXISTS billing_address JSONB;
