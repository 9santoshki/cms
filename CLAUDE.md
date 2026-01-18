# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CMS (Color My Space) is an interior design e-commerce and service booking platform built with Next.js 16, React 19, and TypeScript. It features product sales, appointment booking for design consultations, and an admin dashboard.

## Development Commands

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run init-db      # Initialize PostgreSQL database
```

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Database:** PostgreSQL (local, using `pg` library)
- **Auth:** Google OAuth 2.0 with custom JWT tokens (cookie-based sessions)
- **State:** Zustand (cart persistence) + React Context (auth, UI)
- **Styling:** styled-components with SSR
- **Payments:** Razorpay integration
- **Images:** Cloudflare Images

## Architecture

### Directory Structure

```
src/
├── app/                 # Next.js App Router pages and API routes
│   ├── api/             # REST API endpoints
│   ├── dashboard/       # Admin/moderator dashboard pages
│   └── [pages]/         # Public pages (shop, cart, checkout, etc.)
├── lib/
│   ├── db/              # Database layer (connection.ts, auth.ts, products.ts, etc.)
│   └── [utilities]      # API client, auth helpers, cloudflare, razorpay
├── components/          # React components
├── context/             # React Context providers (Auth, Cart, UI, Product)
├── store/               # Zustand stores (cartStore.ts)
├── styles/              # styled-components style files
├── types/               # TypeScript interfaces
└── middleware.ts        # Route protection middleware
```

### Database Layer (`src/lib/db/`)

All database operations go through dedicated modules:
- `connection.ts` - PostgreSQL connection pool (max 20 connections)
- `auth.ts` - JWT generation, session management, user lookups
- `products.ts` - Product CRUD operations
- `orders.ts` - Order processing with transactions
- `cart.ts` - Cart operations
- `appointments.ts` - Appointment booking

**Key Database Tables:**
- `users` - User accounts with roles (customer, moderator, admin)
- `sessions` - JWT session tracking with `last_activity` timestamp
- `products` - Product catalog with `price`, `original_price`, `sale_price`, and `image_url` (legacy Cloudflare R2 URL)
- `product_images` - Product image gallery with Cloudflare R2 image IDs, URLs, and display order
- `orders` - Order records with payment details
- `order_items` - Order line items
- `cart` - Shopping cart items (user_id, product_id, quantity)
- `appointments` - Design consultation bookings with optional guest fields (guest_name, guest_email, guest_phone)
- `reviews` - Product reviews with rating (1-5), comment, and status (pending/approved/rejected)
- `temp_auth_tokens` - Temporary OAuth tokens for OAuth flow

### Authentication Flow

1. User clicks "Sign in with Google" → redirects to Google OAuth
2. Google redirects back to `/auth/callback` with authorization code
3. Client-side page (`/auth/callback/page.tsx`) forwards to `/api/auth/google/callback?code=...`
4. Backend exchanges code for tokens, creates/updates user, generates JWT
5. JWT stored in httpOnly `cms-session` cookie (30-day expiration)
6. Middleware protects routes: `/account`, `/cart`, `/checkout`, `/orders`
7. API routes verify JWT via `validateSession()` from `src/lib/db/auth.ts`

**Session Validation:**
- Sessions are validated on every request using `validateSession()` or `getSessionFromCookieWithDB()`
- The validation function verifies the JWT, checks database session expiry, and **fetches the current user profile from the database**
- This ensures role changes (customer → admin) take effect immediately without requiring logout/login
- User role is always read from the database, not from the stale JWT token

**OAuth Callback URI Configuration:**
- Local: `http://localhost:3000/auth/callback`
- Production: `https://uat.colourmyspace.com/auth/callback`
- Must be added to Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs

### State Management

- **AuthContext** - User session, sign in/out
- **cartStore (Zustand)** - Persistent cart with localStorage + server sync
- **ProductContext** - Product list caching
- **UIContext** - Modals, loading states

### Image Storage Architecture

**All product images are stored in Cloudflare R2 (S3-compatible object storage), NOT in the database.**

- **Storage:** Cloudflare R2 bucket (configured via `CLOUDFLARE_BUCKET` env var)
- **Upload:** Images uploaded via `src/lib/cloudflare.ts` using AWS S3 SDK
- **Access:** Public URLs served from `CLOUDFLARE_R2_PUBLIC_URL`
- **Database Tables:**
  - `products.image_url` - Legacy single image URL (full Cloudflare R2 public URL)
  - `product_images` - Multiple images per product with gallery support

