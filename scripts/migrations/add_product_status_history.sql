-- Migration: track product status changes (maker-checker workflow) with who
-- changed it, when, and their comment. Mirrors order_status_history.
-- Idempotent: safe to run multiple times.

CREATE TABLE IF NOT EXISTS product_status_history (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  from_status VARCHAR(50),
  to_status VARCHAR(50) NOT NULL,
  changed_by INTEGER REFERENCES users(id),
  changed_by_name VARCHAR(255),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_status_history_product_id ON product_status_history(product_id);
