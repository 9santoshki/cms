#!/bin/bash
# Production deployment script
# Uses git-based deployment for cleaner and faster deployments

echo "🚀 Deploying to production..."
echo ""
echo "This script uses git-based deployment."
echo "Code will be pulled from GitHub and built on the server."
echo ""

# Call the git deployment script
./scripts/deploy-git.sh master
