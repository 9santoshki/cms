const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

function getR2Client() {
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const endpoint = process.env.CLOUDFLARE_R2_ENDPOINT;

  if (!accessKeyId || !secretAccessKey || !endpoint) {
    throw new Error('Missing R2 credentials in .env.local');
  }

  return new S3Client({
    region: 'auto',
    endpoint: endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

function createTestImage() {
  const pngData = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
    0xde, 0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41,
    0x54, 0x08, 0xd7, 0x63, 0xf8, 0xcf, 0xc0, 0x00,
    0x00, 0x03, 0x01, 0x01, 0x00, 0x18, 0xdd, 0x8d,
    0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e,
    0x44, 0xae, 0x42, 0x60, 0x82
  ]);
  return pngData;
}

async function uploadTestImage(productId) {
  const client = getR2Client();
  const bucket = process.env.CLOUDFLARE_BUCKET;
  const folder = process.env.CLOUDFLARE_PRODUCT_IMAGE_FOLDER || 'product_images';

  if (!bucket) {
    throw new Error('Missing CLOUDFLARE_BUCKET in .env.local');
  }

  const timestamp = Date.now();
  const key = `${folder}/${timestamp}-test-chair.png`;

  try {
    const imageBuffer = createTestImage();

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: imageBuffer,
      ContentType: 'image/png',
    });

    await client.send(command);

    const dbClient = await pool.connect();
    try {
      await dbClient.query(`
        INSERT INTO product_images (product_id, cloudflare_image_id, url, filename, is_primary, display_order)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        productId,
        key,
        `/api/images/${encodeURIComponent(key)}`,
        'test-chair.png',
        true,
        1
      ]);
    } finally {
      dbClient.release();
    }

    return key;
  } catch (error) {
    console.error('❌ Error uploading image:', error);
    throw error;
  }
}

async function main() {
  try {
    const client = await pool.connect();
    let productId;

    try {
      const result = await client.query('SELECT id FROM products ORDER BY id DESC LIMIT 1');

      if (result.rows.length === 0) {
        const productResult = await client.query(`
          INSERT INTO products (name, description, price, category, stock_quantity, slug)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id
        `, [
          'Modern Wooden Chair',
          'A beautiful handcrafted wooden chair with ergonomic design. Perfect for dining rooms or home offices.',
          12999.00,
          'furniture',
          10,
          'modern-wooden-chair'
        ]);

        productId = productResult.rows[0].id;
      } else {
        productId = result.rows[0].id;
      }
    } finally {
      client.release();
    }

    await uploadTestImage(productId);

  } catch (error) {
    console.error('❌ Failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
