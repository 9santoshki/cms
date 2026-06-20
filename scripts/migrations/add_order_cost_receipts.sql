-- Migration: add cost tracking and purchase receipts to orders
-- Run once per environment

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS cost_price DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS cash_expense DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS cost_notes TEXT;

CREATE TABLE IF NOT EXISTS order_receipts (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  r2_key VARCHAR(500) NOT NULL,
  filename VARCHAR(255),
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_receipts_order_id ON order_receipts(order_id);
