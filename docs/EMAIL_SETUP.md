# Email Configuration Guide

This guide explains how to configure automatic email sending for order confirmations after successful payment.

## Overview

The application supports two email providers:
1. **Resend** (recommended) - Modern, simple, 3,000 free emails/month
2. **SMTP** (Gmail, SendGrid, etc.) - Traditional email service

## Option 1: Resend (Recommended)

### Why Resend?
- ✅ 3,000 emails/month free tier
- ✅ Simple setup (just API key)
- ✅ Excellent deliverability
- ✅ Modern dashboard
- ✅ No credit card required for free tier

### Setup Steps

#### 1. Create Resend Account
1. Go to https://resend.com
2. Sign up for free account
3. Verify your email

#### 2. Get API Key
1. Login to Resend dashboard
2. Go to "API Keys" section
3. Click "Create API Key"
4. Give it a name (e.g., "CMS Production")
5. Copy the API key (starts with `re_...`)

#### 3. Verify Domain (Production)
For production, you need to verify your domain:

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain: `colourmyspace.com`
4. Add the provided DNS records to your domain:
   - TXT record for verification
   - MX, SPF, DKIM records for deliverability
5. Wait for verification (usually 5-10 minutes)

#### 4. Configure Environment Variables

Add to `.env.local` (local development):
```env
# Email Configuration (Resend)
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@colourmyspace.com
EMAIL_FROM_NAME=Colour My Space
```

Add to `.env.uat` (UAT server):
```env
# Email Configuration (Resend)
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@colourmyspace.com
EMAIL_FROM_NAME=Colour My Space
```

Add to `.env.production` (Production server):
```env
# Email Configuration (Resend)
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@colourmyspace.com
EMAIL_FROM_NAME=Colour My Space
```

#### 5. Test Email (Local Development)

For testing locally, you can use Resend's sandbox mode:
```env
EMAIL_FROM=onboarding@resend.dev
```

This will send emails but only to verified email addresses in your Resend account.

---

## Option 2: SMTP (Gmail)

### Why Gmail SMTP?
- ✅ Free for low volume (<100 emails/day)
- ✅ Works with existing Gmail account
- ✅ Good deliverability

### Setup Steps

#### 1. Enable App Password in Gmail

1. Go to your Google Account: https://myaccount.google.com
2. Click "Security" in left sidebar
3. Enable 2-Step Verification (if not already enabled)
4. After enabling 2FA, scroll down to "2-Step Verification"
5. Scroll to bottom and click "App passwords"
6. Select app: "Mail"
7. Select device: "Other" (enter "CMS App")
8. Click "Generate"
9. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)

#### 2. Configure Environment Variables

Add to `.env.local`, `.env.uat`, or `.env.production`:

```env
# Email Configuration (Gmail SMTP)
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # App password from step 1
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=Colour My Space
```

**Important Notes:**
- Port 587 = TLS (recommended)
- Port 465 = SSL (also works)
- Use App Password, NOT your regular Gmail password
- Gmail has a limit of ~100 emails per day for free accounts

---

## Option 3: Other SMTP Providers

### SendGrid
```env
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxx  # SendGrid API key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=Colour My Space
```

### Amazon SES
```env
EMAIL_PROVIDER=smtp
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=AKIAXXXXXXXXXXXX  # AWS SES SMTP username
SMTP_PASS=xxxxxxxxxxxxxxxxxxxx  # AWS SES SMTP password
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=Colour My Space
```

---

## Testing Email Delivery

### 1. Local Testing

Start your dev server:
```bash
npm run dev
```

Place a test order and check console for email sending logs:
```
Sending order confirmation email to: customer@example.com
Order confirmation email sent successfully
```

### 2. Check Spam Folder

First emails may land in spam. To improve deliverability:
- **Resend**: Verify your domain with SPF/DKIM records
- **Gmail**: Use a business email address
- **Production**: Always use verified domain emails

### 3. Test Email Content

