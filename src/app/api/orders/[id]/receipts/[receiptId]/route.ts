import { NextRequest } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { deleteOrderReceipt } from '@/lib/db/orders';
import { deleteImageFromCloudflare } from '@/lib/cloudflare';
import { ok, unauthorized, forbidden, notFound, fromError } from '@/lib/api-response';

/**
 * DELETE /api/orders/[id]/receipts/[receiptId]
 * Remove a purchase receipt from DB and R2.
 */
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string; receiptId: string }> }
) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) return unauthorized();
    if (session.role !== 'admin' && session.role !== 'moderator') return forbidden();

    const { id: orderId, receiptId } = await context.params;

    const r2Key = await deleteOrderReceipt(receiptId, orderId);
    if (!r2Key) return notFound('Receipt not found');

    // Best-effort R2 deletion — don't fail the request if it errors
    await deleteImageFromCloudflare(r2Key).catch(() => null);

    return ok(null, 'Receipt deleted');
  } catch (err) {
    return fromError(err, 'DELETE /api/orders/[id]/receipts/[receiptId]');
  }
}
