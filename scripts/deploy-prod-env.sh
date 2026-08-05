#!/bin/bash
# Deploy environment variables to PRODUCTION server
# Usage: ./scripts/deploy-prod-env.sh
# For UAT, use: ./scripts/deploy-env.sh

DROPLET_IP="${PRODUCTION_SERVER_IP:-2a01:4f9:c015:3132::1}"
ENV_FILE=".env.production"
REMOTE_ENV_FILE=".env.production"
REMOTE_DIR="/home/cms/app-prod"

echo "🚨 WARNING: Deploying to PRODUCTION server!"
echo ""

echo "Uploading $ENV_FILE to PRODUCTION (www.colourmyspace.com)..."
echo "Server: $DROPLET_IP (shared with UAT)"
echo "Directory: $REMOTE_DIR"
echo ""

# Check if .env.production exists locally
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Error: $ENV_FILE file not found in current directory"
  echo ""
  echo "Create .env.production file first:"
  echo "   cp .env.uat .env.production"
  echo "   # Edit with production credentials"
  echo ""
  echo "Required variables:"
  echo "   - NEXT_PUBLIC_APP_URL=https://www.colourmyspace.com"
  echo "   - DB_PASSWORD (strong, 32+ characters)"
  echo "   - JWT_SECRET (strong, 64+ characters)"
  echo "   - Production Google OAuth credentials"
  echo "   - Production Razorpay credentials"
  exit 1
fi

# Final confirmation
read -p "Are you sure you want to upload environment to PRODUCTION? (yes/no): " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Cancelled"
    exit 1
fi

# Upload the file (scp needs the IPv6 host bracketed: [addr]:/path)
echo "Uploading..."
scp $ENV_FILE "root@[$DROPLET_IP]:$REMOTE_DIR/$REMOTE_ENV_FILE"

if [ $? -ne 0 ]; then
    echo "❌ Upload failed!"
    exit 1
fi

# Set secure permissions and restart app (app runs as the dedicated
# non-root 'cms' user on this shared server)
ssh root@$DROPLET_IP << ENDSSH
cd $REMOTE_DIR
chown cms:cms $REMOTE_ENV_FILE
echo "Setting secure permissions..."
chmod 600 $REMOTE_ENV_FILE
echo "Restarting application..."
sudo -u cms -H bash -lc "pm2 restart cms-app-prod" || echo "⚠️  cms-app-prod not running yet (first-time setup?)"
echo "Environment variables deployed!"
ENDSSH

echo ""
echo "✅ $ENV_FILE deployed successfully to PRODUCTION server!"
echo "🌐 Site: https://www.colourmyspace.com"
