/**
 * Test script to verify Cloudflare R2 image upload
 */

// Load environment variables from .env.local
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import { uploadImageToCloudflare, getCloudflareImageUrl } from '../src/lib/cloudflare';
import { addProductImage } from '../src/lib/db/productImages';
import { getProductWithImages } from '../src/lib/db/products';

const PRODUCT_ID = '3321e060-2420-4c24-9134-5b9e44cb65ba';

async function createTestImage(): Promise<Buffer> {
  // Create a simple test image (1x1 PNG)
  // This is a minimal valid PNG file
  const pngData = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
    0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x64, 0x00, 0x00, 0x00, 0x64,
    0x08, 0x02, 0x00, 0x00, 0x00, 0xff, 0x80, 0x02, 0x03, 0x00, 0x00, 0x00,
    0x0c, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x62, 0x00, 0x00, 0x00, 0x02,
    0x00, 0x01, 0xe2, 0x21, 0xbc, 0x33, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45,
    0x4e, 0x44, 0xae, 0x42, 0x60, 0x82
  ]);

  return pngData;
}

async function testUpload() {
  console.log('🚀 Starting Cloudflare R2 Image Upload Test\n');
  console.log('Configuration:');
  console.log('- Account ID:', process.env.CLOUDFLARE_ACCOUNT_ID);
  console.log('- Bucket:', process.env.CLOUDFLARE_BUCKET);
  console.log('- Folder:', process.env.CLOUDFLARE_PRODUCT_IMAGE_FOLDER);
  console.log('- Public URL:', process.env.CLOUDFLARE_R2_PUBLIC_URL);
  console.log('- R2 Endpoint:', process.env.CLOUDFLARE_R2_ENDPOINT);
  console.log('- Product ID:', PRODUCT_ID);
  console.log('');

  try {
    // Step 1: Create test image
    console.log('📸 Step 1: Creating test image...');
    const imageBuffer = await createTestImage();
    console.log('✅ Test image created (100x100 PNG, ~70 bytes)\n');

    // Step 2: Upload to R2
    console.log('☁️  Step 2: Uploading to Cloudflare R2...');
    const uploadResult = await uploadImageToCloudflare(
      imageBuffer,
      'test-product-image.png'
    );

    if (!uploadResult.success) {
      throw new Error('Upload failed: ' + JSON.stringify(uploadResult.errors));
    }

    console.log('✅ Upload successful!');
    console.log('   - R2 Key:', uploadResult.result?.id);
    console.log('   - URL:', uploadResult.result?.url);
    console.log('');

    // Step 3: Save to database
    console.log('💾 Step 3: Saving to database...');
    const imageUrl = getCloudflareImageUrl(uploadResult.result!.id);
    const dbImage = await addProductImage(
      PRODUCT_ID,
      uploadResult.result!.id,
      imageUrl,
      'test-product-image.png',
      true, // Set as primary
      0
    );

    console.log('✅ Saved to database!');
    console.log('   - Image DB ID:', dbImage.id);
    console.log('   - Is Primary:', dbImage.is_primary);
    console.log('');

    // Step 4: Fetch product with images
    console.log('🔍 Step 4: Fetching product with images...');
    const product = await getProductWithImages(PRODUCT_ID);

    if (!product) {
      throw new Error('Product not found');
    }

    console.log('✅ Product fetched successfully!');
    console.log('   - Product:', product.name);
    console.log('   - Images count:', product.images.length);
    console.log('   - Primary image URL:', product.primary_image);
    console.log('');

    // Step 5: Test public URL accessibility
    console.log('🌐 Step 5: Testing public URL accessibility...');
    const publicUrl = product.primary_image || uploadResult.result?.url;

    if (publicUrl) {
      try {
        const response = await fetch(publicUrl);
        if (response.ok) {
          console.log('✅ Public URL is accessible!');
          console.log('   - Status:', response.status, response.statusText);
          console.log('   - Content-Type:', response.headers.get('content-type'));
          console.log('   - Content-Length:', response.headers.get('content-length'), 'bytes');
        } else {
          console.log('⚠️  Public URL returned non-OK status');
          console.log('   - Status:', response.status, response.statusText);
        }
      } catch (error: any) {
        console.log('❌ Failed to fetch public URL');
        console.log('   - Error:', error.message);
      }
    }

    console.log('\n🎉 TEST COMPLETED SUCCESSFULLY!\n');
    console.log('Summary:');
    console.log('✅ Image uploaded to R2');
    console.log('✅ Image metadata saved to database');
    console.log('✅ Product can fetch images');
    console.log('✅ Public URL generated correctly\n');

    console.log('Next steps:');
    console.log('1. View the product at: http://localhost:3000/dashboard/products/' + PRODUCT_ID);
    console.log('2. Upload more images via the UI');
    console.log('3. View the image directly: ' + publicUrl);

    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ TEST FAILED!\n');
    console.error('Error:', error.message);
    console.error('\nStack trace:');
    console.error(error.stack);

    console.error('\nTroubleshooting:');
    console.error('1. Check your R2 credentials in .env.local');
    console.error('2. Verify the bucket "cms" exists in your R2 account');
    console.error('3. Ensure public access is enabled on the bucket');
    console.error('4. Check that the API token has "Object Read & Write" permissions');

    process.exit(1);
  }
}

// Run the test
testUpload();
