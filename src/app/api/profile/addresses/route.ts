import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getUserAddresses, type AddressType } from '@/lib/db/addresses';

/**
 * GET /api/profile/addresses?type=shipping|billing
 * Lists the current user's saved addresses, most recently used first.
 * Omit `type` to get both shipping and billing addresses.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    const typeParam = request.nextUrl.searchParams.get('type');
    const type: AddressType | undefined =
      typeParam === 'shipping' || typeParam === 'billing' ? typeParam : undefined;

    const addresses = await getUserAddresses(session.userId, type);
    return NextResponse.json({ success: true, data: addresses });
  } catch (err: unknown) {
    console.error('[profile/addresses GET] Error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
