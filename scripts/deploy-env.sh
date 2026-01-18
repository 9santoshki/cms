#!/bin/bash
DROPLET_IP="104.236.245.179"

echo "Uploading .env.production to server..."

# Check if .env.production exists locally
if [ ! -f ".env.production" ]; then
  echo "❌ Error: .env.production file not found in current directory"
  exit 1
fi

# Upload the file
scp .env.production root@$DROPLET_IP:/home/cms/app/.env.production

# Set secure permissions and restart app
ssh root@$DROPLET_IP << 'ENDSSH'
cd /home/cms/app
echo "Setting secure permissions..."
chmod 600 .env.production
echo "Restarting application..."
pm2 restart cms-app
echo "Environment variables deployed!"
ENDSSH

echo "✅ .env.production deployed successfully!"
