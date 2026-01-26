# API Documentation

## Endpoint List

### Authentication
• GET/POST /api/auth/google/callback - OAuth callback handler
• GET/POST /api/auth/session - Retrieve current session
• POST /api/auth/logout - End current session

### Products
• GET /api/products - Retrieve products with filters
• POST /api/products - Create new product
• GET /api/products/[id] - Get specific product
• PUT /api/products/[id] - Update product
• DELETE /api/products/[id] - Delete product

### Cart
• GET /api/cart - Retrieve user's cart
• POST /api/cart - Add item to cart
• PUT /api/cart - Update cart item quantity
• DELETE /api/cart - Remove item from cart

### Orders
• GET /api/orders - Retrieve user's orders
• POST /api/orders - Create new order
• GET /api/orders/[id] - Get specific order details

### Appointments
• GET /api/appointments - Retrieve user's appointments
• POST /api/appointments - Book new appointment
• PUT /api/appointments/[id] - Update appointment
• DELETE /api/appointments/[id] - Cancel appointment

### Reviews
• GET /api/reviews - Retrieve product reviews
• POST /api/reviews - Submit new review
• PUT /api/reviews/[id] - Update review status
• DELETE /api/reviews/[id] - Delete review

### Images
• GET /api/images/[key] - Access Cloudflare R2 images securely

### Users
• GET /api/profile - Get user profile
• PUT /api/profile - Update user profile
• GET /api/users - Admin endpoint to get all users

## Authentication Requirements
• Public: Product listings, static pages, guest appointment booking
• Session Required: Cart operations, checkout, orders, appointments, profile management
• Admin/Moderator: Admin dashboard, product creation, user management

## Versioning
• Currently uses v0 (no prefix) - all endpoints are current version
• Future versions will be prefixed with /api/v[n]/[endpoint]
• Backward compatibility is maintained when possible during API evolution