# Production Setup Guide

## Architecture Overview

This project runs **UAT and Production environments on the same droplet** with complete isolation:

```
┌─────────────────────────────────────────────────────────────────┐
│                    68.183.53.217 (DigitalOcean)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────┐         ┌─────────────────────┐        │
│  │   UAT Environment   │         │  PROD Environment   │        │
│  ├─────────────────────┤         ├─────────────────────┤        │
│  │ Dir: /home/cms/app  │         │ Dir: /home/cms/prod │        │
│  │ DB:  cms_db         │         │ DB:  cms_prod_db    │        │
│  │ Port: 3000          │         │ Port: 3001          │        │
│  │ PM2:  cms-app       │         │ PM2:  cms-prod-app  │        │
│  └─────────────────────┘         └─────────────────────┘        │
│           ▲                                 ▲                    │
│           │                                 │                    │
│  ┌────────┴────────┐              ┌────────┴────────┐           │
│  │  Nginx (Port)   │              │  Nginx (Port)   │           │
│  │  80/443         │              │  80/443         │           │
│  └────────┬────────┘              └────────┬────────┘           │
│           │                                 │                    │
└───────────┼─────────────────────────────────┼────────────────────┘
            │                                 │
   ┌────────┴────────┐               ┌────────┴────────┐
   │ uat.example.com │               │ www.example.com │
   │  (Cloudflare)   │               │  (Cloudflare)   │
   └─────────────────┘               └─────────────────┘
```

## Environment Configuration

| Aspect | UAT | Production |
|--------|-----|------------|
| **Domain** | uat.colourmyspace.com | www.colourmyspace.com |
| **Directory** | /home/cms/app | /home/cms/prod |
| **Database** | cms_db | cms_prod_db |
| **DB User** | cms_user (shared) | cms_user (shared) |
| **Port** | 3000 | 3001 |
| **PM2 Process** | cms-app | cms-prod-app |
| **Env File** | .env.uat | .env.production |
| **Purpose** | Testing & QA | Live users |

---

## Initial Production Setup

Run this **once** to set up production environment on the existing droplet:

### Step 1: Setup Production Environment

```bash
# This creates production directory, database, and nginx config
DB_PASSWORD='your-strong-password' ./scripts/setup-production.sh
```

**What it does:**
- ✅ Creates `/home/cms/prod` directory
- ✅ Creates `cms_prod_db` database
- ✅ Configures nginx for dual domains
- ✅ Initializes git repository
- ⚠️ Does NOT affect UAT environment

### Step 2: Configure DNS (Cloudflare)

Add DNS records for production domain:

1. Go to Cloudflare Dashboard → DNS → Records
2. Add A record:
   - **Name:** `www`
   - **IPv4 address:** `68.183.53.217`
   - **Proxy status:** ✅ Proxied (orange cloud)
3. Add A record:
   - **Name:** `@` (root domain)
   - **IPv4 address:** `68.183.53.217`
   - **Proxy status:** ✅ Proxied (orange cloud)

**SSL/TLS Settings:**
- Mode should already be set to **Full (strict)** (same certificate for both domains)

### Step 3: Update .env.production

Ensure your `.env.production` file has:

```env
# Production-specific configuration
NEXT_PUBLIC_APP_URL=https://www.colourmyspace.com
DB_NAME=cms_prod_db
DB_HOST=localhost
DB_PORT=5432
DB_USER=cms_user
DB_PASSWORD=<strong-password-from-step-1>

# Same as UAT (shared credentials)
JWT_SECRET=<same-as-uat>
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<same-as-uat>
GOOGLE_CLIENT_SECRET=<same-as-uat>
CLOUDFLARE_*=<same-as-uat>
RAZORPAY_*=<same-as-uat>

# Production admin emails
ADMIN_EMAILS=your-production-admin@gmail.com
```

**Key differences from UAT:**
- `NEXT_PUBLIC_APP_URL` → www.colourmyspace.com
- `DB_NAME` → cms_prod_db

### Step 4: Deploy .env.production

```bash
./scripts/deploy-prod-env.sh
```

### Step 5: Initialize Production Database

```bash
ssh root@68.183.53.217 "cd /home/cms/prod && npm run init-db"
```

**Expected output:**
```
Loading environment from: .env.production
Connected to PostgreSQL database
✅ Database initialized successfully!
Tables created: users, sessions, products, orders, cart, appointments
```

### Step 6: Add Google OAuth Redirect URI

Add production callback URL to Google Cloud Console:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Select your OAuth 2.0 Client ID
3. Under **"Authorized redirect URIs"**, add:
   - `https://www.colourmyspace.com/auth/callback`
   - `https://colourmyspace.com/auth/callback`
4. Keep existing UAT URIs
5. Click **"Save"**

### Step 7: First Production Deployment

```bash
./scripts/proddeploy.sh
```

**What it does:**
1. Builds locally with `.env.production`
2. Confirms production deployment (safety check)
3. Pushes to GitHub
4. Deploys to `/home/cms/prod`
5. Starts PM2 process on port 3001

### Step 8: Verify Production

```bash
# Check both PM2 processes
ssh root@68.183.53.217 "pm2 status"

# Should show:
# - cms-app (port 3000) - UAT
# - cms-prod-app (port 3001) - Production

# Check production logs
ssh root@68.183.53.217 "pm2 logs cms-prod-app --lines 20"

# Test production site
curl -I https://www.colourmyspace.com
```

