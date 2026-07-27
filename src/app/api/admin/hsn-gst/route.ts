import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { listHsnGstRates, createHsnGstRate, validateHsnGstInput } from '@/lib/db/hsnGst';
import { ok, created, badRequest, unauthorized, serverError } from '@/lib/api-response';

// GET /api/admin/hsn-gst?search=&rate=&active_only=
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session || session.role !== 'admin') return unauthorized();

    const { searchParams } = req.nextUrl;
    const search = searchParams.get('search') || undefined;
    const rateParam = searchParams.get('rate');
    const gst_rate = rateParam !== null ? parseFloat(rateParam) : undefined;
    const active_only = searchParams.get('active_only') === 'true';

    const data = await listHsnGstRates({ search, gst_rate, active_only });
    return ok(data);
  } catch (err) {
    console.error('GET /api/admin/hsn-gst error:', err);
    return serverError('Failed to fetch HSN-GST rates');
  }
}

// POST /api/admin/hsn-gst
export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session || session.role !== 'admin') return unauthorized();

    const body = await req.json();
    const err = validateHsnGstInput(body, { required: true });
    if (err) return badRequest(err);

    const { hsn_code, gst_rate, description } = body;
    const data = await createHsnGstRate(
      String(hsn_code).trim(),
      parseFloat(gst_rate),
      description
    );
    return created(data);
  } catch (err: any) {
    if (err?.code === '23505') return NextResponse.json({ success: false, error: 'HSN code already exists' }, { status: 409 });
    console.error('POST /api/admin/hsn-gst error:', err);
    return serverError('Failed to create HSN-GST rate');
  }
}
