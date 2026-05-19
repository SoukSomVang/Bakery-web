# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Monorepo with two independent Nuxt 4 apps that share a Firestore database:

- **`bakery-public/`** — public-facing site (BakeryHouse, Vientiane, Laos). Read-only Firestore access. SSG output, EN/LO i18n. Deployed to `bakery-public.pages.dev` / `bakery-house.org`.
- **`bakery-admin/`** — internal CRUD dashboard. No auth implemented; relies on Cloudflare Pages obscurity. Deployed to `bakery-admin.pages.dev`.
- **`shared-configs/`** — Firebase config + shared types. NOT a package — files are imported via relative paths (e.g. `../../shared-configs/firebase-config.js`).

Each app has its own `package.json` and `node_modules`. Root `package.json` only orchestrates and holds the `firebase` dep used by Firestore rule deploys.

## Commands

All run from repo root:

```bash
npm run install:all       # install both apps
npm run dev:public        # bakery-public on http://localhost:3000
npm run dev:admin         # bakery-admin on http://localhost:3000 (run separately, change port if needed)
npm run build:public      # nuxt generate → bakery-public/.output/public
npm run build:admin       # nuxt generate → bakery-admin/.output/public
npm run build:all
npm run deploy:firestore  # firebase deploy --only firestore:rules,firestore:indexes
```

There are **no lint, format, or test scripts**. There is no test framework. Type-checking is not wired up; the apps are primarily `.js` with a thin `tsconfig.json` in each.

## Architecture notes

**Firebase init is client-only.** Both apps disable SSR (`ssr: false` in public; admin uses `nuxt generate`) because the Firebase SDK is initialized inside `if (typeof window !== 'undefined')` guards. Server-side code paths get `db = null`. When touching Firebase code, never assume `db` is available on the server.

**Two Firebase init paths exist** — be careful which you use:
- `shared-configs/firebase-config.js` — module-scope singletons (`db`, `auth`, `storage`). Used by `bakery-public/composables/useFirebase.js`.
- `useClientFirebase()` composable (duplicated in each app under `composables/useClientFirebase.js`) — lazy init, used by `bakery-admin/composables/useFirebase.js` and `bakery-public/composables/useProducts.js`.

There's also an unused `shared-configs/firebase-config-new.js` pointing at a **different Firebase project** (`bakery-house-f7e32` vs the active `bakery-house-bf7a5`). Don't import it. The active project ID is in `.firebaserc`.

**Firebase credentials are hardcoded** in `shared-configs/firebase-config.js` and `useClientFirebase.js`. There are no `.env` files. The admin app's `nuxt.config.ts` declares `runtimeConfig` env keys but nothing reads them — the hardcoded config wins.

**Firestore rules are permissive** (`allow read, write: if true` on every admin collection). The `bakeryItems` collection has a `validateBakeryItem` schema check that enforces a specific shape including `storage_methods`, `display_methods`, `can_reheat`/reheat fields, and `temperature_sensitive` — see `firestore.rules` before changing the bakery-item data model.

**Collections in use:** `bakeryItems`, `bakeryTypes`, `branches`, `bakeries`, `news`, `storageData`. The `products`, `categories`, `orders`, `users` collections in the rules file are aspirational and unused by current code.

## i18n (public app only)

Custom translation system in `bakery-public/composables/useTranslation.js` with `locales/en.json` and `locales/lo.json` (Lao). Use `const { t, isLao } = useTranslation()` and `t('key.path')` with dot-notation. Falls back to English if a key is missing. Selected locale persists in localStorage. See `bakery-public/TRANSLATION_GUIDE.md` for the full key inventory. **No i18n in admin.**

## Deployment

Push to `main` → `.github/workflows/cloudflare-pages.yml` builds both apps in parallel and deploys to Cloudflare Pages (account `6c0574c70269560286ef958f8bcf56d7`). Requires `CLOUDFLARE_API_TOKEN` GitHub secret. The `firebase.json` hosting block targets `bakery-public/.output/public` but is **not the live deploy path** — only Firestore rules/indexes are deployed via Firebase.

## Conventions

- Composables are `.js`, not `.ts`. Don't introduce TS in composables unless converting wholesale.
- Page routes follow Nuxt file-based routing. Edit pages in `app/pages/` of each app (note: `bakery-admin/pages/` is at the app root, not under `app/`).
- Pinia is installed in both apps but only `bakery-admin/stores/bakery.js` actually exists.
- Heavy `console.log` instrumentation in Firebase init paths is intentional debugging output — don't strip it without checking it isn't load-bearing for troubleshooting.
