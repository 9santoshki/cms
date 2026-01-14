/**
 * Download and upload about hero image to Cloudflare R2
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import { uploadImageToCloudflare } from '../src/lib/cloudflare';

async function downloadImage(url: string): Promise<Buffer> {
  console.log(`  📥 Downloading from Unsplash...`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function downloadAboutHeroImage() {
  console.log('🖼️  Downloading About Hero Image\n');

  // Beautiful modern design studio/team workspace image
  const imageUrl = 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';

  try {
    // Download image
    const imageBuffer = await downloadImage(imageUrl);
    console.log(`  ✅ Downloaded (${(imageBuffer.length / 1024).toFixed(2)} KB)`);

    // Upload to Cloudflare R2
    console.log(`  ☁️  Uploading to R2...`);
    const uploadResult = await uploadImageToCloudflare(
      imageBuffer,
      'about-hero.jpg'
    );

    if (uploadResult.success && uploadResult.result) {
      console.log(`  ✅ Uploaded successfully!`);
      console.log(`  🔗 R2 URL: ${uploadResult.result.url}`);

      console.log('\n📝 Update NewAboutStyles.ts:');
      console.log(`  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),`);
      console.log(`              url('${uploadResult.result.url}');`);
    } else {
      throw new Error('Upload failed');
    }

    process.exit(0);
  } catch (error: any) {
    console.error(`  ❌ Error: ${error.message}`);
    process.exit(1);
  }
}

downloadAboutHeroImage();
