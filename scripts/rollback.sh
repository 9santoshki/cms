#!/bin/bash
# Rollback to a previous commit or tag
# Usage: ./scripts/rollback.sh <commit-hash-or-tag>

set -e

DROPLET_IP="68.183.53.217"
APP_DIR="/home/cms/app"
COMMIT="${1:-HEAD~1}"

if [ "$1" == "" ]; then
    echo "⚠️  No commit specified. Using previous commit (HEAD~1)"
    echo ""
fi

echo "🔄 Rolling back to: $COMMIT"
echo "   Server: $DROPLET_IP"
echo ""
read -p "Are you sure you want to rollback? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Rollback cancelled"
    exit 1
fi

ssh root@$DROPLET_IP << ENDSSH
set -e

cd $APP_DIR

echo "📋 Current commit:"
git log -1 --oneline

echo ""
echo "🔄 Rolling back to: $COMMIT"
git fetch origin
git checkout -f $COMMIT

echo ""
echo "📦 Installing dependencies..."
npm install --production

echo ""
echo "🔨 Building application..."
NODE_ENV=production npm run build

echo ""
echo "🔄 Restarting application..."
pm2 restart cms-app

echo ""
echo "✅ Rollback complete!"
echo ""
echo "📋 New commit:"
git log -1 --oneline

ENDSSH

echo ""
echo "✅ Rollback complete!"
echo ""
echo "⚠️  To rollback the rollback (go forward again):"
echo "   ./scripts/rollback.sh master"
