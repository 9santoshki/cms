#!/bin/bash
# Production deployment script
# Build locally, push to git, deploy binary

set -e

DROPLET_IP="68.183.53.217"
APP_DIR="/home/cms/app"

echo "🚀 Deploying to production..."
echo ""
echo "Workflow: Build locally → Git push → Deploy binary"
echo ""

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

# Step 2: Build locally with UAT environment variables
echo "🔨 Building locally for UAT..."
echo "   Using UAT URL: https://uat.colourmyspace.com"

# Load NEXT_PUBLIC_ variables from .env.uat
export NEXT_PUBLIC_APP_URL=$(grep NEXT_PUBLIC_APP_URL .env.uat | cut -d '=' -f2)
export NEXT_PUBLIC_GOOGLE_CLIENT_ID=$(grep NEXT_PUBLIC_GOOGLE_CLIENT_ID .env.uat | cut -d '=' -f2)
export NEXT_PUBLIC_RAZORPAY_KEY_ID=$(grep NEXT_PUBLIC_RAZORPAY_KEY_ID .env.uat | cut -d '=' -f2)

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
echo "📤 Pushing to GitHub..."
git push origin master

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

# Step 4: Create deployment tarball (exclude dev/cache)
echo "📦 Creating deployment package..."
# Remove dev cache before packaging (not needed for production)
rm -rf .next/dev .next/cache 2>/dev/null || true

tar -czf /tmp/cms-deploy.tar.gz \
    .next \
    public \
    package.json \
    package-lock.json \
    next.config.js \
    babel.config.js \
    .env.uat 2>/dev/null || tar -czf /tmp/cms-deploy.tar.gz .next public package.json package-lock.json next.config.js babel.config.js

echo "✅ Package created ($(du -h /tmp/cms-deploy.tar.gz | cut -f1))"
echo ""

# Step 5: Deploy to server
echo "🚀 Deploying to server..."
scp /tmp/cms-deploy.tar.gz root@$DROPLET_IP:/tmp/

ssh root@$DROPLET_IP << 'ENDSSH'
set -e

cd /home/cms/app

echo "📦 Extracting deployment package..."
tar -xzf /tmp/cms-deploy.tar.gz
rm /tmp/cms-deploy.tar.gz

echo "⚙️  Configuring environment..."
# Copy .env.uat to .env.production so Next.js loads the correct environment
if [ -f .env.uat ]; then
    cp .env.uat .env.production
    echo "✅ Environment configured (.env.uat → .env.production)"
else
    echo "⚠️  Warning: .env.uat not found"
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
echo "🌐 Site: https://uat.colourmyspace.com"

ENDSSH

# Cleanup
rm /tmp/cms-deploy.tar.gz

echo ""
echo "✅ Deployment complete!"
echo ""

# Step 6: Purge Cloudflare cache
# ./scripts/purge-cloudflare-cache.sh

echo ""
echo "📋 Next steps:"
echo "   - Check logs: ssh root@$DROPLET_IP 'pm2 logs cms-app'"
echo "   - Visit site: https://uat.colourmyspace.com"
echo "   - Monitor: ssh root@$DROPLET_IP 'pm2 monit'"
