const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Pool } = require('pg');
const https = require('https');

// Load environment variables
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

// Download image from Unsplash
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
  });
}

async function uploadImageFromUrl(productId, imageUrl, filename) {
  const client = getR2Client();
  const bucket = process.env.CLOUDFLARE_BUCKET;
  const folder = process.env.CLOUDFLARE_PRODUCT_IMAGE_FOLDER || 'product_images';

  if (!bucket) {
    throw new Error('Missing CLOUDFLARE_BUCKET in .env.local');
  }

  console.log(`\n📥 Downloading image from Unsplash...`);
  const imageBuffer = await downloadImage(imageUrl);
  console.log(`✅ Downloaded ${imageBuffer.length} bytes`);

  // Generate unique key
  const timestamp = Date.now();
  const key = `${folder}/${timestamp}-${filename}`;

  console.log(`\n📤 Uploading to Cloudflare R2...`);
  console.log(`Bucket: ${bucket}`);
  console.log(`Key: ${key}`);

  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: imageBuffer,
      ContentType: 'image/jpeg',
    });

    await client.send(command);
    console.log('✅ Image uploaded to R2 successfully!');

    // Clear old images and insert new one
    const dbClient = await pool.connect();
    try {
      await dbClient.query('DELETE FROM product_images WHERE product_id = $1', [productId]);
      console.log('🗑️  Cleared old product images');

      await dbClient.query(`
        INSERT INTO product_images (product_id, cloudflare_image_id, url, filename, is_primary, display_order)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        productId,
        key,
        `/api/images/${encodeURIComponent(key)}`,
        filename,
        true,
        1
      ]);
      console.log('✅ Image record added to database!');
      console.log(`\nImage URL: /api/images/${encodeURIComponent(key)}`);
      console.log(`\n🌐 View product: http://localhost:3000/shop`);
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
    // Get first product
    const client = await pool.connect();
    let productId;

    try {
      const result = await client.query('SELECT id, name FROM products ORDER BY id DESC LIMIT 1');

      if (result.rows.length === 0) {
        console.log('❌ No products found. Please create a product first.');
        process.exit(1);
      }

      productId = result.rows[0].id;
      console.log(`📦 Product: ${result.rows[0].name} (ID: ${productId})`);
    } finally {
      client.release();
    }

    // Upload a nice modern chair image from Unsplash
    const imageUrl = 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80';
    await uploadImageFromUrl(productId, imageUrl, 'modern-chair.jpg');

    console.log('\n✅ All done! Refresh http://localhost:3000/shop to see your product image');

  } catch (error) {
    console.error('\n❌ Failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
