# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment (copy and fill in)
cp .env.local.example .env.local

# Initialize database
npm run init-db

# Start development server
npm run dev  # http://localhost:3000

# Build for production
npm run build
npm start
```

## Project Overview

CMS (Color My Space) is an interior design e-commerce and service booking platform built with Next.js 16, React 19, and TypeScript. It features product sales, appointment booking for design consultations, and an admin dashboard.

**Live:** https://uat.colourmyspace.com
**Contact:** Indiranagar, Bengaluru | +91 95133 51833 | rajnishkumarranjan@gmail.com
**Founder:** Rajnish Kumar Ranjan (NIT Hamirpur, IIT Kharagpur)

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

This project uses multiple environment files for different deployment targets:

- **`.env.local`** - Local development (http://localhost:3000)
- **`.env.uat`** - UAT/Staging server (https://uat.colourmyspace.com, 68.183.53.217)
- **`.env.production`** - Production server (https://www.colourmyspace.com, TBD)

Required variables in all environment files:
```
DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
JWT_SECRET
NEXT_PUBLIC_APP_URL (environment-specific URL)
NEXT_PUBLIC_GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
ADMIN_EMAILS
CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY
CLOUDFLARE_R2_ENDPOINT, CLOUDFLARE_R2_TOKEN_VALUE, CLOUDFLARE_BUCKET
CLOUDFLARE_PRODUCT_IMAGE_FOLDER, CLOUDFLARE_R2_PUBLIC_URL
```

**Important Notes:**
- Variables starting with `NEXT_PUBLIC_` are bundled into the client build at build time
- `uatdeploy.sh` reads from `.env.uat` to build for UAT environment
- All `.env*` files are in `.gitignore` for security
- Database credentials and URLs differ per environment

## Security

### ⚠️ Security Incident History - MUST READ

**CRITICAL**: This application was compromised **twice** (January 2026) and used in DDoS attacks, resulting in:
- **3867 GiB bandwidth usage** per droplet
- **$77+ in overage charges** (2 droplets)
- **Server blacklisting** and service termination

**Root Cause:**
- PostgreSQL port 5432 exposed to internet (listening on 0.0.0.0)
- Weak password ("cms_dbpass12!") brute-forced
- No firewall, no fail2ban, no bandwidth limits
- Attackers installed DDoS malware via PostgreSQL exploit

### Security Requirements

**ALL production deployments MUST follow these security measures:**

1. **PostgreSQL Security** ⚠️ CRITICAL
   - PostgreSQL MUST be configured to ONLY listen on localhost (127.0.0.1)
   - Port 5432 MUST NOT be accessible from the internet
   - Strong database password (minimum 32 characters, use `openssl rand -base64 32`)
   - Remote connections MUST be disabled in `pg_hba.conf`

2. **Firewall (UFW)** ⚠️ CRITICAL
   - UFW MUST be enabled
   - Ports 80/443 MUST ONLY accept connections from Cloudflare IP ranges (13 ranges)
   - Port 22 (SSH) open for administrative access
   - All other ports MUST be blocked
   - **IMPORTANT:** ALLOW rules for Cloudflare must come BEFORE DENY rules (UFW processes top-to-bottom)
   - Verify with: `ufw status numbered` (check rule order)
   - Wrong rule order causes Error 522 (Cloudflare connection timeout)

3. **SSH Hardening** ⚠️ CRITICAL
   - Password authentication MUST be disabled
   - Only SSH key authentication allowed
   - Root login with password MUST be disabled

4. **Intrusion Prevention**
   - fail2ban MUST be installed and configured
   - Automatic IP banning after failed login attempts
   - SSH brute-force protection enabled

5. **Strong Credentials**
   - Database password: `openssl rand -base64 32` (minimum 32 chars)
   - JWT secret: `openssl rand -base64 64` (minimum 64 chars)
   - Never use weak passwords like "cms_dbpass12!" or "your-secret-key"

6. **nginx Security**
   - Rate limiting enabled (10 requests/second)
   - Security headers configured (X-Frame-Options, X-XSS-Protection, etc.)
   - Request timeout limits

7. **Bandwidth Protection** ⚠️ CRITICAL
   - Hard bandwidth caps: 50 Mbps upload, 100 Mbps download
   - Connection rate limiting: 20 new connections/minute per IP
   - Max concurrent connections: 50 per IP
   - Prevents DDoS participation and excessive bandwidth charges
   - Monitor with vnstat

### Code Security

**SQL Injection Prevention:**
- ✅ All database queries use parameterized statements ($1, $2, etc.)
- ✅ No string interpolation in SQL queries
- ✅ User inputs never directly concatenated into queries

**Best Practices:**
- Always validate and sanitize user inputs
- Keep dependencies updated: `npm audit fix`
- Regular security scanning
- Monitor for suspicious activity

### Deployment Security Checklist

Before deploying to production:

- [ ] Generate strong credentials: `openssl rand -base64 32` and `openssl rand -base64 64`
- [ ] Update environment files (`.env.uat` or `.env.production`) with strong passwords
- [ ] Use `first-time-setup.sh` script for server configuration
- [ ] Verify PostgreSQL only on localhost: `netstat -an | grep 5432` (should show 127.0.0.1:5432)
- [ ] Verify firewall: `ufw status` (should show active)
- [ ] Verify fail2ban: `fail2ban-client status`
- [ ] Verify SSH password auth disabled: `sshd -T | grep passwordauthentication`
- [ ] Verify bandwidth limits: `wondershaper -a eth0 -s`
- [ ] Scan open ports: `nmap -p 1-10000 <ip>` (should ONLY show 22, 80, 443)
- [ ] Set up SSL certificate: `certbot --nginx -d your-domain.com`
- [ ] Set up DigitalOcean bandwidth alerts: 10 GiB/day threshold

### Bandwidth Monitoring & Cost Protection

**Why This Matters:** Previous security compromises resulted in 3867 GiB bandwidth usage and $38.68+ in overage charges per droplet.

**Monitor bandwidth usage:**
```bash
# Live monitoring
ssh root@<ip> "vnstat -l"

