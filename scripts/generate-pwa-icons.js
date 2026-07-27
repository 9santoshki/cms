/**
 * Generate PWA icons from public/favicon.svg using sharp.
 * Outputs:
 *   - icon-192.png (192×192)
 *   - icon-512.png (512×512)
 *   - icon-maskable-192.png (192×192, icon in safe zone on brand bg)
 *   - icon-maskable-512.png (512×512, icon in safe zone on brand bg)
 *   - apple-touch-icon.png (180×180)
 *
 * Usage: node scripts/generate-pwa-icons.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SOURCE = path.join(PUBLIC_DIR, 'favicon.svg');
const BRAND_COLOR = '#c19a6b'; // Gold from theme
const WHITE = '#ffffff';

const SIZES = [
  { name: 'icon-192', width: 192, height: 192 },
  { name: 'icon-512', width: 512, height: 512 },
  { name: 'apple-touch-icon', width: 180, height: 180 },
];

// Maskable icon safe zone: icon occupies inner 70% of the canvas,
// with 15% padding on each side (total 30% padding).
// Chrome recommends at least 40% padding on each side for the safe zone,
// but since our icon is a house shape, 25% padding with 75% icon size
// centered on a brand-color background works well.
const MASKABLE_SIZES = [
  { name: 'icon-maskable-192', width: 192, height: 192 },
  { name: 'icon-maskable-512', width: 512, height: 512 },
];

async function generate() {
  // Ensure source exists
  if (!fs.existsSync(SOURCE)) {
    console.error(`Source file not found: ${SOURCE}`);
    process.exit(1);
  }

  const svgBuffer = fs.readFileSync(SOURCE);

  // ── Standard icons (white background) ──
  for (const { name, width, height } of SIZES) {
    console.log(`Generating ${name}.png (${width}×${height})...`);
    await sharp({
      create: { width, height, channels: 4, background: WHITE },
    })
      .composite([{ input: svgBuffer, width, height }])
      .png()
      .toFile(path.join(PUBLIC_DIR, `${name}.png`));
  }

  // ── Maskable icons (brand background, icon at 70% in center) ──
  for (const { name, width, height } of MASKABLE_SIZES) {
    console.log(`Generating ${name}.png (${width}×${height}, maskable)...`);

    // Parse the brand color to RGB values for sharp
    const r = parseInt(BRAND_COLOR.slice(1, 3), 16);
    const g = parseInt(BRAND_COLOR.slice(3, 5), 16);
    const b = parseInt(BRAND_COLOR.slice(5, 7), 16);

    // Icon occupies 70% of canvas, centered
    const iconSize = Math.round(width * 0.7);
    const offset = Math.round((width - iconSize) / 2);

    await sharp({
      create: { width, height, channels: 4, background: { r, g, b, alpha: 1 } },
    })
      .composite([{ input: svgBuffer, width: iconSize, height: iconSize, left: offset, top: offset }])
      .png()
      .toFile(path.join(PUBLIC_DIR, `${name}.png`));
  }

  console.log('\n✅ All PWA icons generated successfully!');
  console.log(`Output directory: ${PUBLIC_DIR}`);
}

generate().catch((err) => {
  console.error('Failed to generate PWA icons:', err);
  process.exit(1);
});
