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

### Authentication Flow

1. Google OAuth redirects to `/api/auth/google/callback`
2. Backend creates/updates user, generates JWT
3. JWT stored in httpOnly `cms-session` cookie (30-day expiration)
4. Middleware protects routes: `/account`, `/cart`, `/checkout`, `/orders`
5. API routes verify JWT via `verifyToken()` from `src/lib/db/auth.ts`

### State Management

- **AuthContext** - User session, sign in/out
- **cartStore (Zustand)** - Persistent cart with localStorage + server sync
- **ProductContext** - Product list caching
- **UIContext** - Modals, loading states

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
- `src/lib/db/auth.ts` - JWT and session handling
- `src/lib/api.ts` - Client-side API wrapper class
- `src/store/cartStore.ts` - Zustand cart store with server sync
- `src/context/AppProvider.tsx` - Composite context provider
- `src/middleware.ts` - Route protection

## Environment Variables

Required in `.env.local`:
```
DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
JWT_SECRET
NEXT_PUBLIC_GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
```

## Conventions

- Use `"use client"` directive for components with hooks/interactivity
- Database queries use parameterized statements (`$1, $2, ...`)
- API routes return consistent `{ success, data, message/error }` format
- User roles: `customer`, `moderator`, `admin`
- Protected API routes call `verifyToken(request)` first
