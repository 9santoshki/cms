#!/bin/bash
DROPLET_IP="104.236.245.179"

echo "Building locally with production environment..."
# Temporarily rename .env.local to ensure production env vars are used
# (Next.js prioritizes .env.local over .env.production)
if [ -f .env.local ]; then
  mv .env.local .env.local.backup
  echo "Temporarily moved .env.local to .env.local.backup"
fi

# Build with production env vars (NEXT_PUBLIC_* variables are embedded at build time)
NODE_ENV=production npm run build

# Restore .env.local
if [ -f .env.local.backup ]; then
  mv .env.local.backup .env.local
  echo "Restored .env.local"
fi

echo "Creating deployment archive..."
# Include all necessary files except node_modules, .env, and other excluded items
tar --no-xattrs -czf cms-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='.env*' \
  --exclude='*.log' \
  --exclude='.DS_Store' \
  --exclude='cms-deploy.tar.gz' \
  .next package.json package-lock.json next.config.js tsconfig.json src public scripts

echo "Uploading to server..."
scp cms-deploy.tar.gz root@$DROPLET_IP:/home/cms/app/

echo "Deploying on server..."
ssh root@$DROPLET_IP << 'ENDSSH'
cd /home/cms/app
echo "Extracting files..."
tar -xzf cms-deploy.tar.gz
echo "Installing dependencies..."
npm install --production
echo "Cleaning up..."
rm cms-deploy.tar.gz
echo "Restarting application..."
pm2 restart cms-app
echo "Server deployment complete!"
ENDSSH

rm cms-deploy.tar.gz
echo "✅ Deployment complete!"