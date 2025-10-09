# 🚀 Cloudflare Pages Auto-Deployment Setup

## ✅ Current Deployment URLs

- **Public Site:** https://bakery-house-public.pages.dev
- **Admin Site:** https://bakery-house-admin.pages.dev

## 🔗 How to Enable Auto-Deployment

### For bakery-house-public

1. **Go to Cloudflare Dashboard:**
   - Visit: https://dash.cloudflare.com/
   - Click "Workers & Pages" (left sidebar)
   - Click "bakery-house-public"

2. **Connect to GitHub:**
   - Click "Settings" tab
   - Click "Builds & deployments"
   - Click "Connect to Git"
   - Authorize Cloudflare to access GitHub
   - Select repository: `SoukSomVang/Bakery-web`

3. **Build Configuration:**
   ```
   Production branch: main
   Build command: cd bakery-public && npm install && npm run generate
   Build output directory: bakery-public/.output/public
   Root directory: (leave blank)
   Node version: 18
   ```

4. **Save and Deploy** ✅

### For bakery-house-admin

1. **Go to Cloudflare Dashboard:**
   - Visit: https://dash.cloudflare.com/
   - Click "Workers & Pages"
   - Click "bakery-house-admin"

2. **Connect to GitHub:**
   - Click "Settings" tab
   - Click "Builds & deployments"
   - Click "Connect to Git"
   - Select repository: `SoukSomVang/Bakery-web`

3. **Build Configuration:**
   ```
   Production branch: main
   Build command: cd bakery-admin && npm install && npm run generate
   Build output directory: bakery-admin/.output/public
   Root directory: (leave blank)
   Node version: 18
   ```

4. **Save and Deploy** ✅

## 🎯 How It Works After Setup

### Automatic Deployment Flow:

1. You make changes to your code
2. Commit changes: `git commit -m "your message"`
3. Push to main: `git push origin main`
4. **Cloudflare automatically:**
   - Detects the push
   - Runs build command
   - Deploys new version
   - Updates live site (1-2 minutes)

### Example Workflow:

```bash
# Make changes to bakery-public
cd bakery-public
# Edit files...

# Commit and push
git add .
git commit -m "Update product page design"
git push origin main

# ✨ Cloudflare automatically deploys!
# Check deployment status at: https://dash.cloudflare.com/
```

## 📊 Monitoring Deployments

### View Deployment Status:

1. Go to: https://dash.cloudflare.com/
2. Click "Workers & Pages"
3. Click your project name
4. Click "Deployments" tab

You'll see:
- ✅ Deployment status (Success/Failed/In Progress)
- 📝 Build logs
- ⏱️ Build duration
- 🔗 Deployment URL
- 📅 Deployment time

### Build Notifications:

Cloudflare will show:
- Build started
- Build progress
- Build success/failure
- Deployment URL

## 🔧 Advanced Configuration

### Environment Variables:

If you need to add environment variables:

1. Go to project Settings
2. Click "Environment variables"
3. Add variables for:
   - Production
   - Preview (optional)

### Build Settings:

- **Build timeout:** 20 minutes (free tier)
- **Build concurrency:** 1 build at a time (free tier)
- **Deployments:** Unlimited
- **Bandwidth:** Unlimited ✅

## 🌿 Branch Deployments (Optional)

You can also enable preview deployments for other branches:

1. Go to Settings → Builds & deployments
2. Enable "Preview deployments"
3. Every push to any branch creates a preview URL
4. Example: `https://feature-branch.bakery-house-public.pages.dev`

## 🚨 Troubleshooting

### Build Failed:

1. Check build logs in Cloudflare Dashboard
2. Common issues:
   - Wrong build command
   - Missing dependencies
   - Build timeout
   - TypeScript errors

### Fix:

```bash
# Test build locally first
cd bakery-public
npm install
npm run generate

# If successful locally, check Cloudflare build settings
```

### Rollback:

If a deployment breaks your site:

1. Go to Deployments tab
2. Find the last working deployment
3. Click "..." → "Rollback to this deployment"

## 📈 Deployment Limits (Free Tier)

- ✅ **Builds per month:** 500 (you'll use ~20-50)
- ✅ **Bandwidth:** UNLIMITED
- ✅ **Requests:** UNLIMITED
- ✅ **Sites:** 100 projects
- ✅ **Build time:** 20 minutes max

## ✅ Setup Checklist

- [ ] Connect bakery-house-public to GitHub
- [ ] Configure build settings for public site
- [ ] Test automatic deployment for public site
- [ ] Connect bakery-house-admin to GitHub
- [ ] Configure build settings for admin site
- [ ] Test automatic deployment for admin site
- [ ] Verify both sites deploy automatically on push

## 🎉 Success!

Once setup is complete:

- Every `git push` to main = automatic deployment
- No manual deployment needed
- Just like Vercel or Netlify
- Free tier with unlimited bandwidth

---

**Happy deploying! 🚀**

For more info: https://developers.cloudflare.com/pages/
