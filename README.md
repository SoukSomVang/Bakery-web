# 🧁 Bakery Web

A comprehensive Nuxt3 monorepo solution for bakery businesses, featuring a customer-facing website and administrative management system.

## 🚀 Quick Start

```bash
# Install dependencies
npm run install:all

# Development
npm run dev:public   # Start public site on http://localhost:3000
npm run dev:admin    # Start admin panel on http://localhost:3001

# Build
npm run build:all    # Build both applications
```

## 📦 Project Structure

- **bakery-public/** - Customer-facing website
- **bakery-admin/** - Administrative dashboard
- **shared-configs/** - Shared configurations and Firebase setup

## 🌐 Deployment

This project uses **Cloudflare Pages** for hosting with automatic deployment:
- Push to `main` branch triggers auto-deploy via GitHub Actions
- **Public Site**: https://bakery-public.pages.dev
- **Admin Panel**: https://bakery-admin.pages.dev

Firebase Firestore is used for database and storage.

## 📚 Documentation

- **CLAUDE.md** - Comprehensive project documentation
- **CLOUDFLARE_AUTO_DEPLOY.md** - Auto-deployment setup guide
- **AUTO_DEPLOY_ENABLED.md** - Current deployment configuration

## 🛠 Tech Stack

- Nuxt3 + Vue 3 + TypeScript
- Firebase Firestore (Database)
- Cloudflare Pages (Hosting)
- Tailwind CSS
- Pinia (State Management)