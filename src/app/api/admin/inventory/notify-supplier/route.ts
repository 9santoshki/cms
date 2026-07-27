/**
 * POST /api/admin/inventory/notify-supplier
 *
 * Send a restock request email to one or all suppliers assigned to a variant.
 * Also writes an audit log entry so the notification is traceable.
 *
 * Body:
 *   { variant_id: number, supplier_id?: number, admin_note?: string }
 *
 * If supplier_id is omitted, ALL active suppliers for that variant are notified.
 */
import { NextRequest } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import { getVariantSuppliers } from '@/lib/db/suppliers';
import { ok, badRequest, unauthorized, forbidden, serverError } from '@/lib/api-response';
import { sendRestockRequestEmail } from '@/lib/email';
import { getProductVariantById } from '@/lib/db/variants';
import { getProductById } from '@/lib/db/products';
import { query } from '@/lib/db/connection'; // used for audit log INSERTs

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) return unauthorized();
    if (session.role !== 'admin' && session.role !== 'moderator') {
      return forbidden('Admin or moderator access required');
    }

    const body = await request.json();
    const { variant_id, supplier_id, admin_note } = body;

    if (!variant_id) {
      return badRequest('variant_id is required');
    }

    // Fetch variant and suppliers in parallel; product is sequential (needs variant.product_id)
    const [variant, allSuppliers] = await Promise.all([
      getProductVariantById(Number(variant_id)),
      getVariantSuppliers(Number(variant_id)),
    ]);

    if (!variant) {
      return badRequest('Variant not found');
    }

    const product   = await getProductById(String(variant.product_id));
    const adminName = session.name ?? 'Admin';
    const targets = supplier_id
      ? allSuppliers.filter(s => s.id === Number(supplier_id))
      : allSuppliers.filter(s => s.is_active);

    if (targets.length === 0) {
      return badRequest(
        supplier_id
          ? 'Specified supplier is not assigned to this variant or is inactive'
          : 'No active suppliers assigned to this variant'
      );
    }

    const results: Array<{ supplier_id: number; company_name: string; email: string; success: boolean; error?: string }> = [];

    for (const supplier of targets) {
      const supplierEmail = supplier.user?.email;
      if (!supplierEmail) {
        results.push({ supplier_id: supplier.id, company_name: supplier.company_name, email: '', success: false, error: 'No email on file' });
        continue;
      }

      try {
        await sendRestockRequestEmail(supplierEmail, {
          supplierName:    supplier.company_name,
          productName:     product?.name ?? 'Unknown Product',
          variantName:     variant.variant_name ?? '',
          sku:             variant.sku,
          currentStock:    Number(variant.stock_quantity),
          requestedByName: adminName,
          adminNote:       admin_note || undefined,
        });

        // Audit log so the notification is visible in inventory history
        await query(
          `INSERT INTO inventory_logs
             (variant_id, previous_quantity, new_quantity, change_quantity, changed_by, change_type, notes)
           VALUES ($1, $2, $2, 0, $3, 'admin_update', $4)`,
          [
            variant_id,
            variant.stock_quantity,
            session.userId,
            `Restock request sent to ${supplier.company_name}${admin_note ? `: "${admin_note}"` : ''}`,
          ]
        );

        results.push({ supplier_id: supplier.id, company_name: supplier.company_name, email: supplierEmail, success: true });
        console.info(`[notify-supplier] Restock email sent to ${supplierEmail} for variant ${variant_id}`);
      } catch (emailErr) {
        console.error(`[notify-supplier] Failed to email ${supplierEmail}:`, emailErr);
        results.push({ supplier_id: supplier.id, company_name: supplier.company_name, email: supplierEmail, success: false, error: String(emailErr) });
      }
    }

    const allOk    = results.every(r => r.success);
    const anyOk    = results.some(r => r.success);
    const sentTo   = results.filter(r =>  r.success).map(r => r.company_name).join(', ');
    const failedTo = results.filter(r => !r.success).map(r => r.company_name).join(', ');

    let message: string;
    if (allOk) {
      message = `Restock request sent to: ${sentTo}`;
    } else if (anyOk) {
      message = `Sent to: ${sentTo}. Failed for: ${failedTo}`;
    } else {
      message = 'All notifications failed. Check email configuration.';
    }

    return ok({ results, message });
  } catch (err: unknown) {
    console.error('[notify-supplier] Error:', err);
    return serverError('Failed to send notification');
  }
}
