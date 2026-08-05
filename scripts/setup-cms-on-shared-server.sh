#!/bin/bash
# Provision CMS (colourmyspace UAT + prod) on a SHARED server that already
# hosts other apps under their own isolated Linux users (e.g. saamaandepot).
#
# ADDITIVE + IDEMPOTENT ONLY — safe to re-run:
#   - Never touches UFW, fail2ban, or postgresql.conf/pg_hba.conf
#     (assumed already hardened per DEPLOYMENT.md security requirements)
#   - Never touches another app's Linux user, database, or nginx site file
#   - Creates the 'cms' Linux user, its own Postgres roles/databases, its
#     own PM2 systemd service, and a draft (not-yet-enabled) nginx site
#
# Usage:
#   DB_UAT_PASSWORD='...' DB_PROD_PASSWORD='...' \
#     ./scripts/setup-cms-on-shared-server.sh <ipv4-or-ipv6>
#
# Generate strong passwords with: openssl rand -base64 32

set -e

DROPLET_IP="${1:?Usage: DB_UAT_PASSWORD=xxx DB_PROD_PASSWORD=xxx ./scripts/setup-cms-on-shared-server.sh <ip>}"

if [ -z "$DB_UAT_PASSWORD" ] || [ -z "$DB_PROD_PASSWORD" ]; then
    echo "❌ ERROR: DB_UAT_PASSWORD and DB_PROD_PASSWORD must both be set"
    echo "   Generate with: openssl rand -base64 32"
    exit 1
fi

SSH_HOST="root@$DROPLET_IP"

echo "🔧 Provisioning CMS (UAT + prod) on shared server $DROPLET_IP"
echo "   Additive only — will not touch UFW, fail2ban, Postgres config,"
echo "   or any other app's files on this box."
echo ""

ssh -o StrictHostKeyChecking=accept-new "$SSH_HOST" bash << ENDSSH
set -e

echo "1/6 📦 Linux user 'cms'..."
if id cms &>/dev/null; then
    echo "   already exists, skipping"
else
    useradd -m -s /bin/bash cms
    echo "   ✅ created"
fi

echo ""
echo "2/6 🗄️  Postgres roles + databases..."
UAT_ROLE_EXISTS=\$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='cms_uat_user'")
if [ "\$UAT_ROLE_EXISTS" != "1" ]; then
    sudo -u postgres psql -v ON_ERROR_STOP=1 -c "CREATE USER cms_uat_user WITH PASSWORD '$DB_UAT_PASSWORD';"
    echo "   ✅ created role cms_uat_user"
else
    echo "   role cms_uat_user already exists, skipping"
fi

PROD_ROLE_EXISTS=\$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='cms_prod_user'")
if [ "\$PROD_ROLE_EXISTS" != "1" ]; then
    sudo -u postgres psql -v ON_ERROR_STOP=1 -c "CREATE USER cms_prod_user WITH PASSWORD '$DB_PROD_PASSWORD';"
    echo "   ✅ created role cms_prod_user"
else
    echo "   role cms_prod_user already exists, skipping"
fi

UAT_DB_EXISTS=\$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='cms_uat_db'")
if [ "\$UAT_DB_EXISTS" != "1" ]; then
    sudo -u postgres psql -v ON_ERROR_STOP=1 -c "CREATE DATABASE cms_uat_db OWNER cms_uat_user;"
    sudo -u postgres psql -v ON_ERROR_STOP=1 -d cms_uat_db -c "GRANT ALL PRIVILEGES ON SCHEMA public TO cms_uat_user; ALTER SCHEMA public OWNER TO cms_uat_user; ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cms_uat_user; ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO cms_uat_user; ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO cms_uat_user;"
    echo "   ✅ created database cms_uat_db"
else
    echo "   database cms_uat_db already exists, skipping"
fi

