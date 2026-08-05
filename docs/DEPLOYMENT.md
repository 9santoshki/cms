# Deployment Documentation

## Environments
• Development: Local development (http://localhost:3000)
• UAT: Staging environment (https://uat.colourmyspace.com)
• Production: Live environment (https://www.colourmyspace.com)

## Build & Deploy Flow

### UAT Deployment
1. Commit changes to master branch (active development branch)
2. Run `./scripts/uatdeploy.sh` to build and deploy to UAT server
3. Build process uses .env.uat for environment-specific configuration
4. Application deployed to shared Hetzner server (`2a01:4f9:c015:3132::1`,
   IPv6-only), directory `/home/cms/app`, database `cms_uat_db`
5. Verified at https://uat.colourmyspace.com

### Production Deployment
1. After UAT approval, merge master to production branch
2. Tag the release: `git tag -a v[version] -m "Release description"`
3. Run `./scripts/proddeploy.sh` to deploy to production server
4. Initialize database (ONE TIME ONLY during first setup): `npm run init-db`
5. Application deployed to shared Hetzner server (`2a01:4f9:c015:3132::1`,
   IPv6-only), directory `/home/cms/app-prod`, database `cms_prod_db`
6. Verified at https://www.colourmyspace.com

### Shared server notes (as of Aug 2026)
- UAT and prod both run on `2a01:4f9:c015:3132::1` — a Hetzner box that
  also hosts an unrelated app (saamaandepot) under its own Linux user.
- The app runs as a dedicated non-root `cms` Linux user (own home dir,
  own `pm2-cms` systemd service, own nginx site file
  `/etc/nginx/sites-available/cms`, own Postgres roles
  `cms_uat_user`/`cms_prod_user`) — never as root, and never touching
  the other app's user/DB/nginx file/UFW/fail2ban config.
- PM2 process names: `cms-app` (UAT, port 3001), `cms-app-prod`
  (prod, port 3002).
- TLS uses a single Cloudflare Origin wildcard certificate
  (`*.colourmyspace.com` + `colourmyspace.com`) covering both
  environments — `/etc/ssl/certs/cms-wildcard-origin.pem`.
- The previous droplet (`68.183.53.217`) is retired (processes stopped,
  droplet left running as a cold rollback) — see git history around
  Aug 2026 for the migration scripts (`setup-cms-on-shared-server.sh`,
  `migrate-db-to-new-server.sh`).
- Known issue: the bare apex `colourmyspace.com` (no `www`) intermittently
  returns Cloudflare 525 — confirmed to be a Cloudflare edge-to-origin
  issue, not a DNS/cert/nginx problem (DNS record, cert SAN, and direct
  origin tests are all correct). `www.colourmyspace.com` and
  `uat.colourmyspace.com` are unaffected.

## Configuration & Secrets Locations
• `.env.local` - Local development environment variables
• `.env.uat` - UAT server configuration (DB credentials, OAuth keys, etc.)
• `.env.production` - Production server configuration
• Environment files contain:
  - Database credentials (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
  - JWT secret (JWT_SECRET)
  - Google OAuth credentials (NEXT_PUBLIC_GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
  - Razorpay keys (NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
  - Cloudflare R2 configuration (all R2 access keys)
  - Application URL (NEXT_PUBLIC_APP_URL)

## Cloudflare Configuration

### Page Rules (Required)
1. **API Cache Bypass:**
   - URL: `uat.colourmyspace.com/api/*`
   - Setting: Cache Level → Bypass
   - Prevents caching of dynamic API responses (authentication, cart, etc.)

2. **Static Asset Caching:**
   - URL: `uat.colourmyspace.com/_next/static/*`
   - Setting: Cache Level → Cache Everything
   - Browser Cache TTL: 1 year

### Cache Headers
- API routes include `Cache-Control: no-store` to prevent Cloudflare caching
- Critical for `/api/auth/session` endpoint to avoid stale authentication state
- See [CLOUDFLARE.md](CLOUDFLARE.md) for detailed caching configuration

### SSL/TLS
- Full (strict) encryption mode
- Cloudflare Origin Certificate installed on server
- Edge certificates auto-renewed by Cloudflare

## Security Requirements
• PostgreSQL configured to listen on localhost only (not accessible from internet)
• UFW firewall enabled with Cloudflare IP range restrictions
• SSH key authentication only (password auth disabled)
• fail2ban installed for intrusion prevention
• Strong passwords (32+ chars for DB, 64+ chars for JWT)
• Bandwidth limits: 50 Mbps upload, 100 Mbps download