To see the email HTML without sending:
```typescript
import { generateOrderConfirmationEmail } from '@/lib/email';

const html = generateOrderConfirmationEmail({
  orderId: '123',
  customerName: 'Test Customer',
  customerEmail: 'test@example.com',
  orderDate: new Date().toISOString(),
  items: [
    { name: 'Test Product', quantity: 2, price: 1500 }
  ],
  totalAmount: 3000,
  shippingAddress: {
    name: 'Test Customer',
    address: '123 Test Street',
    city: 'Bengaluru',
    state: 'Karnataka',
    zipCode: '560001',
    country: 'India',
    phone: '+91 98765 43210'
  }
});

console.log(html);
```

---

## Deployment

### UAT Deployment

1. Update `.env.uat` with production email credentials
2. Deploy environment file:
   ```bash
   ./scripts/deploy-env.sh
   ```
3. Deploy application:
   ```bash
   ./scripts/uatdeploy.sh
   ```

### Production Deployment

1. Update `.env.production` with production email credentials
2. **Important**: Use verified domain email (not Gmail) for production
3. Deploy environment file:
   ```bash
   ./scripts/deploy-prod-env.sh
   ```
4. Deploy application:
   ```bash
   ./scripts/proddeploy.sh
   ```

---

## Email Flow

1. Customer completes payment on checkout page
2. Payment verified via Razorpay webhook
3. Order status updated to "completed" in database
4. Cart cleared
5. **Order confirmation email sent automatically** ✉️
6. Customer redirected to success page

---

## Email Template Features

The order confirmation email includes:
- ✅ Professional branded design
- ✅ Order ID and date
- ✅ Payment status badge
- ✅ Order items with images, quantities, and prices
- ✅ Grand total in Indian Rupees (₹)
- ✅ Delivery address
- ✅ "View Order Details" button linking to `/orders`
- ✅ Contact information (phone, email)
- ✅ Company address and website
- ✅ Mobile-responsive design

---

## Troubleshooting

### Email Not Sending

1. **Check environment variables**:
   ```bash
   # On server
   ssh root@<server-ip>
   cd /home/cms/app
   grep EMAIL .env.uat
   ```

2. **Check server logs**:
   ```bash
   pm2 logs cms-app --lines 100
   ```

3. **Test email credentials**:
   - Resend: Check API key is valid in dashboard
   - Gmail: Verify app password is correct and 2FA enabled
   - SMTP: Test with telnet or online SMTP tester

### Email Goes to Spam

**For Resend:**
- Verify your domain
- Add SPF, DKIM, DMARC records
- Warm up your domain (start with low volume)

**For Gmail:**
- Use business email, not personal Gmail
- Configure SPF records for your domain
- Consider upgrading to Google Workspace

**General Tips:**
- Use clear, professional subject lines
- Don't use spammy words ("FREE", "URGENT", etc.)
- Include unsubscribe link (for marketing emails)
- Maintain good sender reputation

### Email Delay

Emails are sent asynchronously (in background) to avoid slowing down payment verification:
- Normal delay: 1-30 seconds
- If delayed beyond 1 minute, check server logs

---

## Cost Comparison

| Provider | Free Tier | Paid Tier | Best For |
|----------|-----------|-----------|----------|
| **Resend** | 3,000/month | $20/month (50K) | Production, high volume |
| **Gmail SMTP** | ~100/day | N/A | Testing, low volume |
| **SendGrid** | 100/day | $19.95/month (50K) | Enterprise |
| **Amazon SES** | 62K/month (if using EC2) | $0.10/1000 emails | AWS users |

**Recommendation:** Use **Resend** for production (free tier sufficient for most small businesses).

---

## Security Best Practices

1. **Never commit `.env` files to git** ✅ Already in `.gitignore`
2. **Use strong API keys** - Rotate periodically
3. **Restrict API key permissions** - Email sending only
4. **Monitor email usage** - Set up alerts in dashboard
5. **Use environment-specific keys** - Different keys for UAT/Production

---

## Support

Need help with email configuration?

- **Resend Docs**: https://resend.com/docs
- **Nodemailer Docs**: https://nodemailer.com
- **Gmail SMTP Guide**: https://support.google.com/mail/answer/7126229

For application-specific issues, contact:
- Email: rajnishkumarranjan@gmail.com
- Phone: +91 95133 51833
