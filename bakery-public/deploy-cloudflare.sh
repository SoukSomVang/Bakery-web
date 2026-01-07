#!/bin/bash

# Cloudflare Pages Deployment Script for Bakery House Laos
# This script builds and deploys the bakery-public site to Cloudflare Pages

set -e  # Exit on error

echo "🧁 Bakery House - Cloudflare Pages Deployment"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Clean previous build
echo -e "${BLUE}📦 Cleaning previous build...${NC}"
rm -rf .output .nuxt node_modules/.cache/nuxt

# Step 2: Install dependencies (if needed)
if [ ! -d "node_modules" ]; then
  echo -e "${BLUE}📥 Installing dependencies...${NC}"
  npm install
fi

# Step 3: Generate static site for Cloudflare Pages
echo -e "${BLUE}🔨 Generating static site for production...${NC}"
npm run generate

# Check if build was successful
if [ ! -d ".output/public" ]; then
  echo -e "${YELLOW}❌ Build failed! .output/public directory not found${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"
echo ""

# Step 4: Deploy to Cloudflare Pages
echo -e "${BLUE}🚀 Deploying to Cloudflare Pages...${NC}"
npx wrangler pages deploy .output/public \
  --project-name=bakery-public \
  --branch=main

# Step 5: Success message
echo ""
echo -e "${GREEN}✨ Deployment Complete!${NC}"
echo ""
echo "📍 Your site is now live at:"
echo "   • Production: https://bakery-house.org"
echo "   • Cloudflare: https://bakery-public.pages.dev"
echo ""
echo "🔍 SEO Features Active:"
echo "   • Sitemap: https://bakery-house.org/sitemap.xml"
echo "   • Robots: https://bakery-house.org/robots.txt"
echo "   • Local SEO optimized for Vientiane, Laos"
echo ""
echo -e "${GREEN}🎉 Happy Baking!${NC}"
