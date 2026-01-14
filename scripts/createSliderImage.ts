/**
 * Create elegant slider image for Classic Elegance
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import sharp from 'sharp';
import { uploadImageToCloudflare } from '../src/lib/cloudflare';

async function createClassicEleganceImage(): Promise<Buffer> {
  // Create SVG for a classic elegant interior design
  const svg = `
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="elegantGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B7355;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#D4AF37;stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#2C1810;stop-opacity:1" />
    </linearGradient>
    <pattern id="texture" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="#8B7355" opacity="0.05"/>
      <circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/>
    </pattern>
  </defs>

  <!-- Background with gradient -->
  <rect width="1920" height="1080" fill="url(#elegantGrad)"/>
  <rect width="1920" height="1080" fill="url(#texture)"/>

  <!-- Decorative frame -->
  <rect x="100" y="100" width="1720" height="880" fill="none" stroke="#D4AF37" stroke-width="3" opacity="0.4"/>
  <rect x="120" y="120" width="1680" height="840" fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.3"/>

  <!-- Central ornament -->
  <circle cx="960" cy="540" r="250" fill="white" opacity="0.05"/>
  <circle cx="960" cy="540" r="200" fill="white" opacity="0.08"/>

  <!-- Decorative corners -->
  <path d="M 150 150 L 250 150 L 250 160 L 160 160 L 160 250 L 150 250 Z" fill="#D4AF37" opacity="0.5"/>
  <path d="M 1770 150 L 1670 150 L 1670 160 L 1760 160 L 1760 250 L 1770 250 Z" fill="#D4AF37" opacity="0.5"/>
  <path d="M 150 930 L 250 930 L 250 920 L 160 920 L 160 830 L 150 830 Z" fill="#D4AF37" opacity="0.5"/>
  <path d="M 1770 930 L 1670 930 L 1670 920 L 1760 920 L 1760 830 L 1770 830 Z" fill="#D4AF37" opacity="0.5"/>

  <!-- Classic furniture silhouettes -->
  <!-- Elegant sofa -->
  <g opacity="0.15" fill="white">
    <rect x="600" y="600" width="720" height="280" rx="20"/>
    <ellipse cx="680" cy="600" rx="60" ry="40"/>
    <ellipse cx="960" cy="600" rx="60" ry="40"/>
    <ellipse cx="1240" cy="600" rx="60" ry="40"/>
    <!-- Sofa arms -->
    <rect x="580" y="620" width="40" height="200" rx="10"/>
    <rect x="1300" y="620" width="40" height="200" rx="10"/>
  </g>

  <!-- Coffee table -->
  <g opacity="0.12" fill="white">
    <rect x="700" y="900" width="520" height="20" rx="5"/>
    <rect x="720" y="920" width="20" height="60"/>
    <rect x="1180" y="920" width="20" height="60"/>
  </g>

  <!-- Decorative lamp -->
  <g opacity="0.15" fill="#D4AF37">
    <rect x="380" y="850" width="8" height="120"/>
    <path d="M 340 850 Q 384 820 428 850" fill="none" stroke="#D4AF37" stroke-width="6"/>
    <ellipse cx="384" cy="865" rx="50" ry="15"/>
  </g>

  <!-- Main text -->
  <text x="960" y="380" font-family="Georgia, serif" font-size="96" font-weight="bold"
        fill="white" text-anchor="middle" letter-spacing="8">
    CLASSIC ELEGANCE
  </text>

  <text x="960" y="450" font-family="Georgia, serif" font-size="32"
        fill="white" text-anchor="middle" opacity="0.9" letter-spacing="4">
    TIMELESS DESIGN • REFINED DETAILS
  </text>

  <!-- Decorative line -->
  <line x1="660" y1="490" x2="1260" y2="490" stroke="#D4AF37" stroke-width="2" opacity="0.6"/>
  <circle cx="660" cy="490" r="4" fill="#D4AF37" opacity="0.8"/>
  <circle cx="1260" cy="490" r="4" fill="#D4AF37" opacity="0.8"/>

  <!-- Subtitle -->
  <text x="960" y="530" font-family="Georgia, serif" font-size="24" font-style="italic"
        fill="white" text-anchor="middle" opacity="0.7">
    Sophisticated spaces that combine traditional elegance with modern comfort
  </text>

  <!-- Bottom ornamental text -->
  <text x="960" y="1020" font-family="Georgia, serif" font-size="18"
        fill="#D4AF37" text-anchor="middle" opacity="0.5" letter-spacing="6">
    INTERIOR DESIGN EXCELLENCE
  </text>
</svg>
  `.trim();

  // Convert to PNG
  const pngBuffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  return pngBuffer;
}

async function uploadSliderImage() {
  console.log('🎨 Creating Classic Elegance Slider Image\n');

  try {
    console.log('📸 Generating elegant design...');
    const imageBuffer = await createClassicEleganceImage();
    console.log(`✅ Image created (${(imageBuffer.length / 1024).toFixed(2)} KB)\n`);

    console.log('☁️  Uploading to Cloudflare R2...');
    const uploadResult = await uploadImageToCloudflare(
      imageBuffer,
      'slider-classic-elegance.png'
    );

    if (uploadResult.success && uploadResult.result) {
      console.log('✅ Upload successful!\n');
      console.log('Image Details:');
      console.log('  URL:', uploadResult.result.url);
      console.log('  Key:', uploadResult.result.id);
      console.log('\n📋 Update your Slider.tsx file:');
      console.log(`  imageUrl: '${uploadResult.result.url}'`);
      console.log('\nReplace line 29 in src/components/Slider.tsx with the URL above.');
    } else {
      throw new Error('Upload failed');
    }

    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

uploadSliderImage();
