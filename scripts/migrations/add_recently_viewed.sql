-- Migration: add_recently_viewed
-- Tracks the last N products a logged-in user viewed on product detail pages.
-- ON CONFLICT upserts so the same product always rises to the top.

CREATE TABLE IF NOT EXISTS recently_viewed (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
  product_id  INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  viewed_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_recently_viewed_user_time
  ON recently_viewed (user_id, viewed_at DESC);
