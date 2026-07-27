# 📧 Email Setup - Quick Start Guide

Get order confirmation emails working in **5 minutes**!

## 🚀 Fastest Setup (Resend - Free)

### Step 1: Get Resend API Key (2 minutes)
1. Go to https://resend.com
2. Sign up (free, no credit card)
3. Go to "API Keys" → "Create API Key"
4. Copy your key (starts with `re_...`)

### Step 2: Add to Environment Variables (1 minute)

Add these lines to your `.env.local` file:

```env
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=onboarding@resend.dev
EMAIL_FROM_NAME=Colour My Space
```

> **Note:** For testing, use `onboarding@resend.dev` as the sender. For production, verify your domain first (see full guide).

### Step 3: Test It! (2 minutes)

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Place a test order through the website

3. Check your email inbox - you should receive a beautiful order confirmation! 🎉

---

## 📖 What Happens?

When a customer completes payment:
1. ✅ Payment is verified with Razorpay
2. ✅ Order status updated to "completed"
3. ✅ Shopping cart cleared
4. ✅ **Email sent automatically with:**
   - Order number and date
   - List of purchased items with images
   - Total amount
   - Delivery address
   - Link to view order details
   - Contact information

---

## 🎨 Email Preview

The email looks like this:

```
┌──────────────────────────────────────┐
│   ✓  Order Confirmed!                │
│   Thank you for your purchase        │
├──────────────────────────────────────┤
│  Order #123                          │
│  Date: Jan 31, 2026                  │
│  Status: [Paid]                      │
│                                      │
│  Delivery Address:                   │
│  Bengaluru, Karnataka - 560001       │
├──────────────────────────────────────┤
│  Order Items:                        │
│  ├─ [Image] Product Name x2          │
│  │  ₹3,000                           │
│  └─ [Image] Another Product x1       │
│     ₹1,500                           │
├──────────────────────────────────────┤
│  Grand Total: ₹4,500                 │
├──────────────────────────────────────┤
│  [View Order Details Button]         │
│                                      │
│  Contact: +91 95133 51833            │
│  Email: rajnishkumarranjan@gmail.com │
└──────────────────────────────────────┘
```

---

## 🔧 Alternative: Gmail SMTP (Free, 100 emails/day)

If you prefer Gmail:

1. **Enable App Password:**
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password (select "Mail" + "Other")

2. **Update `.env.local`:**
   ```env
   EMAIL_PROVIDER=smtp
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx
   EMAIL_FROM=your-email@gmail.com
   EMAIL_FROM_NAME=Colour My Space
   ```

---

## 🚀 Production Setup

For production (UAT or live):

1. **Resend (Recommended):**
   - Verify your domain: `colourmyspace.com`
   - Add DNS records (SPF, DKIM, DMARC)
   - Use `noreply@colourmyspace.com` as sender

2. **Update `.env.uat` or `.env.production`:**
   ```env
   EMAIL_PROVIDER=resend
   RESEND_API_KEY=re_live_xxxxxxxxxxxx
   EMAIL_FROM=noreply@colourmyspace.com
   EMAIL_FROM_NAME=Colour My Space
   ```

3. **Deploy:**
   ```bash
   ./scripts/deploy-env.sh        # Deploy .env.uat
   ./scripts/uatdeploy.sh          # Deploy app to UAT
   ```

---

## 📚 Full Documentation

For detailed setup, troubleshooting, and advanced configuration:

👉 See [docs/EMAIL_SETUP.md](docs/EMAIL_SETUP.md)

---

## ❓ Troubleshooting

**Emails not sending?**
- Check console for errors: `pm2 logs cms-app`
- Verify API key is correct
- Check email goes to spam folder (especially first email)

**Emails go to spam?**
- **Resend:** Verify your domain with SPF/DKIM records
- **Gmail:** Use business email, not personal Gmail

**Test email locally:**
```bash
# Start dev server
npm run dev

# Place a test order and check console output
```

---

## 💡 Tips

- **Testing:** Use `onboarding@resend.dev` for local testing
- **Production:** Always use verified domain emails
- **Cost:** Resend free tier (3,000/month) is usually enough
- **Monitoring:** Check Resend dashboard for delivery stats

---

## ✅ Checklist

- [ ] Created Resend account
- [ ] Got API key
- [ ] Added to `.env.local`
- [ ] Restarted dev server
- [ ] Placed test order
- [ ] Received email
- [ ] Updated `.env.uat` for UAT
- [ ] Deployed to UAT
- [ ] Verified domain for production

---

**Need Help?**
- Email: rajnishkumarranjan@gmail.com
- Phone: +91 95133 51833
