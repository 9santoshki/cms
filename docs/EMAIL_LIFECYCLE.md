# Order Email Lifecycle Guide

Complete guide for sending automated emails at different stages of the order lifecycle.

## Overview

The CMS platform automatically sends emails for various order events:

1. **Order Confirmation** - Sent automatically after successful payment
2. **Shipment Notification** - Sent when order is shipped (manual trigger)
3. **Delivery Confirmation** - Sent when order is delivered (manual trigger)
4. **Refund Notification** - Sent when refund is processed (manual trigger)

## Email Configuration

### Prerequisites

1. **Resend Account** (Recommended - Free tier: 3,000 emails/month)
   - Sign up at https://resend.com
   - Verify your domain or use sandbox mode for testing
   - Get API key from Dashboard → API Keys

2. **Environment Variables** (`.env.local` for development, `.env.uat` for UAT, `.env.production` for production)

```bash
# Email Provider Configuration
EMAIL_PROVIDER=resend                              # or 'smtp'
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx            # Your Resend API key
EMAIL_FROM=noreply@colourmyspace.com              # Sender email (must be verified domain)
EMAIL_FROM_NAME=Colour My Space                   # Sender name

# Alternative: SMTP Configuration (if not using Resend)
# EMAIL_PROVIDER=smtp
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your_app_password
```

### Resend Setup (Recommended)

1. **Sign up**: https://resend.com/signup
2. **Add domain**: Dashboard → Domains → Add Domain
3. **Verify DNS**: Add TXT/MX records to your domain DNS
4. **Get API Key**: Dashboard → API Keys → Create API Key
5. **Test**: Send test email from Resend dashboard

**For Development/Testing:**
- Use sandbox mode: `noreply@resend.dev` (no domain verification required)
- Limited to 100 emails/day, only sends to verified email addresses

## Email Types

### 1. Order Confirmation Email ✅ AUTOMATED

**When:** Automatically sent after successful Razorpay payment verification

**Trigger:** Automatic (in `/api/checkout/verify/route.ts`)

**Content:**
- Order ID and date
- List of purchased items with images and prices
- Total amount paid
- Shipping address
- Payment status
- "View Order Details" CTA button

**Implementation:**
```typescript
// Already implemented in /api/checkout/verify/route.ts (lines 113-163)
// No action needed - works automatically
```

**Test:**
1. Place a test order on localhost or UAT
2. Complete payment with test Razorpay credentials
3. Check email inbox for order confirmation

---

### 2. Shipment Notification Email 📦 MANUAL

**When:** Send when you ship the order

**Trigger:** Admin API endpoint

**Content:**
- Order ID
- Tracking number
- Carrier name
- Estimated delivery date
- "Track Your Order" CTA button (if tracking URL provided)

**How to Send:**

**Option A: Using API (cURL)**
```bash
# Get authentication cookie first (login as admin)
# Then send shipment notification:

curl -X POST http://localhost:3000/api/orders/123/notify \
  -H "Content-Type: application/json" \
  -H "Cookie: cms-session=<your-session-cookie>" \
  -d '{
    "type": "shipment",
    "trackingNumber": "1234567890",
    "carrier": "BlueDart",
    "trackingUrl": "https://www.bluedart.com/tracking?awb=1234567890",
    "estimatedDelivery": "2026-02-25"
  }'
```

**Option B: Using Admin Dashboard (Future)**
```typescript
// In admin dashboard order detail page:
// 1. Update order status to "shipped"
// 2. Add tracking number
// 3. Click "Send Shipment Email" button
```

**Option C: Programmatically**
```typescript
import { sendShipmentEmail } from '@/lib/email';

await sendShipmentEmail('customer@example.com', {
  orderId: 123,
  customerName: 'John Doe',
  trackingNumber: '1234567890',
  carrier: 'BlueDart',
  trackingUrl: 'https://tracking-url.com/123',
  estimatedDelivery: 'Feb 25, 2026',
});
```

---

### 3. Delivery Confirmation Email 🎉 MANUAL

**When:** Send when the order is delivered

**Trigger:** Admin API endpoint

**Content:**
- Order ID
- Delivery date
- "Leave a Review" CTA button
- Thank you message

**How to Send:**

**Option A: Using API (cURL)**
```bash
curl -X POST http://localhost:3000/api/orders/123/notify \
  -H "Content-Type: application/json" \
  -H "Cookie: cms-session=<your-session-cookie>" \
  -d '{
    "type": "delivery",
    "deliveryDate": "2026-02-23T14:30:00Z"
  }'
```

**Option B: Programmatically**
```typescript
import { sendDeliveryEmail } from '@/lib/email';

await sendDeliveryEmail('customer@example.com', {
  orderId: 123,
  customerName: 'John Doe',
  deliveryDate: new Date().toISOString(),
});
```

---

### 4. Refund Notification Email 💳 MANUAL

**When:** Send when a refund is processed

**Trigger:** Admin API endpoint

**Content:**
- Order ID
- Refund amount
- Refund reason (optional)
- Processing date
- "View Order History" CTA button
- Bank processing timeline note (5-7 business days)

**How to Send:**

**Option A: Using API (cURL)**
```bash
curl -X POST http://localhost:3000/api/orders/123/notify \
  -H "Content-Type: application/json" \
  -H "Cookie: cms-session=<your-session-cookie>" \
  -d '{
    "type": "refund",
    "refundAmount": 12999.00,
    "refundReason": "Product damaged during shipping",
    "refundDate": "2026-02-23T10:00:00Z"
  }'
```

