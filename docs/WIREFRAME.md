# Wireframe Documentation

## Page Structure

### Homepage
```
┌─────────────────────────────────────┐
│ Header (Logo, Navigation, Cart)     │
├─────────────────────────────────────┤
│ Hero Banner                         │
├─────────────────────────────────────┤
│ Featured Products                   │
│ [Product Card] [Product Card]       │
├─────────────────────────────────────┤
│ Services Section                    │
├─────────────────────────────────────┤
│ Portfolio Showcase                  │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

### Product Listing
```
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ Filters (Category, Price, Search)   │
├─────────────────────────────────────┤
│ Product Grid                        │
│ [Product] [Product] [Product]       │
│ [Product] [Product] [Product]       │
├─────────────────────────────────────┤
│ Pagination Controls                 │
└─────────────────────────────────────┘
```

### Product Detail
```
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ Breadcrumb                          │
├─────────────────────────────────────┤
│ Product Gallery                     │
│ [Main Image] [Thumbnails]           │
├─────────────────────────────────────┤
│ Product Info (Name, Price, Desc.)   │
│ [Add to Cart Button]                │
└─────────────────────────────────────┘
```

### Shopping Cart
```
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ Cart Items List                     │
│ [Item 1]                            │
│ [Item 2]                            │
├─────────────────────────────────────┤
│ Subtotal & Checkout Button          │
└─────────────────────────────────────┘
```

### Checkout Flow
```
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ [Step 1] Customer Info              │
│ [Step 2] Shipping Address           │
│ [Step 3] Payment Method             │
│ [Step 4] Order Review               │
├─────────────────────────────────────┤
│ Place Order Button                  │
└─────────────────────────────────────┘
```

### User Account Dashboard
```
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ Sidebar Navigation                  │
│ • Profile                          │
│ • Orders                           │
│ • Appointments                     │
│ • Wishlist                         │
├─────────────────────────────────────┤
│ Main Content Area                   │
└─────────────────────────────────────┘
```

### Admin Dashboard
```
┌─────────────────────────────────────┐
│ Admin Header                        │
├─────────────────────────────────────┤
│ Admin Navigation                    │
│ • Products                         │
│ • Orders                           │
│ • Users                            │
│ • Appointments                     │
│ • Reviews                          │
├─────────────────────────────────────┤
│ Dashboard Content Area              │
└─────────────────────────────────────┘
```

## Navigation Map
• / (Home) → /products → /products/[slug] → /cart → /checkout
• /account (User Dashboard)
• /dashboard (Admin Dashboard)
• /auth/* (Authentication flows)
• /about, /contact, /services, /portfolio