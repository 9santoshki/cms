-- Product Pricing Migration: Drop original_price column
-- Date: 2026-02-21
-- Purpose: Simplify pricing from 3 fields (price, original_price, sale_price) to 2 fields (price, sale_price)

BEGIN;

-- 1. Create backup table
CREATE TABLE products_backup_20260221 AS SELECT * FROM products;

-- 2. Verify backup
DO $$
DECLARE
  backup_count INTEGER;
  products_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO backup_count FROM products_backup_20260221;
  SELECT COUNT(*) INTO products_count FROM products;

  IF backup_count != products_count THEN
    RAISE EXCEPTION 'Backup verification failed: backup has % rows, products has % rows', backup_count, products_count;
  END IF;

  RAISE NOTICE 'Backup verified: % rows', backup_count;
END $$;

-- 3. Drop original_price column
ALTER TABLE products DROP COLUMN IF EXISTS original_price;

-- 4. Verify column dropped
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'original_price'
  ) THEN
    RAISE EXCEPTION 'Failed to drop original_price column';
  END IF;

  RAISE NOTICE 'Column original_price successfully dropped';
END $$;

COMMIT;

-- 5. Summary
SELECT
  'Migration Complete' as status,
  COUNT(*) as total_products,
  COUNT(CASE WHEN sale_price IS NOT NULL THEN 1 END) as products_on_sale
FROM products;

-- To verify the schema:
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'products' ORDER BY ordinal_position;

-- Rollback Plan (if needed):
-- BEGIN;
-- ALTER TABLE products ADD COLUMN original_price DECIMAL(10, 2);
-- UPDATE products p SET original_price = b.original_price FROM products_backup_20260221 b WHERE p.id = b.id;
-- COMMIT;

-- After verifying migration is successful, drop backup table after 30 days:
-- DROP TABLE products_backup_20260221;
