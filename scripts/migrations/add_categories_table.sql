-- Migration: Add categories table for hierarchical category/subcategory management
-- Run this script directly on the database (NOT via npm run init-db)

-- Create categories table with parent-child relationship
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);

-- Trigger for automatic updated_at
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed initial categories (parent categories)
INSERT INTO categories (name, slug, display_order, description) VALUES
    ('Living Room', 'living-room', 1, 'Furniture and decor for living spaces'),
    ('Dining Room', 'dining-room', 2, 'Dining tables, chairs, and accessories'),
    ('Bedroom', 'bedroom', 3, 'Bedroom furniture and furnishings'),
    ('Office', 'office', 4, 'Office and workspace furniture')
ON CONFLICT (slug) DO NOTHING;

-- Seed sample subcategories under Living Room
INSERT INTO categories (name, slug, parent_id, display_order) VALUES
    ('Sofas', 'sofas', (SELECT id FROM categories WHERE slug = 'living-room'), 1),
    ('Coffee Tables', 'coffee-tables', (SELECT id FROM categories WHERE slug = 'living-room'), 2),
    ('TV Units', 'tv-units', (SELECT id FROM categories WHERE slug = 'living-room'), 3),
    ('Accent Chairs', 'accent-chairs', (SELECT id FROM categories WHERE slug = 'living-room'), 4)
ON CONFLICT (slug) DO NOTHING;

-- Seed sample subcategories under Dining Room
INSERT INTO categories (name, slug, parent_id, display_order) VALUES
    ('Dining Tables', 'dining-tables', (SELECT id FROM categories WHERE slug = 'dining-room'), 1),
    ('Dining Chairs', 'dining-chairs', (SELECT id FROM categories WHERE slug = 'dining-room'), 2),
    ('Bar Stools', 'bar-stools', (SELECT id FROM categories WHERE slug = 'dining-room'), 3)
ON CONFLICT (slug) DO NOTHING;

-- Seed sample subcategories under Bedroom
INSERT INTO categories (name, slug, parent_id, display_order) VALUES
    ('Beds', 'beds', (SELECT id FROM categories WHERE slug = 'bedroom'), 1),
    ('Wardrobes', 'wardrobes', (SELECT id FROM categories WHERE slug = 'bedroom'), 2),
    ('Nightstands', 'nightstands', (SELECT id FROM categories WHERE slug = 'bedroom'), 3),
    ('Dressers', 'dressers', (SELECT id FROM categories WHERE slug = 'bedroom'), 4)
ON CONFLICT (slug) DO NOTHING;

-- Seed sample subcategories under Office
INSERT INTO categories (name, slug, parent_id, display_order) VALUES
    ('Desks', 'desks', (SELECT id FROM categories WHERE slug = 'office'), 1),
    ('Office Chairs', 'office-chairs', (SELECT id FROM categories WHERE slug = 'office'), 2),
    ('Bookshelves', 'bookshelves', (SELECT id FROM categories WHERE slug = 'office'), 3)
ON CONFLICT (slug) DO NOTHING;