/**
 * Public API: Get active top-level (parent) categories.
 * Used by the homepage to drive dynamic product section rendering.
 */
import { getActiveParentCategories } from '@/lib/db/categories';
import { ok, serverError } from '@/lib/api-response';

/**
 * GET /api/categories/parents
 * Returns all active parent categories (parent_id IS NULL AND is_active = TRUE).
 */
export async function GET() {
  try {
    const parents = await getActiveParentCategories();
    return ok(parents);
  } catch (err: unknown) {
    console.error('Error fetching parent categories:', err);
    return serverError('Failed to fetch parent categories');
  }
}
