-- Migration: Inventory improvements
-- 1. Add product status (draft / published / archived)
-- 2. Add per-supplier low-stock threshold
-- 3. Ensure inventory_logs.change_type allows 'order' and 'return'

-- ─── Products: draft/publish workflow ────────────────────────────────────────
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'published';

-- All existing products stay published; new products created via API will
-- default to 'draft' (enforced at the API layer, not the DB default).

-- ─── Supplier variants: low-stock threshold ──────────────────────────────────
ALTER TABLE supplier_variants
  ADD COLUMN IF NOT EXISTS min_stock_threshold INTEGER NOT NULL DEFAULT 0;

-- ─── Inventory logs: broaden change_type to cover order deductions ───────────
-- Drop existing check constraint (safe no-op if it doesn't exist) and
-- recreate it with the full set of allowed values.
ALTER TABLE inventory_logs DROP CONSTRAINT IF EXISTS inventory_logs_change_type_check;
ALTER TABLE inventory_logs
  ADD CONSTRAINT inventory_logs_change_type_check
  CHECK (change_type IN ('supplier_update', 'admin_update', 'order', 'return'));

-- ─── order_items: ensure variant columns exist ───────────────────────────────
-- These should already be present; the ADD IF NOT EXISTS is a safety net.
ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS variant_id INTEGER REFERENCES product_variants(id) ON DELETE SET NULL;

ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS variant_name VARCHAR(500);

-- ─── Orders: add 'returned' as a valid status ────────────────────────────────
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE orders
  ADD CONSTRAINT orders_status_check
  CHECK (status IN ('pending', 'processing', 'shipped', 'completed', 'cancelled', 'returned'));

-- ─── Inventory logs: add order_id for traceability ────────────────────────────
ALTER TABLE inventory_logs
  ADD COLUMN IF NOT EXISTS order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL;

-- Update change_type constraint to include 'alert' for low-stock events
ALTER TABLE inventory_logs DROP CONSTRAINT IF EXISTS inventory_logs_change_type_check;
ALTER TABLE inventory_logs
  ADD CONSTRAINT inventory_logs_change_type_check
  CHECK (change_type IN ('supplier_update', 'admin_update', 'order', 'return', 'alert'));
