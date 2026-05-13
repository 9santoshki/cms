-- Migration: Add supplier/partner module for inventory management
-- Suppliers can log in via Google and manage inventory for assigned variants
-- Run this after the product_variants migration

-- ============================================================================
-- 1. Add 'supplier' role to users table CHECK constraint
-- ============================================================================

-- Drop and recreate the CHECK constraint to include 'supplier' role
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check
  CHECK (role IN ('customer', 'moderator', 'admin', 'supplier'));

-- ============================================================================
-- 2. Create suppliers table (additional info for supplier users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),           -- Name of primary contact (optional, can use user.name)
    phone VARCHAR(50),
    address TEXT,
    gst_id VARCHAR(50),                    -- GST/Tax identification number
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT,                            -- Admin notes about this supplier
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)                        -- One supplier profile per user
);

CREATE INDEX IF NOT EXISTS idx_suppliers_user_id ON suppliers(user_id);
CREATE INDEX IF NOT EXISTS idx_suppliers_is_active ON suppliers(is_active);

-- ============================================================================
-- 3. Create supplier_variants table (assign variants to suppliers)
-- ============================================================================
CREATE TABLE IF NOT EXISTS supplier_variants (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
    variant_id INTEGER NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_by INTEGER REFERENCES users(id),    -- Admin who made the assignment
    notes TEXT,                                  -- Notes about this assignment
    UNIQUE(supplier_id, variant_id)              -- Prevent duplicate assignments
);

CREATE INDEX IF NOT EXISTS idx_supplier_variants_supplier_id ON supplier_variants(supplier_id);
CREATE INDEX IF NOT EXISTS idx_supplier_variants_variant_id ON supplier_variants(variant_id);

-- ============================================================================
-- 4. Add triggers for updated_at
-- ============================================================================
DROP TRIGGER IF EXISTS update_suppliers_updated_at ON suppliers;
CREATE TRIGGER update_suppliers_updated_at
    BEFORE UPDATE ON suppliers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 5. Create audit log for inventory changes (optional but recommended)
-- ============================================================================
CREATE TABLE IF NOT EXISTS inventory_logs (
    id SERIAL PRIMARY KEY,
    variant_id INTEGER NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    previous_quantity INTEGER NOT NULL,
    new_quantity INTEGER NOT NULL,
    change_quantity INTEGER NOT NULL,       -- Positive for increase, negative for decrease
    changed_by INTEGER REFERENCES users(id), -- User who made the change (supplier or admin)
    change_type VARCHAR(50) NOT NULL,       -- 'supplier_update', 'admin_update', 'order', 'return'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inventory_logs_variant_id ON inventory_logs(variant_id);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_changed_by ON inventory_logs(changed_by);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_created_at ON inventory_logs(created_at);

COMMIT;