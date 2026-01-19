#!/bin/bash
# Install Cloudflare Origin Certificate for SSL/TLS
# Usage: ./scripts/install-ssl.sh

set -e

DROPLET_IP="68.183.53.217"

echo "📋 Cloudflare Origin Certificate Setup"
echo ""
echo "Before running this script, get your certificate from Cloudflare:"
echo "1. Go to: Cloudflare Dashboard → SSL/TLS → Origin Server"
echo "2. Click 'Create Certificate'"
echo "3. Settings:"
echo "   - Key type: RSA (recommended)"
echo "   - Private key format: PEM"
echo "   - Hostnames: uat.colourmyspace.com, *.uat.colourmyspace.com"
echo "   - Validity: 15 years"
echo "4. Click 'Create'"
echo ""
read -p "Press Enter when you have the certificate ready..."

# Create temporary files for certificate and key
CERT_FILE=$(mktemp)
KEY_FILE=$(mktemp)

echo ""
echo "📋 Paste your Origin Certificate (including -----BEGIN CERTIFICATE----- and -----END CERTIFICATE-----)"
echo "Then press Ctrl+D on a new line:"
cat > "$CERT_FILE"

echo ""
echo "📋 Paste your Private Key (including -----BEGIN PRIVATE KEY----- and -----END PRIVATE KEY-----)"
echo "Then press Ctrl+D on a new line:"
cat > "$KEY_FILE"

# Upload to server
echo ""
echo "📤 Uploading certificates to server..."
scp "$CERT_FILE" root@$DROPLET_IP:/tmp/cloudflare-origin.pem
scp "$KEY_FILE" root@$DROPLET_IP:/tmp/cloudflare-origin.key

# Install on server
echo ""
echo "🔧 Installing certificates on server..."
ssh root@$DROPLET_IP << 'ENDSSH'
set -e

# Move certificates to proper location
mv /tmp/cloudflare-origin.pem /etc/ssl/certs/cloudflare-origin.pem
mv /tmp/cloudflare-origin.key /etc/ssl/private/cloudflare-origin.key

# Set permissions
chmod 644 /etc/ssl/certs/cloudflare-origin.pem
chmod 600 /etc/ssl/private/cloudflare-origin.key

echo "✅ Certificates installed"

# Update nginx configuration for HTTPS
cat > /etc/nginx/sites-available/cms << 'NGINX_EOF'
# HTTP - redirect to HTTPS
server {
    listen 80;
    server_name uat.colourmyspace.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS
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
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
NGINX_EOF

echo "✅ Nginx configured for HTTPS"

# Test nginx configuration
nginx -t

# Reload nginx
systemctl reload nginx

echo "✅ Nginx reloaded"

ENDSSH

# Cleanup temporary files
rm "$CERT_FILE" "$KEY_FILE"

echo ""
echo "✅ SSL Certificate Installation Complete!"
echo ""
echo "📋 Final Steps:"
echo "1. Go to Cloudflare Dashboard → SSL/TLS → Overview"
echo "2. Change SSL mode to: Full (strict)"
echo "3. Wait 1-2 minutes for changes to propagate"
echo "4. Visit: https://uat.colourmyspace.com"
echo ""
echo "✅ Your site will now be accessible via HTTPS!"
