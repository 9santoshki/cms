#!/bin/bash

# Cloudflare Cache Purge Script
# Purges all cached content for the specified zone
# Usage: ./scripts/purge-cloudflare-cache.sh

set -e

# Determine environment file
ENV_FILE=".env.uat"
if [ "$1" = "production" ]; then
  ENV_FILE=".env.production"
fi

# Load environment variables
if [ -f "$ENV_FILE" ]; then
  export $(grep -v '^#' "$ENV_FILE" | xargs)
else
  echo "❌ Environment file $ENV_FILE not found"
  exit 1
fi

# Check if credentials are set
if [ -z "$CLOUDFLARE_ZONE_ID" ] || [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "⚠️  Skipping cache purge: CLOUDFLARE_ZONE_ID or CLOUDFLARE_API_TOKEN not set in $ENV_FILE"
  echo "   Add these variables to enable automatic cache purging after deployment"
  exit 0
fi

echo "🔄 Purging Cloudflare cache..."

# Make API request to purge all cache
RESPONSE=$(curl -s -X POST \
  "https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}')

# Check if successful
if echo "$RESPONSE" | grep -q '"success":true'; then
  echo "✅ Cloudflare cache purged successfully"
  echo "   All cached content has been cleared from Cloudflare edge servers"
else
  echo "❌ Failed to purge Cloudflare cache:"
  echo "$RESPONSE" | grep -o '"message":"[^"]*"' || echo "$RESPONSE"
  exit 1
fi
