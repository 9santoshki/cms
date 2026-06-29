-- Migration: Add HSN-GST rate mapping table
-- Maps HSN (Harmonized System of Nomenclature) codes to Indian GST rates.
-- Used for invoicing and product variant tax classification.

CREATE TABLE IF NOT EXISTS hsn_gst_rates (
  id           SERIAL PRIMARY KEY,
  hsn_code     VARCHAR(20)    NOT NULL,
  description  VARCHAR(500),
  gst_rate     DECIMAL(5, 2)  NOT NULL,
  is_active    BOOLEAN        NOT NULL DEFAULT true,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Unique constraint: one GST rate entry per HSN code
CREATE UNIQUE INDEX IF NOT EXISTS idx_hsn_gst_rates_hsn_code
  ON hsn_gst_rates (hsn_code);

-- Index for filtering by rate (common admin query)
CREATE INDEX IF NOT EXISTS idx_hsn_gst_rates_gst_rate
  ON hsn_gst_rates (gst_rate);

COMMENT ON TABLE hsn_gst_rates IS 'Maps HSN codes to Indian GST rates for invoicing';
COMMENT ON COLUMN hsn_gst_rates.hsn_code IS 'Harmonized System of Nomenclature code (4-8 digits)';
COMMENT ON COLUMN hsn_gst_rates.gst_rate IS 'GST rate percentage e.g. 18.00 for 18%';
