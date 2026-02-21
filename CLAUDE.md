# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment (copy and fill in)
cp .env.local.example .env.local

# Initialize database (⚠️ ONE TIME ONLY - see DATABASE_WARNING.md)
npm run init-db

# Start development server
npm run dev  # http://localhost:3000

# Build for production
npm run build
npm start
```

## ⚠️ CRITICAL: Database Operations

**READ THIS FIRST:** [DATABASE_WARNING.md](DATABASE_WARNING.md)

**Key points:**
- ❌ **NEVER** run `npm run init-db` on UAT or production during deployment
- ❌ **NEVER** delete or truncate database tables during deployment
- ✅ Database initialization is **ONE TIME ONLY** at first setup
- ✅ Regular deployments preserve all database data
- ✅ Use migrations for schema changes, not init-db

## Project Overview

CMS (Color My Space) is an interior design e-commerce and service booking platform built with Next.js 16, React 19, and TypeScript. It features product sales, appointment booking for design consultations, and an admin dashboard.

**Live:** https://uat.colourmyspace.com
**Contact:** Indiranagar, Bengaluru | +91 95133 51833 | rajnishkumarranjan@gmail.com
**Founder:** Rajnish Kumar Ranjan (NIT Hamirpur, IIT Kharagpur)

## Documentation

**Project documentation is located in `/docs/`:**
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) - System architecture overview
- [API.md](docs/API.md) - API endpoints and usage
- [DATA_FLOW.md](docs/DATA_FLOW.md) - Data flow and state management
- [CODE_STRUCTURE.md](docs/CODE_STRUCTURE.md) - Codebase organization
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Deployment procedures and configuration
- [CLOUDFLARE.md](docs/CLOUDFLARE.md) - Cloudflare CDN configuration and caching issues
- [DECISIONS.md](docs/DECISIONS.md) - Key architectural decisions
- [WIREFRAME.md](docs/WIREFRAME.md) - UI/UX wireframes
- [EMAIL_SETUP.md](docs/EMAIL_SETUP.md) - Complete email configuration guide (Resend, SMTP)
- [EMAIL_QUICKSTART.md](docs/EMAIL_QUICKSTART.md) - Quick start guide for order confirmation emails
- [ORDER_MANAGEMENT.md](docs/ORDER_MANAGEMENT.md) - Order lifecycle, status workflow, and automated emails
- [PRODUCT_PRICING.md](docs/PRODUCT_PRICING.md) - Product pricing system and migration guide

**Additional references:**
- [QWEN.md](QWEN.md) - Qwen AI assistant session notes and development history
- [DATABASE_WARNING.md](DATABASE_WARNING.md) - Critical database initialization warnings

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

**Cloudflare Caching Prevention:**
- `/api/auth/session` endpoint includes `Cache-Control: no-store` headers
- Prevents Cloudflare from caching authentication responses
- **Critical:** Without these headers, users appear logged out after login due to stale cached responses
- See [CLOUDFLARE.md](docs/CLOUDFLARE.md) for detailed caching configuration

### State Management

- **AuthContext** - User session, sign in/out
- **cartStore (Zustand)** - Persistent cart with localStorage + server sync
- **CartContext** - Wrapper around Zustand store for React Context API (uses selectors for reactivity)
- **ProductContext** - Product list caching
- **UIContext** - Modals, loading states

**Important:** CartContext uses Zustand selectors (`useCartStore(state => state.items)`) to ensure reactive updates when cart changes during logout/login.

### Image Storage Architecture

**All product images are stored in Cloudflare R2 (S3-compatible object storage), NOT in the database.**

- **Storage:** Cloudflare R2 bucket (configured via `CLOUDFLARE_BUCKET` env var) - **PRIVATE**
- **Upload:** Images uploaded via `src/lib/cloudflare.ts` using AWS S3 SDK
- **Access:** Images served through proxy API endpoint `/api/images/[key]` with R2 credentials
- **Authentication:** Uses `CLOUDFLARE_R2_ACCESS_KEY_ID` and `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
- **Token Note:** `CLOUDFLARE_R2_TOKEN_VALUE` is **NOT used** by the S3 SDK - only for Cloudflare Dashboard API
- **Database Tables:**
  - `products.image_url` - Legacy single image URL (NULL for new products)
  - `product_images` - Multiple images per product with gallery support

**Important:**
- The database stores only image metadata (Cloudflare image ID, URL, filename), not image data
- Actual image files are in Cloudflare R2 private bucket
- All images MUST use proxy endpoint format: `/api/images/product_images%2F{filename}`
- Never use public R2 URLs (`https://pub-*.r2.dev`) - they won't work with private bucket

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
4. Proxy URL constructed as `/api/images/${encodeURIComponent(key)}`
5. Metadata saved to `product_images` table via `addProductImage()` with R2 key
6. Product API returns `primary_image` URL (proxy endpoint)

