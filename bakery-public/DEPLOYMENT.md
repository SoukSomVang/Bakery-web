# Deployment Guide - Bakery House Laos

Quick reference for deploying the bakery-public site to Cloudflare Pages.

## 🚀 Quick Deploy

### Option 1: Using the Deployment Script (Recommended)

```bash
./deploy-cloudflare.sh
```

This script will:
1. Clean previous builds
2. Install dependencies (if needed)
3. Build the production bundle
4. Deploy to Cloudflare Pages

### Option 2: Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy .output/public --project-name=bakery-public --branch=main
```

### Option 3: Using npm script

```bash
npm run deploy:cloudflare
```

## 📋 Prerequisites

- Node.js (v18 or later)
- npm
- Wrangler CLI (installed automatically via npx)
- Cloudflare account with Pages access

## 🔑 Authentication

If you need to authenticate with Cloudflare:

```bash
npx wrangler login
```

## 🌐 Live URLs

After deployment, your site will be available at:

- **Production**: https://bakery-house.org
- **Cloudflare Pages**: https://bakery-public.pages.dev
- **Preview Deployments**: https://[hash].bakery-public.pages.dev

## 📊 SEO Endpoints

- **Sitemap**: https://bakery-house.org/sitemap.xml
- **Robots**: https://bakery-house.org/robots.txt

## 🔍 Verify Deployment

After deployment, check:

1. ✅ Site loads correctly
2. ✅ All pages are accessible
3. ✅ Sitemap is generated properly
4. ✅ Meta tags are correct (use view-source or browser inspector)
5. ✅ Images load correctly
6. ✅ Mobile responsiveness

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .nuxt .output node_modules/.cache
npm install
npm run build
```

### Authentication Issues

```bash
# Re-authenticate
npx wrangler logout
npx wrangler login
```

### Check Deployment Logs

Visit: https://dash.cloudflare.com/[your-account-id]/pages/bakery-public

## 📝 Notes

- The build creates a static site in `.output/public`
- Nuxt is configured for client-side rendering (ssr: false)
- Sitemap is auto-generated during build
- All SEO optimizations are included automatically

## 🔄 CI/CD (Optional)

For automatic deployments via GitHub Actions, ensure:

1. `CLOUDFLARE_API_TOKEN` is set in GitHub Secrets
2. `.github/workflows/cloudflare-pages.yml` is configured
3. Push to `main` branch triggers deployment

## 📞 Support

For deployment issues, check:
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Nuxt Deployment Guide](https://nuxt.com/docs/getting-started/deployment)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
