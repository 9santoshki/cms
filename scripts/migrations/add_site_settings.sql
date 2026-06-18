-- Create site_settings table (single-row config)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  shipping_enabled BOOLEAN NOT NULL DEFAULT true,
  shipping_flat_rate DECIMAL(10, 2) NOT NULL DEFAULT 1500.00,
  shipping_min_order_amount DECIMAL(10, 2) NOT NULL DEFAULT 50000.00,
  tax_enabled BOOLEAN NOT NULL DEFAULT false,
  tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  tax_type VARCHAR(20) NOT NULL DEFAULT 'percentage',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed with one row if not present
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
