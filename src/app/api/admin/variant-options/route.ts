/**
 * Admin API: Manage variant options (thin, standard, thick for thickness)
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  getAllVariantOptionsAdmin,
  getVariantOptionById,
  getVariantOptionsByType,
  createVariantOption,
  updateVariantOption,
  deleteVariantOption
} from '@/lib/db/variants';
import { ok, created, badRequest, unauthorized, forbidden, notFound, serverError } from '@/lib/api-response';

/**
 * GET /api/admin/variant-options
 * Returns all options, or options for a specific type via ?type_id= query param
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const typeId = searchParams.get('type_id');

    if (typeId) {
      const options = await getVariantOptionsByType(parseInt(typeId, 10));
      return ok(options);
    }

    const options = await getAllVariantOptionsAdmin();
    return ok(options);
  } catch (err: unknown) {
    console.error('Error fetching options:', err);
    return serverError('Failed to fetch options');
  }
}

/**
 * POST /api/admin/variant-options
 * Create new option
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can create options');
    }

    const body = await request.json();
    const { option_type_id, value, display_value, price_modifier, display_order } = body;

    if (!option_type_id || !value || !display_value) {
      return badRequest('option_type_id, value, and display_value are required');
    }

    const option = await createVariantOption(
      option_type_id,
      value,
      display_value,
      price_modifier || 0,
      display_order || 0
    );

    return created(option);
  } catch (err: unknown) {
    console.error('Error creating option:', err);
    return serverError('Failed to create option');
  }
}

/**
 * PUT /api/admin/variant-options
 * Update option
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can update options');
    }

    const body = await request.json();
    const { id, display_value, price_modifier, display_order, is_active } = body;

    if (!id) {
      return badRequest('id is required');
    }

    const existing = await getVariantOptionById(id);
    if (!existing) {
      return notFound('Option not found');
    }

    const updated = await updateVariantOption(id, {
      display_value,
      price_modifier,
      display_order,
      is_active
    });

    return ok(updated);
  } catch (err: unknown) {
    console.error('Error updating option:', err);
    return serverError('Failed to update option');
  }
}

/**
 * DELETE /api/admin/variant-options
 * Delete option
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can delete options');
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return badRequest('id is required');
    }

    const deleted = await deleteVariantOption(parseInt(id, 10));
    if (!deleted) {
      return notFound('Option not found');
    }

    return ok({ message: 'Option deleted successfully' });
  } catch (err: unknown) {
    console.error('Error deleting option:', err);
    return serverError('Failed to delete option');
  }
}