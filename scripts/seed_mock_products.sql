-- Seed: Mock products matching CategoryNav structure
-- Covers all categories and subcategories used in the frontend navigation
-- Idempotent: uses ON CONFLICT (slug) DO NOTHING — safe to run multiple times
-- Prices are in INR (paise-free decimals)

INSERT INTO products (name, slug, description, price, sale_price, category, subcategory, stock_quantity, image_url, status) VALUES

-- ─── Living Room ─────────────────────────────────────────────────────────────
('Modern Velvet Sofa',      'modern-velvet-sofa',      'Luxurious 3-seater velvet sofa with brass legs. Perfect for contemporary living spaces.',  45000.00, NULL,     'Living Room', 'Sofas & Sectionals',       12, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published'),
('L-Shaped Sectional',      'l-shaped-sectional',      'Spacious L-shaped sectional sofa with chaise. Ideal for large living rooms.',              85000.00, 75000.00, 'Living Room', 'Sofas & Sectionals',        6, 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800', 'published'),
('Marble Coffee Table',     'marble-coffee-table',     'Round marble top coffee table with gold-finish metal legs. Elegant centrepiece.',          25000.00, NULL,     'Living Room', 'Coffee Tables',            20, 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800', 'published'),
('Wooden TV Unit',          'wooden-tv-unit',           'Solid mango wood TV unit with open shelves and two storage drawers.',                      35000.00, 30000.00, 'Living Room', 'TV & Entertainment Units',  8, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published'),
('Accent Armchair',         'accent-armchair',          'Barrel accent armchair upholstered in premium fabric. Tapered wooden legs.',              28000.00, NULL,     'Living Room', 'Accent Chairs',            15, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', 'published'),
('Leather Ottoman',         'leather-ottoman',          'Genuine leather tufted ottoman with solid wood base. Doubles as extra seating.',          18000.00, NULL,     'Living Room', 'Ottomans & Benches',       25, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published'),
('Round Side Table',        'round-side-table',         'Minimalist round side table in natural oak with hairpin legs.',                           12000.00, NULL,     'Living Room', 'Side Tables',              30, 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=800', 'published'),

-- ─── Dining Room ─────────────────────────────────────────────────────────────
('6-Seater Dining Table',   '6-seater-dining-table',   'Solid sheesham wood dining table for 6. Thick top, sturdy tapered legs.',                55000.00, NULL,     'Dining Room', 'Dining Tables',            10, 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800', 'published'),
('Upholstered Dining Chair','upholstered-dining-chair','Set of 2 fabric-upholstered dining chairs with solid wood frame.',                       15000.00, NULL,     'Dining Room', 'Dining Chairs',            40, 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800', 'published'),
('Modern Buffet Cabinet',   'modern-buffet-cabinet',   'Scandinavian-style sideboard with 3 drawers and 2 cabinet doors.',                       48000.00, 42000.00, 'Dining Room', 'Buffets & Sideboards',      5, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published'),
('Bar Cart Gold',           'bar-cart-gold',            'Gold-finish metal bar cart with two tiers and wine glass holder.',                        22000.00, NULL,     'Dining Room', 'Bar Carts & Stools',       18, 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800', 'published'),

-- ─── Bedroom ─────────────────────────────────────────────────────────────────
('King Size Bed Frame',     'king-size-bed-frame',     'Upholstered king size bed frame with winged headboard. Hydraulic storage.',               65000.00, NULL,     'Bedroom',     'Beds & Headboards',         7, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800', 'published'),
('Queen Bed Headboard',     'queen-bed-headboard',     'Velvet tufted queen headboard with gold nail trim. Fits standard queen frames.',          35000.00, 30000.00, 'Bedroom',     'Beds & Headboards',        12, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800', 'published'),
('6-Drawer Dresser',        '6-drawer-dresser',         'Solid wood 6-drawer dresser with mirror. Ample storage with smooth glide drawers.',      42000.00, NULL,     'Bedroom',     'Dressers & Chests',         9, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published'),
('Modern Nightstand',       'modern-nightstand',        'Floating nightstand with single drawer and open shelf. Walnut finish.',                   12000.00, NULL,     'Bedroom',     'Nightstands',              35, 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=800', 'published'),
('Walk-in Wardrobe',        'walk-in-wardrobe',         'Modular walk-in wardrobe system with hanging rails, drawers, and shelves.',             120000.00, NULL,     'Bedroom',     'Wardrobes & Armoires',      3, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published'),
('Luxury Throw Blanket',    'luxury-throw-blanket',    'Chunky knit merino wool throw blanket in ivory. 150×200 cm.',                             8000.00, 6500.00,  'Bedroom',     'Bedding & Throws',         50, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published'),

-- ─── Home Office ─────────────────────────────────────────────────────────────
('Executive Desk',          'executive-desk',           'Large executive desk with leather inlay and three-drawer pedestal. Dark walnut.',         38000.00, NULL,     'Home Office', 'Desks & Work Tables',      10, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800', 'published'),
('Standing Desk',           'standing-desk',            'Electric height-adjustable standing desk. Memory presets, cable management tray.',        45000.00, 40000.00, 'Home Office', 'Desks & Work Tables',       8, 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800', 'published'),
('Ergonomic Office Chair',  'ergonomic-office-chair',  'Mesh back ergonomic office chair with lumbar support and adjustable armrests.',           25000.00, NULL,     'Home Office', 'Office Chairs',            14, 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800', 'published'),
('Open Bookcase',           'open-bookcase',            '5-shelf open bookcase in solid pine. Adjustable shelves, natural finish.',                28000.00, NULL,     'Home Office', 'Bookcases & Shelves',      20, 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800', 'published'),
('File Storage Cabinet',    'file-storage-cabinet',    'Lockable 3-drawer metal filing cabinet. A4 and legal-size compatible.',                   18000.00, 15000.00, 'Home Office', 'Storage Solutions',        22, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published'),

-- ─── Lighting ────────────────────────────────────────────────────────────────
('Crystal Chandelier',      'crystal-chandelier',      '9-light crystal chandelier with chrome finish. Stunning focal point for any room.',        85000.00, NULL,     'Lighting',    'Chandeliers',               6, 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800', 'published'),
('Modern Pendant Light',    'modern-pendant-light',    'Geometric brass pendant light. Adjustable cord, E27 bulb.',                               25000.00, NULL,     'Lighting',    'Pendant Lights',            16, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800', 'published'),
('Designer Table Lamp',     'designer-table-lamp',     'Ceramic table lamp with linen shade. Warm ambient light, adjustable brightness.',         12000.00, NULL,     'Lighting',    'Table Lamps',              28, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800', 'published'),
('Arc Floor Lamp',          'arc-floor-lamp',           'Arching brass floor lamp with white fabric shade. Perfect reading companion.',            18000.00, NULL,     'Lighting',    'Floor Lamps',              20, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800', 'published'),
('Wall Sconce Set',         'wall-sconce-set',          'Set of 2 brushed nickel wall sconces. Hardwired with E14 bulb sockets.',                 14000.00, 12000.00, 'Lighting',    'Wall Lights & Sconces',    15, 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800', 'published'),

-- ─── Decor ───────────────────────────────────────────────────────────────────
('Abstract Wall Art',       'abstract-wall-art',        'Set of 3 framed abstract canvas prints. Modern geometric designs, gallery-ready.',        22000.00, NULL,     'Decor',       'Wall Art & Prints',         30, 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800', 'published'),
('Gold Frame Mirror',       'gold-frame-mirror',        'Round wall mirror with ornate gold frame. 90 cm diameter.',                              18000.00, NULL,     'Decor',       'Mirrors',                   20, 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=800', 'published'),
('Ceramic Vase Set',        'ceramic-vase-set',         'Set of 3 hand-thrown ceramic vases in earth tones. Varying heights.',                     5000.00, NULL,     'Decor',       'Vases & Planters',          45, 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b8?w=800', 'published'),
('Silk Cushion Set',        'silk-cushion-set',         'Set of 4 pure silk scatter cushions with embroidered detailing. 45×45 cm.',               8000.00, 7000.00, 'Decor',       'Cushions & Throws',         60, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published'),
('Scented Candle Collection','scented-candle-collection','Gift set of 6 luxury soy wax candles. Fragrances: sandalwood, jasmine, oud.',            3000.00, NULL,     'Decor',       'Candles & Diffusers',       80, 'https://images.unsplash.com/photo-1608181831688-8b1275e21648?w=800', 'published'),

-- ─── Outdoor ─────────────────────────────────────────────────────────────────
('Patio Dining Set',        'patio-dining-set',         '6-piece aluminium patio dining set: table + 4 chairs + umbrella. Weather-resistant.',     75000.00, 65000.00, 'Outdoor',     'Patio Furniture',            4, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published'),
('Garden Lounge Chair',     'garden-lounge-chair',      'Teak wood steamer lounge chair with weatherproof cushion. Foldable.',                    18000.00, NULL,     'Outdoor',     'Patio Furniture',           12, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published'),
('Garden Fountain',         'garden-fountain',          'Three-tier cast stone garden fountain with submersible pump.',                            35000.00, NULL,     'Outdoor',     'Garden & Patio Decor',       6, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published'),
('Outdoor Bar Table',       'outdoor-bar-table',        'Weather-resistant rattan bar table with powder-coated steel frame. 2 bar stools included.',15000.00, NULL,    'Outdoor',     'Outdoor Dining Sets',       10, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'published')

ON CONFLICT (slug) DO NOTHING;

-- Log how many rows were seeded
DO $$
DECLARE
  total_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_count FROM products;
  RAISE NOTICE 'Products table now has % rows', total_count;
END $$;
