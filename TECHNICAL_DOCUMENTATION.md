# Technical Project Documentation - CMS Project

## Project Architecture Overview

### Technology Stack
- **Frontend Framework**: Next.js 16.0.1
- **State Management**: React Context API with useReducer
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Custom JWT-based with Google OAuth support
- **Styling**: CSS with custom components
- **API**: Next.js API Routes with Supabase integration
- **Server**: Node.js runtime

### Project Structure
```
cms/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/             # API routes
│   │   └── ...              # UI pages
│   ├── components/         # Reusable UI components
│   ├── context/           # Global state management
│   ├── lib/               # Utility functions and API clients
│   └── types/             # TypeScript type definitions
├── tests/                 # Test files (moved from root)
├── .env / .env.local      # Environment configuration
└── ...
```

## Process Flow & Code Components

### 1. Authentication Flow

#### Frontend Components:
- **File**: `src/components/AuthForm.tsx`
- **Component**: `AuthForm`
- **Functions**:
  - `handleSubmit()` - Handles login/registration form submission
  - `handleChange()` - Updates form state
  - `handleGoogleSuccess()` - Google OAuth integration

- **File**: `src/context/AppContext.tsx`
- **Hook**: `useAppContext`
- **Functions**:
  - `login(credentials)` - Authenticates user and sets session
  - `register(userData)` - Creates new user account
  - `logout()` - Clears user session
  - `verifyToken()` - Validates existing tokens

- **File**: `src/lib/api.ts`
- **Class**: `ApiClient`
- **Functions**:
  - `login(credentials)` - Makes API call to `/auth/login`
  - `register(userData)` - Makes API call to `/auth/register`
  - `setToken(token)` - Updates authentication token

#### Backend Components:
- **File**: `src/app/api/auth/login/route.ts`
- **Function**: `POST(request: NextRequest)`
- **Process**:
  1. Extract email/password from request body
  2. Query Supabase users table
  3. Verify password with bcrypt
  4. Return user data and mock JWT token

- **File**: `src/app/api/auth/register/route.ts`
- **Function**: `POST(request: NextRequest)`
- **Process**:
  1. Extract user data from request body
  2. Hash password with bcrypt
  3. Insert user into Supabase
  4. Return success response

### 2. Product Management Flow

#### Frontend Components:
- **File**: `src/context/AppContext.tsx`
- **Functions**:
  - `fetchProducts()` - Loads all products from API
  - `fetchProductBySlug(slug)` - Loads specific product by slug
  - `createProduct(productData)` - Creates new product (admin only)
  - `updateProduct(id, productData)` - Updates existing product (admin only)

- **File**: `src/lib/api.ts`
- **Functions**:
  - `getProducts()` - GET request to `/products`
  - `getProduct(id)` - GET request to `/products/${id}`
  - `getProductBySlug(slug)` - GET request to `/products/${slug}`
  - `createProduct(productData)` - POST request to `/products`
  - `updateProduct(id, productData)` - PUT request to `/products/${id}`

#### Backend Components:
- **File**: `src/app/api/products/route.ts`
- **Functions**:
  - `GET(request: NextRequest)` - Retrieves all products
  - `POST(request: NextRequest)` - Creates new product (admin only)

- **File**: `src/app/api/products/[id]/route.ts`
- **Functions**:
  - `GET(request: NextRequest, { params })` - Retrieves specific product

### 3. Shopping Cart Flow

#### Frontend Components:
- **File**: `src/context/AppContext.tsx`
- **Functions**:
  - `addToCart(product, quantity)` - Adds item to cart
  - `updateCartItem(productId, quantity)` - Updates cart item quantity
  - `removeFromCart(productId)` - Removes item from cart
  - `fetchCartItems()` - Loads cart items for authenticated user
  - `clearCart()` - Clears entire cart

