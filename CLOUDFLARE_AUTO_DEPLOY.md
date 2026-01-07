# Cloudflare Pages Auto-Deployment Setup

You already have Cloudflare Pages projects set up and a GitHub Actions workflow configured! Choose one of the two methods below to enable auto-deployment.

## 📋 Your Existing Projects

- **bakery-public** → https://bakery-public.pages.dev, https://bakery-house.org
- **bakery-admin** → https://bakery-admin.pages.dev

## ✅ Auto-Deploy Already Configured!

Your repository already has a GitHub Actions workflow (`.github/workflows/cloudflare-pages.yml`) that will automatically deploy both applications when you push to the `main` branch.

**All you need to do is add your Cloudflare API Token to GitHub Secrets!**

---

## 🚀 Quick Start - GitHub Actions Method (RECOMMENDED)

Your workflow is already set up! Just follow these 3 steps:

### Step 1: Create a Cloudflare API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click your profile icon (top right) → **My Profile**
3. Click **API Tokens** tab
4. Click **Create Token**
5. Click **Use template** on **Edit Cloudflare Workers**
6. Under **Account Resources**, select your account: `Bakeryhousebk@gmail.com's Account`
7. Click **Continue to summary** → **Create Token**
8. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Add Token to GitHub Secrets

1. Go to: https://github.com/SoukSomVang/Bakery-web/settings/secrets/actions
2. Click **New repository secret**
3. Name: `CLOUDFLARE_API_TOKEN`
4. Secret: Paste your API token from Step 1
5. Click **Add secret**

### Step 3: Test It!

Push a change to main branch:
```bash
git add .
git commit -m "Enable auto-deploy to Cloudflare"
git push origin main
```

Then watch the magic happen:
- Go to: https://github.com/SoukSomVang/Bakery-web/actions
- You'll see the workflow running!
- Both apps will deploy automatically

**That's it! Future pushes to `main` will auto-deploy.** ✨

---

## 🔗 Alternative Method: Cloudflare Git Integration

This enables automatic deployment when you push to `main`.

### Step 1: Connect bakery-public to GitHub

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Pages** → **bakery-public**
3. Click **Settings** tab
4. Scroll to **Source** section
5. Click **Connect to Git** or **Change source**
6. Authorize Cloudflare to access GitHub
7. Select repository: **SoukSomVang/Bakery-web**
8. Configure build settings:
   - **Production branch:** `main`
   - **Build command:** `cd bakery-public && npm install && npm run generate`
   - **Build output directory:** `bakery-public/.output/public`
   - **Root directory (Path to workspace):** `/` (or leave empty)
9. Click **Save**

### Step 2: Connect bakery-admin to GitHub

1. In Cloudflare Dashboard, go to **Pages** → **bakery-admin**
2. Click **Settings** tab
3. Scroll to **Source** section
4. Click **Connect to Git** or **Change source**
5. Select repository: **SoukSomVang/Bakery-web**
6. Configure build settings:
   - **Production branch:** `main`
   - **Build command:** `cd bakery-admin && npm install && npm run generate`
   - **Build output directory:** `bakery-admin/.output/public`
   - **Root directory (Path to workspace):** `/`
7. Click **Save**

### Step 3: Test Auto-Deployment

```bash
# Make a small change
git add .
git commit -m "test: enable auto-deployment"
git push origin main
```

**Done!** Cloudflare will automatically build and deploy both apps when you push to `main`.

---

## ℹ️ What's Already Set Up

Your `.github/workflows/cloudflare-pages.yml` workflow includes:

- ✅ Triggers on push to `main` branch
- ✅ Deploys both `bakery-public` and `bakery-admin` in parallel
- ✅ Account ID already configured: `6c0574c70269560286ef958f8bcf56d7`
- ✅ Node.js 18 setup with npm caching
- ✅ Full build and deploy pipeline

**Only missing:** The `CLOUDFLARE_API_TOKEN` secret (see Quick Start above)

---

## 📊 Comparison

| Method | Pros | Cons |
|--------|------|------|
| **Cloudflare Git Integration** | ✅ Native, no secrets needed<br>✅ Deploy previews for PRs<br>✅ Fastest setup | ⚠️ Builds on Cloudflare servers |
| **GitHub Actions + Wrangler** | ✅ More control<br>✅ Can run tests first<br>✅ Custom build steps | ⚠️ Needs API token<br>⚠️ Uses GitHub Actions minutes |
| **Manual Wrangler Deploy** | ✅ Full control<br>✅ Deploy when ready | ⚠️ Manual process<br>⚠️ Easy to forget |

---

## 🎯 Recommendation

Since your GitHub Actions workflow is **already configured**, I recommend using the **GitHub Actions method** (Quick Start above). It's:
- ✅ Already set up - just add the API token!
- ✅ More control over build process
- ✅ Can run tests before deployment
- ✅ Custom build steps possible
- ✅ Parallel deployments for faster builds

**Alternative:** If you prefer zero configuration, use Cloudflare Git Integration (no secrets needed, but less control)

---

## 🚀 Next Steps

1. **Connect both projects to GitHub** (follow Step 1 & 2 above)
2. **Push to main** to test automatic deployment
3. **Verify deployments** at:
   - https://bakery-public.pages.dev
   - https://bakery-house.org
   - https://bakery-admin.pages.dev

---

## 🐛 Troubleshooting

### Build Failing on Cloudflare

**Check build logs in Cloudflare Dashboard:**
- Pages → your-project → Deployments → Click on failed deployment

**Common issues:**

1. **Wrong build command:**
   - Make sure it includes `cd bakery-public` or `cd bakery-admin`
   - Example: `cd bakery-public && npm install && npm run generate`

2. **Wrong output directory:**
   - Should be: `bakery-public/.output/public` (not just `.output/public`)

3. **Node version:**
   - Add environment variable: `NODE_VERSION=18`
   - Go to Settings → Environment variables

4. **Missing dependencies:**
   - Cloudflare runs `npm install` in the build command
   - Make sure `package-lock.json` is committed

### Can't Connect to Git

**Error: "This project name is already taken"**
- You may need to delete and recreate the project
- Or use a different project name

**GitHub Authorization Issues:**
- Revoke and re-authorize Cloudflare in GitHub settings
- https://github.com/settings/applications

---

## 📝 Environment Variables (If Needed)

If your apps need environment variables:

1. Go to Cloudflare Dashboard
2. Pages → your-project → **Settings** → **Environment variables**
3. Add variables for:
   - Production
   - Preview (optional)

---

## 🔐 Keep Your Manual Deploy Script

Your `deploy-cloudflare.sh` script is still useful for:
- Manual deployments when needed
- Deploying specific branches
- Local testing before pushing

You can keep both auto and manual deployment options!

---

**Ready to auto-deploy? Follow Steps 1-3 above!** 🚀
