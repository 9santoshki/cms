/**
 * Database helpers for category management.
 */
import { query } from './connection';
import { generateUniqueSlug } from './slug-utils';

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  display_order: number;
  is_active: boolean;
  description: string | null;
  image: string | null;
  show_on_homepage: boolean;
  show_in_menu: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryWithChildren extends Category {
  children: Category[];
}

/**
 * Get all categories, optionally filtered by parent_id.
 */
export async function getCategories(parentId?: number | null): Promise<Category[]> {
  let sql = 'SELECT * FROM categories ORDER BY display_order, name';
  const params: unknown[] = [];

  if (parentId !== undefined) {
    if (parentId === null) {
      sql = 'SELECT * FROM categories WHERE parent_id IS NULL ORDER BY display_order, name';
    } else {
      sql = 'SELECT * FROM categories WHERE parent_id = $1 ORDER BY display_order, name';
      params.push(parentId);
    }
  }

  const result = await query(sql, params);
  return result.rows;
}

/**
 * Get all categories with their children nested.
 */
export async function getCategoriesWithChildren(): Promise<CategoryWithChildren[]> {
  const allCategories = await getCategories();

  // Separate parents (null parent_id) and children
  const parents = allCategories.filter(c => c.parent_id === null);
  const childrenByParentId = new Map<number | null, Category[]>();

  for (const cat of allCategories) {
    if (cat.parent_id !== null) {
      const existing = childrenByParentId.get(cat.parent_id) || [];
      existing.push(cat);
      childrenByParentId.set(cat.parent_id, existing);
    }
  }

  return parents.map(parent => ({
    ...parent,
    children: childrenByParentId.get(parent.id) || []
  }));
}

/**
 * Get a single category by ID.
 */
export async function getCategoryById(id: number): Promise<Category | null> {
  const result = await query('SELECT * FROM categories WHERE id = $1', [id]);
  return result.rows[0] || null;
}

/**
 * Get a single category by slug.
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const result = await query('SELECT * FROM categories WHERE slug = $1', [slug]);
  return result.rows[0] || null;
}

/**
 * Generate a unique slug from a name. Delegates to the shared slug utility.
 */
export async function generateUniqueCategorySlug(name: string, excludeId?: number): Promise<string> {
  return generateUniqueSlug(name, 'categories', 'slug', excludeId);
}

/**
 * Create a new category.
 */
export async function createCategory(data: {
  name: string;
  slug?: string;
  parent_id?: number | null;
  display_order?: number;
  description?: string;
  image?: string;
  show_on_homepage?: boolean;
}): Promise<Category> {
  const slug = data.slug || await generateUniqueCategorySlug(data.name);

  const result = await query(
    `INSERT INTO categories (name, slug, parent_id, display_order, description, image, show_on_homepage)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      data.name,
      slug,
      data.parent_id || null,
      data.display_order || 0,
      data.description || null,
      data.image || null,
      data.show_on_homepage || false
    ]
  );

  return result.rows[0];
}

/**
 * Update a category.
 */
export async function updateCategory(
  id: number,
  updates: Partial<{
    name: string;
    slug: string;
    parent_id: number | null;
    display_order: number;
    is_active: boolean;
    description: string;
    image: string;
    show_on_homepage: boolean;
    show_in_menu: boolean;
  }>
): Promise<Category | null> {
  const fields: string[] = [];
  const values: unknown[] = [];
  let paramCount = 1;

  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
  }

  if (fields.length === 0) {
    return getCategoryById(id);
  }

  values.push(id);
  const result = await query(
    `UPDATE categories SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

/**
 * Delete a category.
 * Returns false if category has children or products using it.
 */
export async function deleteCategory(id: number): Promise<{ success: boolean; error?: string }> {
  const cat = await getCategoryById(id);
  if (!cat) {
    return { success: false, error: 'Category not found.' };
  }

  // Check for children (sub-categories)
  const childrenCheck = await query(
    'SELECT COUNT(*) as count FROM categories WHERE parent_id = $1',
    [id]
  );
  if (parseInt(childrenCheck.rows[0].count) > 0) {
    return { success: false, error: 'Category has subcategories. Delete or reassign them first.' };
  }

  // Check for products assigned to this category via the junction table
  const productCheck = await query(
    'SELECT COUNT(*) as count FROM product_categories WHERE category_id = $1',
    [id]
  );
  const productCount = parseInt(productCheck.rows[0].count);
  if (productCount > 0) {
    return {
      success: false,
      error: `${productCount} product(s) use this category. Reassign them before deleting.`,
    };
  }

  // Safe to delete
  const result = await query('DELETE FROM categories WHERE id = $1', [id]);
  return { success: result.rowCount ? result.rowCount > 0 : false };
}

/**
 * Get active parent categories (for dropdowns).
 */
export async function getActiveParentCategories(): Promise<Category[]> {
  const result = await query(
    'SELECT * FROM categories WHERE parent_id IS NULL AND is_active = TRUE ORDER BY display_order, name'
  );
  return result.rows;
}

/**
 * Get active subcategories for a parent.
 */
export async function getActiveSubcategories(parentId: number): Promise<Category[]> {
  const result = await query(
    'SELECT * FROM categories WHERE parent_id = $1 AND is_active = TRUE ORDER BY display_order, name',
    [parentId]
  );
  return result.rows;
}

/**
 * Get subcategories for homepage display (show_on_homepage = TRUE).
 * Returns subcategory with parent category name.
 */
export interface HomepageSubcategory {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  display_order: number;
  category_id: number;
  category_name: string;
  category_slug: string;
}

export async function getHomepageSubcategories(): Promise<HomepageSubcategory[]> {
  const result = await query(
    `SELECT
      s.id, s.name, s.slug, s.image, s.display_order,
      p.id  AS category_id,
      p.name AS category_name,
      p.slug AS category_slug
    FROM categories s
    JOIN categories p ON s.parent_id = p.id
    WHERE s.is_active = TRUE
      AND s.show_on_homepage = TRUE
      AND p.is_active = TRUE
    ORDER BY s.display_order, s.name`
  );
  return result.rows;
}