- **File**: `src/lib/api.ts`
- **Functions**:
  - `getCartItems()` - GET request to `/cart`
  - `addToCart(product_id, quantity)` - POST request to `/cart`
  - `updateCartItem(product_id, quantity)` - PUT request to `/cart`
  - `removeFromCart(product_id)` - DELETE request to `/cart/${product_id}`
  - `clearCart()` - DELETE request to `/cart`

#### Backend Components:
- **File**: `src/app/api/cart/route.ts`
- **Functions**:
  - `GET(request: NextRequest)` - Retrieves user's cart items (authenticated)
  - `POST(request: NextRequest)` - Adds item to cart (authenticated)
  - `PUT(request: NextRequest)` - Updates cart item quantity (authenticated)
  - `DELETE(request: NextRequest)` - Clears user's cart (authenticated)

- **File**: `src/app/api/cart/[id]/route.ts`
- **Function**:
  - `DELETE(request: NextRequest, { params })` - Removes specific item from cart

### 4. Order Management Flow

#### Frontend Components:
- **File**: `src/context/AppContext.tsx`
- **Functions**:
  - `fetchOrders()` - Loads user's order history
  - `createOrder(orderData)` - Places new order
  - `clearCart()` - Clears cart after successful order

- **File**: `src/lib/api.ts`
- **Functions**:
  - `getOrders()` - GET request to `/orders`
  - `createOrder(orderData)` - POST request to `/orders`

#### Backend Components:
- **File**: `src/app/api/orders/route.ts`
- **Functions**:
  - `GET(request: NextRequest)` - Retrieves user's orders (authenticated)
  - `POST(request: NextRequest)` - Creates new order (authenticated)

### 5. User Profile Management

#### Frontend Components:
- **File**: `src/context/AppContext.tsx`
- **Functions**:
  - `fetchUserProfile()` - Loads authenticated user's profile
  - `updateUserProfile(profileData)` - Updates user profile

#### Backend Components:
- **File**: `src/app/api/profile/route.ts`
- **Functions**:
  - `GET(request: NextRequest)` - Retrieves user profile (authenticated)
  - `PUT(request: NextRequest)` - Updates user profile (authenticated)

### 6. API Client Architecture

#### File: `src/lib/api.ts`
- **Class**: `ApiClient`
- **Architecture**:
  - Singleton pattern with `apiClient` export
  - Token management with localStorage
  - Standardized response format across all methods
  - Error handling and network request abstraction

### 7. Database Schema Integration

#### File: `supabase_setup_clean.sql`
- **Tables**:
  - `users` - User accounts with role-based access
  - `products` - Product catalog with pricing and images
  - `product_images` - Additional product images with ordering
  - `cart_items` - User cart items with quantity tracking
  - `orders` - Completed order records
  - `order_items` - Individual items within orders

#### File: `src/context/AppContext.tsx`
- **Integration**:
  - State management for all database entities
  - CRUD operations mapped to database tables
  - Data normalization and formatting

### 8. Environment Configuration

#### Files: `.env` and `.env.local`
- **Configuration**:
  - Supabase credentials for database access
  - Google OAuth keys for social login
  - NextAuth configuration for session management

## Security Considerations

### Authentication Security
- Passwords stored with bcrypt hashing
- Role-based access control
- JWT token-based session management
- Secure API endpoint protection

### API Security
- CORS headers for cross-origin requests
- Input validation on API endpoints
- Authentication middleware for protected routes
- Error message sanitization

### Data Security
- Encrypted password storage
- Secure token handling
- User data protection
- Session management

## Deployment Architecture

### Frontend Deployment
- Next.js static/dynamic rendering
- Client-side JavaScript for interactivity
- Asset optimization and bundling

### Backend Deployment
- Next.js API routes for server-side logic
- Supabase integration for database operations
- Environment variable configuration for secrets

## Development Environment

### Required Dependencies
- Node.js 18+ 
- npm / yarn package manager
- Supabase project setup
- Google OAuth client configuration

### Development Tools
- TypeScript for type safety
- ESLint for code quality
- Jest for testing
- Dotenv for environment management