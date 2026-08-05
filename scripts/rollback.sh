#!/bin/bash
# Rollback to a previous commit or tag
# Usage: ./scripts/rollback.sh <commit-hash-or-tag>

set -e

DROPLET_IP="2a01:4f9:c015:3132::1"
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

# App runs as the dedicated non-root 'cms' user on this shared server —
# every app-level step (git, npm, build, pm2) runs as 'cms', not root.
sudo -u cms bash -c "
    set -e
    cd $APP_DIR
    echo '📋 Current commit:'
    git log -1 --oneline

    echo ''
    echo '🔄 Rolling back to: $COMMIT'
    git fetch origin
    git checkout -f $COMMIT

    echo ''
    echo '📦 Installing dependencies...'
    npm install --production

    echo ''
    echo '🔨 Building application...'
    NODE_ENV=production npm run build
"

echo ""
echo "🔄 Restarting application..."
sudo -u cms -H bash -lc "pm2 restart cms-app"

echo ""
echo "✅ Rollback complete!"
echo ""
echo "📋 New commit:"
sudo -u cms bash -c "cd $APP_DIR && git log -1 --oneline"

ENDSSH

echo ""
echo "✅ Rollback complete!"
echo ""
echo "⚠️  To rollback the rollback (go forward again):"
echo "   ./scripts/rollback.sh master"
