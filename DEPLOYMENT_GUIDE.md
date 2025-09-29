# 🚀 Firebase Deployment Guide

## Current Status ✅
- [x] Public website built successfully
- [x] Admin website built successfully
- [x] Firebase configuration updated for multi-site hosting
- [x] Build files copied to correct directories

## Ready for Deployment! 🎯

Since you're already logged in to Firebase, run these commands in your terminal:

### Option 1: Use the Deployment Script (Recommended)
```bash
cd /Users/souksom/Documents/Web_project/Bakery-web
./deploy.sh
```

### Option 2: Manual Steps
If the script doesn't work, run these commands one by one:

```bash
# 1. Navigate to project directory
cd /Users/souksom/Documents/Web_project/Bakery-web

# 2. Verify Firebase authentication
firebase projects:list

# 3. Set the correct project
firebase use bakery-house-f7e32

# 4. Deploy both sites to Firebase hosting
firebase deploy --only hosting
```

### Option 3: Deploy Sites Individually
```bash
# Deploy only the public site
firebase deploy --only hosting:bakery-public

# Deploy only the admin site
firebase deploy --only hosting:bakery-admin
```

## Expected Results 🌐

After successful deployment, your sites will be available at:

- **Public Website**: `https://bakery-public-site.web.app`
- **Admin Panel**: `https://bakery-admin-panel.web.app`

*(Exact URLs will be shown in the Firebase deploy output)*

## Troubleshooting 🔧

If you encounter any issues:

1. **Authentication Error**: Run `firebase login` again
2. **Project Error**: Run `firebase use --add` and select your project
3. **Build Errors**: The builds are already completed and ready
4. **Permission Error**: Make sure you have deploy permissions for the Firebase project

## What Was Configured 📋

- ✅ Firebase hosting targets set up for both sites
- ✅ `firebase.json` configured for multi-site hosting
- ✅ Build files prepared in correct directories:
  - `bakery-public/dist/` (public website)
  - `bakery-admin/dist/` (admin panel)
- ✅ Proper rewrites configured for SPA routing

## Next Steps After Deployment 🎉

1. Test both websites thoroughly
2. Set up custom domains (optional)
3. Configure Firebase hosting headers (optional)
4. Set up automated CI/CD (optional)

Run the deployment and let me know the results!