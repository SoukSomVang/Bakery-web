#!/bin/bash

# Bakery Web - Cloudflare Pages Deployment Script
# This script builds and deploys both bakery-public and bakery-admin to Cloudflare Pages

set -e  # Exit on any error

echo "🧁 Starting Bakery Web Deployment to Cloudflare Pages..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Function to build and deploy an app
deploy_app() {
    local APP_NAME=$1
    local APP_DIR=$2
    local PROJECT_NAME=$3

    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}📦 Building $APP_NAME...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

    cd "$SCRIPT_DIR/$APP_DIR"

    # Build the app
    echo "Building..."
    npm run generate

    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}🚀 Deploying $APP_NAME to Cloudflare...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

    # Deploy to Cloudflare Pages
    npx wrangler pages deploy .output/public --project-name=$PROJECT_NAME --commit-dirty=true

    echo ""
    echo -e "${GREEN}✅ $APP_NAME deployed successfully!${NC}"
    echo ""
}

# Check if wrangler is authenticated
echo "Checking Wrangler authentication..."
if ! npx wrangler whoami > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Not logged in to Wrangler${NC}"
    echo "Please login first:"
    echo "  wrangler login"
    exit 1
fi

echo -e "${GREEN}✓ Authenticated${NC}"
echo ""

# Deploy both apps
deploy_app "Bakery Public" "bakery-public" "bakery-public"
deploy_app "Bakery Admin" "bakery-admin" "bakery-admin"

# Summary
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Your applications are now live:"
echo ""
echo "  🌐 Bakery Public:"
echo "     https://bakery-public.pages.dev"
echo ""
echo "  🔧 Bakery Admin:"
echo "     https://bakery-admin.pages.dev"
echo ""
echo -e "${YELLOW}Note: If the main URLs don't work yet, check the deployment-specific URLs in the output above.${NC}"
echo ""
