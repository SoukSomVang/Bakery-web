# 🚀 GitHub Actions Auto-Deployment Setup

This guide will help you set up automatic deployment to Firebase Hosting whenever you push code to GitHub (like Vercel).

## 📋 Prerequisites

- GitHub repository: https://github.com/SoukSomVang/Bakery-web.git
- Firebase project: bakery-house-f7e32
- Firebase CLI installed

## 🔧 Step-by-Step Setup

### Step 1: Create Firebase Service Account

1. **Go to Firebase Console:**
   ```
   https://console.firebase.google.com/project/bakery-house-f7e32/settings/serviceaccounts/adminsdk
   ```

2. **Generate New Private Key:**
   - Click on "Service accounts" tab
   - Click "Generate new private key"
   - Click "Generate key" to download JSON file
   - **IMPORTANT:** Keep this file secure, never commit it to Git!

### Step 2: Add Secret to GitHub

1. **Go to your GitHub repository:**
   ```
   https://github.com/SoukSomVang/Bakery-web/settings/secrets/actions
   ```

2. **Create New Repository Secret:**
   - Click "New repository secret"
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: Copy and paste the **ENTIRE CONTENTS** of the JSON file you downloaded
   - Click "Add secret"

### Step 3: Push the GitHub Actions Workflow

The workflow file has already been created at `.github/workflows/firebase-hosting.yml`

Now push it to GitHub:

```bash
cd /Users/souksom/Documents/Web_project/Bakery-web
git add .github/workflows/firebase-hosting.yml
git add firebase.json
git commit -m "Add GitHub Actions auto-deployment"
git push origin main
```

### Step 4: Verify Auto-Deployment

1. **Go to GitHub Actions tab:**
   ```
   https://github.com/SoukSomVang/Bakery-web/actions
   ```

2. **Check Workflow Run:**
   - You should see "Deploy to Firebase Hosting on Push" workflow running
   - Click on it to see deployment progress
   - Wait for it to complete (usually 2-5 minutes)

3. **Your site will be live at:**
   ```
   https://bakery-house-f7e32.web.app
   ```

## ✅ How It Works (Just Like Vercel!)

Once set up, **every time you push to GitHub**, the workflow will:

1. ✅ Checkout your code
2. ✅ Install Node.js and dependencies
3. ✅ Build your Nuxt3 app (`npm run generate`)
4. ✅ Deploy to Firebase Hosting automatically

## 🔄 Making Updates (Simple Workflow)

```bash
# 1. Make your code changes
# Edit any file in bakery-public/

# 2. Commit and push
git add .
git commit -m "Update: your changes"
git push origin main

# 3. That's it! GitHub Actions will automatically:
#    - Build your app
#    - Deploy to Firebase
#    - Your site updates in 2-5 minutes!
```

## 🎯 Current Deployment URL

**Live Site:** https://bakery-house-f7e32.web.app

This is your main production URL that will update automatically with every push!

## 📝 Workflow File Explanation

The workflow (`.github/workflows/firebase-hosting.yml`) does:

```yaml
on:
  push:
    branches:
      - main  # Triggers on push to main branch
  workflow_dispatch:  # Allows manual trigger from GitHub UI
```

- **Automatic**: Runs on every push to `main` branch
- **Manual**: Can also trigger manually from GitHub Actions tab

## 🐛 Troubleshooting

### If Deployment Fails:

1. **Check GitHub Actions logs:**
   - Go to Actions tab
   - Click on failed workflow
   - Read error messages

2. **Common Issues:**
   - Missing `FIREBASE_SERVICE_ACCOUNT` secret
   - Build errors in Nuxt app
   - Firebase permissions

### If Site Doesn't Update:

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Wait 5 minutes** for CDN propagation
3. **Hard refresh** (Ctrl+F5 or Cmd+Shift+R)

## 📊 Monitoring Deployments

View all deployments:
```bash
firebase hosting:channel:list
```

Check deployment status in GitHub:
```
https://github.com/SoukSomVang/Bakery-web/deployments
```

## 🎉 Success!

Once configured, your workflow is:

1. **Write Code** → `git push` → **Automatic Deployment** → **Live Site Updated!**

Just like Vercel, but with Firebase Hosting! 🚀

---

**Need Help?** Check the logs in GitHub Actions or Firebase Console.
