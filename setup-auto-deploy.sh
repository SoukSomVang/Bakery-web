#!/bin/bash

# Auto-Deployment Setup Script for Bakery Web
# This script will help you set up automatic deployment to Cloudflare Pages

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 Bakery Web Auto-Deployment Setup${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Step 1: Check if logged into Wrangler
echo -e "${YELLOW}Step 1: Checking Wrangler authentication...${NC}"
if ! npx wrangler whoami > /dev/null 2>&1; then
    echo -e "${RED}❌ Not logged into Wrangler${NC}"
    echo "Please run: npx wrangler login"
    exit 1
fi
echo -e "${GREEN}✅ Wrangler authenticated${NC}"
echo ""

# Step 2: Check GitHub CLI
echo -e "${YELLOW}Step 2: Checking GitHub CLI...${NC}"
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}⚠️  GitHub CLI not installed${NC}"
    echo "Installing with brew..."
    brew install gh || {
        echo -e "${RED}Failed to install GitHub CLI${NC}"
        echo "Please install manually: https://cli.github.com/"
        GH_AVAILABLE=false
    }
else
    echo -e "${GREEN}✅ GitHub CLI installed${NC}"
    GH_AVAILABLE=true
fi
echo ""

# Step 3: Login to GitHub CLI
if [ "$GH_AVAILABLE" = true ]; then
    echo -e "${YELLOW}Step 3: Checking GitHub CLI authentication...${NC}"
    if ! gh auth status &> /dev/null; then
        echo -e "${YELLOW}Please login to GitHub CLI...${NC}"
        gh auth login
    fi
    echo -e "${GREEN}✅ GitHub CLI authenticated${NC}"
    echo ""
fi

# Step 4: Create Cloudflare API Token
echo -e "${YELLOW}Step 4: Creating Cloudflare API Token...${NC}"
echo ""
echo -e "${BLUE}Opening Cloudflare API Token creation page...${NC}"
echo "1. A browser window will open"
echo "2. Click 'Create Token'"
echo "3. Use the 'Edit Cloudflare Workers' template"
echo "4. Click 'Continue to summary' → 'Create Token'"
echo "5. Copy the token (you'll need it in the next step)"
echo ""
read -p "Press Enter to open browser..."

# Open API token page
if [[ "$OSTYPE" == "darwin"* ]]; then
    open "https://dash.cloudflare.com/profile/api-tokens"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open "https://dash.cloudflare.com/profile/api-tokens"
fi

echo ""
read -p "Have you created and copied the API token? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Setup cancelled. Please create the API token and run this script again.${NC}"
    exit 1
fi

# Step 5: Add GitHub Secret
echo ""
echo -e "${YELLOW}Step 5: Adding GitHub Secret...${NC}"
echo ""

if [ "$GH_AVAILABLE" = true ]; then
    echo "Please paste your Cloudflare API token:"
    read -s CLOUDFLARE_TOKEN
    echo ""

    echo "Adding secret to GitHub..."
    echo "$CLOUDFLARE_TOKEN" | gh secret set CLOUDFLARE_API_TOKEN

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ GitHub secret added successfully!${NC}"
    else
        echo -e "${RED}❌ Failed to add GitHub secret${NC}"
        echo ""
        echo "Please add it manually:"
        echo "1. Go to: https://github.com/SoukSomVang/Bakery-web/settings/secrets/actions"
        echo "2. Click 'New repository secret'"
        echo "3. Name: CLOUDFLARE_API_TOKEN"
        echo "4. Value: [paste your token]"
    fi
else
    echo -e "${YELLOW}Please add the secret manually:${NC}"
    echo "1. Go to: https://github.com/SoukSomVang/Bakery-web/settings/secrets/actions"
    echo "2. Click 'New repository secret'"
    echo "3. Name: CLOUDFLARE_API_TOKEN"
    echo "4. Value: [paste your Cloudflare API token]"
    echo ""
    read -p "Press Enter when done..."
fi

# Step 6: Test the setup
echo ""
echo -e "${YELLOW}Step 6: Testing the setup...${NC}"
echo ""
echo "Would you like to commit and push to test auto-deployment? (y/n)"
read -p "> " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add .
    git commit -m "chore: enable auto-deployment to Cloudflare Pages" || echo "Nothing to commit"
    git push origin main

    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ Setup Complete!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "🎉 Auto-deployment is now enabled!"
    echo ""
    echo "Watch your deployment here:"
    echo "  📊 https://github.com/SoukSomVang/Bakery-web/actions"
    echo ""
    echo "Your apps will be live at:"
    echo "  🌐 https://bakery-public.pages.dev"
    echo "  🌐 https://bakery-house.org"
    echo "  🔧 https://bakery-admin.pages.dev"

    # Open GitHub Actions
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "https://github.com/SoukSomVang/Bakery-web/actions"
    fi
else
    echo ""
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}✅ Setup Complete!${NC}"
    echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Auto-deployment is now configured!"
    echo ""
    echo "To test it, push to main:"
    echo "  git push origin main"
    echo ""
    echo "Watch deployments at:"
    echo "  https://github.com/SoukSomVang/Bakery-web/actions"
fi

echo ""
