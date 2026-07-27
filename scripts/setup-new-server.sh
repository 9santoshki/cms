#!/bin/bash
# Setup script for new droplet

DROPLET_IP="104.236.245.179"

echo "🚀 Setting up new droplet at $DROPLET_IP..."

ssh root@$DROPLET_IP << 'ENDSSH'
set -e

echo "📦 Updating system..."
apt update && apt upgrade -y

echo "📦 Installing Node.js 18..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

echo "📦 Installing PostgreSQL..."
apt install -y postgresql postgresql-contrib

echo "📦 Installing nginx..."
apt install -y nginx

echo "📦 Installing PM2 globally..."
npm install -g pm2

echo "📦 Installing certbot for SSL..."
apt install -y certbot python3-certbot-nginx

echo "🔒 Setting up firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "📁 Creating application directory..."
mkdir -p /home/cms/app
cd /home/cms/app

echo "🗄️ Setting up PostgreSQL..."
sudo -u postgres psql << 'EOF'
CREATE USER cms_user WITH PASSWORD 'cms_dbpass12!';
CREATE DATABASE cms_db OWNER cms_user;
GRANT ALL PRIVILEGES ON DATABASE cms_db TO cms_user;
\c cms_db
GRANT ALL PRIVILEGES ON SCHEMA public TO cms_user;
ALTER SCHEMA public OWNER TO cms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO cms_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO cms_user;
EOF

echo "✅ Server setup complete!"
echo "Node version: $(node -v)"
echo "npm version: $(npm -v)"
echo "PM2 installed: $(pm2 -v)"
echo "PostgreSQL installed: $(psql --version)"
echo "nginx installed: $(nginx -v 2>&1)"

ENDSSH

echo "✅ New server setup complete!"
