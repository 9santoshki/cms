import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { updateUserAddress, deleteUserAddress } from '@/lib/db/addresses';

/**
 * PUT /api/profile/addresses/[id]
 * Edit a saved address. Ownership-checked — never affects past orders,
 * which store their own independent address snapshot from checkout.
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const { name, phone, address, city, state, zipCode, country } = body;

    if (address !== undefined && !String(address).trim()) {
      return NextResponse.json({ success: false, error: 'Address cannot be empty' }, { status: 400 });
    }

    const updated = await updateUserAddress(session.userId, id, { name, phone, address, city, state, zipCode, country });
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Address not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: unknown) {
    console.error('[profile/addresses PUT] Error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/profile/addresses/[id]
 * Remove a saved address. Ownership-checked. Never affects past orders.
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    const { id } = await context.params;
    const deleted = await deleteUserAddress(session.userId, id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Address not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Address deleted' });
  } catch (err: unknown) {
    console.error('[profile/addresses DELETE] Error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
