# Architecture Overview

## High-Level Components
• Frontend: Next.js 16 App Router with React 19 and TypeScript
• Authentication: Google OAuth 2.0 with JWT tokens and database-backed sessions
• Database: PostgreSQL with connection pooling via 'pg' library
• File Storage: Cloudflare R2 for product images with private access via API proxy
• Payment Processing: Razorpay integration for checkout flow
• State Management: Zustand for cart and React Context for app-wide state

## Major Components & Ownership
• `src/app/api/*` - Server-side API routes for all business logic
• `src/lib/db/*` - Database abstraction layer with PostgreSQL queries
• `src/components/*` - Reusable React UI components
• `src/context/*` - Application state management (Auth, Cart, UI)
• `src/store/*` - Zustand stores (shopping cart persistence)
• `src/lib/cloudflare.ts` - Cloudflare R2 integration for image handling

## Boundaries & Responsibilities
• API routes handle all external requests, authentication, and data validation
• Database layer manages all data persistence with PostgreSQL
• Context and store layers manage client-side state
• Components focus solely on presentation and user interaction

## What NOT to Change
• Database schema: Primary keys are INTEGER (not UUID) - maintain consistency
• Authentication flow: OAuth 2.0 + JWT system is security-critical
• Session management: Database-backed sessions ensure role changes take effect immediately
• Cloudflare R2 integration: Private bucket access via proxy endpoint required for security