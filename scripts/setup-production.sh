#!/bin/bash
# Setup production environment on the same droplet as UAT
# This creates a separate directory, database, and PM2 process for production

set -e

DROPLET_IP="${1:-68.183.53.217}"
DB_PASSWORD="${DB_PASSWORD:-}"

if [ -z "$DB_PASSWORD" ]; then
    echo "❌ ERROR: DB_PASSWORD environment variable not set"
    echo "Usage: DB_PASSWORD='your-secure-password' ./scripts/setup-production.sh [ip-address]"
    exit 1
fi

echo "🔧 Setting up PRODUCTION environment on droplet"
echo "=============================================="
echo "Server IP: $DROPLET_IP"
echo ""
echo "This script will:"
echo "  1. Create /home/cms/prod directory"
echo "  2. Create cms_prod_db database"
echo "  3. Initialize git repository"
echo "  4. Configure nginx for www.colourmyspace.com"
echo "  5. Create separate PM2 process (port 3001)"
echo ""
echo "⚠️  UAT environment will remain untouched at /home/cms/app"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

ssh root@$DROPLET_IP << ENDSSH
set -e

echo ""
echo "🔧 Step 1/4: Creating production directory..."
mkdir -p /home/cms/prod
cd /home/cms/prod

# Initialize git repository
git init
git remote add origin https://github.com/9santoshki/cms.git

echo "✅ Production directory created at /home/cms/prod"

echo ""
echo "🔧 Step 2/4: Creating production database..."
sudo -u postgres psql << 'PG_EOF'
-- Create production database and user
CREATE DATABASE cms_prod_db OWNER cms_user;

-- Grant all permissions
GRANT ALL PRIVILEGES ON DATABASE cms_prod_db TO cms_user;
\c cms_prod_db
GRANT ALL PRIVILEGES ON SCHEMA public TO cms_user;
ALTER SCHEMA public OWNER TO cms_user;

-- Grant default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO cms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO cms_user;
PG_EOF

echo "✅ Production database 'cms_prod_db' created"

echo ""
echo "🔧 Step 3/4: Configuring nginx for dual domains..."

# Update nginx configuration to handle both domains
cat > /etc/nginx/sites-available/cms << 'NGINX_EOF'
# UAT - uat.colourmyspace.com → port 3000
server {
    listen 80;
    server_name uat.colourmyspace.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name uat.colourmyspace.com;

    # Cloudflare Origin Certificate
    ssl_certificate /etc/ssl/certs/cloudflare-origin.pem;
    ssl_certificate_key /etc/ssl/private/cloudflare-origin.key;

    # Modern SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Rate limiting
    limit_req zone=cms_limit burst=20 nodelay;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}

# PRODUCTION - colourmyspace.com & www.colourmyspace.com → port 3001
server {
    listen 80;
    server_name colourmyspace.com www.colourmyspace.com;
    return 301 https://www.colourmyspace.com\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name colourmyspace.com;
    return 301 https://www.colourmyspace.com\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.colourmyspace.com;

    # Cloudflare Origin Certificate
    ssl_certificate /etc/ssl/certs/cloudflare-origin.pem;
    ssl_certificate_key /etc/ssl/private/cloudflare-origin.key;

    # Modern SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Rate limiting
    limit_req zone=cms_limit burst=20 nodelay;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
NGINX_EOF

# Test and reload nginx
nginx -t
systemctl reload nginx

echo "✅ Nginx configured for dual domains"
echo "   - UAT: uat.colourmyspace.com → port 3000"
echo "   - PROD: www.colourmyspace.com → port 3001"

echo ""
echo "🔧 Step 4/4: Creating production environment summary..."

echo ""
echo "=========================================="
echo "✅ Production environment setup complete!"
echo "=========================================="
echo ""
echo "📋 Production Configuration:"
echo "  - Directory: /home/cms/prod"
echo "  - Database: cms_prod_db"
echo "  - Port: 3001"
echo "  - Domain: www.colourmyspace.com"
echo ""
echo "📋 UAT Configuration (unchanged):"
echo "  - Directory: /home/cms/app"
echo "  - Database: cms_db"
echo "  - Port: 3000"
echo "  - Domain: uat.colourmyspace.com"
echo ""
echo "📋 Next steps:"
echo "  1. Deploy .env.production to /home/cms/prod:"
echo "     ./scripts/deploy-prod-env.sh"
echo ""
echo "  2. Initialize production database:"
echo "     ssh root@$DROPLET_IP 'cd /home/cms/prod && npm run init-db'"
echo ""
echo "  3. Deploy production application:"
echo "     ./scripts/proddeploy.sh"
echo ""
echo "  4. Add DNS records in Cloudflare:"
echo "     - www.colourmyspace.com → $DROPLET_IP (PROXIED)"
echo "     - colourmyspace.com → $DROPLET_IP (PROXIED)"
echo ""

ENDSSH

echo ""
echo "✅ Production environment ready on server!"
