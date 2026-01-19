#!/bin/bash
# Secure server setup script for CMS application
# This script addresses DDoS attack vulnerabilities

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔒 Secure CMS Server Setup${NC}"
echo "This script will set up a hardened server for the CMS application"
echo ""

# Check if DB password is provided
if [ -z "$DB_PASSWORD" ]; then
  echo -e "${RED}ERROR: DB_PASSWORD environment variable not set${NC}"
  echo "Usage: DB_PASSWORD='your-strong-password' ./secure-server-setup.sh <droplet-ip>"
  exit 1
fi

if [ -z "$1" ]; then
  echo -e "${RED}ERROR: Droplet IP not provided${NC}"
  echo "Usage: DB_PASSWORD='your-strong-password' ./secure-server-setup.sh <droplet-ip>"
  exit 1
fi

DROPLET_IP="$1"
echo -e "${YELLOW}Setting up server at: $DROPLET_IP${NC}"
echo ""

# Generate a random PostgreSQL password if not provided
DB_USER="cms_user"
DB_NAME="cms_db"

echo -e "${GREEN}📦 Connecting to server...${NC}"

ssh root@$DROPLET_IP << ENDSSH
set -e

echo "================================================"
echo "🔒 SECURE CMS SERVER SETUP"
echo "================================================"

# Update system
echo ""
echo "📦 Step 1/10: Updating system packages..."
apt-get update
DEBIAN_FRONTEND=noninteractive apt-get upgrade -y

# Install Node.js 20 (required for Next.js 16)
echo ""
echo "📦 Step 2/10: Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PostgreSQL
echo ""
echo "📦 Step 3/10: Installing PostgreSQL..."
apt-get install -y postgresql postgresql-contrib

# Configure PostgreSQL to ONLY listen on localhost
echo ""
echo "🔒 Step 4/10: Securing PostgreSQL..."
PG_VERSION=\$(ls /etc/postgresql/)
PG_CONF="/etc/postgresql/\$PG_VERSION/main/postgresql.conf"
PG_HBA="/etc/postgresql/\$PG_VERSION/main/pg_hba.conf"

# Backup original configs
cp \$PG_CONF \$PG_CONF.backup
cp \$PG_HBA \$PG_HBA.backup

# Configure PostgreSQL to ONLY listen on localhost (127.0.0.1)
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '127.0.0.1'/g" \$PG_CONF
sed -i "s/listen_addresses = '\*'/listen_addresses = '127.0.0.1'/g" \$PG_CONF

# Disable remote connections - only allow local connections
cat > \$PG_HBA << 'EOF'
# PostgreSQL Client Authentication Configuration
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# Local connections only
local   all             postgres                                peer
local   all             all                                     md5
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5

# Reject all remote connections
EOF

# Restart PostgreSQL
systemctl restart postgresql

# Create database and user
echo ""
echo "🗄️  Step 5/10: Creating database and user..."
sudo -u postgres psql << 'EOF'
-- Drop existing if any
DROP DATABASE IF EXISTS $DB_NAME;
DROP USER IF EXISTS $DB_USER;

-- Create user with strong password
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
CREATE DATABASE $DB_NAME OWNER $DB_USER;

-- Grant all permissions
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
\c $DB_NAME
GRANT ALL PRIVILEGES ON SCHEMA public TO $DB_USER;
ALTER SCHEMA public OWNER TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO $DB_USER;
EOF

# Install nginx
echo ""
echo "📦 Step 6/10: Installing nginx..."
apt-get install -y nginx

