# Order Management System

Complete guide to order lifecycle, status management, and automated email notifications.

## Order Status Workflow

Orders progress through the following statuses:

```
pending → processing → shipped → completed
                         ↓
                    cancelled
```

### Status Definitions

| Status | Description | Trigger | Email Sent |
|--------|-------------|---------|------------|
| **pending** | Order created, payment pending | Order creation | ✅ Order confirmation |
| **processing** | Payment confirmed, order being prepared | Admin manual update | ❌ No |
| **shipped** | Order dispatched to customer | Admin manual update | ✅ Shipment notification |
| **completed** | Order delivered to customer | Admin manual update | ✅ Delivery confirmation |
| **cancelled** | Order cancelled by customer/admin | Admin manual update | ❌ No (manual refund email available) |

## Automated Email Notifications

### Email Triggers

The system automatically sends emails when order status changes:

#### 1. Order Confirmation (Status: pending → Created)
- **Trigger:** Automatic when order is created after successful payment
- **Sent to:** Customer email
- **Contains:**
  - Order ID and date
  - Itemized list with prices
  - Total amount
  - Shipping address
  - Payment confirmation

#### 2. Shipment Notification (Status: → shipped)
- **Trigger:** Automatic when admin changes status to "shipped"
- **Sent to:** Customer email
- **Contains:**
  - Tracking number
  - Carrier name
  - Tracking URL (clickable)
  - Estimated delivery (5-7 business days)
  - Order details

#### 3. Delivery Confirmation (Status: → completed)
- **Trigger:** Automatic when admin changes status to "completed"
- **Sent to:** Customer email
- **Contains:**
  - Delivery confirmation
  - Order summary
  - Feedback request
  - Thank you message

### Manual Email Triggers

Admins can manually trigger emails via API:

```bash
# Send any email type manually
POST /api/orders/[id]/notify
{
  "emailType": "shipment" | "delivery" | "refund",
  "trackingNumber": "...",
  "carrier": "...",
  "trackingUrl": "..."
}
```

## Admin Dashboard - Order Management

### Viewing Orders

**URL:** `/dashboard/orders`

- Shows all orders for admin/moderator
- Shows only user's own orders for customers
- Displays: Order ID, Date, Customer, Total, Status
- Click order to view details

### Order Detail Page

**URL:** `/dashboard/orders/[id]`

**Features:**
- Order items with product images
- Shipping address
- Payment information
- Customer details
- Status update controls

### Updating Order Status

**Basic Status Change:**
1. Navigate to order detail page
2. Click desired status button (pending, processing, completed, cancelled)
3. Confirm update
4. Email sent automatically (if applicable)

**Changing to "Shipped" (with tracking):**
1. Click "Shipped 📦" button
2. Fill in tracking form:
   - **Tracking Number** (required) - e.g., `TRACK123456789`
   - **Carrier** (required) - Select from dropdown:
     - BlueDart
     - DTDC
     - FedEx
     - Delhivery
     - India Post
     - Ecom Express
     - Ekart
     - Other
   - **Tracking URL** (optional) - Full tracking link
3. Click "✉️ Mark as Shipped & Send Email"
4. Shipment email sent automatically with tracking details

## Email Templates

All emails use Resend API with branded HTML templates.

### Template Features
- Professional branding with Colour My Space logo
- Gold accent color (#c19a6b)
- Responsive HTML design
- Inline CSS for email client compatibility
- Indian locale (₹ currency)

### Email Provider Configuration

**Environment Variables:**
```bash
# Resend (recommended - 3,000 free emails/month)
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=noreply@colourmyspace.com
EMAIL_FROM_NAME=Colour My Space
```

**Alternative: SMTP** (see [EMAIL_SETUP.md](EMAIL_SETUP.md))

## API Reference

### Get Order Details
```http
GET /api/orders/[id]
Authorization: Cookie (cms-session)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "user_id": 1,
    "user_name": "John Doe",
    "user_email": "john@example.com",
    "total_amount": "12999.00",
    "status": "processing",
    "payment_id": "pay_xxx",
    "payment_status": "paid",
    "shipping_address": {...},
    "created_at": "2026-02-21T10:00:00Z",
    "items": [...]
  }
}
```

### Update Order Status
```http
PUT /api/orders/[id]
Authorization: Cookie (cms-session)
Content-Type: application/json

{
  "status": "shipped",
  "trackingNumber": "TRACK123",  // Optional
  "carrier": "BlueDart",         // Optional
  "trackingUrl": "https://..."   // Optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "Order status updated to shipped. Email sent to customer."
}
```

**Auto-email behavior:**
- Status → "shipped": Sends shipment email
- Status → "completed": Sends delivery email
- Other statuses: No email sent
- Email errors don't fail the status update (logged only)

### Manual Email Notification
```http
POST /api/orders/[id]/notify
Authorization: Cookie (cms-session)
Content-Type: application/json

{
  "emailType": "shipment",
  "trackingNumber": "TRACK123",
  "carrier": "BlueDart",
  "trackingUrl": "https://bluedart.com/track/TRACK123",
  "estimatedDelivery": "Within 3-5 business days"
}
```

## Database Schema

### Orders Table
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'processing', 'shipped', 'completed', 'cancelled')),
    payment_id VARCHAR(255),
    payment_status VARCHAR(50),
    shipping_address JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Status Constraint:**
