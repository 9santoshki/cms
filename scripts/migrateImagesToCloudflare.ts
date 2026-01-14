/**
 * Migrate all Unsplash images to Cloudflare R2
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import { uploadImageToCloudflare } from '../src/lib/cloudflare';

interface ImageToMigrate {
  name: string;
  url: string;
  category: 'slider' | 'portfolio' | 'hero';
}

const imagesToMigrate: ImageToMigrate[] = [
  // Slider images (1920px width)
  {
    name: 'slider-modern-living-room',
    url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    category: 'slider'
  },
  {
    name: 'slider-classic-elegance',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    category: 'slider'
  },
  {
    name: 'slider-coastal-retreat',
    url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    category: 'slider'
  },

  // Portfolio/Product images (800px width)
  {
    name: 'portfolio-modern',
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'portfolio'
  },
  {
    name: 'portfolio-classic',
    url: 'https://images.unsplash.com/photo-1615529162924-f8605388463a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'portfolio'
  },
  {
    name: 'portfolio-coastal',
    url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'portfolio'
  },
  {
    name: 'portfolio-office',
    url: 'https://images.unsplash.com/photo-1442323822296-a34ce0d5fbc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'portfolio'
  },
  {
    name: 'portfolio-hotel',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'portfolio'
  },
  {
    name: 'portfolio-restaurant',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'portfolio'
  },

  // Hero image (1920px width)
  {
    name: 'hero-modern-office',
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    category: 'hero'
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

async function migrateImages() {
  console.log('🖼️  Migrating Images to Cloudflare R2\n');
  console.log(`📊 Total images to migrate: ${imagesToMigrate.length}\n`);

  const results: Array<{ name: string; url: string; success: boolean }> = [];

  for (let i = 0; i < imagesToMigrate.length; i++) {
    const image = imagesToMigrate[i];
    console.log(`\n[${i + 1}/${imagesToMigrate.length}] Processing: ${image.name}`);
    console.log(`  Category: ${image.category}`);

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
  console.log('\n\n📋 Migration Summary');
  console.log('='.repeat(80));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\n✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}\n`);

  if (successful.length > 0) {
    console.log('\n📝 URL Mapping for Code Updates:\n');

    // Group by category
    const sliderImages = successful.filter(r => r.name.startsWith('slider-'));
    const portfolioImages = successful.filter(r => r.name.startsWith('portfolio-'));
    const heroImages = successful.filter(r => r.name.startsWith('hero-'));

    if (sliderImages.length > 0) {
      console.log('SLIDER IMAGES (for Slider.tsx):');
      sliderImages.forEach(img => {
        console.log(`  ${img.name}: '${img.url}'`);
      });
      console.log('');
    }

    if (portfolioImages.length > 0) {
      console.log('PORTFOLIO IMAGES (for NewHomepageStylesElegant.ts):');
      portfolioImages.forEach(img => {
        console.log(`  ${img.name}: '${img.url}'`);
      });
      console.log('');
    }

    if (heroImages.length > 0) {
      console.log('HERO IMAGES (for NewHomepageStylesElegant.ts):');
      heroImages.forEach(img => {
        console.log(`  ${img.name}: '${img.url}'`);
      });
      console.log('');
    }
  }

  if (failed.length > 0) {
    console.log('\n❌ Failed Images:');
    failed.forEach(img => {
      console.log(`  - ${img.name}`);
    });
  }

  console.log('\n' + '='.repeat(80));

  process.exit(failed.length > 0 ? 1 : 0);
}

migrateImages();
