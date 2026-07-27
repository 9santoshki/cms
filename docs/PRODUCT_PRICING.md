# Product Pricing System

Documentation for the simplified 2-field product pricing model.

## Overview

The product pricing system uses a simplified 2-field model for clear, unambiguous pricing:

- **`price`** - Regular/baseline price (required)
- **`sale_price`** - Discounted/sale price (optional)

**Display Logic:** Show `sale_price` if it exists and is less than `price`, otherwise show `price`.

## Migration History

### Previous Model (Deprecated)

The system previously used a confusing 3-field model:
- `price` - Current display price
- `original_price` - Full retail price (removed)
- `sale_price` - Discounted price

**Problem:** Redundancy and confusion about which field represented what.

### Current Model (Simplified)

**Migrated:** February 21, 2026

Simplified to 2 fields with clear semantics:
- `price` - Regular/original price (the baseline)
- `sale_price` - Discounted price (shown when on sale)

**Migration Script:** `scripts/migrate_pricing.sql`

## Database Schema

### Products Table

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,        -- Regular price
    sale_price DECIMAL(10, 2),            -- Sale price (optional)
    image_url TEXT,
    category VARCHAR(100),
    slug VARCHAR(255) UNIQUE,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Price Model Comment:**
```sql
-- Price model: price = regular/baseline price, sale_price = discounted price (optional)
-- Display logic: Show sale_price if it exists and < price, otherwise show price
```

## Pricing Logic

### Display Price Calculation

```typescript
// Calculate which price to display
const displayPrice = product.sale_price || product.price;

// Check if product has discount
const hasDiscount = product.sale_price && product.price > product.sale_price;

// Calculate discount percentage
const discountPercent = hasDiscount
  ? Math.round(((product.price - product.sale_price) / product.price) * 100)
  : 0;
```

### Examples

#### Product Without Sale
```json
{
  "id": 1,
  "name": "Classic Wooden Chair",
  "price": 12999.00,
  "sale_price": null
}
```
**Display:** ₹12,999 (no discount badge)

#### Product On Sale
```json
{
  "id": 2,
  "name": "Modern Sofa",
  "price": 45000.00,
  "sale_price": 35999.00
}
```
**Display:**
- ₹35,999 (bold, gold color)
- ₹45,000 (strikethrough)
- "20% OFF" badge

#### Invalid Sale Price (Sale >= Regular)
```json
{
  "id": 3,
  "name": "Coffee Table",
  "price": 10000.00,
  "sale_price": 12000.00  // Invalid: higher than regular
}
```
**Display:** ₹12,000 (no discount shown - `hasDiscount()` returns false)

## Frontend Implementation

### Shop Page (NewShopPage.tsx)

```typescript
const hasDiscount = (product: any): boolean => {
  const price = parsePrice(product.price);
  const sale = parsePrice(product.sale_price);
  return sale > 0 && price > sale;
};

// Display
{hasDiscount(product) && (
  <div className="discount-badge">
    {Math.round(((product.price - product.sale_price) / product.price) * 100)}% OFF
  </div>
)}
<div className="price">
  {hasDiscount(product) && (
    <span className="original-price">₹{product.price.toLocaleString()}</span>
  )}
  <span className="sale-price">
    ₹{(product.sale_price || product.price).toLocaleString()}
  </span>
</div>
```

### Product Detail Page (ProductDetailDisplay.tsx)

```typescript
const displayPrice = parsePrice(product.sale_price) || parsePrice(product.price);
const originalPrice = parsePrice(product.price);
const hasDiscount = originalPrice > 0 && originalPrice > displayPrice;

// Display
<div className="price-section">
  <h2 className="price">₹{displayPrice.toLocaleString()}</h2>
  {hasDiscount && (
    <>
      <span className="original-price">₹{originalPrice.toLocaleString()}</span>
      <span className="discount-badge">
        {Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}% OFF
      </span>
    </>
  )}
</div>
```

### Homepage Featured Collection (NewHomepage.tsx)

```typescript
// Display price
<span className="sale-price">
  ₹{(product.sale_price || product.price)?.toLocaleString()}
</span>

// Show discount if on sale
{product.sale_price && product.price > product.sale_price && (
  <>
    <span className="original-price">
      ₹{product.price?.toLocaleString()}
    </span>
    <span className="discount-percent">
      {Math.round(((product.price - product.sale_price) / product.price) * 100)}% OFF
    </span>
  </>
)}
```

