const fs = require('fs');
const path = require('path');

async function convertSvgToPng() {
  const svgPath = path.join(__dirname, '../public/og-image.svg');
  const pngPath = path.join(__dirname, '../public/og-image.png');

  console.log('\n⚠️  Please convert the SVG to PNG manually:');
  console.log('1. Option A - Use online converter: https://cloudconvert.com/svg-to-png');
  console.log('2. Option B - Install sharp: npm install --save-dev sharp');
}

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