**Image Serving (Private Bucket):**
- R2 bucket is **private** (not publicly accessible)
- Images served through API proxy endpoint: `/api/images/[key]`
- Proxy endpoint (`src/app/api/images/[key]/route.ts`) fetches from R2 with credentials
- Images cached for 1 year (`Cache-Control: public, max-age=31536000, immutable`)
- No need for public bucket access or pre-signed URLs

**Image URL Format Examples:**
```typescript
// ✅ CORRECT - Use proxy endpoint
const imageUrl = '/api/images/product_images%2F1767927653531-slider-image.jpg';

// ❌ WRONG - Never use public R2 URL
const imageUrl = 'https://pub-f991142b10cf4e8098836944eaf05d12.r2.dev/product_images/...';
```

**Where Images Are Used:**
- Product pages: Dynamic images from database
- Homepage slider: 3 hardcoded images (Slider.tsx)
- Hero sections: Page-specific backgrounds (NewHomepageStylesElegant.ts, etc.)
- Portfolio section: 6 category showcase images
- All use proxy endpoint format for secure R2 access

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
- `src/lib/db/orders.ts` - Order operations (create, fetch, update status)
- `src/lib/cloudflare.ts` - Cloudflare R2 image upload/delete utilities
- `src/lib/email.ts` - Email service (Resend/SMTP) for order confirmations
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
CLOUDFLARE_PRODUCT_IMAGE_FOLDER
```

Optional variables for email functionality:
```
# Option 1: Resend (recommended - 3,000 free emails/month)
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@colourmyspace.com
EMAIL_FROM_NAME=Colour My Space

# Option 2: SMTP (Gmail, SendGrid, etc.)
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=Colour My Space
```

**Email Configuration:**
- Automatic order confirmation emails sent after successful payment
- See [EMAIL_QUICKSTART.md](docs/EMAIL_QUICKSTART.md) for quick setup (5 minutes)
- See [EMAIL_SETUP.md](docs/EMAIL_SETUP.md) for complete guide

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

## Social Media Sharing & SEO

The application includes comprehensive social media metadata for proper link previews when shared on platforms.

### Open Graph & Twitter Cards

**Configuration:** `src/app/layout.tsx`

**Features:**
- Open Graph tags (Facebook, LinkedIn, WhatsApp)
- Twitter Card with large image preview
- Dynamic title template: `%s | Colour My Space`
- Location-based keywords (Bengaluru, Indiranagar)
- Proper favicon and Apple Touch Icon

**Social Media Image:**
- File: `public/og-image.png` (1200x630 pixels, PNG format)
- Displays brand logo, tagline, and professional design
- Auto-generated from SVG using `scripts/convert-og-image.js`

**Testing Social Previews:**
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

**Update OG Image:**
```bash
# Edit public/og-image.svg, then convert to PNG
node scripts/convert-og-image.js
```

**Metadata includes:**
- metadataBase: Uses `NEXT_PUBLIC_APP_URL` for proper URL resolution
- og:title, og:description, og:image, og:type, og:locale, og:siteName
- twitter:card, twitter:title, twitter:description, twitter:image
- Robots configuration for search engine indexing

## Git Repository Strategy

**Branch Structure:**
```
master (development + UAT)
  ↓
production (production only)
```

### Branch Roles

**master:**
- Active development branch
- Deployed to UAT server for testing
- Can be unstable, frequent commits
- Protected: No (allows rapid development)

**production:**
- Production-only branch
- Only updated after successful UAT testing
- Always stable, tagged releases
- Protected: Yes (requires careful merges, no force push)

### Promotion Workflow

```bash
# 1. Develop on master
git checkout master
git commit -m "Add feature"
git push

# 2. Deploy to UAT for testing
./scripts/uatdeploy.sh
# Test on https://uat.colourmyspace.com

# 3. After UAT approval, promote to production
git checkout production
git merge master --no-ff  # Creates merge commit for audit trail
git tag -a v1.0.0 -m "Release v1.0.0: Feature description"
git push origin production --tags

# 4. Deploy to production
./scripts/proddeploy.sh
# Verify on https://www.colourmyspace.com
```

### Rollback Strategy

```bash
# Find previous version
git tag -l

# Rollback to specific version
git checkout production
git checkout v1.0.0
./scripts/proddeploy.sh

# Or reset production branch
git checkout production
git reset --hard v1.0.0
./scripts/proddeploy.sh
git push origin production --force-with-lease
```

### Hotfix Process

```bash
# Emergency fix on production
git checkout production
git checkout -b hotfix/critical-bug
# ... fix bug ...
git commit -m "Fix critical security issue"

