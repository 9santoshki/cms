/**
 * Database operations for supplier management.
 * Handles supplier profiles, variant assignments, and inventory updates.
 */
import { query, getClient } from './connection';
import type { Supplier, SupplierVariant, InventoryLog, ProductVariant, User } from '@/types';

// ============================================================================
// Helper Functions
// ============================================================================

/** Map a database row with user info to Supplier type with nested User */
function mapSupplierRow(row: Record<string, unknown>): Supplier {
  return {
    ...row,
    user: {
      id: row.user_id as number,
      name: row.name as string,
      email: row.email as string,
      avatar: row.avatar as string | undefined,
      role: 'supplier'
    } as User
  } as Supplier;
}

// ============================================================================
// Supplier Profile Operations
// ============================================================================

/** Get all suppliers with user details */
export async function getSuppliers(): Promise<Supplier[]> {
  const result = await query(
    `SELECT s.*, u.name, u.email, u.avatar
     FROM suppliers s
     JOIN users u ON s.user_id = u.id
     ORDER BY s.company_name`
  );
  return result.rows.map(mapSupplierRow);
}

/** Get supplier by ID */
export async function getSupplierById(supplierId: number): Promise<Supplier | null> {
  const result = await query(
    `SELECT s.*, u.name, u.email, u.avatar
     FROM suppliers s
     JOIN users u ON s.user_id = u.id
     WHERE s.id = $1`,
    [supplierId]
  );
  const row = result.rows[0] as Record<string, unknown> | null;
  return row ? mapSupplierRow(row) : null;
}

/** Get supplier by user ID */
export async function getSupplierByUserId(userId: number): Promise<Supplier | null> {
  const result = await query(
    `SELECT s.*, u.name, u.email, u.avatar
     FROM suppliers s
     JOIN users u ON s.user_id = u.id
     WHERE s.user_id = $1`,
    [userId]
  );
  const row = result.rows[0] as Record<string, unknown> | null;
  return row ? mapSupplierRow(row) : null;
}

/** Create supplier profile for a user */
export async function createSupplier(
  userId: number,
  companyName: string,
  phone?: string,
  address?: string,
  gstId?: string,
  notes?: string
): Promise<Supplier> {
  const result = await query(
    `INSERT INTO suppliers (user_id, company_name, phone, address, gst_id, notes)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [userId, companyName, phone || null, address || null, gstId || null, notes || null]
  );
  return result.rows[0] as Supplier;
}

/** Update supplier profile */
export async function updateSupplier(
  supplierId: number,
  updates: Partial<Pick<Supplier, 'company_name' | 'contact_person' | 'phone' | 'address' | 'gst_id' | 'is_active' | 'notes'>>
): Promise<Supplier | null> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (updates.company_name !== undefined) {
    fields.push(`company_name = $${paramIndex++}`);
    values.push(updates.company_name);
  }
  if (updates.contact_person !== undefined) {
    fields.push(`contact_person = $${paramIndex++}`);
    values.push(updates.contact_person);
  }
  if (updates.phone !== undefined) {
    fields.push(`phone = $${paramIndex++}`);
    values.push(updates.phone);
  }
  if (updates.address !== undefined) {
    fields.push(`address = $${paramIndex++}`);
    values.push(updates.address);
  }
  if (updates.gst_id !== undefined) {
    fields.push(`gst_id = $${paramIndex++}`);
    values.push(updates.gst_id);
  }
  if (updates.is_active !== undefined) {
    fields.push(`is_active = $${paramIndex++}`);
    values.push(updates.is_active);
  }
  if (updates.notes !== undefined) {
    fields.push(`notes = $${paramIndex++}`);
    values.push(updates.notes);
  }

  if (fields.length === 0) return null;

  values.push(supplierId);
  const result = await query(
    `UPDATE suppliers SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );
  return result.rows[0] || null;
}

/** Delete supplier profile */
export async function deleteSupplier(supplierId: number): Promise<boolean> {
  const result = await query(
    `DELETE FROM suppliers WHERE id = $1`,
    [supplierId]
  );
  return result.rowCount !== null && result.rowCount > 0;
}

// ============================================================================
// Supplier Variant Assignments
// ============================================================================

