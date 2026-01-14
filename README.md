# CMS - Color My Space

A production-ready e-commerce platform for interior furnishing business with product sales and design consultation booking capabilities.

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Features](#features)
4. [Database Setup](#database-setup)
5. [Authentication System](#authentication-system)
6. [Image Management](#image-management)
7. [API Documentation](#api-documentation)
8. [Testing](#testing)
9. [Project Structure](#project-structure)
10. [Environment Configuration](#environment-configuration)

---

## Overview

CMS (Color My Space) is a full-stack Next.js application that provides:
- **E-commerce Platform**: Browse, search, and purchase interior furnishing products
- **Service Booking**: Schedule design consultation appointments
- **Role-Based Access**: Customer, Moderator, and Admin roles with granular permissions
- **Payment Integration**: Razorpay for secure online payments
- **Image Management**: Cloudflare Images/R2 for optimized image delivery

**Current Database**: PostgreSQL (migrated from Supabase)
**App URL**: http://localhost:3000

---

## Technology Stack

### Core Framework
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript** (Strict Mode)
- **styled-components** - CSS-in-JS styling
- **Framer Motion** - Animations

### Database & Storage
- **PostgreSQL** - Primary database
- **pg** - PostgreSQL driver
- **Cloudflare R2** - Object storage (S3-compatible)
- **Cloudflare Images** - Image optimization & delivery

### State Management
- **Zustand** - Cart state with localStorage persistence
- **React Context** - Auth, Product, UI contexts

### Authentication
- **JWT** - Session tokens
- **Google OAuth 2.0** - User authentication
- **Cookie-based sessions** - 30-day persistent login

### Payments
- **Razorpay** - Payment gateway integration

### Deployment
- **PM2** - Process management (see DEPLOYMENT_PM2.md)
- **Nginx** - Reverse proxy

---

## Features

### User Roles & Permissions

#### Customer
- Browse and search products
- Manage shopping cart
- Place orders and track status
- Request design consultations
- View order history

#### Moderator
- Manage customer orders
- Handle consultation requests
- Limited product management (if granted by admin)

#### Admin
- Full system access
- Manage products, categories, and inventory
- User role management
- View all orders and appointments
- Access to analytics dashboard

### Product Catalog
- Responsive product grid with sorting/filtering
- Category-based organization
- Full-text search
- Product detail pages with image galleries
- Stock management
- Slug-based URLs for SEO

### Shopping Cart
- Persistent cart with Zustand + localStorage
- Server synchronization for authenticated users
- Cart merge on login
- Real-time quantity updates

### Checkout & Payments
- Razorpay integration for secure payments
- Support for UPI, cards, wallets, net banking
- Server-side order creation
- Payment verification with signature validation
- Order confirmation emails

### Image Management
Two options available:

#### Cloudflare Images
- Direct image upload with CDN delivery
- Automatic optimization
- Multiple variants (thumbnail, public)

#### Cloudflare R2
- S3-compatible object storage
- Zero egress fees
- Folder organization
- Public bucket support

---

## Database Setup

### Prerequisites

1. **PostgreSQL 15+** installed
2. Database created: `cmsdb`
3. User credentials: `sk/sk` (change in production)

### Installation

#### macOS (Homebrew)
```bash
brew install postgresql@15
brew services start postgresql@15
```

#### Ubuntu/Debian
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Database Creation

```bash
# Connect as postgres user
psql -U postgres

# Run these commands
CREATE DATABASE cmsdb;
CREATE USER sk WITH PASSWORD 'sk';
GRANT ALL PRIVILEGES ON DATABASE cmsdb TO sk;

# Connect to database
\c cmsdb

# Grant schema permissions
GRANT ALL ON SCHEMA public TO sk;
```

### Initialize Schema

```bash
npm run init-db
```

### Database Schema

#### Tables Created:

**users**
- User accounts with Google OAuth data
- Role-based access control
- Profile information

**products**
- Product catalog with pricing
- Category classification
- SEO-friendly slugs
- Stock tracking

**product_images**
- Multiple images per product
- Primary image designation
- Display ordering
- Cloudflare integration

**orders**
- Customer orders
- Payment tracking
- Status management
- Shipping address (JSONB)

**order_items**
- Order line items
- Product quantity and pricing

**cart_items**
- Shopping cart persistence
- User-product associations

**appointments**
- Design consultation bookings
- Service type tracking
- Status management

**sessions** (Persistent Login)
- 30-day session storage
- JWT validation
- Activity tracking
- User agent and IP logging

---

## Authentication System

### Persistent Login (30 Days)

The application uses a dual-validation system:
- **JWT tokens** for cryptographic validation
- **Database sessions** for instant revocation

### How It Works

#### Login Flow
1. User authenticates via Google OAuth
2. User record created/updated in database
3. Session created in `sessions` table
4. JWT token generated with session ID
5. Cookie set with 30-day expiration

#### Session Validation
1. Request received with session cookie
2. JWT validated (signature + expiration)
3. Database lookup verifies session exists
4. Last activity updated
5. User data returned if valid

### API Endpoints

```http
GET  /api/auth/session          # Get current session
POST /api/auth/logout           # Logout (clear session)
GET  /api/auth/sessions         # Get all user sessions
DELETE /api/auth/sessions       # Delete specific session
POST /api/auth/sessions/cleanup # Cleanup expired sessions (admin)
```

### Google OAuth Setup

1. Create project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URIs:
   - `https://yourdomain.com/auth/callback`
   - `http://localhost:3000/auth/callback` (development)
5. Add credentials to `.env.local`

### Security Features

- **HTTP-only cookies** - Prevents XSS attacks
- **Secure cookies** in production (HTTPS only)
- **SameSite: Lax** - CSRF protection
- **JWT + Database validation** - Dual layer security
- **Session tracking** - User agent and IP logging
- **Automatic cleanup** - Remove expired sessions

---

## Image Management

### Cloudflare Images Setup

#### Step 1: Get Credentials

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Enable **Cloudflare Images**
3. Get **Account ID** from sidebar
4. Create **API Token**:
   - Go to Profile > API Tokens
   - Use "Edit Cloudflare Images" template
   - Copy the token

#### Step 2: Configure Environment

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
```

#### Step 3: Usage

**Upload Images:**
```typescript
const formData = new FormData();
formData.append('productId', productId);
formData.append('images', file);
formData.append('isPrimary', 'true');

await fetch('/api/products/images/upload', {
  method: 'POST',
  body: formData
});
```

**Image URLs:**
```
https://imagedelivery.net/{account_id}/{image_id}/public
```

### Cloudflare R2 Setup

#### Step 1: Create Bucket

1. Go to [R2 Dashboard](https://dash.cloudflare.com)
2. Create bucket: `cms`
3. Enable public access or connect custom domain

#### Step 2: Get API Credentials

1. Click "Manage R2 API Tokens"
2. Create token with Object Read & Write permissions
3. Copy Access Key ID and Secret Access Key

#### Step 3: Configure Environment

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_access_key
CLOUDFLARE_R2_ENDPOINT=https://{account_id}.r2.cloudflarestorage.com
CLOUDFLARE_BUCKET=cms
CLOUDFLARE_R2_PUBLIC_URL=https://pub-xyz123.r2.dev
```

#### Features

- Multiple images per product
- Folder organization (`product_images/`)
- S3-compatible API
- Zero egress fees
- Global CDN delivery

---

## API Documentation

### Authentication APIs

```
GET  /api/auth/session                  # Get current user session
POST /api/auth/logout                   # Logout user
GET  /api/auth/google/callback          # OAuth callback
GET  /api/auth/sessions                 # List user sessions
DELETE /api/auth/sessions?session_id=x  # Delete session
```

### Product APIs

```
GET    /api/products                 # List all products
POST   /api/products                 # Create product (admin)
GET    /api/products/[id]            # Get product by ID
PUT    /api/products/[id]            # Update product (admin)
DELETE /api/products/[id]            # Delete product (admin)
GET    /api/search                   # Search products
GET    /api/search/products          # Advanced search
```

### Cart APIs

```
GET    /api/cart                     # Get user cart
POST   /api/cart                     # Add item to cart
PUT    /api/cart                     # Update cart item
DELETE /api/cart                     # Clear cart
```

### Order APIs

```
GET    /api/orders                   # List user orders
POST   /api/orders                   # Create order
GET    /api/order/[id]               # Get order details
PUT    /api/order/[id]               # Update order status
```

### Checkout APIs

```
POST   /api/checkout/create          # Create checkout session
POST   /api/checkout/verify          # Verify payment
POST   /api/checkout/verify-payment  # Razorpay verification
```

### Appointment APIs

```
GET    /api/appointments             # List appointments
POST   /api/appointments             # Create appointment
GET    /api/appointments/[id]        # Get appointment
PUT    /api/appointments/[id]        # Update appointment
DELETE /api/appointments/[id]        # Cancel appointment
```

### User Management APIs

```
GET    /api/profile                  # Get user profile
PUT    /api/profile                  # Update profile
POST   /api/admin/update-role        # Update user role (admin)
```

### Image APIs

```
POST   /api/products/images/upload           # Upload images
DELETE /api/products/images/[imageId]        # Delete image
PATCH  /api/products/images/[imageId]        # Update image metadata
```

---

## Testing

### Manual QA Checklist

#### Onboarding Flow
- [ ] Google OAuth registration
- [ ] Google OAuth login
- [ ] Profile creation with correct role
- [ ] User information displays in header

#### Role-Based Access
- [ ] Admin: Full dashboard access
- [ ] Moderator: Limited dashboard access
- [ ] Customer: Restricted access
- [ ] Proper UI rendering per role

#### E-commerce Flow
- [ ] Product browsing and search
- [ ] Product detail page
- [ ] Add to cart functionality
- [ ] Cart persistence across refreshes
- [ ] Checkout process
- [ ] Razorpay payment (test mode)
- [ ] Order confirmation
- [ ] Cart cleared after purchase

#### Consultation Requests
- [ ] Form submission
- [ ] Pre-filled data for logged-in users
- [ ] Success message display
- [ ] Database record creation

#### Dashboard
- [ ] Order management (admin/moderator)
- [ ] Product management (admin)
- [ ] User role management (admin)

#### Performance & Responsiveness
- [ ] Mobile responsiveness
- [ ] Desktop layout
- [ ] Page load times
- [ ] No console errors

### Webhook Testing

#### Razorpay Webhook

**Endpoint:** `/api/checkout/verify`

**Test with curl:**
```bash
curl -X POST http://localhost:3000/api/checkout/verify \
  -H "Content-Type: application/json" \
  -H "X-Razorpay-Signature: <calculated_signature>" \
  -d '{
    "event": "payment.captured",
    "payload": {
      "payment": {
        "entity": {
          "id": "pay_test1234567890",
          "order_id": "order_test1234567890"
        }
      }
    }
  }'
```

**Using ngrok for testing:**
```bash
# Install ngrok
npm install -g ngrok

# Start tunnel
ngrok http 3000

# Update Razorpay dashboard with ngrok URL
```

### Security Testing

#### Test Session Validation
```bash
# Valid session
curl http://localhost:3000/api/auth/session \
  -H "Cookie: cms-session=valid_jwt_token"

# Invalid session
curl http://localhost:3000/api/auth/session \
  -H "Cookie: cms-session=invalid_token"
```

#### Test RLS (Role-Based Access)
```bash
# Customer accessing admin route (should fail)
curl http://localhost:3000/api/admin/update-role \
  -H "Cookie: cms-session=customer_token" \
  -X POST

# Admin accessing admin route (should succeed)
curl http://localhost:3000/api/admin/update-role \
  -H "Cookie: cms-session=admin_token" \
  -X POST
```

---

## Project Structure

```
cms/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── products/       # Product CRUD
│   │   │   ├── cart/           # Shopping cart
│   │   │   ├── orders/         # Order management
│   │   │   ├── appointments/   # Booking system
│   │   │   └── checkout/       # Payment processing
│   │   ├── dashboard/          # Admin/Moderator dashboard
│   │   ├── auth/               # Auth pages
│   │   ├── shop/               # Product listing
│   │   ├── cart/               # Cart page
│   │   ├── checkout/           # Checkout flow
│   │   └── page.tsx            # Homepage
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   ├── AdminDashboard.tsx  # Dashboard main
│   │   ├── ProductImageManager.tsx
│   │   └── ...
│   ├── context/                # React Context providers
│   │   ├── AuthContext.tsx     # Authentication state
│   │   ├── CartContext.tsx     # Cart operations
│   │   ├── ProductContext.tsx  # Product data
│   │   └── AppProvider.tsx     # Composite provider
│   ├── lib/                    # Utilities and helpers
│   │   ├── db/                 # Database functions
│   │   │   ├── connection.ts   # PostgreSQL pool
│   │   │   ├── auth.ts         # Auth & sessions
│   │   │   ├── products.ts     # Product CRUD
│   │   │   ├── cart.ts         # Cart operations
│   │   │   ├── orders.ts       # Order management
│   │   │   ├── appointments.ts # Bookings
│   │   │   └── productImages.ts
│   │   ├── auth/               # Auth utilities
│   │   ├── cloudflare.ts       # Image storage
│   │   ├── razorpay.ts         # Payment processing
│   │   └── api.ts              # API client
│   ├── store/                  # Zustand stores
│   │   └── cartStore.ts        # Cart state
│   ├── styles/                 # styled-components
│   ├── types/                  # TypeScript types
│   └── middleware.ts           # Route protection
├── scripts/                    # Database scripts
│   ├── initDb.js               # DB initialization
│   └── initDatabase.sql        # Schema SQL
├── tests/                      # Test documentation
│   ├── manual_qa_checklist.md
│   └── webhook_testing_guide.md
├── DEPLOYMENT_PM2.md           # Deployment guide
├── CLAUDE.md                   # AI assistant instructions
└── README.md                   # This file
```

---

## Environment Configuration

### Required Environment Variables

Create a `.env.local` file in the root directory:

```env
# ===========================
# DATABASE
# ===========================
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cmsdb
DB_USER=sk
DB_PASSWORD=sk

# ===========================
# JWT AUTHENTICATION
# ===========================
JWT_SECRET=your-super-secret-key-change-in-production

# ===========================
# GOOGLE OAUTH
# ===========================
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ===========================
# RAZORPAY PAYMENTS
# ===========================
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# ===========================
# CLOUDFLARE IMAGES
# ===========================
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token

# ===========================
# CLOUDFLARE R2 (Alternative)
# ===========================
CLOUDFLARE_R2_ACCESS_KEY_ID=your_r2_access_key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_r2_secret_key
CLOUDFLARE_R2_ENDPOINT=https://{account_id}.r2.cloudflarestorage.com
CLOUDFLARE_BUCKET=cms
CLOUDFLARE_R2_PUBLIC_URL=https://pub-xyz123.r2.dev

# ===========================
# APP CONFIGURATION
# ===========================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Production Environment

For production deployment:

1. **Change JWT_SECRET** to a secure random string
```bash
openssl rand -base64 64
```

2. **Use production credentials** for all services

3. **Enable HTTPS** for secure cookies

4. **Set NODE_ENV=production**

---

## Development Commands

```bash
# Install dependencies
npm install

# Initialize database
npm run init-db

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run tests
npm test
npm run test:watch
npm run test:coverage
```

---

## Deployment

See **DEPLOYMENT_PM2.md** for comprehensive deployment instructions including:
- Digital Ocean droplet setup
- PM2 process management
- Nginx reverse proxy configuration
- SSL certificate setup with Let's Encrypt
- Database backups
- Monitoring and maintenance

---

## Database Maintenance

### Backup Database

```bash
pg_dump -U sk -d cmsdb > backup_$(date +%Y%m%d).sql
```

### Restore Database

```bash
psql -U sk -d cmsdb < backup_20250113.sql
```

### Cleanup Expired Sessions

```sql
-- Via psql
SELECT cleanup_expired_sessions();

-- Or via API (admin only)
curl -X POST http://localhost:3000/api/auth/sessions/cleanup
```

### View Active Sessions

```sql
SELECT
  s.id,
  u.email,
  s.user_agent,
  s.last_activity,
  s.expires_at
FROM sessions s
JOIN users u ON s.user_id = u.id
WHERE s.expires_at > NOW()
ORDER BY s.last_activity DESC;
```

---

## Security Best Practices

1. **Never commit `.env.local`** - Contains secrets
2. **Use strong JWT_SECRET** - Minimum 32 characters
3. **Enable HTTPS in production** - Required for secure cookies
4. **Regular database backups** - Automate with cron
5. **Monitor session activity** - Check for suspicious logins
6. **Keep dependencies updated** - Run `npm audit` regularly
7. **Validate all inputs** - Server-side validation
8. **Use parameterized queries** - SQL injection protection
9. **Implement rate limiting** - Prevent abuse
10. **Review logs regularly** - Catch issues early

---

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
brew services list  # macOS
systemctl status postgresql  # Linux

# Test connection
psql -U sk -d cmsdb

# Check logs
tail -f /usr/local/var/postgres/server.log  # macOS
```

### Session Not Persisting

1. Check cookie is being set (browser DevTools > Application > Cookies)
2. Verify JWT_SECRET is set correctly
3. Check database session exists: `SELECT * FROM sessions WHERE user_id = 'xxx';`
4. Ensure session hasn't expired

### Image Upload Failing

**Cloudflare Images:**
- Verify CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN
- Check API token has "Edit Cloudflare Images" permission
- Ensure Cloudflare Images is enabled in dashboard

**Cloudflare R2:**
- Verify all R2 credentials are correct
- Check bucket exists and is accessible
- Ensure public access is enabled (if using public URLs)

### Payment Verification Failing

- Verify Razorpay credentials are correct
- Check webhook signature verification
- Ensure RAZORPAY_KEY_SECRET matches dashboard
- Test with Razorpay test mode credentials

---

## Cost Considerations

### Cloudflare Images
- $5/month for 100,000 images stored
- $1 per 100,000 images delivered
- Free optimization and transformations

### Cloudflare R2
- $0.015 per GB per month (storage)
- $4.50 per million writes
- $0.36 per million reads
- **FREE egress** (unlimited data transfer)

Example for small e-commerce:
- 1000 products × 3 images × 500KB = 1.5 GB
- Cost: **~$0.02/month** for R2

### Razorpay
- 2% per transaction (standard)
- No setup or maintenance fees
- Instant settlements available

---

## Support & Resources

- **PostgreSQL**: https://www.postgresql.org/docs/
- **Next.js**: https://nextjs.org/docs
- **Cloudflare Images**: https://developers.cloudflare.com/images/
- **Cloudflare R2**: https://developers.cloudflare.com/r2/
- **Razorpay**: https://razorpay.com/docs/

---

## License

Proprietary - All rights reserved

---

## Migration Notes

**Status**: Successfully migrated from Supabase to local PostgreSQL

**Completed:**
- ✅ Database schema migration
- ✅ JWT-based authentication
- ✅ Session management
- ✅ All API routes updated
- ✅ Cart synchronization
- ✅ Payment integration
- ✅ Image management

**Database**: PostgreSQL 15+
**Previous**: Supabase
**Migration Date**: January 2025
