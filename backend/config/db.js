const { Pool } = require('pg');
require('dotenv').config();
const logger = require('../utils/logger');

// Validate required environment variables
const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  logger.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Database connection pool configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  // Connection pool settings
  max: 20, // Maximum number of clients in the pool
  min: 5,  // Minimum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 5000, // Return an error after 5 seconds if connection could not be established
  // Enable SSL if required
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false
});

// Test database connection
const connectDB = async () => {
  try {
    const client = await pool.connect();
    logger.info('PostgreSQL connected successfully');
    client.release();
  } catch (err) {
    logger.error('PostgreSQL connection error:', err);
    process.exit(1);
  }
};

// Handle pool errors
pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Gracefully shutdown the pool
process.on('SIGINT', async () => {
  logger.info('Shutting down database connection pool');
  await pool.end();
  process.exit(0);
});

module.exports = {
  query: (text, params) => {
    logger.debug('Executing query:', { text, params });
    return pool.query(text, params);
  },
  connectDB,
  pool
};