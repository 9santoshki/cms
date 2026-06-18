import { NextRequest } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getOrderReceipts, addOrderReceipt } from '@/lib/db/orders';
import { uploadImageToCloudflare, getCloudflareImageUrl } from '@/lib/cloudflare';
import { ok, badRequest, unauthorized, forbidden, fromError } from '@/lib/api-response';

/**
 * GET /api/orders/[id]/receipts
 * List all purchase receipts for an order.
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) return unauthorized();
    if (session.role !== 'admin' && session.role !== 'moderator') return forbidden();

    const { id: orderId } = await context.params;
    const receipts = await getOrderReceipts(orderId);

    const data = receipts.map((r) => ({
      ...r,
      url: getCloudflareImageUrl(r.r2_key),
    }));

    return ok(data);
  } catch (err) {
    return fromError(err, 'GET /api/orders/[id]/receipts');
  }
}

/**
 * POST /api/orders/[id]/receipts
 * Upload one or more purchase receipt images.
 * Multipart form data with field name "images".
 */
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) return unauthorized();
    if (session.role !== 'admin' && session.role !== 'moderator') return forbidden();

    const { id: orderId } = await context.params;
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) return badRequest('No images provided');

    const results = [];
    for (const file of files) {
      const upload = await uploadImageToCloudflare(file, file.name);
      if (!upload.success || !upload.result) continue;
      const receipt = await addOrderReceipt(orderId, upload.result.key, file.name, session.userId);
      results.push({ ...receipt, url: getCloudflareImageUrl(receipt.r2_key) });
    }

    return ok(results, `Uploaded ${results.length} receipt(s)`);
  } catch (err) {
    return fromError(err, 'POST /api/orders/[id]/receipts');
  }
}
