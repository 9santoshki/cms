import { Pool, PoolClient } from 'pg';

// Require all critical DB env vars at startup — no silent fallbacks
const DB_HOST     = process.env.DB_HOST     || 'localhost';
const DB_PORT     = parseInt(process.env.DB_PORT || '5432');
const DB_NAME     = process.env.DB_NAME;
const DB_USER     = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

if (!DB_NAME)     throw new Error('DB_NAME environment variable is required');
if (!DB_USER)     throw new Error('DB_USER environment variable is required');
if (!DB_PASSWORD) throw new Error('DB_PASSWORD environment variable is required');

// Create a connection pool
const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Log idle client errors but do NOT exit — let the pool self-heal.
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client:', err);
});

export const query = async (text: string, params?: unknown[]) => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err: unknown) {
    console.error('Database query error:', err);
    throw err;
  }
};

export const getClient = async (): Promise<PoolClient> => {
  const client = await pool.connect();
  return client;
};

export default pool;
