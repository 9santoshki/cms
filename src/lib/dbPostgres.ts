import { Pool } from 'pg';
import { PoolClient } from 'pg';

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// Define types to maintain compatibility with existing code
type QueryResult = {
  rows: any[];
  rowCount: number;
  error?: any;
};

interface DatabasePoolInterface {
  query: (text: string, params?: any[]) => Promise<QueryResult>;
  connect: () => Promise<PoolClient>;
  end: () => Promise<void>;
}

// Export a default object with an interface similar to the previous Pool
const db: DatabasePoolInterface = {
  // For query function, map SQL directly to database
  query: async (text: string, params?: any[]): Promise<QueryResult> => {
    const client = await pool.connect();
    
    try {
      const result = await client.query(text, params);
      return {
        rows: result.rows,
        rowCount: result.rowCount || 0,
        error: null
      };
    } catch (error: any) {
      console.error('PostgreSQL query error:', error.message);
      return {
        rows: [],
        rowCount: 0,
        error: error
      };
    } finally {
      client.release();
    }
  },
  
  connect: async () => {
    return await pool.connect();
  },

  end: async () => {
    return await pool.end();
  }
};

export default db;

// Test the connection
export const connectDB = async () => {
  try {
    // Perform a simple query to test the connection
    const result = await db.query('SELECT 1 as test');
    if (result.error) {
      console.error('Database connection error:', result.error);
      throw result.error;
    }
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Function to get current shipping configuration
export const getShippingConfig = async (): Promise<any> => {
  try {
    const result = await db.query(
      'SELECT * FROM shipping_config ORDER BY created_at DESC LIMIT 1'
    );
    
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      // Return default shipping configuration if none exists
      return {
        id: 1,
        min_order_amount: 50000,
        flat_rate: 1500,
        enabled: true,
        created_at: new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('Error fetching shipping configuration:', error);
    // Return default configuration
    return {
      id: 1,
      min_order_amount: 50000,
      flat_rate: 1500,
      enabled: true,
      created_at: new Date().toISOString()
    };
  }
};

// Function to update shipping configuration
export const updateShippingConfig = async (config: any): Promise<any> => {
  try {
    const result = await db.query(
      'INSERT INTO shipping_config (min_order_amount, flat_rate, enabled) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET min_order_amount = $1, flat_rate = $2, enabled = $3 RETURNING *',
      [config.min_order_amount, config.flat_rate, config.enabled]
    );
    
    return result;
  } catch (error) {
    console.error('Error updating shipping configuration:', error);
    throw error;
  }
};

// Function to get current tax configuration
export const getTaxConfig = async (): Promise<any> => {
  try {
    const result = await db.query(
      'SELECT * FROM tax_config ORDER BY created_at DESC LIMIT 1'
    );
    
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      // Return default tax configuration if none exists
      return {
        id: 1,
        rate: 0.0,
        type: 'percentage', // 'percentage' or 'fixed'
        enabled: false,
        created_at: new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('Error fetching tax configuration:', error);
    // Return default configuration
    return {
      id: 1,
      rate: 0.0,
      type: 'percentage',
      enabled: false,
      created_at: new Date().toISOString()
    };
  }
};

// Function to update tax configuration
export const updateTaxConfig = async (config: any): Promise<any> => {
  try {
    const result = await db.query(
      'INSERT INTO tax_config (rate, type, enabled) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET rate = $1, type = $2, enabled = $3 RETURNING *',
      [config.rate, config.type, config.enabled]
    );
    
    return result;
  } catch (error) {
    console.error('Error updating tax configuration:', error);
    throw error;
  }
};