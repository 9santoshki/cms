/**
 * Admin API: Manage categories (parent categories and subcategories)
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromCookieWithDB } from '@/lib/db/auth';
import {
  getCategoriesWithChildren,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  generateUniqueCategorySlug
} from '@/lib/db/categories';
import { ok, created, badRequest, unauthorized, forbidden, notFound, serverError } from '@/lib/api-response';

/**
 * GET /api/admin/categories
 * Returns all categories with children nested
 */
export async function GET() {
  try {
    const categories = await getCategoriesWithChildren();
    return ok(categories);
  } catch (err: unknown) {
    console.error('Error fetching categories:', err);
    return serverError('Failed to fetch categories');
  }
}

/**
 * POST /api/admin/categories
 * Create new category (parent or subcategory)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can create categories');
    }

    const body = await request.json();
    const { name, slug, parent_id, display_order, description, image, show_on_homepage } = body;

    if (!name) {
      return badRequest('name is required');
    }

    // Validate parent_id if provided
    if (parent_id !== undefined && parent_id !== null) {
      const parent = await getCategoryById(parent_id);
      if (!parent) {
        return badRequest('Parent category not found');
      }
      if (parent.parent_id !== null) {
        return badRequest('Cannot create subcategory under another subcategory (max 2 levels)');
      }
    }

    const category = await createCategory({
      name,
      slug: slug || await generateUniqueCategorySlug(name),
      parent_id: parent_id || null,
      display_order: display_order || 0,
      description,
      image,
      show_on_homepage
    });

    return created(category);
  } catch (err: unknown) {
    console.error('Error creating category:', err);
    return serverError('Failed to create category');
  }
}

/**
 * PUT /api/admin/categories
 * Update category
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can update categories');
    }

    const body = await request.json();
    const { id, name, slug, parent_id, display_order, is_active, description, image, show_on_homepage, show_in_menu } = body;

    if (!id) {
      return badRequest('id is required');
    }

    const existing = await getCategoryById(id);
    if (!existing) {
      return notFound('Category not found');
    }

    // Validate parent_id change
    if (parent_id !== undefined && parent_id !== null && parent_id !== existing.parent_id) {
      const parent = await getCategoryById(parent_id);
      if (!parent) {
        return badRequest('Parent category not found');
      }
      if (parent.parent_id !== null) {
        return badRequest('Cannot move category under a subcategory (max 2 levels)');
      }
      // Prevent making a parent its own child
      if (parent_id === id) {
        return badRequest('Cannot set category as its own parent');
      }
    }

    const updated = await updateCategory(id, {
      name,
      slug,
      parent_id,
      display_order,
      is_active,
      description,
      image,
      show_on_homepage,
      show_in_menu
    });

    return ok(updated);
  } catch (err: unknown) {
    console.error('Error updating category:', err);
    return serverError('Failed to update category');
  }
}

/**
 * DELETE /api/admin/categories?id=123
 * Delete category (fails if has children)
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSessionFromCookieWithDB();
    if (!session) {
      return unauthorized();
    }
    if (session.role !== 'admin') {
      return forbidden('Only admins can delete categories');
    }

    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');

    if (!idParam) {
      return badRequest('id parameter is required');
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return badRequest('id must be a number');
    }

    const existing = await getCategoryById(id);
    if (!existing) {
      return notFound('Category not found');
    }

    const result = await deleteCategory(id);
    if (!result.success) {
      return badRequest(result.error || 'Failed to delete category');
    }

    return ok({ deleted: true }, 'Category deleted successfully');
  } catch (err: unknown) {
    console.error('Error deleting category:', err);
    return serverError('Failed to delete category');
  }
}