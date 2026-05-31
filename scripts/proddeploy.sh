#!/bin/bash
# Production deployment script
# Mirrors UAT: build locally → transfer .next → server restarts
# IMPORTANT: Only run this from 'production' branch after UAT testing

set -e

DROPLET_IP="${PRODUCTION_SERVER_IP:-68.183.53.217}"
APP_DIR="/home/cms/app-prod"
DB_NAME="cms_db_prod"
DB_USER="cms_user_prod"
PROD_URL="https://www.colourmyspace.com"

# ── SSH key detection ──────────────────────────────────────────────
if [ -n "$SSH_KEY" ]; then
    SSH_FLAGS="-i $SSH_KEY"
elif [ -f "$HOME/.ssh/id_ed25519" ]; then
    SSH_FLAGS="-i $HOME/.ssh/id_ed25519"
elif [ -f "$HOME/.ssh/id_rsa" ]; then
    SSH_FLAGS="-i $HOME/.ssh/id_rsa"
else
    SSH_FLAGS=""
fi
SSH_FLAGS="$SSH_FLAGS -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10"

# ── Source secrets from .env.production ────────────────────────────
ENV_FILE=".env.production"
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ ERROR: $ENV_FILE not found"
    exit 1
fi

DB_PASSWORD=$(grep -E '^DB_PASSWORD=' "$ENV_FILE" | head -1 | cut -d '=' -f2-)
if [ -z "$DB_PASSWORD" ]; then
    echo "❌ ERROR: DB_PASSWORD not found in $ENV_FILE"
    exit 1
fi

NEXT_PUBLIC_APP_URL=$(grep NEXT_PUBLIC_APP_URL "$ENV_FILE" | head -1 | cut -d '=' -f2-)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=$(grep NEXT_PUBLIC_GOOGLE_CLIENT_ID "$ENV_FILE" | head -1 | cut -d '=' -f2-)
NEXT_PUBLIC_RAZORPAY_KEY_ID=$(grep NEXT_PUBLIC_RAZORPAY_KEY_ID "$ENV_FILE" | head -1 | cut -d '=' -f2-)

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
    read -p "Continue anyway? (y/n) " -n 1 -r < /dev/tty
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

echo "   Server:    $DROPLET_IP"
echo "   SSH key:   ${SSH_KEY:-auto-detected}"
echo "   UAT port:  3000  (/home/cms/app)"
echo "   PROD port: 3001  (/home/cms/app-prod)"
echo "   URL:       $PROD_URL"
echo ""

# Final confirmation
read -p "🚨 Are you ABSOLUTELY SURE you want to deploy to PRODUCTION? (yes/no): " CONFIRM < /dev/tty
if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

# ── Step 1: Build locally ─────────────────────────────────────────
echo ""
echo "🔨 Building locally for PRODUCTION..."
echo "   Using: $NEXT_PUBLIC_APP_URL"

export NEXT_PUBLIC_APP_URL
export NEXT_PUBLIC_GOOGLE_CLIENT_ID
export NEXT_PUBLIC_RAZORPAY_KEY_ID

NODE_ENV=production npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Build failed! Fix errors before deploying."
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""

# ── Step 2: Push to GitHub ────────────────────────────────────────
echo "📤 Pushing to GitHub (production branch)..."
git push origin production

echo "✅ Pushed to GitHub"
echo ""

# ── Step 3: Create deployment tarball ─────────────────────────────
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

# ── Step 4: Upload to server ──────────────────────────────────────
echo "📤 Uploading to production server..."
scp $SSH_FLAGS /tmp/cms-deploy-prod.tar.gz root@$DROPLET_IP:/tmp/

# ── Step 5: Remote deploy ─────────────────────────────────────────
# Capture the remote output so we can decide about health checks
REMOTE_LOG="/tmp/cms-deploy-remote-$$.log"

ssh $SSH_FLAGS root@$DROPLET_IP bash << ENDSSH 2>&1 | tee "$REMOTE_LOG"
set -e
PGPASSWORD="$DB_PASSWORD"
export PGPASSWORD

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 1: Backup current build (rollback safety)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd $APP_DIR
BACKUP_DIR=".next.backup.\$(date +%Y%m%d_%H%M%S)"
if [ -d ".next" ]; then
    cp -r .next "\$BACKUP_DIR"
    echo "✅ Backed up .next → \$BACKUP_DIR"
else
    echo "⚠️  No existing .next to back up (first deploy?)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 2: Extract deployment package"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
rm -rf .next
tar -xzf /tmp/cms-deploy-prod.tar.gz
rm /tmp/cms-deploy-prod.tar.gz
echo "✅ Extracted (clean)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 3: Run DB migrations (idempotent)"
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
echo "✅ Migrations complete"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 4: Seed mock products (idempotent)"
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
echo "  STEP 5: Configure environment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Environment ready (.env.production)"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 6: Install production dependencies"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm install --production --prefer-offline
echo "✅ Dependencies installed"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  STEP 7: Restart application"
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
echo "REMOTE_OK=true"
ENDSSH

REMOTE_EXIT=$?

# ── Step 6: Health check ──────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  HEALTH CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

HEALTH_OK=false
if grep -q "REMOTE_OK=true" "$REMOTE_LOG" 2>/dev/null; then
    echo "🩺 Waiting for app to be ready..."
    for i in 1 2 3 4 5 6 7 8 9 10; do
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL" 2>/dev/null || echo "000")
        if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
            echo "✅ Health check PASSED (HTTP $HTTP_CODE) on attempt $i"
            HEALTH_OK=true
            break
        fi
        echo "   Attempt $i/10: HTTP $HTTP_CODE — waiting 3s..."
        sleep 3
    done
else
    echo "⚠️  Remote script did not complete successfully — skipping health check"
fi

if [ "$HEALTH_OK" = false ] && grep -q "REMOTE_OK=true" "$REMOTE_LOG" 2>/dev/null; then
    echo ""
    echo "❌ HEALTH CHECK FAILED — initiating rollback..."
    ssh $SSH_FLAGS root@$DROPLET_IP bash << 'ROLLBACK'
cd /home/cms/app-prod
LATEST_BACKUP=$(ls -td .next.backup.* 2>/dev/null | head -1)
if [ -n "$LATEST_BACKUP" ]; then
    echo "   Restoring backup: $LATEST_BACKUP"
    rm -rf .next
    cp -r "$LATEST_BACKUP" .next
    pm2 restart cms-app-prod
    echo "✅ Rollback complete — restored from $LATEST_BACKUP"
else
    echo "❌ No backup found to roll back to!"
fi
ROLLBACK
    echo ""
    echo "❌ DEPLOY FAILED — server rolled back to previous build"
    rm -f "$REMOTE_LOG"
    rm -f /tmp/cms-deploy-prod.tar.gz
    exit 1
fi

# Cleanup
rm -f "$REMOTE_LOG"
rm -f /tmp/cms-deploy-prod.tar.gz

# ── Step 7: Purge Cloudflare cache ────────────────────────────────
echo ""
echo "🔄 Purging Cloudflare cache..."
bash "$(dirname "$0")/purge-cloudflare-cache.sh" production

echo ""
echo "✅ PRODUCTION DEPLOYMENT COMPLETE!"
echo ""
echo "📋 Next steps:"
echo "   - Logs:    ssh root@$DROPLET_IP 'pm2 logs cms-app-prod'"
echo "   - Monitor: ssh root@$DROPLET_IP 'pm2 monit'"
echo "   - Site:    $PROD_URL"
