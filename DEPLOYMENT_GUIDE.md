# Git-Based Deployment Guide

## Overview

The deployment system now uses **git-based deployment** instead of tarball uploads. This is faster, cleaner, and provides version control on the server.

## Quick Reference

### Normal Deployment

```bash
# 1. Commit your changes
git add .
git commit -m "Your commit message"

# 2. Deploy to production
./scripts/uatdeploy.sh
```

That's it! The script will:
- Push to GitHub
- Pull on server
- Install dependencies
- Build the app
- Restart PM2

### Rollback

If something breaks after deployment:

```bash
# Rollback to previous commit
./scripts/rollback.sh HEAD~1

# Or rollback to specific commit
./scripts/rollback.sh abc1234
```

To go back to latest:
```bash
./scripts/rollback.sh master
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

### Old Method (Tarball)
1. Build locally
2. Create tarball
3. Upload to server (slow)
4. Extract on server
5. Restart PM2

**Problems:**
- Slow uploads
- Manual cleanup needed
- No version control on server
- Hard to rollback

### New Method (Git)
1. Commit and push to GitHub
2. Pull on server
3. Build on server
4. Restart PM2

**Benefits:**
- ✅ Faster (no tarball upload)
- ✅ Version control on server
- ✅ Easy rollbacks
- ✅ Cleaner process
- ✅ Build uses server environment correctly

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