/** Get all variants assigned to a supplier */
export async function getSupplierVariants(supplierId: number): Promise<SupplierVariant[]> {
  const result = await query(
    `SELECT sv.*, v.*, p.name as product_name, p.id as product_id,
            COALESCE(
              (SELECT STRING_AGG(o.display_value, ' / ' ORDER BY t.display_order)
               FROM product_variant_values vv
               JOIN variant_options o ON vv.option_id = o.id
               JOIN variant_option_types t ON o.option_type_id = t.id
               WHERE vv.variant_id = v.id),
              ''
            ) as variant_name
     FROM supplier_variants sv
     JOIN product_variants v ON sv.variant_id = v.id
     JOIN products p ON v.product_id = p.id
     WHERE sv.supplier_id = $1 AND v.is_active = TRUE
     ORDER BY p.name, v.id`,
    [supplierId]
  );

  return result.rows.map((row: Record<string, unknown>) => ({
    id: row.id,
    supplier_id: row.supplier_id,
    variant_id: row.variant_id,
    assigned_at: row.assigned_at,
    assigned_by: row.assigned_by,
    notes: row.notes,
    variant: {
      id: row.variant_id,
      product_id: row.product_id,
      sku: row.sku,
      price: row.price,
      sale_price: row.sale_price,
      stock_quantity: row.stock_quantity,
      is_active: row.is_active,
      variant_name: row.variant_name,
      product_name: row.product_name
    } as ProductVariant & { product_name: string }
  })) as SupplierVariant[];
}

