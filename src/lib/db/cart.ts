import { query } from './connection';

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  variant_id?: number | null;  // Selected variant (if product has variants)
  quantity: number;
  created_at?: string;
  updated_at?: string;
  // Joined product data
  name?: string;
  price?: number;
  image_url?: string;
  // Variant data
  variant_name?: string;
  variant_price?: number;
}

export async function getCartItems(userId: string | number): Promise<CartItem[]> {
  const result = await query(
    `SELECT
      ci.id,
      ci.user_id,
      ci.product_id,
      ci.variant_id,
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
      ) as primary_image_id,
      v.price as variant_price,
      v.sale_price as variant_sale_price,
      COALESCE(
        (SELECT STRING_AGG(o.display_value, ' / ' ORDER BY t.display_order)
         FROM product_variant_values vv
         JOIN variant_options o ON vv.option_id = o.id
         JOIN variant_option_types t ON o.option_type_id = t.id
         WHERE vv.variant_id = v.id),
        ''
      ) as variant_name
     FROM cart ci
     JOIN products p ON ci.product_id = p.id
     LEFT JOIN product_variants v ON ci.variant_id = v.id
     WHERE ci.user_id = $1
     ORDER BY ci.created_at DESC`,
    [userId]
  );

  // Calculate effective price (variant price if exists, otherwise product price)
  return result.rows.map((row: Record<string, unknown>) => ({
    ...row,
    price: row.variant_sale_price ?? row.variant_price ?? row.price
  })) as CartItem[];
}

export async function getCartItem(
  userId: string | number,
  productId: string | number,
  variantId?: number | null
): Promise<CartItem | null> {
  const result = await query(
    `SELECT * FROM cart WHERE user_id = $1 AND product_id = $2 AND (variant_id = $3 OR (variant_id IS NULL AND $3 IS NULL))`,
    [userId, productId, variantId || null]
  );
  return result.rows[0] || null;
}

export async function addCartItem(
  userId: string | number,
  productId: string | number,
  quantity: number,
  variantId?: number | null
): Promise<CartItem> {
  const result = await query(
    `INSERT INTO cart (user_id, product_id, variant_id, quantity)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id, product_id, variant_id)
     DO UPDATE SET quantity = cart.quantity + $4, updated_at = NOW()
     RETURNING *`,
    [userId, productId, variantId || null, quantity]
  );
  return result.rows[0];
}

export async function updateCartItemQuantity(
  userId: string | number,
  productId: string | number,
  quantity: number,
  variantId?: number | null
): Promise<CartItem | null> {
  const result = await query(
    `UPDATE cart
     SET quantity = $4, updated_at = NOW()
     WHERE user_id = $1 AND product_id = $2 AND (variant_id = $3 OR (variant_id IS NULL AND $3 IS NULL))
     RETURNING *`,
    [userId, productId, variantId || null, quantity]
  );
  return result.rows[0] || null;
}

export async function removeCartItem(
  userId: string | number,
  productId: string | number,
  variantId?: number | null
): Promise<boolean> {
  const result = await query(
    `DELETE FROM cart WHERE user_id = $1 AND product_id = $2 AND (variant_id = $3 OR (variant_id IS NULL AND $3 IS NULL))`,
    [userId, productId, variantId || null]
  );
  return result.rowCount ? result.rowCount > 0 : false;
}

export async function clearCart(userId: string | number): Promise<boolean> {
  const result = await query(`DELETE FROM cart WHERE user_id = $1`, [userId]);
  return result.rowCount ? result.rowCount > 0 : false;
}

export async function getCartItemWithProduct(
  userId: string | number,
  productId: string | number,
  variantId?: number | null
): Promise<CartItem | null> {
  const result = await query(
    `SELECT
      ci.id,
      ci.product_id,
      ci.variant_id,
      ci.quantity,
      p.name,
      p.price,
      p.image_url,
      v.price as variant_price,
      v.sale_price as variant_sale_price,
      COALESCE(
        (SELECT STRING_AGG(o.display_value, ' / ' ORDER BY t.display_order)
         FROM product_variant_values vv
         JOIN variant_options o ON vv.option_id = o.id
         JOIN variant_option_types t ON o.option_type_id = t.id
         WHERE vv.variant_id = v.id),
        ''
      ) as variant_name
     FROM cart ci
     JOIN products p ON ci.product_id = p.id
     LEFT JOIN product_variants v ON ci.variant_id = v.id
     WHERE ci.user_id = $1 AND ci.product_id = $2 AND (ci.variant_id = $3 OR (ci.variant_id IS NULL AND $3 IS NULL))`,
    [userId, productId, variantId || null]
  );

  const row = result.rows[0] as Record<string, unknown> | null;
  if (!row) return null;

  return {
    ...row,
    price: row.variant_sale_price ?? row.variant_price ?? row.price
  } as CartItem;
}
