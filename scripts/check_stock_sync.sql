-- Diagnostic query to check stock sync between product_variants and supplier_variants
-- Run this to identify discrepancies

-- 1. Variants where product_variants.stock_quantity doesn't match SUM of supplier_variants
SELECT 
    pv.id as variant_id,
    pv.product_id,
    p.name as product_name,
    pv.stock_quantity as variant_stock,
    COALESCE(SUM(sv.stock_quantity), 0) as supplier_total,
    pv.stock_quantity - COALESCE(SUM(sv.stock_quantity), 0) as discrepancy,
    pv.is_active,
    COUNT(sv.id) as supplier_count
FROM product_variants pv
JOIN products p ON pv.product_id = p.id
LEFT JOIN supplier_variants sv ON pv.id = sv.variant_id
GROUP BY pv.id, pv.product_id, p.name, pv.stock_quantity, pv.is_active
HAVING pv.stock_quantity != COALESCE(SUM(sv.stock_quantity), 0)
ORDER BY ABS(discrepancy) DESC;

-- 2. Active variants with zero stock (should appear in inventory dashboard)
SELECT 
    pv.id as variant_id,
    pv.product_id,
    p.name as product_name,
    pv.stock_quantity,
    pv.is_active,
    pv.sku,
    COUNT(sv.id) as supplier_count
FROM product_variants pv
JOIN products p ON pv.product_id = p.id
LEFT JOIN supplier_variants sv ON pv.id = sv.variant_id
WHERE pv.is_active = TRUE AND pv.stock_quantity <= 0
GROUP BY pv.id, pv.product_id, p.name, pv.stock_quantity, pv.is_active, pv.sku
ORDER BY p.name, pv.id;

-- 3. Variants with no supplier assigned
SELECT 
    pv.id as variant_id,
    pv.product_id,
    p.name as product_name,
    pv.stock_quantity,
    pv.sku
FROM product_variants pv
JOIN products p ON pv.product_id = p.id
WHERE pv.is_active = TRUE 
  AND NOT EXISTS (SELECT 1 FROM supplier_variants sv WHERE sv.variant_id = pv.id)
ORDER BY p.name;
