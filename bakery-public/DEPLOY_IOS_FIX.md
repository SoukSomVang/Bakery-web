# iOS Compatibility - Deployment Instructions

## Changes Made (Summary)
1. ✅ Set `ssr: false` in nuxt.config.ts (Client-side only)
2. ✅ Firebase client-side initialization guards
3. ✅ iOS meta tags added
4. ✅ localStorage try-catch blocks
5. ✅ window/document API guards
6. ✅ Security headers added

## DEPLOYMENT STEPS

### Step 1: Build with New Configuration
```bash
cd bakery-public
npm run generate
```

Expected output:
- Build should complete successfully
- Warning about "HTML not prerendered" is NORMAL
- Files in `.output/public/` directory

### Step 2: Deploy to Cloudflare Pages

**Option A: Via Wrangler CLI**
```bash
npm run deploy:cloudflare
```

**Option B: Via Git (Auto-deploy)**
```bash
git add .
git commit -m "Fix iOS compatibility: disable SSR, add client guards"
git push origin main
```

Cloudflare will auto-deploy if connected to Git.

### Step 3: Wait for Deployment
- Check Cloudflare Pages dashboard
- Wait for "Success" status
- Get the deployment URL

### Step 4: Test on iOS

**Test these URLs on iOS Safari:**
1. Homepage: https://bakery-web-5w9.pages.dev/
2. About page: https://bakery-web-5w9.pages.dev/about-us
3. Products: https://bakery-web-5w9.pages.dev/products

**What to check:**
- ✅ Page loads (not blank white screen)
- ✅ Navigation works
- ✅ Images load
- ✅ Firebase data loads (products, branches)
- ✅ Language switcher works
- ✅ Forms work

### Step 5: If Still Not Working

**Debug on iOS:**
1. Connect iPhone to Mac via USB
2. Open Safari on Mac
3. Safari > Develop > [Your iPhone] > bakery-web
4. Check Console tab for errors
5. Send me the error message

**Common Issues:**
- **Blank screen** = JavaScript error (check console)
- **"Cannot connect"** = Not deployed yet or wrong URL
- **Infinite loading** = Firebase initialization issue
- **Works on desktop, not iOS** = Still has SSR code

## Verification Checklist

Before testing on iOS, verify:
- [ ] `ssr: false` in nuxt.config.ts
- [ ] Build completed without errors
- [ ] Deployed to Cloudflare Pages
- [ ] Deployment shows "Success"  
- [ ] Site works on desktop browser
- [ ] Then test on iOS

## Files Changed (Not Committed Yet)

1. `nuxt.config.ts` - ssr: false
2. `shared-configs/firebase-config.js` - client-only guards
3. `composables/useTranslation.js` - localStorage guards
4. `layouts/default.vue` - window/document guards
5. `components/LanguageSwitcher.vue` - event listener guards
6. `pages/gallery/index.vue` - keyboard listener guard
7. `plugins/firebase.client.js` - NEW file
8. `public/_headers` - NEW file
9. `package.json` - Added deploy:cloudflare script

## Need to Know

**Why ssr: false fixes iOS:**
- iOS Safari is strict about SSR mismatches
- Firebase doesn't work during SSR
- Client-only = everything runs in browser
- Cloudflare Pages serves static files
- No server-side execution = no iOS issues

**This is the CORRECT configuration for:**
- Nuxt + Firebase + Static Hosting
- iOS compatibility
- Cloudflare Pages / Netlify / Vercel
