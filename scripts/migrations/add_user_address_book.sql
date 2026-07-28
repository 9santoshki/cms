-- Migration: user address book — every distinct shipping/billing address a
-- user has actually used, so the checkout form can auto-populate the most
-- recently used one and the account page can let them manage saved
-- addresses. Deliberately NOT referenced by `orders` (orders keep their own
-- shipping_address/billing_address JSONB snapshot from checkout/create) —
-- editing or deleting an entry here must never change what a past order
-- shows.
-- Idempotent: safe to run multiple times.

CREATE TABLE IF NOT EXISTS user_addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL DEFAULT 'shipping' CHECK (type IN ('shipping', 'billing')),
  name VARCHAR(255),
  phone VARCHAR(50),
  address TEXT NOT NULL,
  city VARCHAR(255),
  state VARCHAR(255),
  zip_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'India',
  last_used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);
-- Powers "most recently used" lookups (auto-populate) and the address list
-- (newest first) with a single index.
CREATE INDEX IF NOT EXISTS idx_user_addresses_last_used ON user_addresses(user_id, type, last_used_at DESC);

COMMENT ON TABLE user_addresses IS 'Address book: every distinct shipping/billing address a user has used at checkout, independent of order history.';
COMMENT ON COLUMN user_addresses.last_used_at IS 'Bumped to NOW() every time this exact address is reused at checkout — drives "auto-populate last used address".';
