/**
 * Supplier API: View assigned variants and manage inventory
 * Suppliers access these endpoints after Google login
 */
import { NextRequest } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  getSupplierByUserId,
  getSupplierVariants,
  isVariantAssignedToSupplier,
  updateVariantStockWithLog,
  getSupplierInventoryLogs
} from '@/lib/db/suppliers';
import { ok, badRequest, unauthorized, forbidden, notFound, serverError } from '@/lib/api-response';

/**
 * GET /api/supplier/variants
 * Returns all variants assigned to the logged-in supplier
 */
export async function GET() {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }

    // Verify user is a supplier
    if (session.role !== 'supplier') {
      return forbidden('Only suppliers can access this endpoint');
    }

    // Get supplier profile
    const supplier = await getSupplierByUserId(parseInt(session.userId, 10));
    if (!supplier) {
      return notFound('Supplier profile not found');
    }

    if (!supplier.is_active) {
      return forbidden('Supplier account is inactive');
    }

    // Get assigned variants
    const variants = await getSupplierVariants(supplier.id);

    return ok({
      supplier,
      variants
    });
  } catch (err: unknown) {
    console.error('Error fetching supplier variants:', err);
    return serverError('Failed to fetch variants');
  }
}

/**
 * PUT /api/supplier/variants
 * Update inventory for an assigned variant
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }

    // Verify user is a supplier
    if (session.role !== 'supplier') {
      return forbidden('Only suppliers can update inventory');
    }

    // Get supplier profile
    const supplier = await getSupplierByUserId(parseInt(session.userId, 10));
    if (!supplier) {
      return notFound('Supplier profile not found');
    }

    if (!supplier.is_active) {
      return forbidden('Supplier account is inactive');
    }

    const body = await request.json();
    const { variant_id, new_quantity, notes } = body;

    if (!variant_id || new_quantity === undefined) {
      return badRequest('variant_id and new_quantity are required');
    }

    if (typeof new_quantity !== 'number' || new_quantity < 0 || !Number.isInteger(new_quantity)) {
      return badRequest('new_quantity must be a positive integer or zero');
    }

    // Verify this supplier is actually assigned to the variant they want to update
    const assigned = await isVariantAssignedToSupplier(supplier.id, variant_id);
    if (!assigned) {
      return forbidden('You are not authorized to update inventory for this variant');
    }

    // Update this supplier's stock; total on variant = SUM across all assigned suppliers
    const result = await updateVariantStockWithLog(
      variant_id,
      supplier.id,
      new_quantity,
      parseInt(session.userId, 10),
      'supplier_update',
      notes
    );

    if (!result) {
      return notFound('Variant not found or not assigned to this supplier');
    }

    return ok({
      variant: result.variant,
      log: result.log,
      message: 'Inventory updated successfully'
    });
  } catch (err: unknown) {
    console.error('Error updating inventory:', err);
    return serverError('Failed to update inventory');
  }
}