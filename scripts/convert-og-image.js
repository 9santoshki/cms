const fs = require('fs');
const path = require('path');

// Simple SVG to PNG converter using canvas
async function convertSvgToPng() {
  console.log('Converting og-image.svg to og-image.png...');

  const svgPath = path.join(__dirname, '../public/og-image.svg');
  const pngPath = path.join(__dirname, '../public/og-image.png');

  console.log('SVG file exists:', fs.existsSync(svgPath));

  // For now, we'll use a web-based approach
  // You can use: https://cloudconvert.com/svg-to-png
  // Or install sharp: npm install sharp

  console.log('\n⚠️  Please convert the SVG to PNG manually:');
  console.log('1. Option A - Use online converter:');
  console.log('   - Visit: https://cloudconvert.com/svg-to-png');
  console.log('   - Upload: public/og-image.svg');
  console.log('   - Set dimensions: 1200x630');
  console.log('   - Download and save as: public/og-image.png');
  console.log('\n2. Option B - Use browser:');
  console.log('   - Open: http://localhost:3000/test-og-image.html');
  console.log('   - Right-click the image → Save as PNG');
  console.log('   - Save to: public/og-image.png');
  console.log('\n3. Option C - Install sharp and use automated conversion:');
  console.log('   npm install --save-dev sharp');
  console.log('   Then this script will auto-convert');
}

// Try to use sharp if available
try {
  const sharp = require('sharp');
  const svgPath = path.join(__dirname, '../public/og-image.svg');
  const pngPath = path.join(__dirname, '../public/og-image.png');

  sharp(svgPath)
    .png()
    .resize(1200, 630)
    .toFile(pngPath)
    .then(() => {
      console.log('✅ Successfully converted og-image.svg to og-image.png');
    })
    .catch((err) => {
      console.error('Error:', err.message);
      convertSvgToPng();
    });
} catch (e) {
  convertSvgToPng();
}
