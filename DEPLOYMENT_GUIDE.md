# Deployment Guide

## Overview

This project uses **local build + binary deployment** with two types of deployments:

1. **First-Time Setup** (Run once on new server) - Full security configuration
2. **Regular Deployment** (Run anytime) - Just updates the application binary

---

## Environment Configuration

This project supports multiple environments with separate configuration files:

### Environment Files

| File | Purpose | Domain | Server |
|------|---------|--------|--------|
| `.env.local` | Local development | `http://localhost:3000` | Your machine |
| `.env.uat` | UAT/Staging | `https://uat.colourmyspace.com` | 68.183.53.217 |
| `.env.production` | Production | `https://www.colourmyspace.com` | TBD |

**Important Notes:**
- All `.env*` files are in `.gitignore` for security
- Each file should contain environment-specific values:
  - `NEXT_PUBLIC_APP_URL` - Domain URL (embedded at build time)
  - `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - OAuth client ID
  - `DB_HOST`, `DB_PASSWORD` - Database credentials
  - Other environment-specific configuration

**This guide covers UAT deployment** (`.env.uat` → uat.colourmyspace.com)

---

## Regular Deployment (Updates Only)

For day-to-day deployments after initial setup:

```bash
./scripts/uatdeploy.sh
```

**What it does:**
1. ✅ Builds locally (catches errors before commit)
2. ✅ Pushes to GitHub (version control)
3. ✅ Deploys binary to server (fast upload)
4. ✅ Installs dependencies
5. ✅ Restarts PM2

**Time:** ~60 seconds

---

## First-Time Setup (New Server)

Run this **once** when setting up a brand new server:

### Prerequisites

- Fresh Ubuntu 24.04 droplet
- Root SSH access configured
- Strong database password generated

### Step 1: Run First-Time Setup Script

```bash
# Generate a strong password first
openssl rand -base64 32

# Run setup with your password
DB_PASSWORD='your-generated-password' ./scripts/first-time-setup.sh 68.183.53.217
```

**What it configures:**
- ✅ System packages (Node.js 20, PostgreSQL, nginx, PM2)
- ✅ Firewall with 13 Cloudflare IP ranges (correct rule ordering: ALLOW first, DENY last)
- ✅ 4GB swap memory (enables builds on 1GB droplet)
- ✅ fail2ban (SSH brute-force protection)
- ✅ PostgreSQL database (cms_db, cms_user)
- ✅ Nginx reverse proxy with rate limiting
- ✅ Application directory with git

**Time:** ~5-10 minutes

### Step 2: Deploy Environment Variables

```bash
./scripts/deploy-env.sh
```

This uploads your `.env.uat` file to the UAT server (uat.colourmyspace.com).

**Note:** For production deployment to www.colourmyspace.com, you'll use `.env.production` (separate configuration).

### Step 3: Initialize Database Schema

```bash
ssh root@68.183.53.217 "cd /home/cms/app && npm run init-db"
```

**Expected output:**
```
✅ Database initialized successfully!
Tables created:
  - users
  - sessions
  - temp_auth_tokens
  - products
  - orders
  - order_items
  - cart
  - appointments
```

### Step 4: Install SSL Certificate

```bash
./scripts/install-ssl.sh
```

**Before running:**
1. Go to Cloudflare Dashboard → SSL/TLS → Origin Server
2. Click "Create Certificate"
3. Settings:
   - Key type: **RSA**
   - Private key format: **PEM**
   - Hostnames: `uat.colourmyspace.com`, `*.uat.colourmyspace.com`
   - Validity: **15 years**
4. Copy both certificate and private key

**After running:**
1. Go to Cloudflare Dashboard → SSL/TLS → Overview
2. Set SSL mode to: **Full (strict)**

### Step 5: First Deployment

```bash
./scripts/uatdeploy.sh
```

### Step 6: Promote Admin Users

After signing in with Google for the first time, promote your user to admin:

```bash
ssh root@68.183.53.217 "cd /home/cms/app && npm run promote-admin"
```

**Expected output:**
```
✅ santoshk.iima@gmail.com → admin
✅ k.santosh13@gmail.com → admin

Current admin users:
  - santoshk.iima@gmail.com (Santosh K) - Created: 2026-01-19
```

**Note:** Users must sign in at least once before they can be promoted to admin.

### Step 7: Seed Sample Data (Optional)

For UAT testing, add sample products:

```bash
ssh root@68.183.53.217 "cd /home/cms/app && npm run seed-data"
```

**Expected output:**
```
📦 Adding sample products...
  1. Modern Velvet Sofa - ₹899.99
  2. Marble Top Dining Table - ₹1249.99
  ...
  10. Crystal Chandelier - ₹549.99

