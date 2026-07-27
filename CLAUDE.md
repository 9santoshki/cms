# CLAUDE.md

Quick reference for Claude Code when working in this repository.

## Quick Start

```bash
npm install
cp .env.local.example .env.local  # Set up environment
npm run dev                        # http://localhost:3000
npm run build && npm start         # Production
```

## ⚠️ CRITICAL: Database Operations

**READ:** [DATABASE_WARNING.md](DATABASE_WARNING.md)

- ❌ **NEVER** run `npm run init-db` on UAT/production during deployment
- ❌ **NEVER** delete/truncate tables during deployment
- ✅ Database init is **ONE TIME ONLY** at first setup
- ✅ Use migrations for schema changes

## Project Overview

CMS (Color My Space) - Interior design e-commerce platform with Next.js 16, React 19, TypeScript.

**Live:** https://uat.colourmyspace.com

## Documentation

All detailed docs in `/docs/`: ARCHITECTURE.md, API.md, DATA_FLOW.md, CODE_STRUCTURE.md, DEPLOYMENT.md, CLOUDFLARE.md, EMAIL_SETUP.md, ORDER_MANAGEMENT.md, PRODUCT_PRICING.md

## Tech Stack

- **Framework:** Next.js 16 App Router
- **Database:** PostgreSQL (`pg` library)
- **Auth:** Google OAuth + JWT cookies
- **State:** Zustand (cart) + React Context (auth, UI)
- **Styling:** styled-components
- **Payments:** Razorpay
- **Images:** Cloudflare R2 (private bucket)

## Directory Structure

```
src/
├── app/api/         # REST endpoints
├── app/dashboard/   # Admin pages
├── lib/db/          # Database layer (connection, auth, products, orders, cart)
├── components/      # React components
├── context/         # Auth, Cart, UI, Product contexts
├── store/           # Zustand stores (cartStore)
├── types/           # TypeScript interfaces
└── middleware.ts    # Route protection
```

## Key Database Tables

`users`, `sessions`, `products`, `product_images`, `orders`, `order_items`, `cart`, `appointments`, `reviews`, `temp_auth_tokens`

## Authentication

- JWT in httpOnly `cms-session` cookie (30-day)
- Protected routes: `/account`, `/cart`, `/checkout`, `/orders`
- Always use `validateSession()` or `getSessionFromCookieWithDB()` in API routes
- Role changes take effect immediately (DB-backed validation)

## Image Storage

- **Private R2 bucket** - images served via proxy `/api/images/[key]`
- Never use public R2 URLs (`pub-*.r2.dev`)
- Database stores metadata only, not image files

## Environment Variables

Required: `DB_*`, `JWT_SECRET`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `ADMIN_EMAILS`, `CLOUDFLARE_*` vars

See [EMAIL_SETUP.md](docs/EMAIL_SETUP.md) for optional email config.

## Security ⚠️

**CRITICAL:** App was compromised twice (Jan 2026) via exposed PostgreSQL port. See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for full security requirements.

Key requirements:
- PostgreSQL MUST listen only on localhost
- UFW firewall enabled (Cloudflare IPs only for 80/443)
- Strong passwords: `openssl rand -base64 32` for DB, `openssl rand -base64 64` for JWT
- fail2ban installed
- All queries use parameterized statements (`$1, $2, ...`)

## Deployment

```bash
./scripts/uatdeploy.sh    # Deploy to UAT (master branch)
./scripts/proddeploy.sh   # Deploy to production (production branch)
./scripts/deploy-env.sh   # Deploy .env.uat
```

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for full process.

## Database Conventions

- Primary keys: `SERIAL` (INTEGER), not UUID
- Foreign keys: INTEGER references
- Timestamps: `TIMESTAMP WITH TIME ZONE`
- Prices: `DECIMAL(10, 2)`
- All queries: parameterized `$1, $2, ...`

## Code Conventions

- `"use client"` for components with hooks
- API response: `{ success, data, message/error }`
- User roles: `customer`, `moderator`, `admin`
- Protected routes call session validation first