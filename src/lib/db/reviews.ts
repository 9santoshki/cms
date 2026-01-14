import { query } from './connection';

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface ReviewWithDetails extends Review {
  user_name: string;
  user_email: string;
  user_avatar?: string;
  product_name: string;
}

export interface ProductRating {
  average_rating: number;
  review_count: number;
}

/**
 * Get all reviews with optional filters (for admin/moderator)
 */
export async function getReviews(filters: {
  status?: string;
  product_id?: string;
  user_id?: string;
  page?: number;
  limit?: number;
}): Promise<{ reviews: ReviewWithDetails[]; total: number }> {
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const offset = (page - 1) * limit;

  let whereConditions: string[] = [];
  let params: any[] = [];
  let paramCount = 1;

  if (filters.status) {
    whereConditions.push(`r.status = $${paramCount}`);
    params.push(filters.status);
    paramCount++;
  }

  if (filters.product_id) {
    whereConditions.push(`r.product_id = $${paramCount}`);
    params.push(filters.product_id);
    paramCount++;
  }

  if (filters.user_id) {
    whereConditions.push(`r.user_id = $${paramCount}`);
    params.push(filters.user_id);
    paramCount++;
  }

  const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

  const reviewsQuery = `
    SELECT
      r.*,
      u.name as user_name,
      u.email as user_email,
      u.avatar as user_avatar,
      p.name as product_name
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    JOIN products p ON r.product_id = p.id
    ${whereClause}
    ORDER BY r.created_at DESC
    LIMIT $${paramCount} OFFSET $${paramCount + 1}
  `;
  params.push(limit, offset);

  const result = await query(reviewsQuery, params);

  // Get total count
  const countQuery = `SELECT COUNT(*) as count FROM reviews r ${whereClause}`;
  const countResult = await query(countQuery, params.slice(0, paramCount - 1));
  const total = parseInt(countResult.rows[0].count);

  return {
    reviews: result.rows,
    total,
  };
}

/**
 * Get approved reviews for a product (public facing)
 */
export async function getProductReviews(productId: string): Promise<ReviewWithDetails[]> {
  const result = await query(
    `SELECT
      r.*,
      u.name as user_name,
      u.email as user_email,
      u.avatar as user_avatar,
      p.name as product_name
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    JOIN products p ON r.product_id = p.id
    WHERE r.product_id = $1 AND r.status = 'approved'
    ORDER BY r.created_at DESC`,
    [productId]
  );
  return result.rows;
}

/**
 * Get average rating and review count for a product
 */
export async function getProductRating(productId: string): Promise<ProductRating> {
  const result = await query(
    `SELECT
      COALESCE(AVG(rating), 0) as average_rating,
      COUNT(*) as review_count
    FROM reviews
    WHERE product_id = $1 AND status = 'approved'`,
    [productId]
  );
  return {
    average_rating: parseFloat(result.rows[0].average_rating) || 0,
    review_count: parseInt(result.rows[0].review_count) || 0,
  };
}

/**
 * Get a single review by ID
 */
export async function getReviewById(id: string): Promise<ReviewWithDetails | null> {
  const result = await query(
    `SELECT
      r.*,
      u.name as user_name,
      u.email as user_email,
      u.avatar as user_avatar,
      p.name as product_name
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    JOIN products p ON r.product_id = p.id
    WHERE r.id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

/**
 * Check if user has already reviewed a product
 */
export async function hasUserReviewedProduct(userId: string, productId: string): Promise<boolean> {
  const result = await query(
    'SELECT id FROM reviews WHERE user_id = $1 AND product_id = $2',
    [userId, productId]
  );
  return result.rows.length > 0;
}

/**
 * Create a new review
 */
export async function createReview(review: {
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
}): Promise<Review> {
  const result = await query(
    `INSERT INTO reviews (user_id, product_id, rating, comment, status)
     VALUES ($1, $2, $3, $4, 'pending')
     RETURNING *`,
    [review.user_id, review.product_id, review.rating, review.comment]
  );
  return result.rows[0];
}

/**
 * Update review status (for moderation)
 */
export async function updateReviewStatus(
  id: string,
  status: 'pending' | 'approved' | 'rejected'
): Promise<Review | null> {
  const result = await query(
    `UPDATE reviews SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0] || null;
}

/**
 * Delete a review
 */
export async function deleteReview(id: string): Promise<boolean> {
  const result = await query('DELETE FROM reviews WHERE id = $1', [id]);
  return result.rowCount ? result.rowCount > 0 : false;
}
