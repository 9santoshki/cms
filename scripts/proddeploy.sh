#!/bin/bash
# Production deployment script
# Transfers source code to server, builds there — .next is NOT transferred
# IMPORTANT: Only run this from 'production' branch after UAT testing

set -e

DROPLET_IP="${PRODUCTION_SERVER_IP:-68.183.53.217}"
APP_DIR="/home/cms/app-prod"
DB_NAME="cms_db_prod"
DB_USER="cms_user_prod"
DB_PASSWORD="65vqND2d0kARuQ5v2JTfx30CwR1fPbkEJI83lwGKAUU="

echo "🚀 Deploying to PRODUCTION..."
echo ""
echo "⚠️  WARNING: This will deploy to PRODUCTION environment!"
echo "   Server:  $DROPLET_IP"
echo "   App dir: $APP_DIR"
echo "   Domain:  https://www.colourmyspace.com"
echo ""

# Verify we're on production branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "production" ]; then
    echo "❌ ERROR: Must be on 'production' branch to deploy to production"
    echo "   Current branch: $CURRENT_BRANCH"
    echo ""
    echo "Merge and switch first:"
    echo "   git checkout production && git merge master"
    exit 1
fi

# Final confirmation
read -p "🚨 Are you ABSOLUTELY SURE you want to deploy to PRODUCTION? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

# Step 1: Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes."
    git status --short
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

# Step 2: Push production branch to GitHub
echo "📤 Pushing production branch to GitHub..."
git push origin production
echo "✅ Pushed to GitHub"
echo ""

# Step 3: Create deployment tarball — source only, NO .next
echo "📦 Creating source package (no .next)..."
tar -czf /tmp/cms-deploy-prod.tar.gz \
    src \
    public \
    scripts \
    package.json \
    package-lock.json \
    next.config.js \
    tsconfig.json \
    babel.config.js
echo "✅ Package created ($(du -h /tmp/cms-deploy-prod.tar.gz | cut -f1))"
echo ""

# Step 4: Upload to server
echo "📤 Uploading to production server..."
scp /tmp/cms-deploy-prod.tar.gz root@$DROPLET_IP:/tmp/
rm /tmp/cms-deploy-prod.tar.gz
echo "✅ Uploaded"
echo ""

# Step 5: Run migrations + build + restart on server
echo "🚀 Running migrations, building, and restarting on server..."
ssh root@$DROPLET_IP bash << ENDSSH
set -e

APP_DIR="$APP_DIR"
DB_NAME="$DB_NAME"
DB_USER="$DB_USER"
PGPASSWORD="$DB_PASSWORD"
export PGPASSWORD

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 1: Extract source code (clean)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd \$APP_DIR
# Remove stale src/ and .next/ before extracting to avoid leftover files
rm -rf src .next
tar -xzf /tmp/cms-deploy-prod.tar.gz 2>/dev/null || tar -xzf /tmp/cms-deploy-prod.tar.gz --warning=none
rm /tmp/cms-deploy-prod.tar.gz
echo "✅ Source extracted (clean)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 2: Run DB migrations"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

run_migration() {
    local file="\$1"
    local label="\$2"
    if [ -f "\$file" ]; then
        echo "  Running: \$label..."
        psql -h localhost -U "\$DB_USER" -d "\$DB_NAME" -f "\$file" -v ON_ERROR_STOP=1
        echo "  ✅ \$label done"
    else
        echo "  ⚠️  Migration file not found: \$file"
    fi
}

run_migration "\$APP_DIR/scripts/migrations/add_product_variants.sql" "add_product_variants"
run_migration "\$APP_DIR/scripts/migrations/add_suppliers.sql"         "add_suppliers"

echo "✅ Migrations complete"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 3: Install dependencies"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm ci --prefer-offline
echo "✅ Dependencies installed"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 4: Build with production environment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
# Source NEXT_PUBLIC_ vars from .env.production for the build
set -a
source <(grep -E "^NEXT_PUBLIC_" \$APP_DIR/.env.production)
set +a
NODE_ENV=production NODE_OPTIONS="--max-old-space-size=1024" npm run build
echo "✅ Build complete"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 5: Restart application"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if pm2 list | grep -q "cms-app-prod"; then
    pm2 restart cms-app-prod
    echo "✅ cms-app-prod restarted"
else
    cd \$APP_DIR
    PORT=3001 pm2 start npm --name cms-app-prod -- start
    pm2 save
    echo "✅ cms-app-prod started (port 3001)"
fi

echo ""
echo "📊 PM2 status:"
pm2 list | grep cms-app

echo ""
echo "📝 Recent logs:"
pm2 logs cms-app-prod --lines 15 --nostream

echo ""
echo "✅ Production deployment complete!"
echo "🌐 https://www.colourmyspace.com"
ENDSSH

echo ""
echo "✅ PRODUCTION DEPLOYMENT COMPLETE!"
echo ""

# Purge Cloudflare cache (best-effort)
if [ -f "./scripts/purge-cloudflare-cache.sh" ]; then
    echo "🧹 Purging Cloudflare cache..."
    bash ./scripts/purge-cloudflare-cache.sh production 2>/dev/null && echo "✅ Cache purged" || echo "⚠️  Cache purge skipped (non-fatal)"
fi

echo ""
echo "📋 Next steps:"
echo "   - Logs:    ssh root@$DROPLET_IP 'pm2 logs cms-app-prod'"
echo "   - Monitor: ssh root@$DROPLET_IP 'pm2 monit'"
echo "   - Site:    https://www.colourmyspace.com"
