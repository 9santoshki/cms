# Inventory Management System

## Overview

The CMS provides comprehensive inventory management for admins and moderators to monitor stock levels, manage supplier assignments, and coordinate restocking with suppliers.

## Admin Inventory Dashboard (`/dashboard/inventory`)

### Tabs

The inventory page has four tabs for different views:

| Tab | Purpose |
|-----|---------|
| **Out of Stock** | Variants with `stock_quantity = 0` - critical priority |
| **Low Stock** | Variants below threshold (default ≤10) - warning priority |
| **No Supplier** | Out-of-stock variants without assigned supplier - assignment needed |
| **All Stock** | All active variants - for browsing and direct editing |

### Summary Cards

Quick overview at the top showing:
- **Out of Stock** count (red) - click to filter to Out of Stock tab
- **No Supplier** count (gray) - variants needing supplier assignment
- **Low Stock** count (yellow) - variants below threshold

### Search

Filter results by:
- Product name
- Variant name
- SKU
- Supplier company name

### Table Columns

| Column | Description |
|--------|-------------|
| Product / Variant | Product name with variant details and draft status badge |
| SKU | Variant SKU code |
| Stock | Current stock quantity with color-coded badge |
| Supplier(s) | Assigned suppliers with their individual stock counts |
| Last Updated | Timestamp of last stock change |
| Actions | Notify, View Product, Assign Supplier buttons |

### Stock Editing

Admins can edit supplier-specific stock directly:

1. Click **"Edit"** on a supplier row
2. Enter new stock quantity (must be non-negative integer)
3. Optionally add reason/note for audit trail
4. Save - variant's total stock updates automatically

**Use cases:**
- Correcting supplier data entry errors
- Emergency stock adjustments
- Reconciling inventory after physical count

### Supplier Notification

Send restock request emails to suppliers:

1. Click **"Notify"** button on variant row
2. If multiple suppliers, select which one(s) to notify
3. Add optional custom note (e.g., "Need 20 units by Friday")
4. Email sent with:
   - Product/variant details
   - Current stock status
   - Link to supplier dashboard
   - Admin's custom note

## API Endpoints

### GET `/api/admin/inventory/out-of-stock`

Returns variants grouped by stock status:

```json
{
  "success": true,
  "data": {
    "outOfStock": [...],
    "lowStock": [...],
    "summary": {
      "outOfStockCount": 5,
      "lowStockCount": 12,
      "noSupplierCount": 2,
      "threshold": 10
    }
  }
}
```

### GET `/api/admin/inventory/all`

Returns all active variants for the "All Stock" tab. Loaded lazily only when tab is first opened.

### PUT `/api/admin/inventory/supplier-stock`

Update supplier-specific stock:

```json
{
  "variant_id": 25,
  "supplier_id": 3,
  "new_quantity": 50,
  "notes": "Correcting entry error"
}
```

Logs change to `inventory_logs` with type `admin_update`.

### POST `/api/admin/inventory/notify-supplier`

Send restock notification:

```json
{
  "variant_id": 25,
  "supplier_id": 3,       // optional - omit to notify all suppliers
  "admin_note": "Need urgent restock"
}
```

## Database Tables

### inventory_logs

Audit trail for all stock changes:

```sql
CREATE TABLE inventory_logs (
  id SERIAL PRIMARY KEY,
  variant_id INTEGER NOT NULL,
  previous_quantity INTEGER,
  new_quantity INTEGER,
  change_quantity INTEGER,
  changed_by INTEGER,       -- user_id
  change_type VARCHAR(50),  -- 'admin_update', 'supplier_update', 'order', 'return'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Change Types:**
- `admin_update` - Admin modified stock via dashboard
- `supplier_update` - Supplier modified their stock
- `order` - Stock decreased from customer order
- `return` - Stock increased from return

### supplier_variants

Links suppliers to variants with their stock counts:

```sql
CREATE TABLE supplier_variants (
  id SERIAL PRIMARY KEY,
  supplier_id INTEGER REFERENCES suppliers(id),
  variant_id INTEGER REFERENCES product_variants(id),
  supplier_stock INTEGER DEFAULT 0,
  min_stock_threshold INTEGER DEFAULT 10,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  assigned_by INTEGER,
  notes TEXT
);
```

## Stock Calculation

**Variant total stock = SUM of all assigned suppliers' `supplier_stock`**

When admin edits a supplier's stock:
1. `supplier_variants.supplier_stock` updated
2. `product_variants.stock_quantity` recalculated as sum
3. `inventory_logs` entry created

## Frontend Components

- `src/app/dashboard/inventory/page.tsx` - Main inventory dashboard
- `src/components/DashboardLayout.tsx` - Shared admin layout wrapper

## Security

- Only `admin` and `moderator` roles can access inventory dashboard
- Stock edits are attributed to the admin user
- All changes logged for audit trail
- Suppliers can only update their own assigned variants