/**
 * User address book — every distinct shipping/billing address a user has
 * actually used at checkout, so the checkout form can auto-populate the
 * most recently used one and the account page can let them manage saved
 * addresses.
 *
 * Deliberately independent of `orders`: orders keep their own
 * shipping_address/billing_address JSONB snapshot from checkout/create.
 * Editing or deleting a row here must never change what a past order shows.
 *
 * The rest of the app's address objects (checkout page, orders, invoices)
 * all use `zipCode` (camelCase) — the SQL column stays conventionally
 * snake_case (`zip_code`, matching every other table), aliased at the
 * query boundary so nothing outside this file needs to know that.
 */
import { query } from './connection';
import { buildUpdateQueryById } from './query-builder';

export type AddressType = 'shipping' | 'billing';

export interface UserAddress {
  id: number;
  user_id: number;
  type: AddressType;
  name: string | null;
  phone: string | null;
  address: string;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  last_used_at: string;
  created_at: string;
  updated_at: string;
}

export interface AddressInput {
  name?: string | null;
  phone?: string | null;
  address: string;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  country?: string | null;
}

// SELECT/RETURNING column list shared by every query below, so the
// zip_code -> zipCode aliasing lives in exactly one place.
const SELECT_COLUMNS = `id, user_id, type, name, phone, address, city, state, zip_code AS "zipCode", country, last_used_at, created_at, updated_at`;

/**
 * Record that a user just used this address at checkout. If they've used
 * this exact address before (same address/city/state/zip/country, case- and
 * whitespace-insensitive), bump its last_used_at instead of creating a
 * duplicate row — that's what makes "most recently used" meaningful rather
 * than every re-order at the same address piling up separate entries.
 */
export async function recordUsedAddress(
  userId: string,
  type: AddressType,
  addr: AddressInput
): Promise<UserAddress | null> {
  if (!addr.address || !addr.address.trim()) return null;

  const norm = (s: string | null | undefined) => (s ?? '').trim().toLowerCase();

  const existing = await query(
    `SELECT id FROM user_addresses
     WHERE user_id = $1 AND type = $2
       AND lower(trim(address)) = $3
       AND lower(trim(coalesce(city, ''))) = $4
       AND lower(trim(coalesce(state, ''))) = $5
       AND lower(trim(coalesce(zip_code, ''))) = $6
       AND lower(trim(coalesce(country, ''))) = $7
     LIMIT 1`,
    [userId, type, norm(addr.address), norm(addr.city), norm(addr.state), norm(addr.zipCode), norm(addr.country)]
  );

  if (existing.rows.length > 0) {
    const result = await query(
      `UPDATE user_addresses
       SET last_used_at = NOW(),
           name = COALESCE($2, name),
           phone = COALESCE($3, phone)
       WHERE id = $1
       RETURNING ${SELECT_COLUMNS}`,
      [existing.rows[0].id, addr.name || null, addr.phone || null]
    );
    return result.rows[0];
  }

  const result = await query(
    `INSERT INTO user_addresses (user_id, type, name, phone, address, city, state, zip_code, country)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING ${SELECT_COLUMNS}`,
    [userId, type, addr.name || null, addr.phone || null, addr.address, addr.city || null, addr.state || null, addr.zipCode || null, addr.country || null]
  );
  return result.rows[0];
}

/** All saved addresses for a user, most recently used first. */
export async function getUserAddresses(userId: string, type?: AddressType): Promise<UserAddress[]> {
  const result = type
    ? await query(
        `SELECT ${SELECT_COLUMNS} FROM user_addresses WHERE user_id = $1 AND type = $2 ORDER BY last_used_at DESC`,
        [userId, type]
      )
    : await query(
        `SELECT ${SELECT_COLUMNS} FROM user_addresses WHERE user_id = $1 ORDER BY last_used_at DESC`,
        [userId]
      );
  return result.rows;
}

/** The single most recently used address of the given type, for auto-populating checkout. */
export async function getLastUsedAddress(userId: string, type: AddressType): Promise<UserAddress | null> {
  const result = await query(
    `SELECT ${SELECT_COLUMNS} FROM user_addresses WHERE user_id = $1 AND type = $2 ORDER BY last_used_at DESC LIMIT 1`,
    [userId, type]
  );
  return result.rows[0] || null;
}

/**
 * Edit a saved address. Ownership-checked (userId must match) so one user
 * can never edit another's book. Only touches this address-book row —
 * orders that used this address before the edit keep showing what they
 * showed at the time, since they store their own independent snapshot.
 */
export async function updateUserAddress(
  userId: string,
  addressId: string,
  updates: Partial<AddressInput>
): Promise<UserAddress | null> {
  // Translate the one camelCase field to its actual snake_case column —
  // buildUpdateQuery writes column names as given, and an unquoted
  // "zipCode" would fold to a nonexistent "zipcode" column in Postgres.
  const { zipCode, ...rest } = updates;
  const columnUpdates: Record<string, unknown> = { ...rest };
  if (zipCode !== undefined) columnUpdates.zip_code = zipCode;

  // buildUpdateQuery already appends "updated_at = NOW()" to every UPDATE it builds.
  const result = buildUpdateQueryById('user_addresses', addressId, columnUpdates);
  if (!result) return null;

  // Append the ownership check rather than relying on buildUpdateQueryById's
  // single `id = $1` WHERE clause, so a mismatched userId updates nothing.
  const guardedQuery = result.query
    .replace('WHERE id = $1', 'WHERE id = $1 AND user_id = $' + (result.values.length + 1))
    .replace('RETURNING *', `RETURNING ${SELECT_COLUMNS}`);
  const queryResult = await query(guardedQuery, [...result.values, userId]);
  return queryResult.rows[0] || null;
}

/** Delete a saved address. Ownership-checked. Never touches order history. */
export async function deleteUserAddress(userId: string, addressId: string): Promise<boolean> {
  const result = await query(
    `DELETE FROM user_addresses WHERE id = $1 AND user_id = $2`,
    [addressId, userId]
  );
  return result.rowCount !== null && result.rowCount > 0;
}
