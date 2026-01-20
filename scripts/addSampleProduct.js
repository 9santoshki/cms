const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function addSampleProduct() {
  const client = await pool.connect();

  try {
    console.log('Adding sample product to local database...\n');

    // Insert a sample product
    const productResult = await client.query(`
      INSERT INTO products (name, description, price, category, stock, sku)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `, [
      'Modern Wooden Chair',
      'A beautiful handcrafted wooden chair with ergonomic design. Perfect for dining rooms or home offices.',
      12999.00,
      'furniture',
      10,
      'CHAIR-001'
    ]);

    const productId = productResult.rows[0].id;
    console.log(`✅ Sample product created with ID: ${productId}`);

    // Note: You'll need to upload an actual image to Cloudflare R2 first
    // For now, we'll add a placeholder entry
    console.log('\n📝 Product created successfully!');
    console.log('Next step: Upload an image via the dashboard at http://localhost:3000/dashboard/products/' + productId);

    return productId;
  } catch (error) {
    console.error('❌ Error adding sample product:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

addSampleProduct()
  .then((productId) => {
    console.log('\n✅ Sample product added successfully!');
    console.log(`Visit: http://localhost:3000/dashboard/products/${productId}`);
  })
  .catch((error) => {
    console.error('Failed to add sample product:', error);
    process.exit(1);
  });
