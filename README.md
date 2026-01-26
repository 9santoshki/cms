# CMS - Color My Space

Interior design e-commerce platform with product sales and design consultation booking.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup PostgreSQL database
createdb cmsdb
createuser -P sk  # password: sk

# 3. Copy environment file
cp .env.local.example .env.local
# Edit .env.local with your credentials

# 4. Initialize database (ONE TIME ONLY)
npm run init-db

# 5. Start development server
npm run dev
```

Visit http://localhost:3000

## Tech Stack

- **Framework:** Next.js 16 + React 19 + TypeScript
- **Database:** PostgreSQL
- **Auth:** Google OAuth 2.0 + JWT
- **Payments:** Razorpay
- **Images:** Cloudflare R2 (private bucket with proxy)
- **State:** Zustand + React Context
- **Styling:** styled-components

## Environment Variables

Required in `.env.local`:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cmsdb
DB_USER=sk
DB_PASSWORD=sk

# Authentication
JWT_SECRET=your-secret-key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Payments
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Cloudflare R2 (Images)
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_access_key
CLOUDFLARE_R2_ENDPOINT=https://your_account_id.r2.cloudflarestorage.com
CLOUDFLARE_BUCKET=cms
CLOUDFLARE_PRODUCT_IMAGE_FOLDER=product_images

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAILS=admin@example.com
```

## Key Features

- Product catalog with search & filtering
- Shopping cart with persistence
- Checkout with Razorpay integration
- Design consultation booking
- Role-based access (Customer, Moderator, Admin)
- Admin dashboard
- Session management (30-day persistent login)
- Image management via Cloudflare R2

## ⚠️ Important: Database Safety

**NEVER run `npm run init-db` on production or UAT during deployment!**

Database initialization is **ONE TIME ONLY** at first setup. Regular deployments preserve all data.

See `CLAUDE.md` for full deployment documentation.

## Deployment

### UAT Deployment

```bash
# Deploy to UAT server
./scripts/uatdeploy.sh
```

### Production Deployment

```bash
# Promote to production branch
git checkout production
git merge master --no-ff
git tag -a v1.0.0 -m "Release description"

# Deploy to production server
./scripts/proddeploy.sh
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (auth, products, cart, orders, etc.)
│   ├── dashboard/         # Admin/moderator dashboard
│   └── [pages]/           # Public pages
├── components/            # React components
├── context/               # State management (Auth, Cart, Product, UI)
├── lib/
│   ├── db/               # Database operations
│   └── [utilities]       # API client, Cloudflare, Razorpay, etc.
├── store/                # Zustand stores
└── types/                # TypeScript interfaces
```

## Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
npm run init-db      # Initialize database (ONE TIME ONLY)
```

## Documentation

- **CLAUDE.md** - Comprehensive development & deployment guide
- **scripts/initDatabase.sql** - Complete database schema

## Live Sites

- **UAT:** https://uat.colourmyspace.com
- **Production:** https://www.colourmyspace.com

## Contact

Indiranagar, Bengaluru
+91 95133 51833
rajnishkumarranjan@gmail.com

Founder: Rajnish Kumar Ranjan (NIT Hamirpur, IIT Kharagpur)

## License

Proprietary - All rights reserved