📊 Summary by Category:
  Furniture: 5 products
  Lighting: 3 products
  Decor: 2 products

✅ Sample data seeded successfully!
```

### Step 8: Verify Everything Works

```bash
# Check PM2 status
ssh root@68.183.53.217 "pm2 status"

# Check application logs
ssh root@68.183.53.217 "pm2 logs cms-app --lines 20"

# Verify database content
ssh root@68.183.53.217 "sudo -u postgres psql -d cms_db -c 'SELECT role, COUNT(*) FROM users GROUP BY role;'"

# Visit your site
open https://uat.colourmyspace.com
```

**You should see:**
- ✅ PM2 process running
- ✅ Site accessible via HTTPS
- ✅ Admin users can access /dashboard
- ✅ Sample products visible in /shop

---

## Rollback

If something breaks after deployment:

```bash
# Checkout previous commit
git checkout HEAD~1

# Rebuild and deploy
./scripts/uatdeploy.sh

# Or rollback to specific commit
git checkout abc1234
./scripts/uatdeploy.sh
```

To go back to latest:
```bash
git checkout master
./scripts/uatdeploy.sh
```

---

## Security Features

### Firewall (UFW)
- ✅ **Cloudflare-only access** - Only Cloudflare IPs can reach ports 80/443 (13 IP ranges)
- ✅ **Rule ordering** - ALLOW rules for Cloudflare IPs first, DENY rules at the end
- ✅ **SSH protected** - fail2ban auto-bans brute-force attempts
- ✅ **DDoS protected** - Traffic must go through Cloudflare

**Important:** UFW processes rules top-to-bottom. ALLOW rules for Cloudflare must come before DENY rules, otherwise all traffic (including Cloudflare) will be blocked, causing Error 522.

### Database
- ✅ **Localhost only** - PostgreSQL only accepts connections from 127.0.0.1
- ✅ **Strong password** - 32-character random password
- ✅ **Proper permissions** - cms_user has minimal required privileges

### Application
- ✅ **Rate limiting** - 10 requests/second per IP (burst: 20)
- ✅ **Security headers** - X-Frame-Options, X-XSS-Protection, HSTS
- ✅ **SSL/TLS** - Cloudflare Origin Certificate with TLS 1.2/1.3

### Server
- ✅ **4GB swap** - Prevents out-of-memory issues
- ✅ **fail2ban** - SSH protection (3 failed attempts = 1 hour ban)
- ✅ **Auto-updates** - Security patches applied automatically

---

## Monitoring

### Check Application Status

```bash
# PM2 status
ssh root@68.183.53.217 "pm2 status"

# View logs (real-time)
ssh root@68.183.53.217 "pm2 logs cms-app"

# View last 50 lines
ssh root@68.183.53.217 "pm2 logs cms-app --lines 50 --nostream"

# Monitor resources
ssh root@68.183.53.217 "pm2 monit"
```

### Check System Resources

```bash
# Memory and swap usage
ssh root@68.183.53.217 "free -h"

# Disk usage
ssh root@68.183.53.217 "df -h"

# Active connections
ssh root@68.183.53.217 "ss -tlnp | grep -E ':(80|443|3000)'"
```

### Check Firewall

```bash
# UFW status
ssh root@68.183.53.217 "ufw status numbered"

# fail2ban status
ssh root@68.183.53.217 "fail2ban-client status sshd"
```

---

## Troubleshooting

### Build Fails Locally

**Problem:** `npm run build` fails with errors

**Solution:**
- Fix the errors shown in the output
- The build MUST succeed before deployment
- This prevents broken code from being committed

### Deployment Fails with "uncommitted changes"

**Problem:** Script warns about uncommitted files

**Solution:**
```bash
# Check what's uncommitted
git status

# Commit changes
git add .
git commit -m "Your message"

# Or stash temporarily
git stash
./scripts/uatdeploy.sh
git stash pop
```

### Site Not Accessible

**Check Cloudflare:**
1. Dashboard → DNS → Ensure `uat` A record is **ORANGE** (proxied)
2. Dashboard → SSL/TLS → Ensure mode is **Full (strict)**
3. Wait 1-2 minutes for DNS propagation

**Check Server:**
```bash
# Is app running?
ssh root@68.183.53.217 "pm2 status"

# Check logs for errors
ssh root@68.183.53.217 "pm2 logs cms-app --lines 50"

# Test locally
ssh root@68.183.53.217 "curl -s http://localhost:3000 | head -5"
```

### Error 522 - Cloudflare Connection Timeout

**Problem:** Site shows "Error 522: Connection timed out"

**Root Cause:** Firewall rules blocking Cloudflare IPs

**Diagnosis:**
```bash
# Check if nginx is running and listening
ssh root@68.183.53.217 "ss -tlnp | grep -E ':(80|443)'"

