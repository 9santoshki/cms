/**
 * Admin API: Manage supplier profiles
 * CRUD operations for supplier accounts
 */
import { NextRequest } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
} from '@/lib/db/suppliers';
import { ok, created, badRequest, unauthorized, forbidden, notFound, serverError } from '@/lib/api-response';

/**
 * GET /api/admin/suppliers
 * Returns all suppliers
 */
export async function GET() {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can view suppliers');
    }

    const suppliers = await getSuppliers();
    return ok(suppliers);
  } catch (err: unknown) {
    console.error('Error fetching suppliers:', err);
    return serverError('Failed to fetch suppliers');
  }
}

/**
 * POST /api/admin/suppliers
 * Create new supplier profile for an existing user
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can create suppliers');
    }

    const body = await request.json();
    const { user_id, company_name, phone, address, gst_id, notes } = body;

    if (!user_id || !company_name) {
      return badRequest('user_id and company_name are required');
    }

    const supplier = await createSupplier(
      user_id,
      company_name,
      phone,
      address,
      gst_id,
      notes
    );

    return created(supplier);
  } catch (err: unknown) {
    console.error('Error creating supplier:', err);
    return serverError('Failed to create supplier');
  }
}

/**
 * PUT /api/admin/suppliers
 * Update supplier profile
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can update suppliers');
    }

    const body = await request.json();
    const { id, company_name, contact_person, phone, address, gst_id, is_active, notes } = body;

    if (!id) {
      return badRequest('id is required');
    }

    const existing = await getSupplierById(id);
    if (!existing) {
      return notFound('Supplier not found');
    }

    const updated = await updateSupplier(id, {
      company_name,
      contact_person,
      phone,
      address,
      gst_id,
      is_active,
      notes
    });

    return ok(updated);
  } catch (err: unknown) {
    console.error('Error updating supplier:', err);
    return serverError('Failed to update supplier');
  }
}

/**
 * DELETE /api/admin/suppliers?id=<supplier_id>
 * Delete supplier profile
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can delete suppliers');
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return badRequest('id is required');
    }

    const deleted = await deleteSupplier(parseInt(id, 10));
    if (!deleted) {
      return notFound('Supplier not found');
    }

    return ok({ message: 'Supplier deleted successfully' });
  } catch (err: unknown) {
    console.error('Error deleting supplier:', err);
    return serverError('Failed to delete supplier');
  }
}