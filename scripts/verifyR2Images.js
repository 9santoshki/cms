/**
 * Verify all R2 images are accessible through proxy endpoint
 * Tests that slider, hero, and portfolio images load correctly
 */

const http = require('http');

const testImages = [
  // Slider images
  '/api/images/product_images%2F1767927653531-x2pjprnjaw-slider-modern-living-room.jpg',
  '/api/images/product_images%2F1767927655512-p6cyjrf7cy-slider-classic-elegance.jpg',
  '/api/images/product_images%2F1767927656389-9s5gz1zz4c4-slider-coastal-retreat.jpg',

  // Hero images
  '/api/images/product_images%2F1767927658910-uprpaph78yh-hero-modern-office.jpg',
  '/api/images/product_images%2F1767928644452-6a7vh9bf8fn-consultation-hero.jpg',
  '/api/images/product_images%2F1767928799547-5xb59u8o1aa-about-hero.jpg',
  '/api/images/product_images%2F1767928400633-5ag0gec9a4i-services-hero.jpg',

  // Portfolio images
  '/api/images/product_images%2F1767927656951-4l8ihxmzbpv-portfolio-modern.jpg',
  '/api/images/product_images%2F1767927752411-djoibj8v0mv-portfolio-classic.jpg',
  '/api/images/product_images%2F1767927657557-5gupsrfjnxk-portfolio-coastal.jpg',
  '/api/images/product_images%2F1767927752946-qy6cbzlqq8-portfolio-office.jpg',
  '/api/images/product_images%2F1767927658162-r7b41efd26-portfolio-hotel.jpg',
  '/api/images/product_images%2F1767927658512-sle3q538dgl-portfolio-restaurant.jpg',
];

function testImage(url) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: url,
      method: 'HEAD',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      resolve({
        url,
        status: res.statusCode,
        success: res.statusCode === 200
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        success: false,
        error: err.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        success: false
      });
    });

    req.end();
  });
}

async function main() {
  console.log('🔍 Verifying R2 images through proxy endpoint...\n');
  console.log(`Testing ${testImages.length} images...\n`);

  const results = await Promise.all(testImages.map(testImage));

  let passed = 0;
  let failed = 0;

  results.forEach((result, index) => {
    const icon = result.success ? '✅' : '❌';
    const status = result.success ? 'OK' : `FAILED (${result.status})`;
    console.log(`${icon} [${index + 1}/${testImages.length}] ${status}`);

    if (!result.success) {
      console.log(`   URL: ${result.url}`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    }

    if (result.success) {
      passed++;
    } else {
      failed++;
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(60));

  if (failed === 0) {
    console.log('\n✅ All R2 images are accessible through proxy endpoint!');
    console.log('\n📝 Summary:');
    console.log('   - Slider images: ✅');
    console.log('   - Hero images: ✅');
    console.log('   - Portfolio images: ✅');
    console.log('\n🎉 All pages should now display images correctly!');
    process.exit(0);
  } else {
    console.log('\n❌ Some images failed to load.');
    console.log('   Check that:');
    console.log('   1. Dev server is running (npm run dev)');
    console.log('   2. Images exist in R2 bucket');
    console.log('   3. R2 credentials in .env.local are correct');
    process.exit(1);
  }
}

main();
