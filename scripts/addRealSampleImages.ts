/**
 * Script to add PNG sample images to products
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import sharp from 'sharp';
import { uploadImageToCloudflare } from '../src/lib/cloudflare';
import { addProductImage } from '../src/lib/db/productImages';
import { query } from '../src/lib/db/connection';

const PRODUCTS = [
  {
    id: '3321e060-2420-4c24-9134-5b9e44cb65ba',
    name: 'Classic Sofa',
    colors: ['#8B4513', '#A0522D', '#CD853F']
  },
  {
    id: 'd43675b5-74d8-4d13-9094-72dc249a6c85',
    name: 'Elegant Dining Chair',
    colors: ['#2F4F4F', '#696969', '#808080']
  },
  {
    id: '7e974e69-4407-46fb-8494-27e17c76a057',
    name: 'Modern Coffee Table',
    colors: ['#8B7355', '#D2B48C', '#F5DEB3']
  }
];

/**
 * Create a sample product image as PNG using Sharp
 */
async function createSamplePNG(color: string, productName: string, variant: number): Promise<Buffer> {
  // Parse hex color to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Create SVG first
  const svg = `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${variant}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0.3" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#grad${variant})"/>
  <circle cx="400" cy="250" r="80" fill="white" opacity="0.3"/>
  <rect x="340" y="190" width="120" height="120" fill="white" opacity="0.5" rx="10"/>
  <text x="400" y="400" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">
    ${productName}
  </text>
  <text x="400" y="440" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" opacity="0.8">
    Variant ${variant + 1}
  </text>
  <text x="400" y="570" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" opacity="0.5">
    Sample Product Image
  </text>
</svg>
  `.trim();

  // Convert SVG to PNG using Sharp
  const pngBuffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  return pngBuffer;
}

async function addSampleImages() {
  console.log('🖼️  Adding PNG Sample Images to Products\n');
  console.log('='.repeat(60));

  let totalUploaded = 0;
  let totalFailed = 0;

  for (const product of PRODUCTS) {
    console.log(`\n📦 Product: ${product.name}`);
    console.log('   ID:', product.id);

    // Clear existing images
    console.log('   🗑️  Clearing existing images...');
    await query('DELETE FROM product_images WHERE product_id = $1', [product.id]);

    // Upload 3 images per product
    for (let i = 0; i < product.colors.length; i++) {
      const color = product.colors[i];
      const isPrimary = i === 0;

      try {
        console.log(`   ⬆️  Uploading PNG image ${i + 1}/${product.colors.length}...`);

        // Create PNG image
        const imageBuffer = await createSamplePNG(color, product.name, i);
        const filename = `${product.name.toLowerCase().replace(/\s+/g, '-')}-${i + 1}.png`;

        // Upload to R2
        const uploadResult = await uploadImageToCloudflare(imageBuffer, filename);

        if (!uploadResult.success) {
          throw new Error('Upload failed');
        }

        // Save to database
        await addProductImage(
          product.id,
          uploadResult.result!.id,
          filename,
          isPrimary,
          i
        );

        console.log(`   ✅ PNG image ${i + 1} uploaded successfully`);
        console.log(`      Color: ${color}`);
        console.log(`      Primary: ${isPrimary ? 'Yes' : 'No'}`);
        console.log(`      Size: ${(imageBuffer.length / 1024).toFixed(2)} KB`);
        console.log(`      URL: ${uploadResult.result!.url}`);

        totalUploaded++;
      } catch (error: any) {
        console.error(`   ❌ Failed to upload image ${i + 1}:`, error.message);
        totalFailed++;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Summary:');
  console.log(`   ✅ Successfully uploaded: ${totalUploaded} PNG images`);
  console.log(`   ❌ Failed: ${totalFailed} images`);
  console.log(`   📦 Products updated: ${PRODUCTS.length}`);

  console.log('\n🎉 PNG sample images added successfully!\n');
  console.log('Next steps:');
  console.log('1. Visit: http://localhost:3000/shop');
  console.log('2. Visit: http://localhost:3000/test-images.html');
  console.log('3. Click on any product to see the images');

  process.exit(0);
}

addSampleImages().catch((error) => {
  console.error('\n❌ Error adding sample images:', error);
  process.exit(1);
});