- Added 'shipped' status in migration: `scripts/add_shipped_status.sql`
- Previously only had: pending, processing, completed, cancelled

### Order Items Table
```sql
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── orders/
│   │       ├── route.ts              # GET /api/orders (list all)
│   │       └── [id]/
│   │           ├── route.ts          # GET/PUT /api/orders/[id]
│   │           └── notify/
│   │               └── route.ts      # POST (manual email trigger)
│   └── dashboard/
│       └── orders/
│           ├── page.tsx              # Order list page
│           └── [id]/
│               └── page.tsx          # Order detail + status update
├── lib/
│   ├── db/
│   │   └── orders.ts                 # Database operations
│   └── email.ts                      # Email service (Resend)
└── components/
    └── OrderHistory.tsx              # User order history component
```

## Testing

### Local Testing

1. **Create test order:**
   ```bash
   # Add product to cart → Checkout → Complete payment
   # Or use Razorpay test mode
   ```

2. **Update order status:**
   - Go to http://localhost:3000/dashboard/orders
   - Click an order
   - Change status to "shipped" (fill tracking form)
   - Check console logs for email confirmation

3. **Verify email sent:**
   - Resend Dashboard: https://resend.com/emails
   - Check customer inbox

### Email Testing Checklist

- [ ] Order confirmation sent on order creation
- [ ] Shipment email sent when status → shipped
- [ ] Tracking details appear in email (number, carrier, link)
- [ ] Delivery email sent when status → completed
- [ ] Manual email trigger works via API
- [ ] Email errors logged but don't fail status update

## Troubleshooting

### Email Not Sending

**Check environment variables:**
```bash
echo $RESEND_API_KEY
echo $EMAIL_FROM
```

**Check console logs:**
```bash
npm run dev
# Look for:
# ✓ Shipment email sent to customer@example.com
# OR
# ⚠️ Failed to send email: [error details]
```

**Verify Resend API:**
- Dashboard: https://resend.com/emails
- Check API key is valid
- Verify domain is verified
- Check email sending limits (3000/month free)

### Status Update Failing

**Error: "orders_status_check constraint violation"**
- Solution: Run migration `scripts/add_shipped_status.sql`
- This adds 'shipped' to allowed statuses

**Error: "Authentication required"**
- Admin/moderator role required
- Check session cookie exists
- Verify user role in database

### Tracking Form Not Appearing

- Click "Shipped 📦" button once (don't click Update Status directly)
- Form should expand with tracking fields
- If stuck, click "Cancel" and try again

## Email Provider: Resend vs SMTP

| Feature | Resend | SMTP (Gmail) |
|---------|--------|--------------|
| **Free tier** | 3,000 emails/month | 500 emails/day |
| **Setup time** | 5 minutes | 15 minutes |
| **Deliverability** | Excellent | Good |
| **Tracking** | Dashboard | None |
| **Authentication** | API key | App password |
| **Recommended** | ✅ Yes | If already using |

**See:** [EMAIL_SETUP.md](EMAIL_SETUP.md) for detailed configuration guide.

## Security & Authorization

**Order Access:**
- Customers: View only their own orders
- Moderators: View and update all orders
- Admins: View and update all orders

**Status Updates:**
- Only admins and moderators can change order status
- Regular users get 403 Forbidden error

**Email Notifications:**
- Only admins/moderators can manually trigger emails
- Automatic emails sent only on status change
- Customer email addresses validated before sending

## Future Enhancements

Potential improvements for consideration:

- [ ] Email notifications for "cancelled" status (refund email)
- [ ] Email notification for "processing" status (order being prepared)
- [ ] SMS notifications via Twilio integration
- [ ] Bulk order status updates
- [ ] Order refund workflow
- [ ] Return/exchange management
- [ ] Order invoice generation (PDF)
- [ ] Customer feedback form after delivery
- [ ] Admin notification when new order placed
- [ ] Estimated delivery date calculation based on carrier

---

**Related Documentation:**
- [EMAIL_SETUP.md](EMAIL_SETUP.md) - Complete email configuration guide
- [EMAIL_QUICKSTART.md](EMAIL_QUICKSTART.md) - Quick setup for order emails
- [API.md](API.md) - Complete API reference
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture overview
