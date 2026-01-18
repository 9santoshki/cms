import { query } from './connection';

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at?: string;
  updated_at?: string;
  // Joined product data
  name?: string;
  price?: number;
  image_url?: string;
}

export async function getCartItems(userId: string): Promise<CartItem[]> {
  const result = await query(
    `SELECT
      ci.id,
      ci.user_id,
      ci.product_id,
      ci.quantity,
      p.name,
      p.description,
      p.price,
      p.image_url,
      (
        SELECT pi.cloudflare_image_id
        FROM product_images pi
        WHERE pi.product_id = p.id AND pi.is_primary = true
        LIMIT 1
      ) as primary_image_id
     FROM cart ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = $1
     ORDER BY ci.created_at DESC`,
    [userId]
  );
  return result.rows;
}

export async function getCartItem(userId: string, productId: string): Promise<CartItem | null> {
  const result = await query(
    `SELECT * FROM cart WHERE user_id = $1 AND product_id = $2`,
    [userId, productId]
  );
  return result.rows[0] || null;
}

export async function addCartItem(
  userId: string,
  productId: string,
  quantity: number
): Promise<CartItem> {
  const result = await query(
    `INSERT INTO cart (user_id, product_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, product_id)
     DO UPDATE SET quantity = cart.quantity + $3, updated_at = NOW()
     RETURNING *`,
    [userId, productId, quantity]
  );
  return result.rows[0];
}

export async function updateCartItemQuantity(
  userId: string,
  productId: string,
  quantity: number
): Promise<CartItem | null> {
  const result = await query(
    `UPDATE cart
     SET quantity = $3, updated_at = NOW()
     WHERE user_id = $1 AND product_id = $2
     RETURNING *`,
    [userId, productId, quantity]
  );
  return result.rows[0] || null;
}

export async function removeCartItem(userId: string, productId: string): Promise<boolean> {
  const result = await query(
    `DELETE FROM cart WHERE user_id = $1 AND product_id = $2`,
    [userId, productId]
  );
  return result.rowCount ? result.rowCount > 0 : false;
}

export async function clearCart(userId: string): Promise<boolean> {
  const result = await query(`DELETE FROM cart WHERE user_id = $1`, [userId]);
  return result.rowCount ? result.rowCount > 0 : false;
}

export async function getCartItemWithProduct(
  userId: string,
  productId: string
): Promise<CartItem | null> {
  const result = await query(
    `SELECT
      ci.id,
      ci.product_id,
      ci.quantity,
      p.name,
      p.price,
      p.image_url
     FROM cart ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = $1 AND ci.product_id = $2`,
    [userId, productId]
  );
  return result.rows[0] || null;
}
