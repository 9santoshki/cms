# Product Variants System

## Overview

The CMS supports product variants (SKUs) with flexible options. Each product can have multiple variants defined by combinations of options like thickness, size, and color.

## Architecture

### Database Tables

1. **variant_option_types** - Option categories (thickness, size, color)
   - `id`, `name`, `display_name`, `display_order`, `is_active`

2. **variant_options** - Specific options per type (thin, standard, thick)
   - `id`, `option_type_id`, `value`, `display_value`, `price_modifier`, `display_order`

3. **product_variants** - SKU combinations with price and stock
   - `id`, `product_id`, `sku`, `price`, `sale_price`, `stock_quantity`, `is_active`

4. **product_variant_values** - Links variants to their options
   - `id`, `variant_id`, `option_id`

### Pricing Model

- Each variant has its own `price` and optional `sale_price`
- Variant price overrides product base price
- Price modifiers on options are informational only (not auto-calculated)

### Inventory

- Stock tracked per variant (`stock_quantity` field)
- Product-level stock is informational fallback

## API Endpoints

### Public Endpoints

- `GET /api/products/[id]/variants` - Get variant options and SKUs for a product

### Admin Endpoints

- `GET/POST/PUT /api/admin/variant-option-types` - Manage option types
- `GET/POST/PUT/DELETE /api/admin/variant-options` - Manage options
- `GET/POST/PUT/DELETE /api/admin/product-variants` - Manage variants

## Usage

### Creating Variants

1. Create option types (already seeded: thickness, size, color)
2. Add options to each type (already seeded with defaults)
3. Create variants with selected option combinations:

```typescript
POST /api/admin/product-variants
{
  "product_id": 1,
  "price": 500,
  "sale_price": 450,
  "stock_quantity": 100,
  "option_ids": [1, 5, 10]  // thin, 12x18, natural
}
```

### Frontend Selection

The `VariantSelector` component handles variant selection:
- Shows available options as selectable buttons
- Automatically finds matching variant when options are selected
- Displays variant-specific price and stock info
- Disables unavailable option combinations

The `MiniVariantSelector` component provides compact selection for product cards:
- Displays first 2 option types with truncated labels
- Limited to 3 options per type for compact display
- Used in product grid/list views for quick variant preview
- Callback notifies parent of selected variant ID, name, and price

### Category Navigation

The `CategoryNav` component provides category-based product browsing:
- 7 shopping categories: Living Room, Dining Room, Bedroom, Home Office, Lighting, Decor, Outdoor
- Each category has subcategories (e.g., Sofas & Sectionals, Coffee Tables)
- Services category links to Portfolio, Design Services, Consultation, About, Contact
- Supports desktop dropdown menus and mobile slide-out panel
- Uses LanguageContext for translated category names

## Default Options

### Thickness
- Thin (Standard Paper)
- Standard (Premium Paper)
- Thick (Canvas Quality)

### Size
- 12×18 inches
- 18×24 inches
- 24×36 inches
- 36×48 inches

### Color
- Natural/White
- Black
- Brown/Wood
- Multi-color/Design-specific

## Adding New Options

```typescript
POST /api/admin/variant-options
{
  "option_type_id": 1,  // thickness
  "value": "extra-thick",
  "display_value": "Extra Thick (Gallery Quality)",
  "price_modifier": 100,
  "display_order": 4
}
```

## Migration

Run after product_variants migration:
```bash
PGPASSWORD=<password> psql -h localhost -U <user> -d cmsdb -f scripts/migrations/add_product_variants.sql
```