# Quick Image Reference Guide

## ✅ All Images Now Use Secure Proxy Access

### What Changed
All 26 R2 images across the site now use the private bucket proxy endpoint instead of public URLs.

### Files Updated
1. `src/components/Slider.tsx` - Homepage hero slider (3 images)
2. `src/styles/NewHomepageStylesElegant.ts` - Homepage hero + portfolio (13 images)
3. `src/styles/ConsultationStyles.ts` - Booking page hero (1 image)
4. `src/styles/NewAboutStyles.ts` - About page hero (1 image)
5. `src/styles/ElegantServicesStyles.ts` - Services page hero (1 image)
6. `src/styles/NewPortfolioStyles.ts` - Portfolio page + categories (7 images)

### Required Credentials (Already Configured)

These environment variables are already set in `.env.local`, `.env.uat`, and `.env.production`:

```bash
CLOUDFLARE_R2_ACCESS_KEY_ID=571e379bd8e7eccabbce25bf3bb1cd9d
CLOUDFLARE_R2_SECRET_ACCESS_KEY=6b3501694543f2c04cb6553bbda2131862126b61d668a38e20d18ecacd040631
CLOUDFLARE_R2_ENDPOINT=https://7560373c1aaf7a0c82a0788ec9d59be7.r2.cloudflarestorage.com
CLOUDFLARE_BUCKET=cms
```

**Note:** `CLOUDFLARE_R2_TOKEN_VALUE` is **NOT needed** for image operations!

### Image URL Format

```typescript
// ✅ CORRECT - Always use this format
'/api/images/product_images%2F{filename}.jpg'

// ❌ NEVER USE - Public URLs won't work
'https://pub-*.r2.dev/product_images/{filename}.jpg'
```

### Quick Test

```bash
# Test all images are working
node scripts/verifyR2Images.js

# Expected output: "13 passed, 0 failed"
```

### Pages Affected

All these pages now load images securely:
- ✅ Homepage (`/`) - Slider + portfolio
- ✅ Shop (`/shop`) - Product images
- ✅ Portfolio (`/portfolio`) - Hero + categories
- ✅ About (`/about`) - Hero background
- ✅ Services (`/services`) - Hero background
- ✅ Booking (`/booking`) - Hero background

### For Developers

When adding new images:

```typescript
// 1. Upload to R2 (get the key)
const key = 'product_images/1234567890-image.jpg';

// 2. Always encode and use proxy format
const imageUrl = `/api/images/${encodeURIComponent(key)}`;

// 3. Never hardcode public R2 URLs
```

### Verification Checklist

- ✅ No public R2 URLs in codebase (`https://pub-*.r2.dev`)
- ✅ All images use proxy endpoint (`/api/images/...`)
- ✅ R2 credentials in environment files
- ✅ Test script passes (`node scripts/verifyR2Images.js`)
- ✅ All pages load images in browser

### Deployment

No special steps needed! Everything works automatically because:
- ✅ Environment files already have R2 credentials
- ✅ Proxy endpoint is part of the application
- ✅ Images already in R2 bucket

Just deploy as usual:
```bash
./scripts/uatdeploy.sh    # UAT
./scripts/proddeploy.sh   # Production
```

## Summary

**Before:** 26 public R2 URLs ❌
**After:** 26 secure proxy endpoints ✅

All images now use authenticated R2 access with no deployment changes needed!