## Admin Dashboard

### Product Create/Edit Form

**Location:** `src/app/dashboard/products/[id]/page.tsx`

**Form Fields:**
```tsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
  {/* Regular Price */}
  <div>
    <label>Regular Price (₹) *</label>
    <input
      type="number"
      name="price"
      value={formData.price}
      onChange={handleChange}
      required
    />
    <p>Base price (shown as strikethrough when on sale)</p>
  </div>

  {/* Sale Price */}
  <div>
    <label>Sale Price (₹)</label>
    <input
      type="number"
      name="sale_price"
      value={formData.sale_price}
      onChange={handleChange}
    />
    <p>Discounted price (shown if less than regular price)</p>
  </div>
</div>

{/* Discount Preview */}
{formData.price && formData.sale_price && formData.price > formData.sale_price && (
  <div className="discount-preview">
    <strong>Discount:</strong>
    {Math.round(((formData.price - formData.sale_price) / formData.price) * 100)}% OFF
  </div>
)}
```

**Validation:**
- `price` is required
- `sale_price` is optional
- No client-side validation for sale_price < price (handled in display logic)

## API Endpoints

### Create Product

```http
POST /api/products
Content-Type: application/json

{
  "name": "Modern Coffee Table",
  "description": "Sleek design with glass top",
  "price": 15000,
  "sale_price": 12999,  // Optional
  "category": "Furniture",
  "stock_quantity": 10
}
```

### Update Product

```http
PUT /api/products/[id]
Content-Type: application/json

{
  "price": 16000,
  "sale_price": 13999  // Can be null to remove sale
}
```

### Response Format

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Modern Coffee Table",
    "price": "15000.00",
    "sale_price": "12999.00",
    "created_at": "2026-02-21T10:00:00Z",
    "updated_at": "2026-02-21T10:00:00Z"
  }
}
```

## Database Operations

### Create Product (lib/db/products.ts)

```typescript
export async function createProduct(product: {
  name: string;
  description: string;
  price: number;
  sale_price?: number;  // Optional
  category?: string;
  slug?: string;
  stock_quantity?: number;
}): Promise<Product> {
  const result = await query(
    `INSERT INTO products (name, description, price, sale_price, category, slug, stock_quantity)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      product.name,
      product.description,
      product.price,
      product.sale_price || null,
      product.category,
      product.slug,
      product.stock_quantity || 0
    ]
  );
  return result.rows[0];
}
```

### Update Product

```typescript
export async function updateProduct(
  id: number,
  updates: Partial<Product>
): Promise<Product | null> {
  // Dynamic SQL generation for partial updates
  const fields = Object.keys(updates).filter(k => k !== 'id');
  const values = fields.map(f => updates[f]);

  const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');

  const result = await query(
    `UPDATE products SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, id]
  );

  return result.rows[0] || null;
}
```

## Cart and Checkout

### Cart Item Price

When adding to cart, the **display price** is stored:

```typescript
const displayPrice = product.sale_price || product.price;

// Add to cart
await addToCart(userId, productId, quantity, displayPrice);
```

**Important:** Cart stores the price at the time of adding to cart. Price changes don't affect existing cart items.

### Order Creation

Order items use the cart price:

```typescript
// Create order item
await query(
  `INSERT INTO order_items (order_id, product_id, quantity, price)
   VALUES ($1, $2, $3, $4)`,
  [orderId, item.product_id, item.quantity, item.price]
);
```

## Migration Details

### Migration Script

**File:** `scripts/migrate_pricing.sql`

```sql
-- Product Pricing Migration: Drop original_price column
-- Date: 2026-02-21

BEGIN;

-- 1. Create backup
CREATE TABLE products_backup_20260221 AS SELECT * FROM products;

-- 2. Verify backup
DO $$
DECLARE
  backup_count INTEGER;
  products_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO backup_count FROM products_backup_20260221;
  SELECT COUNT(*) INTO products_count FROM products;

  IF backup_count != products_count THEN
    RAISE EXCEPTION 'Backup verification failed';
  END IF;

  RAISE NOTICE 'Backup verified: % rows', backup_count;