# Daily/monthly statistics
ssh root@<ip> "vnstat -d"  # Daily
ssh root@<ip> "vnstat -m"  # Monthly

# Verify bandwidth limits active
ssh root@<ip> "wondershaper -a eth0 -s"
# Should show: Upload: 50000 Kbit/s, Download: 100000 Kbit/s
```

**Normal vs Abnormal Usage:**
- **Normal:** < 1 GiB/day, < 30 GiB/month
- **Warning signs:** > 10 GiB/day, > 100 concurrent connections, CPU > 80%

**DigitalOcean Alerts:**
1. Dashboard → Settings → Notifications
2. Add Bandwidth Alert: 10 GiB/day threshold
3. Receive email if exceeded

## Deployment

**UAT Server:** DigitalOcean Droplet (68.183.53.217)
**UAT Domain:** https://uat.colourmyspace.com
**Production Domain:** https://www.colourmyspace.com (TBD)
**Process Manager:** PM2 (app name: `cms-app`)
**Node.js Version:** 20.20.0 (required for Next.js 16)

### Deployment Scripts

```bash
./scripts/first-time-setup.sh <ip>  # ⚠️ First-time server setup with security
./scripts/uatdeploy.sh              # Build locally + deploy to UAT server
./scripts/deploy-env.sh             # Deploy .env.uat to UAT server
./scripts/install-ssl.sh            # Install Cloudflare Origin Certificate
./scripts/check-oauth.sh            # Diagnose OAuth configuration issues
```

### Deployment Process (Local Build + Binary)

**Local build + binary deployment** - fast and reliable:

1. **Local:** Build with UAT environment variables from `.env.uat`
2. **Local:** Push to GitHub (version control)
3. **Local:** Create tarball of `.next`, `public`, and config files
4. **Server:** Upload tarball via SCP
5. **Server:** Extract and install dependencies
6. **Server:** Restart PM2 process

**Time:** ~60 seconds

**Why local build is better:**
- ✅ Build locally (catches errors before commit)
- ✅ Fast deployment (~60 seconds)
- ✅ Uses `.env.uat` for environment-specific builds
- ✅ Works on 1GB droplets (no server-side builds)
- ✅ Version control maintained via git push

**Quick deploy:**
```bash
# Commit your changes
git add .
git commit -m "Update feature"

