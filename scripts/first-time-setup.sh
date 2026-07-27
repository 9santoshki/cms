#!/bin/bash
# First-time server setup for CMS deployment
# This script configures a fresh Ubuntu server with all security and infrastructure
# Run this ONCE on a new server, then use uatdeploy.sh for regular deployments

set -e

DROPLET_IP="${1:-68.183.53.217}"
DB_PASSWORD="${DB_PASSWORD:-}"

if [ -z "$DB_PASSWORD" ]; then
    echo "❌ ERROR: DB_PASSWORD environment variable not set"
    echo "Usage: DB_PASSWORD='your-secure-password' ./scripts/first-time-setup.sh [ip-address]"
    exit 1
fi

echo "🔒 CMS First-Time Server Setup"
echo "================================"
echo "Server IP: $DROPLET_IP"
echo ""
echo "This script will:"
echo "  1. Update system packages"
echo "  2. Install Node.js 20, PostgreSQL, nginx, PM2"
echo "  3. Configure firewall (UFW) with Cloudflare IP ranges"
echo "  4. Set up 4GB swap memory"
echo "  5. Configure fail2ban for SSH protection"
echo "  6. Create PostgreSQL database and user"
echo "  7. Set up nginx as reverse proxy"
echo "  8. Configure bandwidth and rate limiting"
echo "  9. Initialize git repository for deployments"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

ssh root@$DROPLET_IP << ENDSSH
set -e

echo ""
echo "🔧 Step 1/9: Updating system packages..."
apt-get update -qq
apt-get upgrade -y

echo ""
echo "🔧 Step 2/9: Installing Node.js 20..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi
node -v
npm -v

# Install PM2 globally
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi
pm2 -v

echo ""
echo "🔧 Step 3/9: Installing PostgreSQL..."
apt-get install -y postgresql postgresql-contrib

echo ""
echo "🔧 Step 4/9: Installing nginx and fail2ban..."
apt-get install -y nginx fail2ban

echo ""
echo "🔧 Step 5/9: Configuring firewall with Cloudflare IP ranges..."
ufw --force enable
ufw default deny incoming
ufw default allow outgoing

# Allow SSH
ufw allow ssh

# Cloudflare IPv4 ranges for ports 80 and 443
CLOUDFLARE_IPS=(
    "173.245.48.0/20"
    "103.21.244.0/22"
    "103.22.200.0/22"
    "103.31.4.0/22"
    "104.16.0.0/13"
    "108.162.192.0/18"
    "131.0.72.0/22"
    "141.101.64.0/18"
    "162.158.0.0/15"
    "172.64.0.0/13"
    "188.114.96.0/20"
    "190.93.240.0/20"
    "197.234.240.0/22"
    "198.41.128.0/17"
)

for ip in "\${CLOUDFLARE_IPS[@]}"; do
    ufw allow from \$ip to any port 80 proto tcp
    ufw allow from \$ip to any port 443 proto tcp
done

# IMPORTANT: Deny rules must come AFTER allow rules
# UFW processes rules in order, so ALLOW rules for Cloudflare IPs must be first
ufw deny 80/tcp
ufw deny 443/tcp

echo "✅ Firewall configured (Cloudflare-only access)"

echo ""
echo "🔧 Step 6/9: Setting up 4GB swap memory..."
if [ ! -f /swapfile ]; then
    fallocate -l 4G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile

    # Make swap permanent
    if ! grep -q '/swapfile' /etc/fstab; then
        echo '/swapfile none swap sw 0 0' >> /etc/fstab
    fi

    echo "✅ 4GB swap enabled"
else
    echo "✅ Swap already exists"
fi

echo ""
echo "🔧 Step 7/9: Configuring fail2ban..."
cat > /etc/fail2ban/jail.local << 'F2B_EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3
F2B_EOF

systemctl enable fail2ban
systemctl restart fail2ban
echo "✅ fail2ban configured"

echo ""
echo "🔧 Step 8/9: Creating PostgreSQL database..."
sudo -u postgres psql << 'PG_EOF'
-- Drop existing if any
DROP DATABASE IF EXISTS cms_db;
DROP ROLE IF EXISTS cms_user;

-- Create user and database
CREATE USER cms_user WITH PASSWORD '$DB_PASSWORD';
CREATE DATABASE cms_db OWNER cms_user;

-- Grant all permissions
GRANT ALL PRIVILEGES ON DATABASE cms_db TO cms_user;
\c cms_db
GRANT ALL PRIVILEGES ON SCHEMA public TO cms_user;
ALTER SCHEMA public OWNER TO cms_user;

-- Grant default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO cms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO cms_user;
PG_EOF

# Configure PostgreSQL to only listen on localhost
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = 'localhost'/" /etc/postgresql/*/main/postgresql.conf
systemctl restart postgresql

echo "✅ PostgreSQL database created"

echo ""
echo "🔧 Step 9/9: Configuring nginx..."

# Add rate limiting zone to nginx.conf if not exists
if ! grep -q "limit_req_zone" /etc/nginx/nginx.conf; then
    sed -i '/http {/a \    # Rate limiting\n    limit_req_zone \$binary_remote_addr zone=cms_limit:10m rate=10r/s;' /etc/nginx/nginx.conf
fi

# Create nginx site configuration (HTTP only, SSL will be added later)
cat > /etc/nginx/sites-available/cms << 'NGINX_EOF'
server {
    listen 80;
    server_name uat.colourmyspace.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

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
NGINX_EOF

# Enable site
ln -sf /etc/nginx/sites-available/cms /etc/nginx/sites-enabled/cms
rm -f /etc/nginx/sites-enabled/default

# Test and reload nginx
nginx -t
systemctl reload nginx

echo "✅ Nginx configured"

echo ""
echo "🔧 Setting up application directory..."
mkdir -p /home/cms/app
cd /home/cms/app

# Initialize git repository for deployments
git init
git remote add origin https://github.com/9santoshki/cms.git

echo "✅ Application directory ready"

echo ""
echo "=========================================="
echo "✅ First-time server setup complete!"
echo "=========================================="
echo ""
echo "📋 What was configured:"
echo "  ✓ Node.js 20 and PM2 installed"
echo "  ✓ PostgreSQL database created (cms_db)"
echo "  ✓ Firewall configured (Cloudflare-only)"
echo "  ✓ 4GB swap memory enabled"
echo "  ✓ fail2ban protecting SSH"
echo "  ✓ Nginx reverse proxy configured"
echo "  ✓ Rate limiting enabled (10 req/s)"
echo ""
echo "📋 Next steps:"
echo "  1. Deploy .env.production:"
echo "     ./scripts/deploy-env.sh"
echo ""
echo "  2. Initialize database schema:"
echo "     ssh root@$DROPLET_IP 'cd /home/cms/app && npm run init-db'"
echo ""
echo "  3. Install SSL certificate:"
echo "     ./scripts/install-ssl.sh"
echo ""
echo "  4. Deploy application:"
echo "     ./scripts/uatdeploy.sh"
echo ""

ENDSSH

echo ""
echo "✅ Server is ready for deployment!"
