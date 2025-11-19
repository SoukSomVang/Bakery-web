# 🚀 Deploy to Cloudflare Pages - Complete Guide

## Overview

Deploy both your Bakery applications to Cloudflare Pages:
- **Bakery Public** (Customer Website)
- **Bakery Admin** (Admin Dashboard)

---

## Prerequisites

1. ✅ Cloudflare account (new account)
2. ✅ GitHub account (to connect repository)
3. ✅ Both apps use new Firebase project (`bakery-house-bf7a5`)

---

## 🎯 Deployment Methods

### **Method 1: Direct Deploy via Wrangler CLI (Recommended)**

#### Step 1: Install Wrangler

```bash
npm install -g wrangler

# Or use npx (no install needed)
npx wrangler --version
```

#### Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open your browser to authorize Wrangler with your Cloudflare account.

#### Step 3: Build Your Applications

```bash
cd /Users/souksom/Documents/Web_project/Bakery-web

# Build public app
cd bakery-public
npm run generate
# Creates: .output/public/

# Build admin app
cd ../bakery-admin
npm run generate
# Creates: .output/public/
```

#### Step 4: Deploy Public App

```bash
cd /Users/souksom/Documents/Web_project/Bakery-web/bakery-public

# Create and deploy project
npx wrangler pages project create bakery-public

# Deploy the built files
npx wrangler pages deploy .output/public --project-name=bakery-public
```

#### Step 5: Deploy Admin App

```bash
cd /Users/souksom/Documents/Web_project/Bakery-web/bakery-admin

# Create and deploy project
npx wrangler pages project create bakery-admin

# Deploy the built files
npx wrangler pages deploy .output/public --project-name=bakery-admin
```

---

### **Method 2: Deploy via Cloudflare Dashboard (Easier)**

#### Step 1: Build Both Apps Locally

```bash
cd /Users/souksom/Documents/Web_project/Bakery-web

# Build public
cd bakery-public && npm run generate && cd ..

# Build admin
cd bakery-admin && npm run generate && cd ..
```

#### Step 2: Create Cloudflare Pages Projects

1. Go to: https://dash.cloudflare.com/
2. Login with your NEW Cloudflare account
3. Click **"Workers & Pages"** in sidebar
4. Click **"Create application"**
5. Click **"Pages"** tab
6. Click **"Upload assets"**

#### Step 3: Deploy Public App

1. **Project name:** `bakery-public`
2. **Upload folder:** Select `bakery-public/.output/public`
3. Click **"Deploy site"**
4. Note the URL (e.g., `bakery-public.pages.dev`)

#### Step 4: Deploy Admin App

1. Click **"Create application"** again
2. **Project name:** `bakery-admin`
3. **Upload folder:** Select `bakery-admin/.output/public`
4. Click **"Deploy site"**
5. Note the URL (e.g., `bakery-admin.pages.dev`)

---

### **Method 3: Connect to GitHub (Best for CI/CD)**

#### Step 1: Push to GitHub

```bash
cd /Users/souksom/Documents/Web_project/Bakery-web

# Initialize git if not already done
git init
git add .
git commit -m "Prepare for Cloudflare deployment"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR-USERNAME/Bakery-web.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Cloudflare Pages

1. Go to: https://dash.cloudflare.com/
2. Click **"Workers & Pages"** → **"Create application"**
3. Click **"Pages"** → **"Connect to Git"**
4. Select **GitHub** and authorize
5. Select your **Bakery-web** repository

#### Step 3: Configure Build Settings for Public App

**Framework preset:** Nuxt.js

**Build configurations:**
- **Build command:** `cd bakery-public && npm install && npm run generate`
- **Build output directory:** `bakery-public/.output/public`
- **Root directory:** `/`
- **Environment variables:**
  - Add any env vars if needed

Click **"Save and Deploy"**

#### Step 4: Create Another Pages Project for Admin

Repeat Step 2-3 but with:
- **Build command:** `cd bakery-admin && npm install && npm run generate`
- **Build output directory:** `bakery-admin/.output/public`

---

## 🔧 Build Configuration

### Update package.json Scripts

Make sure your root `package.json` has these scripts:

```json
{
  "scripts": {
    "build:public": "cd bakery-public && npm install && npm run generate",
    "build:admin": "cd bakery-admin && npm install && npm run generate"
  }
}
```

---

## 🌐 Custom Domain Setup (Optional)

### Add Custom Domain to Public App

1. Go to your Cloudflare Pages project
2. Click **"Custom domains"**
3. Click **"Set up a custom domain"**
4. Enter your domain (e.g., `www.yourbakery.com`)
5. Follow DNS configuration instructions

### Add Custom Domain to Admin App

Same process but use a subdomain:
- `admin.yourbakery.com`

---

## ⚙️ Environment Variables (If Needed)

If you need to add environment variables:

1. Go to Pages project settings
2. Click **"Environment variables"**
3. Add variables:
   - `NUXT_PUBLIC_FIREBASE_API_KEY` (if needed)
   - Any other public env vars

**Note:** Your Firebase config is already in the code, so no env vars needed unless you want to make it configurable.

---

## 🔄 Automatic Deployments

When connected to GitHub:
- **Every push to `main`** → Automatic deployment
- **Preview deployments** for pull requests
- **Rollback** to previous versions anytime

---

## 📊 Deployment Checklist

### Before Deploying:

- [x] Firestore rules deployed to `bakery-house-bf7a5`
- [x] Firebase config updated in code
- [x] Apps tested locally
- [ ] Apps built successfully (`npm run generate`)
- [ ] Wrangler CLI installed (if using Method 1)
- [ ] Logged into Cloudflare account

### After Deploying:

- [ ] Public app URL works
- [ ] Admin app URL works
- [ ] Data loads from Firebase
- [ ] Images display correctly
- [ ] Admin login works
- [ ] Custom domain configured (optional)

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear caches and rebuild
cd bakery-public
rm -rf node_modules .nuxt .output
npm install
npm run generate
```

### Data Not Loading After Deploy

1. Check Firestore rules are deployed
2. Check browser console for errors
3. Verify Firebase config in deployed files
4. Check CORS settings in Firestore

### 404 Errors on Routes

Make sure you're using:
```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false, // Already set in your config ✅
})
```

---

## 📈 Performance Tips

### Enable Cloudflare Features:

1. **Auto Minify** (HTML, CSS, JS)
2. **Brotli Compression**
3. **HTTP/3**
4. **Early Hints**

Go to: Pages Project → Settings → Functions

---

## 💰 Pricing

Cloudflare Pages Free Tier:
- ✅ 500 builds per month
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ Custom domains
- ✅ SSL certificates

Perfect for your bakery apps! 🎉

---

## 🚀 Quick Deploy Commands

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Build both apps
cd bakery-public && npm run generate && cd ..
cd bakery-admin && npm run generate && cd ..

# Deploy public
cd bakery-public
npx wrangler pages deploy .output/public --project-name=bakery-public

# Deploy admin
cd ../bakery-admin
npx wrangler pages deploy .output/public --project-name=bakery-admin
```

---

## 📝 Next Steps

1. Choose deployment method above
2. Build your applications
3. Deploy to Cloudflare Pages
4. Test deployed URLs
5. Configure custom domain (optional)
6. Set up automatic deployments via GitHub

---

**Ready to deploy? Follow Method 1 or Method 2 above!** 🚀
