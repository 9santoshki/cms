-- Migration: Add product variants system with flexible options
-- Supports thickness, size, color variations with per-SKU pricing and inventory
-- Run this migration to add variant support to existing database

-- ============================================================================
-- 1. Option Types (thickness, size, color - can add more later)
-- ============================================================================
CREATE TABLE IF NOT EXISTS variant_option_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,        -- 'thickness', 'size', 'color'
    display_name VARCHAR(100) NOT NULL,        -- 'Thickness', 'Size', 'Color'
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_variant_option_types_name ON variant_option_types(name);
CREATE INDEX IF NOT EXISTS idx_variant_option_types_display_order ON variant_option_types(display_order);

-- Insert default option types
INSERT INTO variant_option_types (name, display_name, description, display_order) VALUES
    ('thickness', 'Thickness', 'Paper/material thickness quality', 1),
    ('size', 'Size', 'Product dimensions', 2),
    ('color', 'Color', 'Color options', 3)
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- 2. Options for each type (thin, standard, thick for thickness, etc.)
-- ============================================================================
CREATE TABLE IF NOT EXISTS variant_options (
    id SERIAL PRIMARY KEY,
    option_type_id INTEGER NOT NULL REFERENCES variant_option_types(id) ON DELETE CASCADE,
    value VARCHAR(100) NOT NULL,              -- 'thin', 'standard', 'thick'
    display_value VARCHAR(100) NOT NULL,       -- 'Thin (Standard Paper)', 'Standard (Premium Paper)'
    price_modifier DECIMAL(10, 2) DEFAULT 0,   -- Optional price adjustment (+50 for thick)
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(option_type_id, value)
);

CREATE INDEX IF NOT EXISTS idx_variant_options_option_type_id ON variant_options(option_type_id);
CREATE INDEX IF NOT EXISTS idx_variant_options_display_order ON variant_options(display_order);

-- Insert default thickness options
INSERT INTO variant_options (option_type_id, value, display_value, display_order) VALUES
    (1, 'thin', 'Thin (Standard Paper)', 1),
    (1, 'standard', 'Standard (Premium Paper)', 2),
    (1, 'thick', 'Thick (Canvas Quality)', 3)
ON CONFLICT (option_type_id, value) DO NOTHING;

-- Insert default size options (in inches)
INSERT INTO variant_options (option_type_id, value, display_value, display_order) VALUES
    (2, '12x18', '12×18 inches', 1),
    (2, '18x24', '18×24 inches', 2),
    (2, '24x36', '24×36 inches', 3),
    (2, '36x48', '36×48 inches', 4)
ON CONFLICT (option_type_id, value) DO NOTHING;

-- Insert default color options
INSERT INTO variant_options (option_type_id, value, display_value, display_order) VALUES
    (3, 'natural', 'Natural/White', 1),
    (3, 'black', 'Black', 2),
    (3, 'brown', 'Brown/Wood', 3),
    (3, 'multicolor', 'Multi-color/Design-specific', 4)
ON CONFLICT (option_type_id, value) DO NOTHING;

-- ============================================================================
-- 3. Product Variants (SKU combinations with price and stock)
-- ============================================================================
CREATE TABLE IF NOT EXISTS product_variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(100) UNIQUE,                   -- SKU code like 'POSTER-THICK-24x36-BLK'
    price DECIMAL(10, 2) NOT NULL,             -- Price for this specific variant
    sale_price DECIMAL(10, 2),                 -- Optional sale price
    stock_quantity INTEGER DEFAULT 0,          -- Inventory for this variant
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON product_variants(sku);

-- ============================================================================
-- 4. Variant Values (links variants to their options)
-- ============================================================================
CREATE TABLE IF NOT EXISTS product_variant_values (
    id SERIAL PRIMARY KEY,
    variant_id INTEGER NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    option_id INTEGER NOT NULL REFERENCES variant_options(id) ON DELETE CASCADE,
    UNIQUE(variant_id, option_id)              -- Each variant has one value per option type
);

CREATE INDEX IF NOT EXISTS idx_product_variant_values_variant_id ON product_variant_values(variant_id);
CREATE INDEX IF NOT EXISTS idx_product_variant_values_option_id ON product_variant_values(option_id);

-- ============================================================================
-- 5. Update existing tables to reference variants
-- ============================================================================

-- Add variant_id to cart table
ALTER TABLE cart ADD COLUMN IF NOT EXISTS variant_id INTEGER REFERENCES product_variants(id) ON DELETE CASCADE;

-- Update cart unique constraint to include variant_id (idempotent)
ALTER TABLE cart DROP CONSTRAINT IF EXISTS cart_user_id_product_id_key;
ALTER TABLE cart DROP CONSTRAINT IF EXISTS cart_user_id_product_id_variant_id_key;
ALTER TABLE cart ADD CONSTRAINT cart_user_id_product_id_variant_id_key UNIQUE(user_id, product_id, variant_id);

-- Add variant_id to order_items table
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS variant_id INTEGER REFERENCES product_variants(id) ON DELETE SET NULL;

-- Add variant_name column for historical record (stores variant details at time of order)
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS variant_name VARCHAR(255);

-- ============================================================================
-- 6. Add triggers for updated_at
-- ============================================================================
DROP TRIGGER IF EXISTS update_variant_option_types_updated_at ON variant_option_types;
CREATE TRIGGER update_variant_option_types_updated_at
    BEFORE UPDATE ON variant_option_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_variant_options_updated_at ON variant_options;
CREATE TRIGGER update_variant_options_updated_at
    BEFORE UPDATE ON variant_options
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_product_variants_updated_at ON product_variants;
CREATE TRIGGER update_product_variants_updated_at
    BEFORE UPDATE ON product_variants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMIT;