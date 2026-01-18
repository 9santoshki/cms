#!/bin/bash
DROPLET_IP="167.172.202.115"

echo "🔍 Checking OAuth configuration on server..."
echo ""

ssh root@$DROPLET_IP << 'ENDSSH'
cd /home/cms/app

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Environment Variables Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -f .env.production ]; then
  echo "✓ .env.production exists"

  # Check for Google OAuth vars
  if grep -q "NEXT_PUBLIC_GOOGLE_CLIENT_ID" .env.production; then
    CLIENT_ID=$(grep "NEXT_PUBLIC_GOOGLE_CLIENT_ID" .env.production | cut -d'=' -f2)
    echo "✓ NEXT_PUBLIC_GOOGLE_CLIENT_ID: ${CLIENT_ID:0:20}..."
  else
    echo "✗ NEXT_PUBLIC_GOOGLE_CLIENT_ID missing"
  fi

  if grep -q "GOOGLE_CLIENT_SECRET" .env.production; then
    echo "✓ GOOGLE_CLIENT_SECRET: Set"
  else
    echo "✗ GOOGLE_CLIENT_SECRET missing"
  fi
else
  echo "✗ .env.production NOT FOUND"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. PM2 Process Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pm2 list

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. Recent PM2 Logs (errors only)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
pm2 logs cms-app --lines 20 --nostream --err

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. Test Environment Variable Loading"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
curl -s http://localhost:3000/api/debug/env-check | jq '.variables[] | select(.name | contains("GOOGLE"))'

ENDSSH

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 REQUIRED GOOGLE CLOUD CONSOLE SETUP"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Go to: https://console.cloud.google.com/apis/credentials"
echo ""
echo "Add these Authorized Redirect URIs:"
echo "  • http://localhost:3000/auth/callback"
echo "  • http://167.172.202.115:3000/auth/callback"
echo "  • http://YOUR-DOMAIN.com/auth/callback"
echo "  • https://YOUR-DOMAIN.com/auth/callback"
echo ""
echo "Note: Without correct redirect URIs, Google will reject the login!"
