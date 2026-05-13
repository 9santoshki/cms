/**
 * Admin API: Manage variant option types (thickness, size, color)
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  getVariantOptionTypes,
  getVariantOptionTypeById,
  createVariantOptionType,
  updateVariantOptionType
} from '@/lib/db/variants';
import { ok, created, badRequest, unauthorized, forbidden, notFound, serverError } from '@/lib/api-response';

/**
 * GET /api/admin/variant-option-types
 * Returns all option types
 */
export async function GET() {
  try {
    const optionTypes = await getVariantOptionTypes();
    return ok(optionTypes);
  } catch (err: unknown) {
    console.error('Error fetching option types:', err);
    return serverError('Failed to fetch option types');
  }
}

/**
 * POST /api/admin/variant-option-types
 * Create new option type
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can create option types');
    }

    const body = await request.json();
    const { name, display_name, description, display_order } = body;

    if (!name || !display_name) {
      return badRequest('name and display_name are required');
    }

    const optionType = await createVariantOptionType(
      name,
      display_name,
      description,
      display_order || 0
    );

    return created(optionType);
  } catch (err: unknown) {
    console.error('Error creating option type:', err);
    return serverError('Failed to create option type');
  }
}

/**
 * PUT /api/admin/variant-option-types
 * Update option type
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can update option types');
    }

    const body = await request.json();
    const { id, display_name, description, display_order, is_active } = body;

    if (!id) {
      return badRequest('id is required');
    }

    const existing = await getVariantOptionTypeById(id);
    if (!existing) {
      return notFound('Option type not found');
    }

    const updated = await updateVariantOptionType(id, {
      display_name,
      description,
      display_order,
      is_active
    });

    return ok(updated);
  } catch (err: unknown) {
    console.error('Error updating option type:', err);
    return serverError('Failed to update option type');
  }
}