#!/bin/bash
# Production deployment script
# Mirrors UAT: build locally → transfer .next → server restarts
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
echo ""

# Verify we're on production branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "production" ]; then
    echo "❌ ERROR: Must be on 'production' branch to deploy to production"
    echo "   Current branch: $CURRENT_BRANCH"
    echo ""
    echo "Switch first:  git checkout production && git merge master"
    exit 1
fi

# Check for uncommitted changes
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

echo "   Server: $DROPLET_IP"
echo "   UAT:    /home/cms/app       (port 3000)"
echo "   PROD:   /home/cms/app-prod  (port 3001)"
echo ""

# Final confirmation
read -p "🚨 Are you ABSOLUTELY SURE you want to deploy to PRODUCTION? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

# Step 1: Build locally with production environment variables
echo ""
echo "🔨 Building locally for PRODUCTION..."
echo "   Using Production URL: https://www.colourmyspace.com"

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

# Step 2: Push to GitHub
echo "📤 Pushing to GitHub (production branch)..."
git push origin production

echo "✅ Pushed to GitHub"
echo ""

# Step 3: Create deployment tarball (same as UAT — .next included, no src/)
echo "📦 Creating deployment package..."
rm -rf .next/dev .next/cache 2>/dev/null || true

tar -czf /tmp/cms-deploy-prod.tar.gz \
    .next \
    public \
    scripts \
    package.json \
    package-lock.json \
    next.config.js \
    babel.config.js \
    .env.production

echo "✅ Package created ($(du -h /tmp/cms-deploy-prod.tar.gz | cut -f1))"
echo ""

# Step 4: Upload to server
echo "📤 Uploading to production server..."
scp /tmp/cms-deploy-prod.tar.gz root@$DROPLET_IP:/tmp/

# Step 5: Extract, migrate, install deps, restart — on server
ssh root@$DROPLET_IP bash << ENDSSH
set -e
PGPASSWORD="$DB_PASSWORD"
export PGPASSWORD

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 1: Extract deployment package"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd $APP_DIR
# Wipe old .next first so no stale/orphaned chunks remain from previous builds
rm -rf .next
tar -xzf /tmp/cms-deploy-prod.tar.gz
rm /tmp/cms-deploy-prod.tar.gz
echo "✅ Extracted (clean)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 2: Run DB migrations (idempotent)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
run_migration() {
    local file="\$1"
    local label="\$2"
    if [ -f "\$file" ]; then
        echo "  Running: \$label..."
        psql -h localhost -U "$DB_USER" -d "$DB_NAME" -f "\$file" -v ON_ERROR_STOP=1
        echo "  ✅ \$label done"
    else
        echo "  ⚠️  Not found: \$file"
    fi
}
run_migration "$APP_DIR/scripts/migrations/add_product_variants.sql"       "add_product_variants"
run_migration "$APP_DIR/scripts/migrations/add_suppliers.sql"               "add_suppliers"
run_migration "$APP_DIR/scripts/migrations/add_supplier_stock.sql"          "add_supplier_stock"
run_migration "$APP_DIR/scripts/migrations/add_inventory_improvements.sql"  "add_inventory_improvements"
run_migration "$APP_DIR/scripts/migrations/add_subcategory_column.sql"      "add_subcategory_column"
run_migration "$APP_DIR/scripts/migrations/add_categories_table.sql"        "add_categories_table"
run_migration "$APP_DIR/scripts/migrations/add_recently_viewed.sql"         "add_recently_viewed"
echo "✅ Migrations complete"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 2b: Seed mock products (idempotent)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -f "$APP_DIR/scripts/seed_mock_products.sql" ]; then
    echo "  Seeding mock products..."
    psql -h localhost -U "$DB_USER" -d "$DB_NAME" -f "$APP_DIR/scripts/seed_mock_products.sql" -v ON_ERROR_STOP=1
    echo "  ✅ Mock products seeded"
else
    echo "  ⚠️  seed_mock_products.sql not found, skipping"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 3: Configure environment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
# .env.production is already in the tarball and on disk
echo "✅ Environment ready (.env.production)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 4: Install production dependencies"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm install --production --prefer-offline
echo "✅ Dependencies installed"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 5: Restart application"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if pm2 list | grep -q "cms-app-prod"; then
    pm2 restart cms-app-prod
    echo "✅ cms-app-prod restarted"
else
    cd $APP_DIR
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
echo "✅ Deployment complete!"
echo "🌐 https://www.colourmyspace.com"
ENDSSH

# Cleanup local tarball
rm -f /tmp/cms-deploy-prod.tar.gz

# Step 6: Purge Cloudflare cache so users get fresh HTML with new JS chunk hashes
echo ""
echo "🔄 Purging Cloudflare cache..."
bash "$(dirname "$0")/purge-cloudflare-cache.sh" production

echo ""
echo "✅ PRODUCTION DEPLOYMENT COMPLETE!"
echo ""
echo "📋 Next steps:"
echo "   - Logs:    ssh root@$DROPLET_IP 'pm2 logs cms-app-prod'"
echo "   - Monitor: ssh root@$DROPLET_IP 'pm2 monit'"
echo "   - Site:    https://www.colourmyspace.com"