# Deploy immediately to production
git checkout production
git merge hotfix/critical-bug --no-ff
git tag -a v1.0.1 -m "Hotfix: Critical security issue"
./scripts/proddeploy.sh
git push origin production --tags

# Backport to master
git checkout master
git merge hotfix/critical-bug
git push
```

### GitHub Branch Protection

**production branch settings:**
1. Settings → Branches → Add rule
2. Branch name pattern: `production`
3. Enable:
   - ✅ Require pull request before merging (optional but recommended)
   - ✅ Require status checks to pass
   - ❌ Allow force pushes (NEVER)
   - ❌ Allow deletions

## Deployment

**UAT Server:** DigitalOcean Droplet (68.183.53.217)
**UAT Domain:** https://uat.colourmyspace.com
**Production Server:** TBD (to be provisioned)
**Production Domain:** https://www.colourmyspace.com
**Process Manager:** PM2 (app name: `cms-app`)
**Node.js Version:** 20.20.0 (required for Next.js 16)

### Deployment Scripts

```bash
./scripts/first-time-setup.sh <ip>  # ⚠️ First-time server setup with security
./scripts/uatdeploy.sh              # Build locally + deploy to UAT server (from master)
./scripts/proddeploy.sh             # Build locally + deploy to production (from production branch)
./scripts/deploy-env.sh             # Deploy .env.uat to UAT server
./scripts/deploy-prod-env.sh        # Deploy .env.production to production server
./scripts/install-ssl.sh            # Install Cloudflare Origin Certificate
./scripts/check-oauth.sh            # Diagnose OAuth configuration issues
```

### Production Deployment Process

**Prerequisites:**
1. Production server provisioned (DigitalOcean or similar)
2. Production domain DNS configured
3. `.env.production` file created locally with production credentials
4. `production` git branch created and pushed

**Initial Production Setup:**

```bash
# 1. Generate strong credentials
export DB_PASSWORD="$(openssl rand -base64 32)"
export JWT_SECRET="$(openssl rand -base64 64)"
echo "Save these credentials!"

# 2. Create .env.production locally (NOT in git)
# Copy from .env.uat and update:
# - NEXT_PUBLIC_APP_URL=https://www.colourmyspace.com
# - DB_PASSWORD=<generated-password>
# - JWT_SECRET=<generated-secret>
# - Update GOOGLE_CLIENT_ID with production OAuth credentials

# 3. Run first-time server setup on production server
DB_PASSWORD='<your-db-password>' ./scripts/first-time-setup.sh <production-ip>

# 4. Deploy production environment file
./scripts/deploy-prod-env.sh

# 5. Create production branch (if not exists)
git checkout -b production
git push -u origin production

# 6. Deploy to production
git checkout production
git merge master --no-ff
git tag -a v1.0.0 -m "Initial production release"
./scripts/proddeploy.sh

# 7. Initialize production database
ssh root@<production-ip> "cd /home/cms/app && npm run init-db"

# 8. Set up SSL certificate
ssh root@<production-ip>
certbot --nginx -d www.colourmyspace.com

# 9. Verify production is running
curl -I https://www.colourmyspace.com
```

**Regular Production Deployment:**

```bash
# 1. Ensure all changes are tested on UAT
git checkout master
# ... develop and test on UAT ...

# 2. Promote to production branch
git checkout production
git merge master --no-ff

# 3. Tag the release
git tag -a v1.1.0 -m "Release v1.1.0: New feature description"

# 4. Push branch and tags
git push origin production --tags

# 5. Deploy to production server
./scripts/proddeploy.sh

# 6. Verify deployment
# Check https://www.colourmyspace.com
# Check logs: ssh root@<prod-ip> "pm2 logs cms-app --lines 50"
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
# ✅ Preserves all database data
# ❌ Does NOT run init-db (see DATABASE_WARNING.md)
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

**⚠️ DATABASE WARNING:** See [DATABASE_WARNING.md](DATABASE_WARNING.md) - Database initialization is **ONE TIME ONLY**

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

