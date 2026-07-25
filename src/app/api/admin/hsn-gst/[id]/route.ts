import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { updateHsnGstRate, deleteHsnGstRate, validateHsnGstInput } from '@/lib/db/hsnGst';
import { ok, badRequest, unauthorized, notFound, serverError } from '@/lib/api-response';

// PUT /api/admin/hsn-gst/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session || session.role !== 'admin') return unauthorized();

    const { id } = await params;
    const numId = parseInt(id);
    if (isNaN(numId)) return badRequest('Invalid ID');

    const body = await req.json();
    const err = validateHsnGstInput(body);
    if (err) return badRequest(err);

    const { hsn_code, gst_rate, description, is_active } = body;
    const updates: Record<string, unknown> = {};
    if (hsn_code !== undefined)  updates.hsn_code = String(hsn_code).trim();
    if (gst_rate !== undefined)  updates.gst_rate = parseFloat(gst_rate);
    if (description !== undefined) updates.description = description;
    if (is_active !== undefined) updates.is_active = Boolean(is_active);

    const updated = await updateHsnGstRate(numId, updates);
    if (!updated) return notFound('HSN code not found');
    return ok(updated);
  } catch (err: any) {
    if (err?.code === '23505') return NextResponse.json({ success: false, error: 'HSN code already exists' }, { status: 409 });
    console.error('PUT /api/admin/hsn-gst/[id] error:', err);
    return serverError('Failed to update HSN-GST rate');
  }
}

// DELETE /api/admin/hsn-gst/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session || session.role !== 'admin') return unauthorized();

    const { id } = await params;
    const numId = parseInt(id);
    if (isNaN(numId)) return badRequest('Invalid ID');

    const deleted = await deleteHsnGstRate(numId);
    if (!deleted) return notFound('HSN code not found');
    return ok(null, 'Deleted');
  } catch (err) {
    console.error('DELETE /api/admin/hsn-gst/[id] error:', err);
    return serverError('Failed to delete HSN-GST rate');
  }
}
