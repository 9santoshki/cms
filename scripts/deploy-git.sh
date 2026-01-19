#!/bin/bash
# Git-based deployment script for production server

set -e

DROPLET_IP="68.183.53.217"
APP_DIR="/home/cms/app"
BRANCH="${1:-master}"
GIT_REPO="https://github.com/9santoshki/cms.git"

echo "🚀 Starting git-based deployment..."
echo "   Branch: $BRANCH"
echo "   Server: $DROPLET_IP"
echo ""

# Step 1: Ensure local changes are committed
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

# Step 2: Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin $BRANCH

# Step 3: Deploy to server
echo ""
echo "📦 Deploying to server..."
ssh root@$DROPLET_IP << ENDSSH
set -e

echo "📁 Checking application directory..."
if [ ! -d "$APP_DIR" ]; then
    echo "Creating application directory..."
    mkdir -p $APP_DIR
fi

cd $APP_DIR

# Initialize git repo if needed
if [ ! -d ".git" ]; then
    echo "🔧 Initializing git repository..."
    git init
    git remote add origin $GIT_REPO
fi

# Fetch and checkout
echo "📥 Fetching latest code from GitHub..."
git fetch origin $BRANCH

echo "🔄 Checking out $BRANCH branch..."
git checkout -f $BRANCH
git reset --hard origin/$BRANCH
git clean -fd

# Verify .env.production exists
if [ ! -f ".env.production" ]; then
    echo "❌ ERROR: .env.production not found!"
    echo "Please run: ./scripts/deploy-env.sh first"
    exit 1
fi

# Install dependencies (including devDependencies needed for build)
echo "📦 Installing dependencies..."
npm install

# Build application on server
echo "🔨 Building application..."
NODE_ENV=production npm run build

# Restart PM2
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

# Show status
echo ""
echo "📊 Application status:"
pm2 list | grep cms-app

# Show recent logs
echo ""
echo "📝 Recent logs:"
pm2 logs cms-app --lines 10 --nostream

echo ""
echo "✅ Deployment complete!"
echo "🌐 Site: https://uat.colourmyspace.com"

ENDSSH

echo ""
echo "✅ Git-based deployment complete!"
echo ""
echo "📋 Next steps:"
echo "   - Check logs: ssh root@$DROPLET_IP 'pm2 logs cms-app'"
echo "   - Visit site: https://uat.colourmyspace.com"
echo "   - Monitor: ssh root@$DROPLET_IP 'pm2 monit'"
