-- Migration: Hide migration-seeded furniture categories from nav by default
-- The add_categories_columns migration defaulted show_in_menu = TRUE for all
-- rows, including categories seeded by add_categories_table (Living Room,
-- Dining Room, Bedroom, Office and their subcategories with IDs 94–111).
-- These weren't admin-configured, so hide them from the nav.
-- Admin can re-enable any of them via the dashboard.

UPDATE categories
SET show_in_menu = FALSE
WHERE id IN (
  SELECT id FROM categories
  WHERE slug IN (
    'living-room', 'dining-room', 'bedroom', 'office',
    'sofas', 'coffee-tables', 'tv-units', 'accent-chairs',
    'dining-tables', 'dining-chairs', 'bar-stools',
    'beds', 'wardrobes', 'nightstands', 'dressers',
    'desks', 'office-chairs', 'bookshelves'
  )
);
