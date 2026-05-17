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

    // Verify variant exists
    const variantExists = await client.query(
      `SELECT id FROM product_variants WHERE id = $1`,
      [variantId]
    );
    if (variantExists.rows.length === 0) {
      await client.query('ROLLBACK');
      return null;
    }

    // Get this supplier's current quantity for the variant
    const currentResult = await client.query(
      `SELECT stock_quantity FROM supplier_variants WHERE supplier_id = $1 AND variant_id = $2`,
      [supplierId, variantId]
    );
    const previousQuantity = currentResult.rows.length > 0
      ? (currentResult.rows[0].stock_quantity as number)
      : 0;
    const changeQuantity = newQuantity - previousQuantity;

    // Update this supplier's quantity on the assignment row
    await client.query(
      `UPDATE supplier_variants SET stock_quantity = $1 WHERE supplier_id = $2 AND variant_id = $3`,
      [newQuantity, supplierId, variantId]
    );

    // Recompute variant total = SUM of all supplier quantities for this variant
    const sumResult = await client.query(
      `SELECT COALESCE(SUM(stock_quantity), 0) AS total FROM supplier_variants WHERE variant_id = $1`,
      [variantId]
    );
    const totalStock = sumResult.rows[0].total as number;

    const variantResult = await client.query(
      `UPDATE product_variants SET stock_quantity = $1 WHERE id = $2 RETURNING *`,
      [totalStock, variantId]
    );

    // Create audit log entry (tracks the supplier-level change)
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