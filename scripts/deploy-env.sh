#!/bin/bash
# Deploy environment variables to UAT server
# Usage: ./scripts/deploy-env.sh
# For production, use: ./scripts/deploy-prod-env.sh

DROPLET_IP="2a01:4f9:c015:3132::1"
ENV_FILE=".env.uat"
REMOTE_ENV_FILE=".env.uat"
REMOTE_DIR="/home/cms/app"

echo "Uploading $ENV_FILE to UAT server (uat.colourmyspace.com)..."

# Check if .env.uat exists locally
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Error: $ENV_FILE file not found in current directory"
  echo "This file should contain environment variables for uat.colourmyspace.com"
  exit 1
fi

# Upload the file (scp needs the IPv6 host bracketed: [addr]:/path)
scp $ENV_FILE "root@[$DROPLET_IP]:$REMOTE_DIR/$REMOTE_ENV_FILE"

# Set secure permissions and restart app (app runs as the dedicated
# non-root 'cms' user on this shared server)
ssh root@$DROPLET_IP << ENDSSH
cd $REMOTE_DIR
chown cms:cms $REMOTE_ENV_FILE
echo "Setting secure permissions..."
chmod 600 $REMOTE_ENV_FILE
echo "Restarting application..."
sudo -u cms -H bash -lc "pm2 restart cms-app"
echo "Environment variables deployed!"
ENDSSH

echo "✅ $ENV_FILE deployed successfully to UAT server!"
