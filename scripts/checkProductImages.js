const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '../.env.uat');
if (fs.existsSync(envPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  for (const key in envConfig) {
    process.env[key] = envConfig[key];
  }
} else {
  console.error('❌ .env.uat file not found');
  process.exit(1);
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function checkProductImages() {
  try {
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'product_images'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.error('❌ product_images table does not exist! Run: npm run init-db');
      process.exit(1);
    }

    const result = await pool.query(`
      SELECT
        id,
        product_id,
        cloudflare_image_id,
        url,
        filename,
        is_primary,
        display_order
      FROM product_images
      ORDER BY product_id, display_order
      LIMIT 20
    `);

    if (result.rows.length === 0) {
      console.error('⚠️  No product images found');
    } else {
      result.rows.forEach((row, index) => {
        console.log(`${index + 1}. Product ID: ${row.product_id}`);
        console.log(`   Image ID: ${row.id}`);
        console.log(`   Cloudflare Image ID: ${row.cloudflare_image_id}`);
        console.log(`   URL: ${row.url}`);
        console.log(`   Primary: ${row.is_primary}`);

        if (row.cloudflare_image_id && row.cloudflare_image_id.includes('://')) {
          console.log('   ❌ PROBLEM: cloudflare_image_id contains a full URL, should be just the key!');
        } else if (row.cloudflare_image_id && row.cloudflare_image_id.startsWith('product_images/')) {
          console.log('   ✅ cloudflare_image_id looks correct (R2 key)');
        }

        if (row.url && row.url.startsWith('/api/images/')) {
          console.log('   ✅ URL uses proxy endpoint');
        } else if (row.url && row.url.includes('.r2.dev')) {
          console.log('   ❌ PROBLEM: URL uses old public R2 URL, should use /api/images/...');
        }

        console.log('');
      });

      const publicUrlCount = result.rows.filter(row =>
        row.url && row.url.includes('.r2.dev')
      ).length;

      const badKeysCount = result.rows.filter(row =>
        row.cloudflare_image_id && row.cloudflare_image_id.includes('://')
      ).length;

      console.log('📋 SUMMARY:');
      console.log(`   Total images checked: ${result.rows.length}`);
      console.log(`   Images with old public URLs: ${publicUrlCount}`);
      console.log(`   Images with invalid keys: ${badKeysCount}`);

      if (publicUrlCount > 0 || badKeysCount > 0) {
        console.log('\n⚠️  MIGRATION NEEDED:');
        console.log('   Run: node scripts/migrateProductImages.js');
      } else {
        console.log('\n✅ All images look good!');
      }
    }

    const productsResult = await pool.query(`
      SELECT id, name, image_url
      FROM products
      WHERE image_url IS NOT NULL
      LIMIT 10
    `);

    if (productsResult.rows.length > 0) {
      console.log('\n📦 Products with legacy image_url (first 10):');
      productsResult.rows.forEach((row, index) => {
        console.log(`${index + 1}. ${row.name} (ID: ${row.id})`);
        console.log(`   image_url: ${row.image_url}`);
        if (row.image_url && row.image_url.includes('.r2.dev')) {
          console.log('   ❌ Uses old public R2 URL');
        }
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

checkProductImages();
