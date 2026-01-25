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
4. Application deployed to DigitalOcean Droplet (68.183.53.217)
5. Verified at https://uat.colourmyspace.com

### Production Deployment
1. After UAT approval, merge master to production branch
2. Tag the release: `git tag -a v[version] -m "Release description"`
3. Run `./scripts/proddeploy.sh` to deploy to production server
4. Initialize database (ONE TIME ONLY during first setup): `npm run init-db`
5. Verified at https://www.colourmyspace.com

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

## Security Requirements
• PostgreSQL configured to listen on localhost only (not accessible from internet)
• UFW firewall enabled with Cloudflare IP range restrictions
• SSH key authentication only (password auth disabled)
• fail2ban installed for intrusion prevention
• Strong passwords (32+ chars for DB, 64+ chars for JWT)
• Bandwidth limits: 50 Mbps upload, 100 Mbps download