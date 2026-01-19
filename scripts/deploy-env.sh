#!/bin/bash
# Deploy environment variables to UAT server
# Usage: ./scripts/deploy-env.sh

DROPLET_IP="68.183.53.217"
ENV_FILE=".env.uat"
REMOTE_ENV_FILE=".env.uat"

echo "Uploading $ENV_FILE to UAT server..."

# Check if .env.uat exists locally
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Error: $ENV_FILE file not found in current directory"
  echo "This file should contain environment variables for uat.colourmyspace.com"
  exit 1
fi

# Upload the file
scp $ENV_FILE root@$DROPLET_IP:/home/cms/app/$REMOTE_ENV_FILE

# Set secure permissions and restart app
ssh root@$DROPLET_IP << 'ENDSSH'
cd /home/cms/app
echo "Setting secure permissions..."
chmod 600 .env.uat
echo "Restarting application..."
pm2 restart cms-app
echo "Environment variables deployed!"
ENDSSH

echo "✅ $ENV_FILE deployed successfully to UAT server!"
