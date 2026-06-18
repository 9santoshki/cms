import { query, getClient } from './connection';

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'returned';
  payment_id?: string;
  payment_status?: string;
  shipping_address?: any;
  cost_price?: number | null;
  cash_expense?: number | null;
  cost_notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at?: string;
}

export async function createOrder(
  userId: string,
  items: { product_id: string; quantity: number; price: number }[],
  totalAmount: number,
  paymentId?: string,
  shippingAddress?: any
): Promise<Order> {
  const client = await getClient();

  try {
    await client.query('BEGIN');

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, payment_id, shipping_address, status)
       VALUES ($1, $2, $3, $4, 'pending')
       RETURNING *`,
      [userId, totalAmount, paymentId, JSON.stringify(shippingAddress)]
    );

    const order = orderResult.rows[0];

    // Create order items
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order.id, item.product_id, item.quantity, item.price]
      );
    }

    await client.query('COMMIT');
    return order;
  } catch (err: unknown) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const result = await query('SELECT * FROM orders WHERE id = $1', [orderId]);
  return result.rows[0] || null;
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const result = await query(
    `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
}

export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  const result = await query(
    `SELECT
      oi.*,
      p.name,
      COALESCE(
        (SELECT url FROM product_images WHERE product_id = p.id AND is_primary = true LIMIT 1),
        p.image_url
      ) as image_url
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = $1`,
    [orderId]
  );
  return result.rows;
}

/**
 * Batch fetch order items for multiple orders in a single query.
 * Returns a map of order_id -> items array.
 */
export async function getOrderItemsBatch(orderIds: string[]): Promise<Map<string, OrderItem[]>> {
  if (orderIds.length === 0) return new Map();

  const result = await query(
    `SELECT
      oi.*,
      p.name,
      COALESCE(
        (SELECT url FROM product_images WHERE product_id = p.id AND is_primary = true LIMIT 1),
        p.image_url
      ) as image_url
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ANY($1)`,
    [orderIds]
  );

  const itemsMap = new Map<string, OrderItem[]>();
  for (const row of result.rows) {
    const orderId = row.order_id;
    if (!itemsMap.has(orderId)) {
      itemsMap.set(orderId, []);
    }
    itemsMap.get(orderId)!.push(row);
  }
  return itemsMap;
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status']
): Promise<Order | null> {
  const result = await query(
    `UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, orderId]
  );
  return result.rows[0] || null;
}

export interface OrderReceipt {
  id: number;
  order_id: number;
  r2_key: string;
  filename?: string;
  uploaded_by?: number;
  created_at?: string;
}

export async function updateOrderCost(
  orderId: string,
  costPrice: number | null,
  cashExpense: number | null,
  costNotes: string | null
): Promise<Order | null> {
  const result = await query(
    `UPDATE orders SET cost_price = $1, cash_expense = $2, cost_notes = $3, updated_at = NOW() WHERE id = $4 RETURNING *`,
    [costPrice, cashExpense, costNotes, orderId]
  );
  return result.rows[0] || null;
}

export async function getOrderReceipts(orderId: string): Promise<OrderReceipt[]> {
  const result = await query(
    `SELECT * FROM order_receipts WHERE order_id = $1 ORDER BY created_at ASC`,
    [orderId]
  );
  return result.rows;
}

export async function addOrderReceipt(
  orderId: string,
  r2Key: string,
  filename: string,
  uploadedBy: string
): Promise<OrderReceipt> {
  const result = await query(
    `INSERT INTO order_receipts (order_id, r2_key, filename, uploaded_by)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [orderId, r2Key, filename, uploadedBy]
  );
  return result.rows[0];
}

/**
 * Deletes receipt row and returns the r2_key so the caller can remove from R2.
 * orderId check prevents deleting another order's receipt.
 */
export async function deleteOrderReceipt(
  receiptId: string,
  orderId: string
): Promise<string | null> {
  const result = await query(
    `DELETE FROM order_receipts WHERE id = $1 AND order_id = $2 RETURNING r2_key`,
    [receiptId, orderId]
  );
  return result.rows[0]?.r2_key ?? null;
}

export async function updateOrderPaymentStatus(
  orderId: string,
  paymentId: string,
  paymentStatus: string
): Promise<Order | null> {
  const result = await query(
    `UPDATE orders
     SET payment_id = $1, payment_status = $2, updated_at = NOW()
     WHERE id = $3
     RETURNING *`,
    [paymentId, paymentStatus, orderId]
  );
  return result.rows[0] || null;
}
