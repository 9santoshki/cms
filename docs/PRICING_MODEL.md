# Product Pricing Model

## Overview

The CMS platform uses a simple 2-field pricing model for products: **Regular Price** and **Sale Price**.

## Database Schema

```sql
CREATE TABLE products (
    -- ... other fields ...
    price DECIMAL(10, 2) NOT NULL,        -- Regular/baseline price
    sale_price DECIMAL(10, 2),            -- Optional discounted price
    -- ... other fields ...
);
```

## Pricing Fields

### `price` (required)
- **Type:** `DECIMAL(10, 2)` (required, NOT NULL)
- **Description:** The regular/baseline price of the product
- **Display:** Shown as the main price when no sale is active, or as strikethrough when on sale
- **Example:** ₹15,000

### `sale_price` (optional)
- **Type:** `DECIMAL(10, 2)` (optional, NULL allowed)
- **Description:** The discounted price when product is on sale
- **Display:** Shown as the main price when `sale_price < price`, otherwise ignored
- **Example:** ₹9,999

## Display Logic

The frontend determines which price to display using this logic:

```typescript
// Display price (what customer pays)
const displayPrice = parsePrice(product.sale_price) || parsePrice(product.price);

// Show discount badge?
const hasDiscount = sale_price > 0 && price > sale_price;

// Calculate discount percentage
const discountPercent = ((price - sale_price) / price) * 100;
```

**Example scenarios:**

1. **Product without sale:**
   - `price = 12999`, `sale_price = NULL`
   - Display: ₹12,999 (no discount badge)

2. **Product on sale:**
   - `price = 15000`, `sale_price = 9999`
   - Display: ₹9,999 with ₹15,000 strikethrough, "40% OFF" badge

3. **Invalid sale (sale >= regular):**
   - `price = 10000`, `sale_price = 12000`
   - Display: ₹12,000 (no discount badge shown, treats as regular price)

## Admin Interface

The product create/edit form (`/dashboard/products/[id]`) presents two price fields:

- **Regular Price (₹)** - Required field for the baseline price
- **Sale Price (₹)** - Optional field for discounted price

When both fields are filled and `sale_price < price`, a live discount preview shows:
```
Discount: 40% OFF
```

## Migration History

**Date:** 2026-02-21

**Migration:** Simplified from 3-field to 2-field pricing model

**Before (3 fields - redundant):**
- `price` - Current/display price
- `original_price` - Full retail price ← **REMOVED**
- `sale_price` - Sale/discounted price

**After (2 fields - simplified):**
- `price` - Regular/baseline price
- `sale_price` - Discounted price (optional)

**Migration Script:** `scripts/migrate_pricing.sql`

**Rationale:** The 3-field model created confusion about which field represented what. The new 2-field model has clear semantics: `price` is always the baseline, `sale_price` is the discount.

## API Response Format

Product endpoints (`GET /api/products`, `GET /api/products/[id]`) return:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Designer Sofa Set",
    "description": "Luxury 3-seater sofa",
    "price": 15000.00,
    "sale_price": 9999.00,
    "primary_image": "/api/images/product_images%2F1234567890.jpg",
    ...
  }
}
```

## Code References

- **Display Logic:** `src/components/NewShopPage.tsx`, `src/components/ProductDetailDisplay.tsx`
- **Database Layer:** `src/lib/db/products.ts`
- **API Endpoints:** `src/app/api/products/route.ts`, `src/app/api/products/[id]/route.ts`
- **Admin Form:** `src/app/dashboard/products/[id]/page.tsx`
- **TypeScript Types:** `src/types/index.ts`, `src/types.ts`
- **Schema:** `scripts/initDatabase.sql`
