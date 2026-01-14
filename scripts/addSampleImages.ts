/**
 * Script to add sample images to products
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import { uploadImageToCloudflare } from '../src/lib/cloudflare';
import { addProductImage } from '../src/lib/db/productImages';
import { query } from '../src/lib/db/connection';

// Sample product IDs from database
const PRODUCTS = [
  {
    id: '3321e060-2420-4c24-9134-5b9e44cb65ba',
    name: 'Classic Sofa',
    colors: ['#8B4513', '#A0522D', '#CD853F'] // Brown shades
  },
  {
    id: 'd43675b5-74d8-4d13-9094-72dc249a6c85',
    name: 'Elegant Dining Chair',
    colors: ['#2F4F4F', '#696969', '#808080'] // Gray shades
  },
  {
    id: '7e974e69-4407-46fb-8494-27e17c76a057',
    name: 'Modern Coffee Table',
    colors: ['#8B7355', '#D2B48C', '#F5DEB3'] // Tan shades
  }
];

/**
 * Create a sample product image with color and text
 */
function createSampleImage(color: string, productName: string, variant: number): Buffer {
  // Create an SVG image
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="600" fill="${color}"/>

  <!-- Gradient overlay -->
  <defs>
    <linearGradient id="grad${variant}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0.3" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#grad${variant})"/>

  <!-- Product placeholder icon -->
  <circle cx="400" cy="250" r="80" fill="white" opacity="0.3"/>
  <rect x="340" y="190" width="120" height="120" fill="white" opacity="0.5" rx="10"/>

  <!-- Text -->
  <text x="400" y="400" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">
    ${productName}
  </text>
  <text x="400" y="440" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" opacity="0.8">
    Sample Image ${variant + 1}
  </text>

  <!-- Watermark -->
  <text x="400" y="570" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" opacity="0.5">
    Demo Product Image
  </text>
</svg>`;

  return Buffer.from(svg);
}

async function addSampleImages() {
  console.log('🖼️  Adding Sample Images to Products\n');
  console.log('='.repeat(60));

  let totalUploaded = 0;
  let totalFailed = 0;

  for (const product of PRODUCTS) {
    console.log(`\n📦 Product: ${product.name}`);
    console.log('   ID:', product.id);

    // Clear existing images for this product
    console.log('   🗑️  Clearing existing images...');
    await query('DELETE FROM product_images WHERE product_id = $1', [product.id]);

    // Upload 3 images per product (one for each color)
    for (let i = 0; i < product.colors.length; i++) {
      const color = product.colors[i];
      const isPrimary = i === 0; // First image is primary

      try {
        console.log(`   ⬆️  Uploading image ${i + 1}/${product.colors.length}...`);

        // Create sample image
        const imageBuffer = createSampleImage(color, product.name, i);
        const filename = `${product.name.toLowerCase().replace(/\s+/g, '-')}-${i + 1}.svg`;

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

        console.log(`   ✅ Image ${i + 1} uploaded successfully`);
        console.log(`      Color: ${color}`);
        console.log(`      Primary: ${isPrimary ? 'Yes' : 'No'}`);
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
  console.log(`   ✅ Successfully uploaded: ${totalUploaded} images`);
  console.log(`   ❌ Failed: ${totalFailed} images`);
  console.log(`   📦 Products updated: ${PRODUCTS.length}`);

  console.log('\n🎉 Sample images added successfully!\n');
  console.log('Next steps:');
  console.log('1. Visit: http://localhost:3000/shop');
  console.log('2. Visit: http://localhost:3000/dashboard/products');
  console.log('3. Click on any product to see the images');

  process.exit(0);
}

// Run the script
addSampleImages().catch((error) => {
  console.error('\n❌ Error adding sample images:', error);
  process.exit(1);
});