END $$;

-- 3. Drop original_price column
ALTER TABLE products DROP COLUMN IF EXISTS original_price;

-- 4. Verify column dropped
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'original_price'
  ) THEN
    RAISE EXCEPTION 'Failed to drop original_price column';
  END IF;

  RAISE NOTICE 'Column original_price successfully dropped';
END $$;

COMMIT;
```

### Rollback Plan

```sql
-- Restore original_price if needed
BEGIN;

ALTER TABLE products ADD COLUMN original_price DECIMAL(10, 2);

UPDATE products p
SET original_price = b.original_price
FROM products_backup_20260221 b
WHERE p.id = b.id;

COMMIT;
```

### Execution

```bash
# Local
PGPASSWORD=sk psql -h localhost -U sk -d cmsdb -f scripts/migrate_pricing.sql

# UAT
ssh root@68.183.53.217 "cd /home/cms/app && PGPASSWORD='<pwd>' psql -h localhost -U cms_user -d cms_db -f scripts/migrate_pricing.sql"
```

## TypeScript Types

### Product Interface

**File:** `src/types/index.ts`

```typescript
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;                    // Regular price
  sale_price?: number;              // Sale price (optional)
  image_url?: string;
  category?: string;
  slug?: string;
  stock_quantity?: number;
  created_at?: string;
  updated_at?: string;
  primary_image?: string;           // From product_images table
}
```

## Best Practices

### Setting Prices

1. **Always set `price` (regular price):**
   - This is the baseline/original price
   - Required field, cannot be null

2. **Set `sale_price` only when on sale:**
   - Leave as null when not on sale
   - Ensure sale_price < price for discount to show

3. **Updating prices:**
   - To end a sale: Set `sale_price` to null
   - To start a sale: Set `sale_price` less than `price`
   - To change regular price: Update `price`

### Display Conventions

1. **Show sale price prominently:**
   - Bold, larger font, gold/accent color

2. **Show original price with strikethrough:**
   - Smaller font, gray color

3. **Display discount badge:**
   - Percentage off, rounded to nearest integer
   - Bright color for visibility

4. **Cart and checkout:**
   - Always show the display price (sale_price OR price)
   - Indicate if item is on sale

## Testing

### Test Cases

1. **Product without sale:**
   ```json
   { "price": 10000, "sale_price": null }
   ```
   - Display: ₹10,000
   - No discount badge
   - No strikethrough

2. **Product on sale:**
   ```json
   { "price": 10000, "sale_price": 7999 }
   ```
   - Display: ₹7,999 (bold)
   - Original: ₹10,000 (strikethrough)
   - Badge: "20% OFF"

3. **Invalid sale (sale >= regular):**
   ```json
   { "price": 10000, "sale_price": 12000 }
   ```
   - Display: ₹12,000
   - No discount badge (hasDiscount returns false)

4. **Update: Add sale:**
   - Before: `{ "price": 10000, "sale_price": null }`
   - Update: `{ "sale_price": 8500 }`
   - Result: 15% OFF badge appears

5. **Update: Remove sale:**
   - Before: `{ "price": 10000, "sale_price": 8500 }`
   - Update: `{ "sale_price": null }`
   - Result: Discount badge disappears

## Related Files

```
src/
├── types/
│   ├── index.ts                     # Product interface
│   └── types.ts                     # Duplicate types file
├── lib/
│   └── db/
│       └── products.ts              # Database operations
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── route.ts             # POST /api/products
│   │       └── [id]/
│   │           └── route.ts         # PUT /api/products/[id]
│   └── dashboard/
│       └── products/
│           └── [id]/
│               └── page.tsx         # Admin product form
└── components/
    ├── NewShopPage.tsx              # Shop product listing
    ├── ProductDetailDisplay.tsx     # Product detail page
    └── NewHomepage.tsx              # Homepage featured products

scripts/
├── migrate_pricing.sql              # Migration to drop original_price
└── initDatabase.sql                 # Schema definition
```

---

**Related Documentation:**
- [API.md](API.md) - Product API endpoints
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [CODE_STRUCTURE.md](CODE_STRUCTURE.md) - Codebase organization
