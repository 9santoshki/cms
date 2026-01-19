# Local Build + Binary Deployment Guide

## Overview

The deployment system uses **local build + binary deployment**. You build locally (fast, catches errors), push to GitHub (version control), then deploy the binary to the server.

## Quick Reference

### Normal Deployment

```bash
# 1. Deploy to production
./scripts/uatdeploy.sh
```

That's it! The script will:
1. Build locally (catches errors before committing)
2. Push to GitHub (version control)
3. Create deployment tarball (.next + static files)
4. Upload to server
5. Install production dependencies
6. Restart PM2

### Rollback

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

## First-Time Setup (New Server)

When setting up a brand new server:

```bash
# 1. Secure server setup (firewall, PostgreSQL, fail2ban, bandwidth limits)
DB_PASSWORD='your-strong-password' ./scripts/secure-server-setup.sh <new-ip>

# 2. Set up git-based deployment
./scripts/setup-git-deploy.sh <new-ip>

# 3. Deploy environment variables
./scripts/deploy-env.sh

# 4. Deploy application
./scripts/uatdeploy.sh

# 5. Initialize database
ssh root@<new-ip> "cd /home/cms/app && npm run init-db"

# 6. Set up SSL
ssh root@<new-ip> "certbot --nginx -d uat.colourmyspace.com"
```

## Advanced Usage

### Deploy Specific Branch

```bash
./scripts/deploy-git.sh feature-branch
```

### Check Server Status

```bash
# View logs
ssh root@68.183.53.217 "pm2 logs cms-app"

# Monitor in real-time
ssh root@68.183.53.217 "pm2 monit"

# Check application status
ssh root@68.183.53.217 "pm2 list"
```

### View Git History on Server

```bash
ssh root@68.183.53.217 "cd /home/cms/app && git log --oneline -10"
```

## What Changed?

### Old Method (Server-side builds)
1. Push to GitHub
2. Pull on server
3. Build on server (slow, memory intensive)
4. Restart PM2

**Problems:**
- Slow builds (3-5 minutes)
- Server runs out of memory (1GB RAM insufficient)
- Can commit broken code
- Server does heavy work

### New Method (Local builds)
1. Build locally (catches errors immediately)
2. Push to GitHub (version control)
3. Deploy binary to server (fast upload)
4. Restart PM2

**Benefits:**
- ✅ Fast deployments (30-60 seconds)
- ✅ Never commit broken code (build fails = no commit)
- ✅ Works on small droplets (server just runs app)
- ✅ Version control maintained
- ✅ Test locally before deploying
- ✅ No CI/CD complexity needed

## Troubleshooting

### Deployment fails with "uncommitted changes"

```bash
# Check what's uncommitted
git status

# Commit or stash changes
git add .
git commit -m "Update"

# Or stash if you don't want to commit yet
git stash
./scripts/uatdeploy.sh
git stash pop
```

### Build fails on server

```bash
# SSH to server and check logs
ssh root@68.183.53.217

cd /home/cms/app
pm2 logs cms-app --lines 50

# Check environment variables
cat .env.production | grep -v PASSWORD
```

### Need to see what's deployed

```bash
ssh root@68.183.53.217 "cd /home/cms/app && git log -1"
```

## Security Notes

- ✅ `.env.production` is **never** committed to git
- ✅ Deploy environment separately: `./scripts/deploy-env.sh`
- ✅ Server builds use its own `.env.production`
- ✅ GitHub repository is private

## Support

For issues or questions:
- Check logs: `ssh root@68.183.53.217 "pm2 logs cms-app"`
- See CLAUDE.md for full deployment documentation
- Contact: rajnishkumarranjan@gmail.com
