# Cloudflare Pages Auto-Deployment Setup with Wrangler

You already have Cloudflare Pages projects set up! Now let's enable auto-deployment with Git integration.

## 📋 Your Existing Projects

- **bakery-public** → bakery-public.pages.dev, bakery-house.org
- **bakery-admin** → bakery-admin.pages.dev

## 🔗 Connect to GitHub (Recommended - Easiest Method)

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

## 🔄 Alternative: Use Wrangler CLI with GitHub Actions

If you prefer to keep using the manual Wrangler deploy command but automate it with GitHub Actions, the workflow I created earlier (`.github/workflows/cloudflare-pages.yml`) will work perfectly.

### You'll need to add these GitHub Secrets:

1. **Get Cloudflare API Token:**
   ```bash
   # Or create one at: https://dash.cloudflare.com/profile/api-tokens
   # Permissions needed: Account > Cloudflare Pages > Edit
   ```

2. **Get Account ID:**
   ```bash
   # Find it in Cloudflare Dashboard sidebar
   # Or run:
   npx wrangler whoami
   ```

3. **Add to GitHub:**
   - Go to: https://github.com/SoukSomVang/Bakery-web/settings/secrets/actions
   - Add `CLOUDFLARE_API_TOKEN`
   - Add `CLOUDFLARE_ACCOUNT_ID`

Then every push to `main` will trigger the GitHub Action which runs Wrangler to deploy.

---

## 📊 Comparison

| Method | Pros | Cons |
|--------|------|------|
| **Cloudflare Git Integration** | ✅ Native, no secrets needed<br>✅ Deploy previews for PRs<br>✅ Fastest setup | ⚠️ Builds on Cloudflare servers |
| **GitHub Actions + Wrangler** | ✅ More control<br>✅ Can run tests first<br>✅ Custom build steps | ⚠️ Needs API token<br>⚠️ Uses GitHub Actions minutes |
| **Manual Wrangler Deploy** | ✅ Full control<br>✅ Deploy when ready | ⚠️ Manual process<br>⚠️ Easy to forget |

---

## 🎯 Recommended: Cloudflare Git Integration

For your use case, I recommend **connecting directly to GitHub** in Cloudflare Dashboard. It's:
- Simpler (no GitHub secrets needed)
- Automatic (deploy on every push)
- Includes preview deployments for pull requests
- Free (unlimited builds on Cloudflare's free plan)

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
