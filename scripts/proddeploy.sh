#!/bin/bash
# Production deployment script
# Build locally from production branch, push to git, deploy binary
# IMPORTANT: Only run this from 'production' branch after UAT testing

set -e

# Production server details
DROPLET_IP="${PRODUCTION_SERVER_IP:-TBD}"
APP_DIR="/home/cms/app"

echo "🚀 Deploying to PRODUCTION..."
echo ""
echo "⚠️  WARNING: This will deploy to PRODUCTION environment!"
echo ""

# Verify we're on production branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "production" ]; then
    echo "❌ ERROR: Must be on 'production' branch to deploy to production"
    echo "   Current branch: $CURRENT_BRANCH"
    echo ""
    echo "Switch to production branch first:"
    echo "   git checkout production"
    exit 1
fi

# Check if production server IP is set
if [ "$DROPLET_IP" = "TBD" ]; then
    echo "Production server IP not set."
    read -p "Enter production server IP: " DROPLET_IP
    if [ -z "$DROPLET_IP" ]; then
        echo "❌ Production server IP required"
        exit 1
    fi
fi

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    echo "❌ ERROR: .env.production file not found"
    echo ""
    echo "Create .env.production file first with production credentials:"
    echo "   cp .env.uat .env.production"
    echo "   # Edit .env.production with production values"
    exit 1
fi

echo "Workflow: Build locally → Git push → Deploy binary"
echo ""
echo "📋 Production Details:"
echo "   Server: $DROPLET_IP"
echo "   Domain: https://www.colourmyspace.com"
echo "   Branch: production"
echo ""

# Final confirmation
read -p "🚨 Are you ABSOLUTELY SURE you want to deploy to PRODUCTION? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

# Step 1: Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes."
    echo ""
    git status --short
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

# Step 2: Build locally with production environment variables
echo "🔨 Building locally for PRODUCTION..."
echo "   Using Production URL: https://www.colourmyspace.com"

# Load NEXT_PUBLIC_ variables from .env.production
export NEXT_PUBLIC_APP_URL=$(grep NEXT_PUBLIC_APP_URL .env.production | cut -d '=' -f2)
export NEXT_PUBLIC_GOOGLE_CLIENT_ID=$(grep NEXT_PUBLIC_GOOGLE_CLIENT_ID .env.production | cut -d '=' -f2)
export NEXT_PUBLIC_RAZORPAY_KEY_ID=$(grep NEXT_PUBLIC_RAZORPAY_KEY_ID .env.production | cut -d '=' -f2)

NODE_ENV=production npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Build failed! Fix errors before deploying."
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""

# Step 3: Push to GitHub
echo "📤 Pushing to GitHub (production branch)..."
git push origin production --tags

if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  Git push failed, but build is ready. Continue deployment? (y/n)"
    read -p "" -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

echo ""
echo "✅ Pushed to GitHub"
echo ""

# Step 4: Create deployment tarball
echo "📦 Creating deployment package..."
tar -czf /tmp/cms-deploy-prod.tar.gz \
    .next \
    public \
    package.json \
    package-lock.json \
    next.config.js \
    babel.config.js \
    .env.production 2>/dev/null || tar -czf /tmp/cms-deploy-prod.tar.gz .next public package.json package-lock.json next.config.js babel.config.js

echo "✅ Package created ($(du -h /tmp/cms-deploy-prod.tar.gz | cut -f1))"
echo ""

# Step 5: Deploy to server
echo "🚀 Deploying to PRODUCTION server..."
scp /tmp/cms-deploy-prod.tar.gz root@$DROPLET_IP:/tmp/

ssh root@$DROPLET_IP << 'ENDSSH'
set -e

cd /home/cms/app

echo "📦 Extracting deployment package..."
tar -xzf /tmp/cms-deploy-prod.tar.gz
rm /tmp/cms-deploy-prod.tar.gz

# Rename .env.production to .env.production in app directory
if [ -f .env.production ]; then
    echo "✅ Production environment file deployed"
fi

echo "📦 Installing production dependencies..."
npm install --production --prefer-offline

echo "🔄 Restarting application..."
if pm2 list | grep -q "cms-app"; then
    pm2 restart cms-app
    echo "✅ Application restarted"
else
    echo "🚀 Starting application for first time..."
    pm2 start npm --name cms-app -- start
    pm2 save
    echo "✅ Application started"
fi

echo ""
echo "📊 Application status:"
pm2 list | grep cms-app

echo ""
echo "📝 Recent logs:"
pm2 logs cms-app --lines 10 --nostream

echo ""
echo "✅ Deployment complete!"
echo "🌐 Site: https://www.colourmyspace.com"

ENDSSH

# Cleanup
rm /tmp/cms-deploy-prod.tar.gz

echo ""
echo "✅ PRODUCTION DEPLOYMENT COMPLETE!"
echo ""
echo "📋 Next steps:"
echo "   - Check logs: ssh root@$DROPLET_IP 'pm2 logs cms-app'"
echo "   - Visit site: https://www.colourmyspace.com"
echo "   - Monitor: ssh root@$DROPLET_IP 'pm2 monit'"
echo "   - Test all critical features"
echo ""
echo "🏷️  Don't forget to tag this release:"
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "none")
echo "   Latest tag: $LATEST_TAG"
echo "   Create tag: git tag -a v1.0.0 -m 'Production release v1.0.0'"
echo "   Push tag: git push origin --tags"
