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

### Inventory (Admin)
• GET /api/admin/inventory/out-of-stock - Get out-of-stock and low-stock variants with supplier info
• GET /api/admin/inventory/all - Get all active variants for stock management
• PUT /api/admin/inventory/supplier-stock - Update supplier-specific stock quantity
• POST /api/admin/inventory/notify-supplier - Send restock request email to supplier(s)

### Images
• GET /api/images/[key] - Access Cloudflare R2 images securely

### Users
• GET /api/profile - Get user profile
• PUT /api/profile - Update user profile
• GET /api/users - Admin endpoint to get all users

### Suppliers (Admin)
• GET /api/admin/suppliers - List all suppliers
• POST /api/admin/suppliers - Create supplier profile
• PUT /api/admin/suppliers - Update supplier profile
• DELETE /api/admin/suppliers?id=<id> - Delete supplier
• GET /api/admin/supplier-variants - Get supplier-variant assignments
• POST /api/admin/supplier-variants - Assign variant to supplier
• DELETE /api/admin/supplier-variants - Remove assignment

### Suppliers (Supplier Role)
• GET /api/supplier/variants - Get assigned variants with stock info
• PUT /api/supplier/variants - Update variant inventory
• GET /api/supplier/logs - View recent inventory changes

### Variants (Admin)
• GET/POST/PUT /api/admin/variant-option-types - Manage option types (thickness, size, color)
• GET/POST/PUT/DELETE /api/admin/variant-options - Manage options
• GET/POST/PUT/DELETE /api/admin/product-variants - Manage product variants

### Variants (Public)
• GET /api/products/[id]/variants - Get variant options and SKUs for a product

## Authentication Requirements
• Public: Product listings, static pages, guest appointment booking
• Session Required: Cart operations, checkout, orders, appointments, profile management
• Supplier: Supplier dashboard, assigned variant management, inventory updates
• Admin/Moderator: Admin dashboard, product creation, user management, inventory management

## Versioning
• Currently uses v0 (no prefix) - all endpoints are current version
• Future versions will be prefixed with /api/v[n]/[endpoint]
• Backward compatibility is maintained when possible during API evolution