**Important:** The database stores only image metadata (Cloudflare image ID, URL, filename), not image data. Actual image files are in Cloudflare R2.

**Product Images Table Structure:**
```sql
product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  cloudflare_image_id VARCHAR(255),  -- R2 object key
  url TEXT,                          -- Full public URL
  filename VARCHAR(255),             -- Original filename
  is_primary BOOLEAN,                -- Primary image for product listing
  display_order INTEGER,             -- Order in gallery
  created_at TIMESTAMP
)
```

**Image Upload Flow:**
1. Admin uploads image(s) via dashboard `/dashboard/products/[id]`
2. Images uploaded to Cloudflare R2 via `uploadImageToCloudflare()`
3. R2 returns object key (e.g., `product_images/1234567890-abc123-image.jpg`)
4. Public URL constructed as `${CLOUDFLARE_R2_PUBLIC_URL}/${key}`
5. Metadata saved to `product_images` table via `addProductImage()`
6. Product API returns `primary_image` URL from the image marked as `is_primary = true`

### API Response Format

```typescript
{
  success: boolean;
  data: T | null;
  message?: string;
  error?: string;
}
```

## Key Files

- `src/lib/db/connection.ts` - Database pool configuration
- `src/lib/db/auth.ts` - JWT and session handling with database role validation
- `src/lib/db/products.ts` - Product database operations
- `src/lib/db/productImages.ts` - Product image gallery operations
- `src/lib/db/cart.ts` - Shopping cart operations (table: `cart`)
- `src/lib/db/reviews.ts` - Product reviews operations
- `src/lib/db/appointments.ts` - Appointment booking operations
- `src/lib/cloudflare.ts` - Cloudflare R2 image upload/delete utilities
- `src/lib/api.ts` - Client-side API wrapper class
- `src/store/cartStore.ts` - Zustand cart store with server sync
- `src/context/AppProvider.tsx` - Composite context provider
- `src/middleware.ts` - Route protection
- `scripts/initDatabase.sql` - Complete database schema initialization

## Environment Variables

Required in `.env.local` (development) and `.env.production` (production):
```
DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
JWT_SECRET
NEXT_PUBLIC_APP_URL (https://uat.colourmyspace.com for production, http://localhost:3000 for dev)
NEXT_PUBLIC_GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
ADMIN_EMAILS
CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY
CLOUDFLARE_R2_ENDPOINT, CLOUDFLARE_R2_TOKEN_VALUE, CLOUDFLARE_BUCKET
CLOUDFLARE_PRODUCT_IMAGE_FOLDER, CLOUDFLARE_R2_PUBLIC_URL
```

**Note:** Variables starting with `NEXT_PUBLIC_` are bundled into the client build and require a rebuild after changes.

## Deployment

**Production Server:** DigitalOcean Droplet (104.236.245.179)
**Domain:** https://uat.colourmyspace.com
**Process Manager:** PM2 (app name: `cms-app`)
**Node.js Version:** 20.20.0 (required for Next.js 16)

### Deployment Scripts

```bash
./scripts/uatdeploy.sh      # Build locally and deploy to server
./scripts/deploy-env.sh     # Deploy .env.production to server
./scripts/check-oauth.sh    # Diagnose OAuth configuration issues
```

### Deployment Process

1. Build locally with `NODE_ENV=production npm run build` (automatically handled by deploy script)
2. Create tarball of `.next`, `package.json`, `src/`, `public/`, `scripts/`, and config files
3. Upload to server at `/home/cms/app`
4. Install dependencies with `npm install --production`
5. Restart PM2 process

### First-Time Server Setup

**IMPORTANT:** On first deployment or when setting up a new server, you MUST:

1. **Set up PostgreSQL database and user**:
```bash
# Create PostgreSQL user and database
sudo -u postgres psql << 'EOF'
CREATE USER cms_user WITH PASSWORD 'cms_dbpass12!';
CREATE DATABASE cms_db OWNER cms_user;

-- Grant all permissions to cms_user
GRANT ALL PRIVILEGES ON DATABASE cms_db TO cms_user;
\c cms_db
GRANT ALL PRIVILEGES ON SCHEMA public TO cms_user;
ALTER SCHEMA public OWNER TO cms_user;

-- Grant default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO cms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO cms_user;
EOF
```

2. **Configure PostgreSQL authentication** (if using password authentication):
```bash
# Edit pg_hba.conf to allow password authentication
sudo nano /etc/postgresql/14/main/pg_hba.conf
# (adjust version number: 12, 13, 14, 15, etc.)

# Find lines like:
# local   all             all                                     peer

# Change to:
# local   all             all                                     md5

# Save (Ctrl+O, Enter, Ctrl+X)

# Restart PostgreSQL
sudo systemctl restart postgresql
```

