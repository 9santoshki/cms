# Data Flow Documentation

## Main Request/Response Flows

### User Authentication Flow
1. User clicks "Sign in with Google" → Redirect to Google OAuth
2. Google redirects to `/auth/callback` with authorization code
3. Client forwards code to `/api/auth/google/callback?code=...`
4. Backend exchanges code for tokens, creates/updates user in DB
5. Generates JWT with DB session ID, sets httpOnly cookie
6. Returns user to homepage with authenticated session

### Product Retrieval Flow
1. Client requests `/api/products` with filters (search, category, price)
2. API calls `getProductsWithImages()` from database layer
3. Database retrieves product data and associated Cloudflare image metadata
4. Cloudflare utility generates authenticated image URLs
5. API returns product data with image URLs to client

### Cart Operations Flow
1. Client performs cart action (add/remove/update)
2. Zustand store updates locally and syncs with `/api/cart`
3. API validates session and updates database cart table
4. Response confirms successful operation

### Order Processing Flow
1. User proceeds to `/checkout` with items in cart
2. Client calls `/api/checkout` with shipping/payment info
3. API validates inventory, calculates totals, creates order record
4. Processes payment via Razorpay API
5. Updates inventory and clears user's cart
6. Returns order confirmation

### Inventory Management Flow
1. Admin/moderator visits `/dashboard/inventory`
2. API returns out-of-stock and low-stock variants with supplier info
3. Admin can edit supplier-specific stock or notify suppliers
4. Stock updates logged in `inventory_logs` for audit trail
5. Supplier receives email notification with dashboard link
6. Supplier updates stock via their dashboard (`/supplier`)
7. Changes propagate to variant's total stock quantity

## Data Ownership
• Database owns: User profiles, product catalog, orders, cart items, appointments
• Client stores: Session JWT in httpOnly cookie, cart in localStorage
• Cloudflare R2: Product images (accessed via `/api/images/[key]` proxy)
• Client-side app state: UI state, cart count (synced with server)

## External Dependencies
• Google OAuth 2.0: Authentication and user profile data
• Cloudflare R2: Image storage and retrieval
• Razorpay: Payment processing
• PostgreSQL: Main data persistence
• Resend: Email delivery service