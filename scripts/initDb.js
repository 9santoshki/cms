const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function initDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'cmsdb',
    user: process.env.DB_USER || 'sk',
    password: process.env.DB_PASSWORD || 'sk',
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'initDatabase.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    // Execute the SQL
    await client.query(sql);

    console.log('Database initialized successfully!');
    console.log('Tables created:');
    console.log('  - users');
    console.log('  - products');
    console.log('  - orders');
    console.log('  - order_items');
    console.log('  - cart_items');
    console.log('  - appointments');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

initDatabase();
