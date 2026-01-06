# Auto-Deployment Setup Guide

This guide will help you set up automatic deployment when you push to the `main` branch.

## 🚀 Deployment Options

You have **two deployment workflows** available:

1. **Firebase Hosting** - `.github/workflows/firebase-hosting.yml`
2. **Cloudflare Pages** - `.github/workflows/cloudflare-pages.yml`

Both workflows trigger automatically when you push to the `main` branch.

---

## 📋 Option 1: Firebase Hosting (Current Setup)

### What Gets Deployed
- **Bakery Public** → Firebase Hosting

### Setup Steps

#### 1. Get Firebase Service Account Key

```bash
# Make sure you're logged into Firebase
firebase login

# Generate a service account key
# Go to: https://console.firebase.google.com/project/bakery-house-f7e32/settings/serviceaccounts/adminsdk
# Click "Generate new private key"
# Save the JSON file securely
```

#### 2. Add GitHub Secret

1. Go to your GitHub repository: `https://github.com/SoukSomVang/Bakery-web`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:

   **Name:** `FIREBASE_SERVICE_ACCOUNT`
   **Value:** Paste the entire contents of the service account JSON file

#### 3. Test the Workflow

```bash
git add .
git commit -m "Test auto-deployment"
git push origin main
```

Watch the deployment progress at:
`https://github.com/SoukSomVang/Bakery-web/actions`

---

## 📋 Option 2: Cloudflare Pages (Recommended)

### What Gets Deployed
- **Bakery Public** → Cloudflare Pages
- **Bakery Admin** → Cloudflare Pages

### Setup Steps

#### 1. Get Cloudflare API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click on your profile (top right) → **My Profile** → **API Tokens**
3. Click **Create Token**
4. Use the **"Edit Cloudflare Workers"** template OR create custom token with:
   - **Permissions:**
     - Account → Cloudflare Pages → Edit
   - **Account Resources:**
     - Include → Your Account
5. Click **Continue to summary** → **Create Token**
6. **Copy the token** (you won't see it again!)

#### 2. Get Cloudflare Account ID

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your account
3. Scroll down the right sidebar
4. Copy your **Account ID**

#### 3. Add GitHub Secrets

1. Go to your GitHub repository: `https://github.com/SoukSomVang/Bakery-web`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these two secrets:

   **Secret 1:**
   - **Name:** `CLOUDFLARE_API_TOKEN`
   - **Value:** Your API token from step 1

   **Secret 2:**
   - **Name:** `CLOUDFLARE_ACCOUNT_ID`
   - **Value:** Your Account ID from step 2

#### 4. Create Cloudflare Pages Projects (First-time only)

```bash
# Make sure you're logged into Wrangler
npx wrangler login

# Create the projects (only needed once)
npx wrangler pages project create bakery-public
npx wrangler pages project create bakery-admin
```

#### 5. Test the Workflow

```bash
git add .
git commit -m "Test Cloudflare auto-deployment"
git push origin main
```

Watch the deployment progress at:
`https://github.com/SoukSomVang/Bakery-web/actions`

---

## 🌐 Alternative: Cloudflare Pages Native Git Integration

This is the **easiest method** - no GitHub Actions required!

### Setup Steps

1. **Go to Cloudflare Dashboard**
   - Navigate to: `https://dash.cloudflare.com`
   - Click **Pages** → **Create a project**

2. **Connect to GitHub**
   - Click **Connect to Git**
   - Authorize Cloudflare to access your GitHub
   - Select the repository: `SoukSomVang/Bakery-web`

3. **Configure Bakery Public**
   - **Project name:** `bakery-public`
   - **Production branch:** `main`
   - **Framework preset:** `Nuxt.js`
   - **Build command:** `cd bakery-public && npm install && npm run generate`
   - **Build output directory:** `bakery-public/.output/public`
   - **Root directory:** `/` (leave empty or use root)
   - Click **Save and Deploy**

4. **Configure Bakery Admin** (Repeat)
   - Click **Create a project** again
   - **Project name:** `bakery-admin`
   - **Production branch:** `main`
   - **Framework preset:** `Nuxt.js`
   - **Build command:** `cd bakery-admin && npm install && npm run generate`
   - **Build output directory:** `bakery-admin/.output/public`
   - **Root directory:** `/`
   - Click **Save and Deploy**

5. **Done!**
   - Every push to `main` will automatically trigger a deployment
   - No GitHub Actions needed
   - Cloudflare will build and deploy automatically

---

## 🔍 Checking Deployment Status

### GitHub Actions
- Go to: `https://github.com/SoukSomVang/Bakery-web/actions`
- Click on the latest workflow run to see details

### Cloudflare Pages
- Go to: `https://dash.cloudflare.com` → **Pages**
- Click on your project to see deployment history

### Firebase Hosting
- Go to: `https://console.firebase.google.com/project/bakery-house-f7e32/hosting`
- View deployment history and status

---

## 🐛 Troubleshooting

### GitHub Actions Failing

**Error: "Missing required secret"**
- Make sure you've added all required secrets in GitHub Settings

**Error: "Wrangler authentication failed"**
- Verify your `CLOUDFLARE_API_TOKEN` has the correct permissions
- Check that your `CLOUDFLARE_ACCOUNT_ID` is correct

**Error: "Firebase deployment failed"**
- Verify your `FIREBASE_SERVICE_ACCOUNT` secret is valid JSON
- Check that the service account has the correct permissions

### Build Failures

**TypeScript errors**
```bash
# Check TypeScript compilation locally
cd bakery-public
npx vue-tsc --noEmit
```

**Dependency issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Workflow Comparison

| Feature | Firebase Hosting | Cloudflare Pages (Actions) | Cloudflare Native |
|---------|-----------------|---------------------------|-------------------|
| Setup Complexity | Medium | Medium | Easy |
| Build Time | ~2-3 min | ~2-3 min | ~2-3 min |
| Free Tier | Yes | Yes | Yes |
| Custom Domains | Yes | Yes | Yes |
| SSL | Automatic | Automatic | Automatic |
| Preview Deployments | Limited | Yes | Yes |
| Rollback | Manual | Easy | Easy |

---

## 🎯 Recommended Approach

**For quick setup:** Use **Cloudflare Pages Native Git Integration** (no GitHub Actions needed)

**For more control:** Use **GitHub Actions** with Cloudflare Pages or Firebase Hosting

---

## 📝 Next Steps

After setting up auto-deployment:

1. **Test it:**
   ```bash
   git add .
   git commit -m "feat: update homepage"
   git push origin main
   ```

2. **Monitor the deployment** in GitHub Actions or Cloudflare Dashboard

3. **Verify the live site** after deployment completes

4. **Set up custom domains** (optional)
   - Firebase: https://console.firebase.google.com/project/bakery-house-f7e32/hosting
   - Cloudflare: https://dash.cloudflare.com → Pages → Custom domains

---

## 🔐 Security Best Practices

- ✅ Never commit secrets or API keys to the repository
- ✅ Use GitHub Secrets for sensitive information
- ✅ Rotate API tokens periodically
- ✅ Use minimal permissions for service accounts
- ✅ Review deployment logs regularly

---

**Happy Deploying! 🚀**

For issues, check the [Troubleshooting](#-troubleshooting) section or create an issue in the repository.
