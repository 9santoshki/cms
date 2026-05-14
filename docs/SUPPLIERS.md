# Supplier Management System

## Overview

Suppliers/partners can log in via Google OAuth and manage inventory for assigned product variants. This enables decentralized inventory management where external partners update stock levels for products they supply.

## Architecture

### User Roles

The system extends user roles to include:
- `customer` - Standard customer account
- `supplier` - Supplier/partner with inventory management access
- `moderator` - Content moderator
- `admin` - Full system access

### Database Tables

1. **suppliers** - Supplier business profiles
   - `id`, `user_id`, `company_name`, `contact_person`, `phone`, `address`, `gst_id`, `is_active`, `notes`

2. **supplier_variants** - Assignments linking suppliers to variants
   - `id`, `supplier_id`, `variant_id`, `assigned_at`, `assigned_by`, `notes`

3. **inventory_logs** - Audit trail for stock changes
   - `id`, `variant_id`, `previous_quantity`, `new_quantity`, `change_quantity`, `changed_by`, `change_type`, `notes`

### Supplier Onboarding Flow

1. Supplier signs up via Google OAuth (creates user account)
2. Admin creates supplier profile linked to user account
3. Admin assigns specific variants to supplier
4. Supplier logs in and manages assigned inventory

## API Endpoints

### Admin Endpoints

**Suppliers Management:**
- `GET /api/admin/suppliers` - List all suppliers
- `POST /api/admin/suppliers` - Create supplier profile
- `PUT /api/admin/suppliers` - Update supplier profile
- `DELETE /api/admin/suppliers?id=<id>` - Delete supplier

**Variant Assignments:**
- `GET /api/admin/supplier-variants?supplier_id=<id>` - Get supplier's variants
- `GET /api/admin/supplier-variants?variant_id=<id>` - Get variant's suppliers
- `POST /api/admin/supplier-variants` - Assign variant to supplier
- `DELETE /api/admin/supplier-variants?supplier_id=<id>&variant_id=<id>` - Remove assignment

### Supplier Endpoints

- `GET /api/supplier/variants` - Get assigned variants with stock info
- `PUT /api/supplier/variants` - Update variant inventory
- `GET /api/supplier/logs` - View recent inventory changes

## Usage Examples

### Creating a Supplier (Admin)

```typescript
POST /api/admin/suppliers
{
  "user_id": 42,           // Existing user who signed up via Google
  "company_name": "Premium Prints Co.",
  "phone": "+91 98765 43210",
  "address": "Industrial Area, Bengaluru",
  "gst_id": "29ABCDE1234F1Z5",
  "notes": "Preferred supplier for canvas prints"
}
```

### Assigning Variants to Supplier (Admin)

```typescript
POST /api/admin/supplier-variants
{
  "supplier_id": 1,
  "variant_id": 25,
  "notes": "Main supplier for thick canvas variants"
}
```

### Updating Inventory (Supplier)

```typescript
PUT /api/supplier/variants
{
  "variant_id": 25,
  "new_quantity": 150,
  "notes": "Weekly restock from warehouse"
}
```

## Frontend

### Supplier Dashboard (`/supplier`)

- Accessible only to users with `supplier` role
- Shows company information and contact details
- Lists all assigned variants with current stock levels
- Provides stock update modal for each variant
- Visual stock indicators (green >10, yellow >0, red =0)

### Inventory Audit Trail

All stock changes are logged:
- `supplier_update` - Supplier modified stock
- `admin_update` - Admin modified stock
- `order` - Stock decreased from order
- `return` - Stock increased from return

## Security

- Suppliers can only see and update variants assigned to them
- Supplier accounts can be deactivated (`is_active = false`)
- All changes tracked with user ID and timestamp
- Suppliers cannot access other parts of the admin dashboard

## Migration

Run after product_variants migration:
```bash
PGPASSWORD=<password> psql -h localhost -U <user> -d cmsdb -f scripts/migrations/add_suppliers.sql
```

## Admin Workflow

### Adding a New Supplier

1. Have supplier sign up at `/auth` (Google OAuth)
2. Note their user_id from the users table
3. Go to admin dashboard → Suppliers section
4. Create supplier profile with business details
5. Assign product variants they will manage

### Managing Assignments

- Each variant can have multiple suppliers (for backup)
- Each supplier can have multiple variants
- Remove assignment when supplier no longer handles that product
- Supplier account can be deactivated without deleting assignments