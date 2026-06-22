-- Fix: deduct stock for Order #16 (variant 18, qty 3) whose automatic
-- deduction failed at checkout due to operator does not exist: text <= integer.
-- Idempotent: skips if inventory_logs already has an entry for this order.

DO $$
DECLARE
  v_variant_id     INT  := 18;
  v_order_id       INT  := 16;
  v_qty            INT  := 3;
  v_previous       INT;
  v_new            INT;
  v_remaining      INT;
  v_deduct         INT;
  rec              RECORD;
BEGIN
  -- Idempotency: skip if already deducted
  IF EXISTS (
    SELECT 1 FROM inventory_logs
    WHERE variant_id = v_variant_id
      AND change_type = 'order'
      AND order_id   = v_order_id
  ) THEN
    RAISE NOTICE 'Stock already deducted for order % — skipping.', v_order_id;
    RETURN;
  END IF;

  -- Lock the variant row
  SELECT stock_quantity INTO v_previous
  FROM product_variants WHERE id = v_variant_id FOR UPDATE;

  IF NOT FOUND THEN
    RAISE NOTICE 'Variant % not found — skipping (non-production env).', v_variant_id;
    RETURN;
  END IF;

  IF v_previous < v_qty THEN
    RAISE NOTICE 'Insufficient stock for variant %: available %, requested % — skipping.',
      v_variant_id, v_previous, v_qty;
    RETURN;
  END IF;

  -- Deduct from supplier buckets (highest-stock first)
  v_remaining := v_qty;
  FOR rec IN
    SELECT id, stock_quantity
    FROM supplier_variants
    WHERE variant_id = v_variant_id AND stock_quantity > 0
    ORDER BY stock_quantity DESC
    FOR UPDATE
  LOOP
    EXIT WHEN v_remaining <= 0;
    v_deduct := LEAST(v_remaining, rec.stock_quantity);
    UPDATE supplier_variants
      SET stock_quantity = stock_quantity - v_deduct
      WHERE id = rec.id;
    v_remaining := v_remaining - v_deduct;
  END LOOP;

  IF v_remaining > 0 THEN
    RAISE NOTICE 'Stock inconsistency for variant %: could not deduct % remaining — skipping.',
      v_variant_id, v_remaining;
    RETURN;
  END IF;

  v_new := v_previous - v_qty;

  -- Update variant total
  UPDATE product_variants
    SET stock_quantity = v_new, updated_at = NOW()
    WHERE id = v_variant_id;

  -- Audit log
  INSERT INTO inventory_logs
    (variant_id, previous_quantity, new_quantity, change_quantity,
     changed_by, change_type, order_id, notes)
  VALUES
    (v_variant_id, v_previous, v_new, -v_qty,
     NULL, 'order', v_order_id,
     'Deducted for Order #' || v_order_id || ' (retroactive fix)');

  RAISE NOTICE 'Stock deducted: variant % qty % → % for order %',
    v_variant_id, v_previous, v_new, v_order_id;
END;
$$;