### Step 9: Promote Production Admin Users

```bash
# Sign in to production first, then:
ssh root@68.183.53.217 "cd /home/cms/prod && npm run promote-admin"
```

### Step 10: Seed Production Data (Optional)

**For initial launch**, you might want sample products:

```bash
ssh root@68.183.53.217 "cd /home/cms/prod && npm run seed-data"
```

**Or add real products** via admin dashboard at `/dashboard/products`

---

## Regular Deployments

### UAT Deployment

```bash
./scripts/uatdeploy.sh
```

**Deploys to:**
- Directory: `/home/cms/app`
- Domain: `uat.colourmyspace.com`
- PM2: `cms-app`

### Production Deployment

```bash
./scripts/proddeploy.sh
```

**Deploys to:**
- Directory: `/home/cms/prod`
- Domain: `www.colourmyspace.com`
- PM2: `cms-prod-app`
- **Safety:** Requires "yes" confirmation

---

## Deployment Scripts Reference

| Script | Environment | Purpose |
|--------|-------------|---------|
| `uatdeploy.sh` | UAT | Deploy to uat.colourmyspace.com |
| `proddeploy.sh` | Production | Deploy to www.colourmyspace.com |
| `deploy-env.sh` | UAT | Upload .env.uat to /home/cms/app |
| `deploy-prod-env.sh` | Production | Upload .env.production to /home/cms/prod |
| `setup-production.sh` | Production | One-time production setup |

---

## Management Commands

### Check Both Environments

```bash
# View all PM2 processes
ssh root@68.183.53.217 "pm2 status"

# Expected output:
# cms-app        → UAT (port 3000)
# cms-prod-app   → Production (port 3001)
```

### Restart Individual Environment

```bash
# Restart UAT only
ssh root@68.183.53.217 "pm2 restart cms-app"

# Restart Production only
ssh root@68.183.53.217 "pm2 restart cms-prod-app"
```

### View Logs

```bash
# UAT logs
ssh root@68.183.53.217 "pm2 logs cms-app"

# Production logs
ssh root@68.183.53.217 "pm2 logs cms-prod-app"
```

### Database Access

```bash
# Connect to UAT database
ssh root@68.183.53.217 "sudo -u postgres psql -d cms_db"

# Connect to Production database
ssh root@68.183.53.217 "sudo -u postgres psql -d cms_prod_db"
```

---

## Rollback

### UAT Rollback

```bash
git checkout HEAD~1
./scripts/uatdeploy.sh
```

### Production Rollback

```bash
git checkout HEAD~1
./scripts/proddeploy.sh  # Requires confirmation
```

---

## Monitoring

### Resource Usage

```bash
# Memory and CPU for both processes
ssh root@68.183.53.217 "pm2 monit"

# System resources
ssh root@68.183.53.217 "free -h && df -h"
```

### Database Sizes

```bash
ssh root@68.183.53.217 "sudo -u postgres psql -c \"
SELECT
    datname as database,
    pg_size_pretty(pg_database_size(datname)) as size
FROM pg_database
WHERE datname IN ('cms_db', 'cms_prod_db');
\""
```

---

## Troubleshooting

### Wrong Environment Deployed

**Problem:** Accidentally deployed production to UAT or vice versa

**Solution:** Each script deploys to different directories
- `uatdeploy.sh` always goes to `/home/cms/app`
- `proddeploy.sh` always goes to `/home/cms/prod`

### Both Sites Showing Same Content

**Check nginx routing:**
```bash
ssh root@68.183.53.217 "nginx -T | grep -A 10 'server_name'"
```

Should show:
- `uat.colourmyspace.com` → `localhost:3000`
- `www.colourmyspace.com` → `localhost:3001`

### Production Not Starting

```bash
# Check production logs
ssh root@68.183.53.217 "pm2 logs cms-prod-app --lines 50"

# Check if port 3001 is available
ssh root@68.183.53.217 "ss -tlnp | grep 3001"

# Restart production
ssh root@68.183.53.217 "pm2 restart cms-prod-app"
```

---

## Security Notes

1. **Both environments share:**
   - Database user (`cms_user`)
   - PostgreSQL instance
   - Nginx/SSL certificates
   - Firewall rules

2. **Complete isolation for:**
   - Application code (separate directories)
   - Databases (cms_db vs cms_prod_db)
   - PM2 processes (separate ports)
   - Environment variables

3. **Production safety:**
   - `proddeploy.sh` requires explicit "yes" confirmation
   - Different PM2 process names prevent accidental restarts
   - Separate databases prevent data mixing

---

## Benefits of This Setup

✅ **Cost-effective:** Single 1GB droplet for both environments
✅ **Isolated:** Separate databases and processes
✅ **Safe:** Production requires confirmation
✅ **Consistent:** Same deployment method for both
✅ **Scalable:** Easy to move production to separate server later

---

## Future: Separate Production Server

When ready to scale, production can be moved to its own server:

1. Provision new droplet for production only
2. Run `first-time-setup.sh` on new server
3. Update `proddeploy.sh` with new IP
4. Migrate production database
5. Update DNS to point to new IP
6. Keep UAT on original droplet

The deployment scripts and architecture remain the same!