5. **Initialize database** (⚠️ **ONE TIME ONLY** - See [DATABASE_WARNING.md](DATABASE_WARNING.md)):
```bash
# ⚠️ ONLY run this ONCE during first-time setup
# ⚠️ NEVER run this during regular deployments
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

**IMPORTANT:** You will NEVER need to run `npm run init-db` again on this server! Regular deployments preserve all database data.

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
- Variables starting with `NEXT_PUBLIC_` are embedded at build time from the environment file
- `uatdeploy.sh` reads from `.env.uat` to build with correct URLs
- **⚠️ Database initialization is ONE TIME ONLY** at first setup - see [DATABASE_WARNING.md](DATABASE_WARNING.md)
- **⚠️ Regular deployments NEVER run `init-db`** - they preserve all existing data
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

### February 2026 - Order Management & Pricing Enhancements

#### Product Pricing Simplification
- **Removed `original_price` field:** Simplified from 3-field to 2-field pricing model (price, sale_price)
- **Database migration:** Created `scripts/migrate_pricing.sql` to drop `original_price` column
- **Updated all frontend components:** NewShopPage, ProductDetailDisplay, NewHomepage
- **Updated TypeScript interfaces:** Removed `original_price` from Product type across all files
- **Updated API endpoints:** Removed `original_price` from POST/PUT /api/products
- **Updated admin dashboard:** Simplified product form to 2 price fields with clear labels
- **Documentation:** Created comprehensive [PRODUCT_PRICING.md](docs/PRODUCT_PRICING.md) guide
- **Impact:** Clearer pricing logic, less confusion, easier maintenance

#### Automated Email Notifications for Orders
- **Auto-email on status change:** Orders now send emails automatically when status changes
- **Shipment emails:** Sent when order status changes to "shipped" with tracking details
- **Delivery emails:** Sent when order status changes to "completed"
- **Tracking details form:** Added UI form for entering tracking number, carrier, tracking URL
- **Popular carriers supported:** BlueDart, DTDC, FedEx, Delhivery, India Post, Ecom Express, Ekart
- **Email service:** Using Resend API with branded HTML templates
- **Documentation:** Created comprehensive [ORDER_MANAGEMENT.md](docs/ORDER_MANAGEMENT.md) guide
- **Impact:** Customers automatically notified of shipment and delivery, professional branded emails

#### Order Status Enhancements
- **Added "shipped" status:** Fixed database CHECK constraint to include 'shipped' status
- **Migration script:** Created `scripts/add_shipped_status.sql` for database update
- **Order workflow:** pending → processing → shipped → completed (or cancelled)
- **Admin dashboard improvements:** Enhanced order detail page with tracking form
- **Impact:** Complete order lifecycle support with proper status transitions

#### Bug Fixes
- **Fixed homepage pricing display:** Removed hardcoded fake pricing logic (was showing price * 1.2)
- **Fixed constraint violation:** Added 'shipped' to orders.status CHECK constraint
- **Fixed SessionData usage:** Corrected multiple instances of `session.user.role` to `session.role`

### January 2026 - Authentication & Cloudflare Fixes
- **Fixed Cloudflare caching breaking authentication:** Added `Cache-Control: no-store` headers to `/api/auth/session` endpoint to prevent CDN caching
- **Fixed cart not clearing on logout:** Updated CartContext to use Zustand selectors for reactive updates
- **Added fetch debugging:** Enhanced client-side logging for session API requests
- **Documented Cloudflare configuration:** Created comprehensive guide for CDN caching issues and page rules

### January 2026 - R2 Image Migration
- **Migrated all images to private R2 bucket with proxy access:** Converted 26 hardcoded public R2 URLs across 6 files to use secure proxy endpoint
- **Files updated:** Slider.tsx, NewHomepageStylesElegant.ts, ConsultationStyles.ts, NewAboutStyles.ts, ElegantServicesStyles.ts, NewPortfolioStyles.ts
- **Security improvement:** All images now served through authenticated API proxy (`/api/images/[key]`) instead of public bucket URLs
- **Verification:** Created `scripts/verifyR2Images.js` to test all 13 critical images (slider, hero, portfolio)
- **Documentation:** Added `R2_IMAGE_MIGRATION_COMPLETE.md` with comprehensive migration details
- **Impact:** Homepage slider, all hero sections, and portfolio images now use secure authenticated access

### January 2026
- **Added social media metadata:** Comprehensive Open Graph and Twitter Card configuration for proper link previews on Facebook, LinkedIn, Twitter
- **Fixed mobile menu visibility:** Mobile menu text now visible with proper dark color (#333) on white background
- **Added metadataBase:** Fixed Next.js warning and enabled proper URL resolution for social media images
- **Created OG image:** Professional PNG social media preview image (1200x630) with brand logo
- **Production git strategy:** Documented branch-based strategy (master for UAT, production for prod)
- **Production deployment:** Created production deployment scripts and comprehensive documentation
- **Fixed cart table naming:** Renamed `cart_items` to `cart` for consistency across codebase
- **Added reviews system:** Created `reviews` table with rating (1-5), comment, and moderation status
- **Enhanced product images:** Added `product_images` table for multi-image gallery support per product
- **Added guest booking:** Appointments now support guest fields (name, email, phone) for non-authenticated users
- **Added product pricing:** Products now support `original_price` and `sale_price` fields
- **Fixed session validation:** Sessions now fetch current user role from database on each validation, ensuring role changes take effect immediately without logout
- **Fixed 500 errors:** Resolved cart API and reviews API errors by creating missing tables and fixing table references
- **Database consistency:** Local and production databases now use identical INTEGER-based schema (not UUID)