# Check firewall rules (CRITICAL: check rule order)
ssh root@68.183.53.217 "ufw status numbered"
```

**Common Issue:** DENY rules appearing BEFORE ALLOW rules for Cloudflare IPs

**Example of WRONG order:**
```
[ 4] 80/tcp    DENY IN     Anywhere          ❌ DENY comes first
[ 5] 443/tcp   DENY IN     Anywhere          ❌ DENY comes first
[ 6] 80/tcp    ALLOW IN    173.245.48.0/20   ✗ Never reached
[ 7] 443/tcp   ALLOW IN    173.245.48.0/20   ✗ Never reached
```

**Fix:** Remove early DENY rules and add them at the end:
```bash
ssh root@68.183.53.217 << 'EOF'
# Remove the early DENY rules (adjust rule numbers as needed)
ufw delete [rule-number-for-80-deny]
ufw delete [rule-number-for-443-deny]

# Add DENY rules at the end (after all ALLOW rules)
ufw deny 80/tcp
ufw deny 443/tcp

# Verify correct order
ufw status numbered
EOF
```

**Correct order should be:**
```
[ 2] 80/tcp    ALLOW IN    173.245.48.0/20   ✓ ALLOW first
[ 3] 443/tcp   ALLOW IN    173.245.48.0/20   ✓ ALLOW first
...
[29] 443/tcp   ALLOW IN    198.41.128.0/17   ✓ All ALLOW rules
[30] 80/tcp    DENY IN     Anywhere          ✓ DENY at end
[31] 443/tcp   DENY IN     Anywhere          ✓ DENY at end
```

**Verify Fix:**
```bash
# Test from local machine
curl -I https://uat.colourmyspace.com

# Should return HTTP/2 200 with Cloudflare headers
```

### Database Connection Errors

**Problem:** App can't connect to PostgreSQL

**Check `.env.uat`:**
```bash
ssh root@68.183.53.217 "cd /home/cms/app && grep DB_ .env.uat"
```

**Test database connection:**
```bash
ssh root@68.183.53.217 "psql -U cms_user -d cms_db -c 'SELECT 1;'"
```

### Out of Memory Errors

**Check swap usage:**
```bash
ssh root@68.183.53.217 "free -h"
```

**Expected:** Should see 4GB swap enabled

**If swap is off:**
```bash
ssh root@68.183.53.217 "swapon /swapfile"
```

---

## Architecture

### Deployment Flow

```
Local Machine                Server (68.183.53.217)
─────────────                ─────────────────────

1. npm run build     →      (Nothing)
   (.next folder
    created locally)

2. git push         →       (Git repo updated)

3. Create tarball   →       Upload via SCP
   (.next, public,           ↓
    package.json)        Extract to /home/cms/app
                             ↓
                         npm install --production
                             ↓
                         PM2 restart cms-app
```

### Infrastructure Stack

```
Internet
   ↓
Cloudflare (DDoS protection, WAF, CDN, SSL termination)
   ↓
UFW Firewall (Cloudflare IPs only)
   ↓
Nginx (Reverse proxy, rate limiting, security headers)
   ↓
Next.js App (Port 3000, managed by PM2)
   ↓
PostgreSQL (Localhost only, cms_db database)
```

### File Structure on Server

```
/home/cms/app/
├── .next/                    # Built application (deployed)
├── public/                   # Static assets (deployed)
├── node_modules/             # Production dependencies (installed)
├── package.json              # Dependencies list (deployed)
├── .env.uat                 # UAT environment variables (manual upload)
└── .git/                     # Git repository (for version tracking)
```

---

## Benefits of This Approach

### ✅ Fast Deployments
- Build locally (powerful machine, fast)
- Upload binary (~15MB)
- Server just runs the app
- **Total time: ~60 seconds**

### ✅ Never Deploy Broken Code
- Build fails = deployment stops
- Errors caught before commit
- Clean git history

### ✅ Works on Small Servers
- 1GB droplet is sufficient
- No memory-intensive builds on server
- Swap handles any spikes

### ✅ Version Control Maintained
- Every deployment = git commit
- Easy rollbacks (checkout + redeploy)
- Full history in GitHub

### ✅ Secure by Default
- Cloudflare-only access
- fail2ban protection
- Rate limiting
- SSL/TLS encryption

### ✅ No CI/CD Complexity
- No GitHub Actions setup
- No build servers
- Simple bash scripts
- Easy to understand and modify

---

## Support

**For issues:**
- Check logs: `ssh root@68.183.53.217 "pm2 logs cms-app"`
- See CLAUDE.md for technical details
- Check firewall: `ssh root@68.183.53.217 "ufw status"`

**Contact:** rajnishkumarranjan@gmail.com

**Production Site:** https://uat.colourmyspace.com
