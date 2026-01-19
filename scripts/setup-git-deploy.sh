#!/bin/bash
# First-time setup for git-based deployment
# Run this once on a new server to set up git deployment

set -e

DROPLET_IP="${1:-68.183.53.217}"
APP_DIR="/home/cms/app"
GIT_REPO="https://github.com/9santoshki/cms.git"

if [ -z "$1" ]; then
    echo "Using default server IP: $DROPLET_IP"
    echo "To use a different IP: ./scripts/setup-git-deploy.sh <ip>"
    echo ""
fi

echo "🔧 Setting up git-based deployment on server..."
echo "   Server: $DROPLET_IP"
echo "   Repository: $GIT_REPO (public)"
echo ""

ssh root@$DROPLET_IP << ENDSSH
set -e

echo "📦 Installing git..."
apt-get update -qq
apt-get install -y git

echo "📁 Setting up application directory..."
mkdir -p $APP_DIR
cd $APP_DIR

echo "🔧 Initializing git repository..."
if [ -d ".git" ]; then
    echo "Git repository already exists, updating remote..."
    git remote set-url origin $GIT_REPO
else
    git init
    git remote add origin $GIT_REPO
fi

echo "📥 Fetching code from GitHub..."
git fetch origin master

echo "🔄 Checking out master branch..."
git checkout -f master
git reset --hard origin/master

echo ""
echo "✅ Git deployment setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Deploy .env.production: ./scripts/deploy-env.sh"
echo "   2. Initialize database: ssh root@$DROPLET_IP 'cd /home/cms/app && npm run init-db'"
echo "   3. Deploy application: ./scripts/deploy-git.sh"

ENDSSH

echo ""
echo "✅ Git-based deployment setup complete!"