**Option B: Programmatically**
```typescript
import { sendRefundEmail } from '@/lib/email';

await sendRefundEmail('customer@example.com', {
  orderId: 123,
  customerName: 'John Doe',
  refundAmount: 12999.00,
  refundReason: 'Product damaged',
  refundDate: new Date().toISOString(),
});
```

---

## Testing Emails

### 1. Test Locally

```bash
# Start dev server
npm run dev

# Check email configuration
node -e "console.log({
  provider: process.env.EMAIL_PROVIDER,
  from: process.env.EMAIL_FROM,
  hasResendKey: !!process.env.RESEND_API_KEY
})"
```

### 2. Send Test Email

Create a test script `scripts/test-email.js`:

```javascript
require('dotenv').config({ path: '.env.local' });

const { sendEmail } = require('../src/lib/email');

async function testEmail() {
  try {
    const result = await sendEmail(
      'your-email@example.com',
      'Test Email - CMS',
      '<h1>Hello</h1><p>This is a test email from CMS.</p>'
    );
    console.log('✅ Email sent successfully:', result);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

testEmail();
```

Run it:
```bash
node scripts/test-email.js
```

### 3. Test Order Confirmation

1. Place a real test order:
   - Add product to cart
   - Proceed to checkout
   - Use Razorpay test card: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date

2. Check email inbox for order confirmation

3. Check server logs:
```bash
# Development
npm run dev
# Look for: "Sending order confirmation email to..."

# UAT
ssh root@68.183.53.217 "pm2 logs cms-app --lines 100 | grep -i email"
```

---

## Email Templates

All email templates use:
- **Responsive design** (mobile-friendly)
- **Brand colors** (#c19a6b gold, #1a1a1a black)
- **Professional layout** with header, content, CTA, and footer
- **Indian locale** (₹ currency, date formatting)

### Customization

Edit templates in `/src/lib/email.ts`:

```typescript
// Example: Change email header color
style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"

// Example: Change CTA button color
style="background: linear-gradient(135deg, #c19a6b 0%, #a67c52 100%)"
```

---

## Troubleshooting

### Email Not Sending

1. **Check environment variables:**
   ```bash
   # Verify EMAIL_PROVIDER and RESEND_API_KEY are set
   grep EMAIL .env.local
   ```

2. **Check Resend API key:**
   - Login to Resend dashboard
   - Verify API key is active
   - Check usage limits (free tier: 3,000/month)

3. **Check domain verification:**
   - Resend Dashboard → Domains
   - Ensure domain DNS records are added
   - Or use sandbox mode: `noreply@resend.dev`

4. **Check server logs:**
   ```bash
   # Local
   npm run dev
   # Look for email-related errors

   # UAT
   ssh root@68.183.53.217 "pm2 logs cms-app --err --lines 50"
   ```

### Email Goes to Spam

1. **Verify sender domain** (SPF, DKIM, DMARC records)
2. **Use professional content** (avoid spam trigger words)
3. **Don't send too many emails** at once
4. **Resend handles deliverability** (automatic DKIM signing)

### Email Formatting Issues

1. **Test in multiple email clients** (Gmail, Outlook, Apple Mail)
2. **Use inline styles** (no external CSS)
3. **Avoid complex layouts** (use tables for compatibility)
4. **Test on mobile devices**

---

## Production Checklist

Before deploying email functionality to production:

- [ ] Resend account created and domain verified
- [ ] `RESEND_API_KEY` added to `.env.production`
- [ ] `EMAIL_FROM` set to verified domain email
- [ ] Test order confirmation email works on UAT
- [ ] Test shipment email manually
- [ ] Test delivery email manually
- [ ] Test refund email manually
- [ ] Monitor Resend dashboard for delivery rates
- [ ] Set up email alerts for failed deliveries

---

## Future Enhancements

**Planned:**
1. Admin dashboard UI for sending shipment/delivery/refund emails
2. Automated shipment emails via shipping API integration
3. Email templates for cart abandonment
4. Email templates for appointment confirmations
5. Email templates for password reset
6. SMS notifications via Twilio

---

## API Reference

### Send Order Notification Email

**Endpoint:** `POST /api/orders/[id]/notify`

**Authentication:** Admin/Moderator only

**Request Body:**
```typescript
{
  type: 'shipment' | 'delivery' | 'refund',

  // For shipment:
  trackingNumber?: string,
  carrier?: string,
  trackingUrl?: string,
  estimatedDelivery?: string,

  // For delivery:
  deliveryDate?: string, // ISO 8601 format

  // For refund:
  refundAmount?: number,
  refundReason?: string,
  refundDate?: string, // ISO 8601 format
}
```

**Response:**
```typescript
{
  success: true,
  data: {
    message: "shipment email sent successfully to customer@example.com",
    result: { /* Resend API response */ }
  }
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/orders/1/notify \
  -H "Content-Type: application/json" \
  -H "Cookie: cms-session=<session-cookie>" \
  -d '{"type": "shipment", "trackingNumber": "123", "carrier": "BlueDart"}'
```

---

## Support

For email-related issues:
- Check [EMAIL_SETUP.md](./EMAIL_SETUP.md) for configuration
- Check [EMAIL_QUICKSTART.md](./EMAIL_QUICKSTART.md) for quick setup
- Contact: rajnishkumarranjan@gmail.com