# Deploy to UAT (builds locally with .env.uat)
./scripts/uatdeploy.sh
```

**Rollback if something breaks:**
```bash
# Checkout previous commit
git checkout HEAD~1

# Rebuild and deploy
./scripts/uatdeploy.sh

# Or rollback to specific commit
git checkout abc1234
./scripts/uatdeploy.sh

# Go back to latest (undo rollback)
git checkout master
./scripts/uatdeploy.sh
```

### First-Time Server Setup (SECURE)

**⚠️ CRITICAL: ALWAYS use the secure setup script, NOT manual setup**

**IMPORTANT:** On first deployment or when setting up a new server:

1. **Generate strong credentials**:
```bash
# Generate strong database password (32 characters)
export DB_PASSWORD="$(openssl rand -base64 32)"
echo "Database Password: $DB_PASSWORD"

# Generate strong JWT secret (64 characters)
export JWT_SECRET="$(openssl rand -base64 64)"
echo "JWT Secret: $JWT_SECRET"

# Save these credentials - you'll need them for .env.uat or .env.production
```

2. **Run first-time server setup**:
```bash
# This script will:
# - Install Node.js 20, PostgreSQL, nginx, PM2
# - Configure PostgreSQL to ONLY listen on localhost
# - Set up firewall with Cloudflare IP ranges (correct rule ordering)
# - Install fail2ban for intrusion prevention
# - Create database with strong password
# - Configure nginx reverse proxy with rate limiting
# - Set up 4GB swap memory

DB_PASSWORD='your-strong-password' ./scripts/first-time-setup.sh 68.183.53.217
```

3. **Update environment file**:
```bash
# For UAT, update .env.uat:
DB_PASSWORD='<strong-password-from-step-1>'
JWT_SECRET='<strong-secret-from-step-1>'
NEXT_PUBLIC_APP_URL='https://uat.colourmyspace.com'

# For production, update .env.production:
NEXT_PUBLIC_APP_URL='https://www.colourmyspace.com'
```

4. **Deploy environment file and application**:
```bash
# Deploy environment variables (.env.uat to UAT server)
./scripts/deploy-env.sh

# Deploy application (build locally + upload)
./scripts/uatdeploy.sh
```

5. **Initialize database**:
```bash
# Initialize database schema (detects .env.uat automatically)
ssh root@68.183.53.217 "cd /home/cms/app && npm run init-db"

# Should show:
# Loading environment from: .env.uat
# Connected to PostgreSQL database
# ✅ Database initialized successfully!
# Tables created:
#   - users, sessions, temp_auth_tokens, products, product_images
#   - orders, order_items, cart, appointments, reviews

# Start application (PM2 will auto-start after deployment)
pm2 logs cms-app --lines 20
```

7. **Set up SSL certificate**:
```bash
ssh root@<droplet-ip>
certbot --nginx -d uat.colourmyspace.com
```

8. **Verify security configuration**:
```bash
# Verify PostgreSQL only on localhost (should show 127.0.0.1:5432)
ssh root@<droplet-ip> "netstat -an | grep 5432"

# Verify firewall active
ssh root@<droplet-ip> "ufw status"

# Verify fail2ban running
ssh root@<droplet-ip> "fail2ban-client status"

# Scan open ports (should ONLY show 22, 80, 443)
nmap -p 1-10000 <droplet-ip>
```

### Troubleshooting

**If you get database connection errors:**
```bash
# Check PostgreSQL is running
ssh root@<droplet-ip> "systemctl status postgresql"

# Check logs
ssh root@<droplet-ip> "tail -50 /var/log/postgresql/postgresql-*.log"

# Verify credentials in .env.production
ssh root@<droplet-ip> "cd /home/cms/app && grep DB_ .env.production"
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
- Environment files (`.env.uat`, `.env.production`) must be created manually and deployed separately (security: not in git)
- The `init-db` script automatically detects and uses `.env.uat` or `.env.production` when available
- Variables starting with `NEXT_PUBLIC_` are embedded at build time from the environment file
- `uatdeploy.sh` reads from `.env.uat` to build with correct URLs
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
