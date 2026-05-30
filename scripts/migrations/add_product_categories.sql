-- Migration: Add product_categories junction table for many-to-many product ↔ category
-- Run directly on the database (NOT via npm run init-db)

CREATE TABLE IF NOT EXISTS product_categories (
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

CREATE INDEX IF NOT EXISTS idx_product_categories_product_id ON product_categories(product_id);
CREATE INDEX IF NOT EXISTS idx_product_categories_category_id ON product_categories(category_id);

-- Backfill from existing products.category (parent) text column
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p
JOIN categories c ON c.name = p.category AND c.parent_id IS NULL
WHERE p.category IS NOT NULL AND p.category != ''
ON CONFLICT DO NOTHING;

-- Backfill from existing products.subcategory text column
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p
JOIN categories c ON c.name = p.subcategory AND c.parent_id IS NOT NULL
WHERE p.subcategory IS NOT NULL AND p.subcategory != ''
ON CONFLICT DO NOTHING;
