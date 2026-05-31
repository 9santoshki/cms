/**
 * Public API: Get categories for homepage display
 * Returns active subcategories marked as show_on_homepage.
 */
import { getHomepageSubcategories } from '@/lib/db/categories';
import { ok, serverError } from '@/lib/api-response';

/**
 * GET /api/categories/homepage
 * Returns subcategories for homepage "Browse by Category" section.
 * Subcategories with no admin-uploaded image are shown as text-only tiles.
 */
export async function GET() {
  try {
    const data = await getHomepageSubcategories();
    return ok(data);
  } catch (err: unknown) {
    console.error('Error fetching homepage categories:', err);
    return serverError('Failed to fetch homepage categories');
  }
}
