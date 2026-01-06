# Quick Auto-Deployment Setup (2 Minutes)

I've already configured most of the setup for you! Just follow these 2 simple steps:

## ✅ What's Already Done:

- ✅ GitHub Actions workflow created and configured
- ✅ Your Cloudflare Account ID added to the workflow
- ✅ Wrangler authentication verified
- ✅ Cloudflare Pages projects exist (bakery-public, bakery-admin)

## 🔑 What You Need to Do:

### Step 1: Create a Cloudflare API Token (1 minute)

1. **Click this link:** https://dash.cloudflare.com/profile/api-tokens

2. **Click "Create Token"**

3. **Use the "Edit Cloudflare Workers" template**
   - It already has the right permissions

4. **Click "Continue to summary" → "Create Token"**

5. **Copy the token** (you'll only see it once!)

### Step 2: Add the Token to GitHub (1 minute)

1. **Click this link:** https://github.com/SoukSomVang/Bakery-web/settings/secrets/actions

2. **Click "New repository secret"**

3. **Enter:**
   - **Name:** `CLOUDFLARE_API_TOKEN`
   - **Value:** [paste the token you copied]

4. **Click "Add secret"**

## 🚀 Test It!

```bash
git add .
git commit -m "Enable auto-deployment"
git push origin main
```

Then watch it deploy: https://github.com/SoukSomVang/Bakery-web/actions

## 🎉 That's It!

Every time you push to `main`, both apps will automatically deploy to:
- 🌐 https://bakery-public.pages.dev
- 🌐 https://bakery-house.org
- 🔧 https://bakery-admin.pages.dev

---

## 🆘 Need Help?

Run the automated setup script instead:
```bash
./setup-auto-deploy.sh
```

Or check the detailed guide: `CLOUDFLARE_AUTO_DEPLOY.md`