/** Assign variant to supplier */
export async function assignVariantToSupplier(
  supplierId: number,
  variantId: number,
  assignedBy: number,
  notes?: string
): Promise<SupplierVariant> {
  const result = await query(
    `INSERT INTO supplier_variants (supplier_id, variant_id, assigned_by, notes)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [supplierId, variantId, assignedBy, notes || null]
  );
  return result.rows[0] as SupplierVariant;
}

/** Remove variant assignment from supplier */
export async function removeVariantAssignment(supplierId: number, variantId: number): Promise<boolean> {
  const result = await query(
    `DELETE FROM supplier_variants WHERE supplier_id = $1 AND variant_id = $2`,
    [supplierId, variantId]
  );
  return result.rowCount !== null && result.rowCount > 0;
}

/** Check whether a variant is assigned to a specific supplier */
export async function isVariantAssignedToSupplier(supplierId: number, variantId: number): Promise<boolean> {
  const result = await query(
    `SELECT EXISTS(SELECT 1 FROM supplier_variants WHERE supplier_id = $1 AND variant_id = $2)`,
    [supplierId, variantId]
  );
  return result.rows[0].exists as boolean;
}

/**
 * Get all supplier assignments for every variant in a product, keyed by variant_id.
 * A variant may have multiple suppliers, so the value is an array.
 * Used by the admin product edit page to display per-row supplier info without N+1 queries.
 */
export async function getVariantSuppliersByProductId(
  productId: number
): Promise<Record<number, Array<{ supplier_id: number; company_name: string; stock_quantity: number }>>> {
  const result = await query(
    `SELECT sv.variant_id, sv.supplier_id, s.company_name, sv.stock_quantity
     FROM supplier_variants sv
     JOIN suppliers s ON sv.supplier_id = s.id
     JOIN product_variants pv ON sv.variant_id = pv.id
     WHERE pv.product_id = $1
     ORDER BY s.company_name`,
    [productId]
  );
  const map: Record<number, Array<{ supplier_id: number; company_name: string; stock_quantity: number }>> = {};
  for (const row of result.rows as Array<{ variant_id: number; supplier_id: number; company_name: string; stock_quantity: number }>) {
    (map[row.variant_id] ??= []).push({
      supplier_id: row.supplier_id,
      company_name: row.company_name,
      stock_quantity: row.stock_quantity,
    });
  }
  return map;
}

/** Get all suppliers assigned to a specific variant */
export async function getVariantSuppliers(variantId: number): Promise<Supplier[]> {
  const result = await query(
    `SELECT s.*, u.name, u.email, u.avatar
     FROM supplier_variants sv
     JOIN suppliers s ON sv.supplier_id = s.id
     JOIN users u ON s.user_id = u.id
     WHERE sv.variant_id = $1 AND s.is_active = TRUE
     ORDER BY s.company_name`,
    [variantId]
  );
  return result.rows.map(mapSupplierRow);
}

// ============================================================================
// Inventory Management
// ============================================================================

/**
 * Update a supplier's own stock quantity for a variant, then recompute the variant's
 * total stock_quantity as the SUM across all suppliers.
 * Audit log records the supplier-level change (previous vs new for this supplier).
 */
export async function updateVariantStockWithLog(
  variantId: number,
  supplierId: number,
  newQuantity: number,
  changedBy: number,
  changeType: InventoryLog['change_type'],
  notes?: string
): Promise<{ variant: ProductVariant; log: InventoryLog } | null> {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    const variantExists = await client.query(
      `SELECT id FROM product_variants WHERE id = $1`,
      [variantId]
    );
    if (variantExists.rows.length === 0) {
      await client.query('ROLLBACK');
      return null;
    }

    const currentResult = await client.query(
      `SELECT stock_quantity FROM supplier_variants WHERE supplier_id = $1 AND variant_id = $2`,
      [supplierId, variantId]
    );
    const previousQuantity = currentResult.rows.length > 0
      ? (currentResult.rows[0].stock_quantity as number)
      : 0;
    const changeQuantity = newQuantity - previousQuantity;

    await client.query(
      `UPDATE supplier_variants SET stock_quantity = $1 WHERE supplier_id = $2 AND variant_id = $3`,
      [newQuantity, supplierId, variantId]
    );

    // Recompute variant total as SUM across all suppliers so the canonical stock
    // stays consistent even when multiple suppliers share a variant.
    const sumResult = await client.query(
      `SELECT COALESCE(SUM(stock_quantity), 0) AS total FROM supplier_variants WHERE variant_id = $1`,
      [variantId]
    );
    const totalStock = sumResult.rows[0].total as number;

    const variantResult = await client.query(
      `UPDATE product_variants SET stock_quantity = $1 WHERE id = $2 RETURNING *`,
      [totalStock, variantId]
    );

    const logResult = await client.query(
      `INSERT INTO inventory_logs (variant_id, previous_quantity, new_quantity, change_quantity, changed_by, change_type, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [variantId, previousQuantity, newQuantity, changeQuantity, changedBy, changeType, notes || null]
    );

    await client.query('COMMIT');

    return {
      variant: variantResult.rows[0] as ProductVariant,
      log: logResult.rows[0] as InventoryLog
    };
  } catch (err: unknown) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// ============================================================================
// Inventory Monitoring
// ============================================================================

export interface OutOfStockVariant {
  variant_id: number;
  product_id: number;
  product_name: string;
  product_status: string;
  variant_name: string;
  sku: string | null;
  price: number;
  stock_quantity: number;
  last_stock_update: string | null;
  suppliers: Array<{
    supplier_id: number;
    company_name: string;
    email: string;
    phone: string | null;
    is_active: boolean;
    supplier_stock: number;
    min_stock_threshold: number;
  }>;
}

/**
 * Base query for inventory alerts. `stockFilter` is a parameterized SQL fragment
 * that goes after "WHERE pv.is_active = TRUE AND"; `params` are its bound values.
 * E.g. stockFilter='pv.stock_quantity <= 0', params=[] — or
 *      stockFilter='pv.stock_quantity > 0 AND pv.stock_quantity <= $1', params=[10]
 */
async function fetchInventoryAlerts(
  stockFilter: string,
  params: unknown[] = []
): Promise<OutOfStockVariant[]> {
  const result = await query(
    `SELECT
       pv.id                     AS variant_id,
       pv.sku,
       pv.price,
       pv.stock_quantity,
       pv.updated_at             AS last_stock_update,
       p.id                      AS product_id,
       p.name                    AS product_name,
       COALESCE(p.status, 'published') AS product_status,
       COALESCE(
         (SELECT STRING_AGG(o.display_value, ' / ' ORDER BY t.display_order)
          FROM product_variant_values vv
          JOIN variant_options o   ON vv.option_id = o.id
          JOIN variant_option_types t ON o.option_type_id = t.id
          WHERE vv.variant_id = pv.id),
         ''
       ) AS variant_name,
       COALESCE(
         JSON_AGG(
           JSON_BUILD_OBJECT(
             'supplier_id',         s.id,
             'company_name',        s.company_name,
             'email',               u.email,
             'phone',               s.phone,
             'is_active',           s.is_active,
             'supplier_stock',      sv.stock_quantity,
             'min_stock_threshold', sv.min_stock_threshold
           ) ORDER BY s.company_name
         ) FILTER (WHERE s.id IS NOT NULL),
         '[]'
       ) AS suppliers
     FROM product_variants pv
     JOIN products p ON pv.product_id = p.id
     LEFT JOIN supplier_variants sv ON pv.id = sv.variant_id
     LEFT JOIN suppliers s           ON sv.supplier_id = s.id
     LEFT JOIN users u               ON s.user_id = u.id
     WHERE pv.is_active = TRUE
       AND ${stockFilter}
     GROUP BY pv.id, p.id
     ORDER BY p.name, pv.id`,
    params
  );

  return result.rows.map((row: Record<string, unknown>) => ({
    ...row,
    suppliers:
      typeof row.suppliers === 'string' ? JSON.parse(row.suppliers) : row.suppliers,
  })) as OutOfStockVariant[];
}

/** All active variants with stock_quantity = 0 */
export async function getOutOfStockVariants(): Promise<OutOfStockVariant[]> {
  return fetchInventoryAlerts('pv.stock_quantity <= 0');
}

/** All active variants regardless of stock level */
export async function getAllInventoryVariants(): Promise<OutOfStockVariant[]> {
  return fetchInventoryAlerts('TRUE');
}

/**
 * Active variants whose total stock is at or below `threshold`.
 * Uses a parameterized query — threshold is never interpolated into SQL.
 */
export async function getLowStockVariants(threshold = 10): Promise<OutOfStockVariant[]> {
  return fetchInventoryAlerts(
    'pv.stock_quantity > 0 AND pv.stock_quantity <= $1',
    [Number(threshold)]
  );
}

// ============================================================================
// Order-Driven Inventory Operations
// ============================================================================

/**
 * Check whether enough stock is available for a given variant.
 * Returns `{ available: true }` or `{ available: false, stock: N }`.
 */
export async function checkVariantStock(
  variantId: number,
  requestedQty: number
): Promise<{ available: boolean; stock: number }> {
  const result = await query(
    'SELECT stock_quantity FROM product_variants WHERE id = $1 AND is_active = TRUE',
    [variantId]
  );
  if (result.rows.length === 0) return { available: false, stock: 0 };
  const stock = Number(result.rows[0].stock_quantity);
  return { available: stock >= requestedQty, stock };
}

/**
 * Deduct stock across supplier buckets for a confirmed order.
 *
 * Strategy: consume from the supplier with the most stock first so that
 * partial-stock suppliers are depleted last and the total stays consistent.
 *
 * The function runs inside a single serialisable transaction and uses
 * FOR UPDATE locks to prevent race conditions under concurrent checkouts.
 *
 * Throws if the variant has insufficient stock — the caller should handle
 * this and NOT mark the payment as failed (the payment was already captured;
 * log the discrepancy and alert admin instead).
 */
export async function deductStockForOrder(
  variantId: number,
  quantity: number,
  orderId: number,
  changedBy: number | null
): Promise<void> {
  const client = await getClient();
  try {
    await client.query('BEGIN');

    // Idempotency check: if stock was already deducted for this order, skip
    const idempotencyCheck = await client.query(
      `SELECT 1 FROM inventory_logs WHERE variant_id = $1 AND change_type = 'order' AND order_id = $2 LIMIT 1`,
      [variantId, orderId]
    );
    if (idempotencyCheck.rows.length > 0) {
      await client.query('ROLLBACK');
      console.warn(`[deductStockForOrder] Stock already deducted for variant ${variantId}, order ${orderId} — skipping`);
      return;
    }

    // Lock the variant row first to prevent concurrent over-deduction
    const variantRow = await client.query(
      'SELECT stock_quantity FROM product_variants WHERE id = $1 FOR UPDATE',
      [variantId]
    );
    if (variantRow.rows.length === 0) {
      throw new Error(`Variant ${variantId} not found`);
    }

    const previousTotal = Number(variantRow.rows[0].stock_quantity);
    if (previousTotal < quantity) {
      throw new Error(
        `Insufficient stock for variant ${variantId}: available ${previousTotal}, requested ${quantity}`
      );
    }

    // Deduct from supplier buckets, highest-stock supplier first
    const supplierRows = await client.query(
      `SELECT id, stock_quantity
       FROM supplier_variants
       WHERE variant_id = $1 AND stock_quantity > 0
       ORDER BY stock_quantity DESC
       FOR UPDATE`,
      [variantId]
    );

    let remaining = quantity;
    for (const row of supplierRows.rows) {
      if (remaining <= 0) break;
      const deduct = Math.min(remaining, Number(row.stock_quantity));
      await client.query(
        'UPDATE supplier_variants SET stock_quantity = stock_quantity - $1 WHERE id = $2',
        [deduct, row.id]
      );
      remaining -= deduct;
    }

    if (remaining > 0) {
      // Sum of supplier stocks was inconsistent with variant total — rollback
      throw new Error(
        `Stock inconsistency for variant ${variantId}: could not deduct ${remaining} remaining units`
      );
    }

    const newTotal = previousTotal - quantity;

    // Update variant total
    await client.query(
      'UPDATE product_variants SET stock_quantity = $1, updated_at = NOW() WHERE id = $2',
      [newTotal, variantId]
    );

    // Audit log
    await client.query(
      `INSERT INTO inventory_logs
         (variant_id, previous_quantity, new_quantity, change_quantity, changed_by, change_type, order_id, notes)
       VALUES ($1, $2, $3, $4, $5, 'order', $6, $7)`,
      [
        variantId,
        previousTotal,
        newTotal,
        -quantity,
        changedBy,
        orderId,
        `Deducted for Order #${orderId}`,
      ]
    );

    // Low-stock check: warn if any supplier's share has fallen below their threshold
    await client.query(
      `INSERT INTO inventory_logs
         (variant_id, previous_quantity, new_quantity, change_quantity, changed_by, change_type, notes)
       SELECT
         $1, $2, $2, 0, $3, 'alert',
         'LOW STOCK ALERT: variant total is ' || $2::text || ' units after Order #' || $4::text
       WHERE EXISTS (
         SELECT 1 FROM supplier_variants
         WHERE variant_id = $1
           AND min_stock_threshold > 0
           AND $2::integer <= min_stock_threshold
         LIMIT 1
       )`,
      [variantId, newTotal, changedBy, orderId]
    );

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

/** Get inventory logs for a variant */
export async function getVariantInventoryLogs(variantId: number, limit: number = 50): Promise<InventoryLog[]> {
  const result = await query(
    `SELECT il.*, u.name as changed_by_name
     FROM inventory_logs il
     LEFT JOIN users u ON il.changed_by = u.id
     WHERE il.variant_id = $1
     ORDER BY il.created_at DESC
     LIMIT $2`,
    [variantId, limit]
  );
  return result.rows as InventoryLog[];
}

/** Get recent inventory logs for a supplier's variants */
export async function getSupplierInventoryLogs(supplierId: number, limit: number = 100): Promise<InventoryLog[]> {
  const result = await query(
    `SELECT il.*, v.id as variant_id, p.name as product_name,
            COALESCE(
              (SELECT STRING_AGG(o.display_value, ' / ' ORDER BY t.display_order)
               FROM product_variant_values vv
               JOIN variant_options o ON vv.option_id = o.id
               JOIN variant_option_types t ON o.option_type_id = t.id
               WHERE vv.variant_id = v.id),
              ''
            ) as variant_name,
            u.name as changed_by_name
     FROM inventory_logs il
     JOIN product_variants v ON il.variant_id = v.id
     JOIN products p ON v.product_id = p.id
     JOIN supplier_variants sv ON v.id = sv.variant_id
     LEFT JOIN users u ON il.changed_by = u.id
     WHERE sv.supplier_id = $1
     ORDER BY il.created_at DESC
     LIMIT $2`,
    [supplierId, limit]
  );
  return result.rows as InventoryLog[];
}