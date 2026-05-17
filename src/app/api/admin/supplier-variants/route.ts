/**
 * Admin API: Manage supplier variant assignments
 */
import { NextRequest } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  getSupplierVariants,
  assignVariantToSupplier,
  removeVariantAssignment,
  getVariantSuppliers,
  getVariantSuppliersByProductId
} from '@/lib/db/suppliers';
import { ok, created, badRequest, unauthorized, forbidden, notFound, serverError } from '@/lib/api-response';

/**
 * GET /api/admin/supplier-variants
 * Returns variants assigned to a supplier (via ?supplier_id=)
 * or suppliers assigned to a variant (via ?variant_id=)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can view assignments');
    }

    const { searchParams } = new URL(request.url);
    const supplierId = searchParams.get('supplier_id');
    const variantId = searchParams.get('variant_id');
    const productId = searchParams.get('product_id');

    if (supplierId) {
      const assignments = await getSupplierVariants(parseInt(supplierId, 10));
      return ok(assignments);
    }

    if (variantId) {
      const suppliers = await getVariantSuppliers(parseInt(variantId, 10));
      return ok(suppliers);
    }

    if (productId) {
      const map = await getVariantSuppliersByProductId(parseInt(productId, 10));
      return ok(map);
    }

    return badRequest('supplier_id, variant_id, or product_id is required');
  } catch (err: unknown) {
    console.error('Error fetching assignments:', err);
    return serverError('Failed to fetch assignments');
  }
}

/**
 * POST /api/admin/supplier-variants
 * Assign variant to supplier
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can assign variants');
    }

    const body = await request.json();
    const { supplier_id, variant_id, notes } = body;

    if (!supplier_id || !variant_id) {
      return badRequest('supplier_id and variant_id are required');
    }

    const assignment = await assignVariantToSupplier(
      supplier_id,
      variant_id,
      parseInt(session.userId, 10),
      notes
    );

    return created(assignment);
  } catch (err: unknown) {
    console.error('Error assigning variant:', err);
    return serverError('Failed to assign variant');
  }
}

/**
 * DELETE /api/admin/supplier-variants?supplier_id=<id>&variant_id=<id>
 * Remove variant assignment
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can remove assignments');
    }

    const { searchParams } = new URL(request.url);
    const supplierId = searchParams.get('supplier_id');
    const variantId = searchParams.get('variant_id');

    if (!supplierId || !variantId) {
      return badRequest('supplier_id and variant_id are required');
    }

    const removed = await removeVariantAssignment(parseInt(supplierId, 10), parseInt(variantId, 10));
    if (!removed) {
      return notFound('Assignment not found');
    }

    return ok({ message: 'Assignment removed successfully' });
  } catch (err: unknown) {
    console.error('Error removing assignment:', err);
    return serverError('Failed to remove assignment');
  }
}