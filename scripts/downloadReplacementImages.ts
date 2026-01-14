/**
 * Download replacement images for failed portfolio images
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import { uploadImageToCloudflare } from '../src/lib/cloudflare';

interface ImageToDownload {
  name: string;
  url: string;
}

const replacementImages: ImageToDownload[] = [
  {
    name: 'portfolio-classic',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Classic elegant living room
  },
  {
    name: 'portfolio-office',
    url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Modern office space
  }
];

async function downloadImage(url: string): Promise<Buffer> {
  console.log(`  📥 Downloading from Unsplash...`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function downloadReplacementImages() {
  console.log('🖼️  Downloading Replacement Images\n');

  const results: Array<{ name: string; url: string; success: boolean }> = [];

  for (let i = 0; i < replacementImages.length; i++) {
    const image = replacementImages[i];
    console.log(`\n[${i + 1}/${replacementImages.length}] Processing: ${image.name}`);

    try {
      // Download image
      const imageBuffer = await downloadImage(image.url);
      console.log(`  ✅ Downloaded (${(imageBuffer.length / 1024).toFixed(2)} KB)`);

      // Upload to Cloudflare R2
      console.log(`  ☁️  Uploading to R2...`);
      const uploadResult = await uploadImageToCloudflare(
        imageBuffer,
        `${image.name}.jpg`
      );

      if (uploadResult.success && uploadResult.result) {
        console.log(`  ✅ Uploaded successfully!`);
        console.log(`  🔗 R2 URL: ${uploadResult.result.url}`);

        results.push({
          name: image.name,
          url: uploadResult.result.url,
          success: true
        });
      } else {
        throw new Error('Upload failed');
      }

    } catch (error: any) {
      console.error(`  ❌ Error: ${error.message}`);
      results.push({
        name: image.name,
        url: '',
        success: false
      });
    }
  }

  // Print summary
  console.log('\n\n📋 Download Summary');
  console.log('='.repeat(80));

  const successful = results.filter(r => r.success);
  console.log(`\n✅ Successful: ${successful.length}/${results.length}\n`);

  if (successful.length > 0) {
    console.log('📝 Update NewHomepageStylesElegant.ts:\n');
    successful.forEach(img => {
      console.log(`${img.name}:`);
      console.log(`  background-image: url('${img.url}');\n`);
    });
  }

  console.log('='.repeat(80));

  process.exit(0);
}

downloadReplacementImages();
