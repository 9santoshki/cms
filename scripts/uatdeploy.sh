#!/bin/bash
# UAT deployment script
# Build locally, push to git, run DB migrations, deploy binary

set -e

DROPLET_IP="68.183.53.217"
APP_DIR="/home/cms/app"
DB_NAME="cms_db"
DB_USER="cms_user"

# Read DB password from .env.uat — never hardcode credentials in scripts
if [ ! -f ".env.uat" ]; then
    echo "❌ ERROR: .env.uat not found"
    exit 1
fi
DB_PASSWORD=$(grep -E '^DB_PASSWORD=' .env.uat | head -1 | cut -d '=' -f2-)
if [ -z "$DB_PASSWORD" ]; then
    echo "❌ ERROR: DB_PASSWORD not found in .env.uat"
    exit 1
fi

echo "🚀 Deploying to UAT..."
echo ""
echo "Workflow: Build locally → Git push → Deploy binary → DB migrations"
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
    scripts \
    package.json \
    package-lock.json \
    next.config.js \
    babel.config.js \
    .env.uat

echo "✅ Package created ($(du -h /tmp/cms-deploy.tar.gz | cut -f1))"
echo ""

# Step 5: Deploy to server
echo "🚀 Deploying to server..."
scp /tmp/cms-deploy.tar.gz root@$DROPLET_IP:/tmp/

ssh root@$DROPLET_IP bash << ENDSSH
set -e
PGPASSWORD="$DB_PASSWORD"
export PGPASSWORD

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 1: Extract deployment package"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd $APP_DIR
tar -xzf /tmp/cms-deploy.tar.gz
rm /tmp/cms-deploy.tar.gz
echo "✅ Extracted"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 1b: Prune old backups (keep last 3)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
ls -td $APP_DIR/.next.backup.* 2>/dev/null | tail -n +4 | xargs rm -rf
echo "✅ Old backups pruned"

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
run_migration "$APP_DIR/scripts/migrations/add_categories_columns.sql"      "add_categories_columns"
run_migration "$APP_DIR/scripts/migrations/fix_categories_show_in_menu.sql" "fix_categories_show_in_menu"
run_migration "$APP_DIR/scripts/migrations/add_recently_viewed.sql"         "add_recently_viewed"
run_migration "$APP_DIR/scripts/migrations/add_product_rich_fields.sql"     "add_product_rich_fields"
run_migration "$APP_DIR/scripts/migrations/add_maker_checker_workflow.sql"  "add_maker_checker_workflow"
run_migration "$APP_DIR/scripts/migrations/add_product_categories.sql"      "add_product_categories"
run_migration "$APP_DIR/scripts/migrations/add_hsn_supplier_price_to_variants.sql" "add_hsn_supplier_price_to_variants"
run_migration "$APP_DIR/scripts/migrations/add_user_phone_gstin.sql"              "add_user_phone_gstin"
run_migration "$APP_DIR/scripts/migrations/add_site_settings.sql"                 "add_site_settings"
run_migration "$APP_DIR/scripts/migrations/add_order_cost_receipts.sql"           "add_order_cost_receipts"
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
if [ -f $APP_DIR/.env.uat ]; then
    ln -sf $APP_DIR/.env.uat $APP_DIR/.env.local
    echo "✅ Environment configured (.env.local → .env.uat)"
else
    echo "⚠️  Warning: .env.uat not found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 4: Install production dependencies"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd $APP_DIR
npm install --production --prefer-offline
echo "✅ Dependencies installed"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 5: Restart application"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if pm2 list | grep -q "cms-app"; then
    pm2 restart cms-app
    echo "✅ cms-app restarted"
else
    PORT=3000 pm2 start npm --name cms-app -- start
    pm2 save
    echo "✅ cms-app started (port 3000)"
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

# Cleanup local tarball
rm -f /tmp/cms-deploy.tar.gz

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
