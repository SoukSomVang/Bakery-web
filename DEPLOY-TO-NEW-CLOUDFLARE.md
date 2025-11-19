# 🆕 Deploy to Your NEW Cloudflare Account

## Important: Using Your NEW Account

This guide will help you deploy both apps to your **NEW Cloudflare account** (not any old one).

---

## Step 0: Prepare Your New Cloudflare Account

### If you DON'T have a new Cloudflare account yet:

1. Go to: https://dash.cloudflare.com/sign-up
2. Sign up with a **NEW email** (different from any old account)
3. Verify your email
4. Login to: https://dash.cloudflare.com/

### If you ALREADY have a new Cloudflare account:

Make sure you can login at: https://dash.cloudflare.com/

---

## 🚀 Deployment to NEW Account - Three Methods

Choose the method you prefer:

---

## Method 1: Wrangler CLI (Fastest - 5 minutes)

### Step 1: Install Wrangler

```bash
npm install -g wrangler
```

### Step 2: Login to YOUR NEW Cloudflare Account

```bash
wrangler login
```

**IMPORTANT:**
- This will open your browser
- Make sure you're logged into your **NEW Cloudflare account** in the browser
- If you see an old account, logout and login with the NEW account email
- Then authorize Wrangler

### Step 3: Verify You're Using the NEW Account

```bash
wrangler whoami
```

This should show your NEW Cloudflare account email.

### Step 4: Build Your Apps

```bash
cd /Users/souksom/Documents/Web_project/Bakery-web

# Build public app
cd bakery-public
npm run generate

# Build admin app
cd ../bakery-admin
npm run generate
```

### Step 5: Deploy to YOUR NEW Account

```bash
# Deploy public app to NEW account
cd /Users/souksom/Documents/Web_project/Bakery-web/bakery-public
npx wrangler pages deploy .output/public --project-name=bakery-public

# Deploy admin app to NEW account
cd /Users/souksom/Documents/Web_project/Bakery-web/bakery-admin
npx wrangler pages deploy .output/public --project-name=bakery-admin
```

**Done!** You'll get URLs for both apps on your NEW Cloudflare account.

---

## Method 2: Cloudflare Dashboard Upload (No CLI - 10 minutes)

### Step 1: Build Both Apps

```bash
cd /Users/souksom/Documents/Web_project/Bakery-web

# Build public
cd bakery-public
npm run generate
cd ..

# Build admin
cd bakery-admin
npm run generate
cd ..
```

### Step 2: Login to YOUR NEW Cloudflare Account

1. Open: https://dash.cloudflare.com/
2. **Make sure** you're logged into your **NEW account**
   - Check the email shown in top-right corner
   - If wrong account, click logout and login with NEW email

### Step 3: Upload Public App to NEW Account

1. In the NEW account dashboard, click **"Workers & Pages"** (left sidebar)
2. Click **"Create application"**
3. Click **"Pages"** tab
4. Click **"Upload assets"**
5. Enter project name: `bakery-public`
6. Click **"Select from computer"**
7. Navigate to: `/Users/souksom/Documents/Web_project/Bakery-web/bakery-public/.output/public`
8. Select the entire `public` folder
9. Click **"Deploy site"**

You'll get a URL like: `https://bakery-public-xxx.pages.dev`

### Step 4: Upload Admin App to NEW Account

1. Click **"Create application"** again (in same NEW account)
2. Click **"Pages"** → **"Upload assets"**
3. Project name: `bakery-admin`
4. Upload folder: `/Users/souksom/Documents/Web_project/Bakery-web/bakery-admin/.output/public`
5. Click **"Deploy site"**

You'll get a URL like: `https://bakery-admin-xxx.pages.dev`

---

## Method 3: Connect GitHub to NEW Cloudflare Account (Best Long-term)

### Step 1: Push to GitHub

```bash
cd /Users/souksom/Documents/Web_project/Bakery-web

git init
git add .
git commit -m "Deploy to new Cloudflare account"

# Push to your GitHub
git remote add origin https://github.com/YOUR-USERNAME/Bakery-web.git
git push -u origin main
```

### Step 2: Connect GitHub to YOUR NEW Cloudflare Account

1. Login to https://dash.cloudflare.com/ with **NEW account**
2. Click **"Workers & Pages"**
3. Click **"Create application"**
4. Click **"Pages"** → **"Connect to Git"**
5. Click **"GitHub"** and authorize with your GitHub
6. Select your `Bakery-web` repository

### Step 3: Configure Public App Build

- **Project name:** `bakery-public`
- **Production branch:** `main`
- **Build command:** `cd bakery-public && npm install && npm run generate`
- **Build output directory:** `bakery-public/.output/public`

Click **"Save and Deploy"**

### Step 4: Create Another Project for Admin

1. Repeat Step 2-3 but with:
   - **Project name:** `bakery-admin`
   - **Build command:** `cd bakery-admin && npm install && npm run generate`
   - **Build output directory:** `bakery-admin/.output/public`

---

## 🔐 Verify You're Using the NEW Account

Before deploying, double-check:

1. Open: https://dash.cloudflare.com/
2. Look at the **email in top-right corner**
3. Confirm it's your **NEW Cloudflare account email**
4. If not, logout and login with the correct account

---

## 🎯 After Deployment to NEW Account

You should see in your NEW Cloudflare dashboard:
- ✅ `bakery-public` project
- ✅ `bakery-admin` project
- ✅ Both with live URLs

Visit the URLs to test:
- Data loads from Firebase `bakery-house-bf7a5`
- Images display
- Admin login works

---

## 🆘 Troubleshooting

### "I accidentally deployed to old account"

1. Login to: https://dash.cloudflare.com/ with **NEW account**
2. Verify no projects exist yet
3. If projects exist in wrong account:
   - Logout from Cloudflare
   - Clear browser cookies
   - Login to NEW account
   - For Wrangler: `wrangler logout` then `wrangler login` (in NEW account browser)

### "Wrangler is using wrong account"

```bash
# Logout
wrangler logout

# Clear any cached credentials
rm -rf ~/.wrangler

# Login again (make sure NEW account is logged in browser first)
wrangler login

# Verify
wrangler whoami
# Should show your NEW account email
```

---

## 📋 Quick Deployment Checklist

- [ ] Created NEW Cloudflare account OR can login to it
- [ ] Verified NEW account email in dashboard
- [ ] Firestore rules deployed to `bakery-house-bf7a5`
- [ ] Apps tested locally and data loads
- [ ] Apps built successfully (`npm run generate`)
- [ ] Logged into NEW Cloudflare account (dashboard or Wrangler)
- [ ] Deployed public app to NEW account
- [ ] Deployed admin app to NEW account
- [ ] Tested both deployment URLs
- [ ] Data loads from Firebase in deployed apps

---

## 🎉 Success!

Once deployed to your NEW Cloudflare account, you'll have:
- ✅ Public website on NEW account
- ✅ Admin dashboard on NEW account
- ✅ Both connected to NEW Firebase (`bakery-house-bf7a5`)
- ✅ Free hosting with unlimited bandwidth

---

**Ready to deploy? Choose Method 1 or Method 2 above!**

Need help with any step? Let me know!