PROD_DB_EXISTS=\$(sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='cms_prod_db'")
if [ "\$PROD_DB_EXISTS" != "1" ]; then
    sudo -u postgres psql -v ON_ERROR_STOP=1 -c "CREATE DATABASE cms_prod_db OWNER cms_prod_user;"
    sudo -u postgres psql -v ON_ERROR_STOP=1 -d cms_prod_db -c "GRANT ALL PRIVILEGES ON SCHEMA public TO cms_prod_user; ALTER SCHEMA public OWNER TO cms_prod_user; ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cms_prod_user; ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO cms_prod_user; ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO cms_prod_user;"
    echo "   ✅ created database cms_prod_db"
else
    echo "   database cms_prod_db already exists, skipping"
fi

echo ""
echo "3/6 📁 App directories..."
mkdir -p /home/cms/app /home/cms/app-prod
chown -R cms:cms /home/cms
for d in /home/cms/app /home/cms/app-prod; do
    if [ ! -d "\$d/.git" ]; then
        sudo -u cms git init "\$d"
        sudo -u cms git -C "\$d" remote add origin https://github.com/9santoshki/cms.git
        echo "   ✅ git initialized in \$d"
    else
        echo "   \$d already a git repo, skipping"
    fi
done

echo ""
echo "4/6 🔄 PM2 systemd service for 'cms' user..."
if [ ! -f /etc/systemd/system/pm2-cms.service ]; then
    pm2 startup systemd -u cms --hp /home/cms
    echo "   ✅ pm2-cms systemd service installed"
else
    echo "   pm2-cms service already installed, skipping"
fi

echo ""
echo "5/6 🔒 nginx rate-limit zones (cms_uat_limit, cms_prod_limit)..."
if ! grep -q "zone=cms_uat_limit" /etc/nginx/nginx.conf; then
    sed -i '/zone=saamaandepot_uat_limit/a\    limit_req_zone \$binary_remote_addr zone=cms_uat_limit:10m rate=10r/s;' /etc/nginx/nginx.conf
    sed -i '/zone=cms_uat_limit/a\    limit_req_zone \$binary_remote_addr zone=cms_prod_limit:10m rate=10r/s;' /etc/nginx/nginx.conf
    echo "   ✅ added cms_uat_limit + cms_prod_limit zones"
else
    echo "   zones already present, skipping"
fi

echo ""
echo "6/6 📝 Draft nginx site file (NOT enabled yet — origin certs needed first)..."
cat > /etc/nginx/sites-available/cms << 'NGINX_EOF'
# CMS (colourmyspace) — UAT + prod
# This droplet hosts multiple apps; this file only ever touches the
# cms UAT/prod server blocks. Do not add other apps' server_name
# entries here — give each app its own sites-available file instead.
#
# NOT YET ENABLED. A Cloudflare Origin Certificate covering
# *.colourmyspace.com + colourmyspace.com (single wildcard cert works for
# both uat. and www.) must be installed first at:
#   /etc/ssl/certs/cms-wildcard-origin.pem
#   /etc/ssl/private/cms-wildcard-origin.key
# Then symlink this file into sites-enabled and reload nginx.

server {
    listen 80;
    listen [::]:80;
    server_name uat.colourmyspace.com;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name uat.colourmyspace.com;

    ssl_certificate /etc/ssl/certs/cms-wildcard-origin.pem;
    ssl_certificate_key /etc/ssl/private/cms-wildcard-origin.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    limit_req zone=cms_uat_limit burst=20 nodelay;
    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

server {
    listen 80;
    listen [::]:80;
    server_name colourmyspace.com www.colourmyspace.com;
    return 301 https://www.colourmyspace.com\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name colourmyspace.com;

    ssl_certificate /etc/ssl/certs/cms-wildcard-origin.pem;
    ssl_certificate_key /etc/ssl/private/cms-wildcard-origin.key;

    return 301 https://www.colourmyspace.com\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.colourmyspace.com;

    ssl_certificate /etc/ssl/certs/cms-wildcard-origin.pem;
    ssl_certificate_key /etc/ssl/private/cms-wildcard-origin.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    limit_req zone=cms_prod_limit burst=20 nodelay;
    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
NGINX_EOF
echo "   ✅ wrote /etc/nginx/sites-available/cms (not symlinked into sites-enabled yet)"

echo ""
echo "✅ Provisioning complete."
echo ""
echo "📋 Summary:"
id cms
sudo -u postgres psql -c "\du cms_uat_user cms_prod_user"
sudo -u postgres psql -c "\l cms_uat_db cms_prod_db"
systemctl is-enabled pm2-cms 2>/dev/null || true
echo ""
echo "⚠️  nginx was NOT reloaded — the new site file references cert paths"
echo "   that don't exist yet. Existing sites (saamaandepot) are untouched."
ENDSSH

echo ""
echo "✅ Done. Next steps:"
echo "  1. Create Cloudflare DNS (AAAA) for uat.colourmyspace.com, colourmyspace.com,"
echo "     and www.colourmyspace.com -> $DROPLET_IP (proxied)"
echo "  2. Create a Cloudflare Origin Certificate covering *.colourmyspace.com +"
echo "     colourmyspace.com (one wildcard cert covers uat. and www. both), install at:"
echo "       /etc/ssl/certs/cms-wildcard-origin.pem"
echo "       /etc/ssl/private/cms-wildcard-origin.key"
echo "     then: ln -sf /etc/nginx/sites-available/cms /etc/nginx/sites-enabled/cms"
echo "           nginx -t && systemctl reload nginx"
echo "  3. Carry over .env files and migrate DB data from the old droplet"
echo "  4. Deploy with uatdeploy.sh / proddeploy.sh"
