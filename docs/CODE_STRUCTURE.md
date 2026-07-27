# Code Structure Documentation

## Directory Responsibilities

### src/app/
• `api/` - Next.js API routes (auth, products, cart, orders, appointments, etc.)
• `auth/` - Authentication pages and OAuth callback handling
• `dashboard/` - Admin/moderator dashboard components
  - `inventory/` - Inventory alerts page (out-of-stock, low-stock, no-supplier tabs, All Stock for editing any variant)
  - `suppliers/` - Supplier management (create, edit, assign variants)
  - `products/` - Product management with variant editing
  - `orders/` - Order management and fulfillment
  - `appointments/` - Consultation booking management
  - `reviews/` - Review moderation
  - `users/` - User management and role assignment
  - `variants/` - Variant dictionary management
  - `settings/` - Admin settings and configuration
• `products/` - Product listing and detail pages
• `[page-name]/` - Public-facing pages (shop, cart, checkout, about, etc.)

### src/components/
• Reusable UI components (buttons, modals, forms)
• Page-specific components (headers, footers, product cards)
• Shared elements across the application
• CategoryNav - Category navigation bar with dropdown menus (living room, dining, bedroom, etc.)
• MiniVariantSelector - Compact variant selector for product cards
• DashboardLayout - Shared admin dashboard layout wrapper

### src/context/
• AuthContext - User session and authentication state
• CartContext - Shopping cart management
• ProductContext - Product catalog caching
• UIContext - Modal states, loading indicators
• LanguageContext - Internationalization (i18n) with English, Hindi, Kannada support
• AppProvider - Combined provider wrapper

### src/lib/
• `db/` - Database operations (connection, auth, products, orders, etc.)
• `auth-helpers.ts` - Authentication utility functions
• `cloudflare.ts` - Cloudflare R2 integration
• `razorpay.ts` - Payment processing integration
• `api.ts` - Client-side API communication wrapper

### src/store/
• `cartStore.ts` - Zustand store for persistent shopping cart

### src/types/
• TypeScript interfaces for application entities (User, Product, Order, etc.)

## Naming Conventions
• Files: kebab-case for pages (my-page.tsx), camelCase for components (MyComponent.tsx)
• Functions: camelCase with descriptive names (createUser, validateSessionToken)
• Constants: UPPER_SNAKE_CASE for environment variables (JWT_SECRET)
• Interfaces: PascalCase (UserProfile, ProductWithImages)
• Variables: camelCase (currentUser, productCategory)

## Logic Location Principles
• Business Logic: In `src/lib/db/` database layer functions
• API Logic: In respective `src/app/api/` route files
• Component Logic: Inside individual component files
• Side Effects: In useEffect hooks or API route handlers
• State Management: In context providers or Zustand stores
• Validation: Using express-validator patterns in API routes