# Configure nginx with security headers
cat > /etc/nginx/sites-available/cms << 'NGINXCONF'
server {
    listen 80;
    server_name _;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Rate limiting
    limit_req_zone \$binary_remote_addr zone=one:10m rate=10r/s;
    limit_req zone=one burst=20 nodelay;

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
NGINXCONF

ln -sf /etc/nginx/sites-available/cms /etc/nginx/sites-enabled/cms
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

# Install PM2
echo ""
echo "📦 Step 7/10: Installing PM2..."
npm install -g pm2

# Install and configure fail2ban (prevents brute force attacks)
echo ""
echo "🔒 Step 8/10: Installing fail2ban..."
apt-get install -y fail2ban

cat > /etc/fail2ban/jail.local << 'F2BCONF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
destemail = root@localhost
sendername = Fail2Ban

[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s
maxretry = 3
bantime = 86400

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10

[nginx-botsearch]
enabled = true
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 2
F2BCONF

systemctl enable fail2ban
systemctl start fail2ban

# Configure firewall (UFW)
echo ""
echo "🔒 Step 9/10: Configuring firewall..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'
ufw --force enable

# Disable SSH password authentication (key-only)
echo ""
echo "🔒 Step 10/12: Hardening SSH..."
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config
sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/g' /etc/ssh/sshd_config
sed -i 's/#PermitRootLogin yes/PermitRootLogin prohibit-password/g' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin yes/PermitRootLogin prohibit-password/g' /etc/ssh/sshd_config

# Only reload SSH, don't restart yet (we're still connected!)
systemctl reload sshd

# Configure bandwidth limiting
echo ""
echo "🚦 Step 11/12: Setting up bandwidth limiting..."
apt-get install -y wondershaper iptables-persistent vnstat

# Bandwidth limits (prevents excessive usage from DDoS/compromise)
MAX_DOWNLOAD_MBPS=100  # 100 Mbps download
MAX_UPLOAD_MBPS=50     # 50 Mbps upload (prevents DDoS attacks)
INTERFACE="eth0"

# Apply bandwidth limits
wondershaper -a \$INTERFACE -d \$((MAX_DOWNLOAD_MBPS * 1024)) -u \$((MAX_UPLOAD_MBPS * 1024))

# Make limits persistent across reboots
cat > /etc/systemd/system/wondershaper.service << WSHAPER
[Unit]
Description=Bandwidth limiting with wondershaper
After=network.target

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/sbin/wondershaper -a \$INTERFACE -d \$((MAX_DOWNLOAD_MBPS * 1024)) -u \$((MAX_UPLOAD_MBPS * 1024))
ExecStop=/sbin/wondershaper -c -a \$INTERFACE

[Install]
WantedBy=multi-user.target
WSHAPER

systemctl daemon-reload
systemctl enable wondershaper.service

# Connection rate limiting with iptables
iptables -N RATE_LIMIT 2>/dev/null || iptables -F RATE_LIMIT

# Limit new HTTP/HTTPS connections per IP to 20/minute
iptables -A INPUT -p tcp --dport 80 -m state --state NEW -m recent --set --name HTTP
iptables -A INPUT -p tcp --dport 80 -m state --state NEW -m recent --update --seconds 60 --hitcount 20 --name HTTP -j DROP

iptables -A INPUT -p tcp --dport 443 -m state --state NEW -m recent --set --name HTTPS
iptables -A INPUT -p tcp --dport 443 -m state --state NEW -m recent --update --seconds 60 --hitcount 20 --name HTTPS -j DROP

# Limit total concurrent connections per IP (prevents connection flooding)
iptables -A INPUT -p tcp --syn --dport 80 -m connlimit --connlimit-above 50 -j REJECT
iptables -A INPUT -p tcp --syn --dport 443 -m connlimit --connlimit-above 50 -j REJECT

# Save iptables rules
mkdir -p /etc/iptables
iptables-save > /etc/iptables/rules.v4

# Configure iptables-persistent
echo iptables-persistent iptables-persistent/autosave_v4 boolean true | debconf-set-selections
echo iptables-persistent iptables-persistent/autosave_v6 boolean true | debconf-set-selections

# Start vnstat for bandwidth monitoring
systemctl enable vnstat
systemctl start vnstat

# Create application directory
echo ""
echo "📁 Step 12/12: Creating application directory..."
mkdir -p /home/cms/app
chown -R root:root /home/cms/app

# Install certbot for SSL
echo ""
echo "📦 Installing certbot..."
apt-get install -y certbot python3-certbot-nginx

echo ""
echo "================================================"
echo "✅ SECURE SERVER SETUP COMPLETE!"
echo "================================================"
echo ""
echo "📊 Installed versions:"
echo "   Node.js: \$(node -v)"
echo "   npm: \$(npm -v)"
echo "   PM2: \$(pm2 -v)"
echo "   PostgreSQL: \$(psql --version | head -1)"
echo "   nginx: \$(nginx -v 2>&1)"
echo ""
echo "🔒 Security measures applied:"
echo "   ✅ PostgreSQL configured to ONLY listen on localhost (127.0.0.1)"
echo "   ✅ PostgreSQL remote connections disabled"
echo "   ✅ Firewall (UFW) enabled - only ports 22, 80, 443 allowed"
echo "   ✅ fail2ban installed - prevents brute force attacks"
echo "   ✅ SSH password authentication disabled (key-only)"
echo "   ✅ nginx rate limiting enabled (10 req/sec)"
echo "   ✅ Bandwidth limiting: 100 Mbps down / 50 Mbps up"
echo "   ✅ Connection rate limiting: 20 new conn/min per IP"
echo "   ✅ Max concurrent connections: 50 per IP"
echo "   ✅ Security headers configured"
echo ""
echo "📊 Bandwidth Protection:"
echo "   - Upload limited to 50 Mbps (prevents DDoS participation)"
echo "   - Download limited to 100 Mbps"
echo "   - Connection flooding blocked (max 50 concurrent per IP)"
echo "   - vnstat installed for bandwidth monitoring"
echo ""
echo "⚠️  IMPORTANT NEXT STEPS:"
echo "   1. Deploy your .env.production file with DB_PASSWORD='$DB_PASSWORD'"
echo "   2. Deploy your application"
echo "   3. Run: npm run init-db to initialize database"
echo "   4. Set up SSL certificate: certbot --nginx -d your-domain.com"
echo ""
echo "🔍 To verify security:"
echo "   PostgreSQL secure: netstat -an | grep 5432 (should show 127.0.0.1:5432)"
echo "   Firewall active: ufw status"
echo "   Bandwidth limits: wondershaper -a eth0 -s"
echo "   Monitor bandwidth: vnstat -l (live monitoring)"
echo ""

ENDSSH

echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✅ SERVER SETUP COMPLETED SUCCESSFULLY!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo -e "${YELLOW}⚠️  CRITICAL: Update your .env.production file:${NC}"
echo -e "DB_PASSWORD='$DB_PASSWORD'"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Run: ./scripts/deploy-env.sh (to deploy .env.production)"
echo "2. Run: ./scripts/uatdeploy.sh (to deploy application)"
echo "3. SSH to server and run: cd /home/cms/app && npm run init-db"
echo ""