3. **Create `.env.production` on the server** (not included in deployment tarball):
```bash
cd /home/cms/app
nano .env.production

# Add all required environment variables (see Environment Variables section)
# Make sure DB_PASSWORD matches the password set in step 1
# Save and exit (Ctrl+O, Enter, Ctrl+X)
```

4. **Initialize the database schema**:
```bash
cd /home/cms/app
npm run init-db

# Should show:
# Loading environment from: .env.production
# Connected to PostgreSQL database
# ✅ Database initialized successfully!
# Tables created:
#   - users
#   - sessions
#   - temp_auth_tokens
#   - products
#   - product_images
#   - orders
#   - order_items
#   - cart
#   - appointments
#   - reviews
```

5. **Start the application**:
```bash
pm2 start npm --name cms-app -- start
# or if already running:
pm2 restart cms-app

# Check logs to verify everything is working
pm2 logs cms-app --lines 50
```

### Troubleshooting Database Issues

**If you get "permission denied for schema public":**
```bash
sudo -u postgres psql -d cms_db
GRANT ALL PRIVILEGES ON SCHEMA public TO cms_user;
ALTER SCHEMA public OWNER TO cms_user;
GRANT ALL ON ALL TABLES IN SCHEMA public TO cms_user;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO cms_user;
\q
```

**If you get "password authentication failed":**
```bash
# Reset the password
sudo -u postgres psql
ALTER USER cms_user WITH PASSWORD 'cms_dbpass12!';
\q

# Make sure .env.production has the matching password
```

**If tables already exist and you need to recreate them:**
```bash
sudo -u postgres psql -d cms_db
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS temp_auth_tokens CASCADE;
DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;
\q

# Then run init-db again
npm run init-db
```

**Important Notes:**
- `.env.production` must be created manually on the server (security: not included in deployment)
- The `init-db` script automatically detects and uses `.env.production` when available
- Variables starting with `NEXT_PUBLIC_` are embedded at build time and require a rebuild to take effect
- Database initialization only needs to be run once (or when schema changes)
- Always ensure `cms_user` has full permissions on the `cms_db` database and `public` schema

## Database Architecture

### Data Types
- **Primary Keys:** `SERIAL` (auto-incrementing INTEGER), not UUID
- **Foreign Keys:** INTEGER references to parent tables
- **Timestamps:** `TIMESTAMP WITH TIME ZONE` for created_at/updated_at
- **Prices:** `DECIMAL(10, 2)` for currency values
- **Status Fields:** VARCHAR with CHECK constraints

### Important Notes on Local Development
- Local database must match production schema exactly (INTEGER IDs, not UUID)
- If you encounter UUID-related errors, recreate local database:
  ```bash
  PGPASSWORD=<password> psql -h localhost -U <user> -d postgres -c "DROP DATABASE IF EXISTS cmsdb;"
  PGPASSWORD=<password> psql -h localhost -U <user> -d postgres -c "CREATE DATABASE cmsdb OWNER <user>;"
  npm run init-db
  ```
- Always use parameterized queries with positional parameters: `$1, $2, $3`
- Do NOT use type casts like `$1::uuid` - let PostgreSQL infer types from table schema

## Conventions

- Use `"use client"` directive for components with hooks/interactivity
- Database queries use parameterized statements (`$1, $2, ...`)
- API routes return consistent `{ success, data, message/error }` format
- User roles: `customer`, `moderator`, `admin`
- Protected API routes call `validateSession()` or `getSessionFromCookieWithDB()` first

## Recent Changes & Bug Fixes

### January 2026
- **Fixed cart table naming:** Renamed `cart_items` to `cart` for consistency across codebase
- **Added reviews system:** Created `reviews` table with rating (1-5), comment, and moderation status
- **Enhanced product images:** Added `product_images` table for multi-image gallery support per product
- **Added guest booking:** Appointments now support guest fields (name, email, phone) for non-authenticated users
- **Added product pricing:** Products now support `original_price` and `sale_price` fields
- **Fixed session validation:** Sessions now fetch current user role from database on each validation, ensuring role changes take effect immediately without logout
- **Fixed 500 errors:** Resolved cart API and reviews API errors by creating missing tables and fixing table references
- **Database consistency:** Local and production databases now use identical INTEGER-based schema (not UUID)
