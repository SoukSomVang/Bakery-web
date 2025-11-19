# 🔥 Firebase Project Configuration

## Current Project

**Project ID:** `bakery-house-bf7a5`
**Project Name:** Bakery house
**Status:** ✅ Active and configured

---

## 📊 Project Data

### Firestore Database
**Collections:** 4
**Total Documents:** 20

- `bakeryItems`: 11 documents
- `bakeryTypes`: 2 documents
- `branches`: 4 documents
- `news`: 3 documents

**Console:** https://console.firebase.google.com/project/bakery-house-bf7a5/firestore/data

---

## ⚙️ Configuration Files

### Firebase Config (Code)
All applications are configured to use the new project:

- ✅ `shared-configs/firebase-config.js`
- ✅ `bakery-public/composables/useClientFirebase.js`
- ✅ `bakery-admin/composables/useClientFirebase.js`

### Project Config
- `.firebaserc` - Points to `bakery-house-bf7a5`
- `firebase.json` - Hosting and rules configuration
- `firestore.rules` - Security rules (deploy needed)
- `storage.rules` - Storage security rules (deploy needed)

---

## 🚀 Quick Start

### Run Locally

**Public Website:**
```bash
cd bakery-public
npm run dev
# Opens on http://localhost:3000
```

**Admin Dashboard:**
```bash
cd bakery-admin
npm run dev
# Opens on http://localhost:3000
```

### Deploy

```bash
# Build both apps
npm run build:public
npm run build:admin

# Deploy (requires Firebase CLI login)
firebase deploy --only hosting
```

---

## 🔐 Security Rules (Manual Deployment Needed)

### Firestore Rules
**File:** `firestore.rules`
**Deploy via Console:** https://console.firebase.google.com/project/bakery-house-bf7a5/firestore/rules

### Storage Rules
**File:** `storage.rules`
**Deploy via Console:** https://console.firebase.google.com/project/bakery-house-bf7a5/storage/rules

---

## 📞 Firebase Console Links

- **Dashboard:** https://console.firebase.google.com/project/bakery-house-bf7a5
- **Firestore:** https://console.firebase.google.com/project/bakery-house-bf7a5/firestore
- **Authentication:** https://console.firebase.google.com/project/bakery-house-bf7a5/authentication
- **Storage:** https://console.firebase.google.com/project/bakery-house-bf7a5/storage
- **Hosting:** https://console.firebase.google.com/project/bakery-house-bf7a5/hosting

---

## ✅ Setup Status

- [x] Firebase project configured
- [x] Code updated to new project
- [x] Data migrated (20 documents)
- [ ] Firestore rules deployed
- [ ] Storage rules deployed
- [ ] Authentication configured
- [ ] Applications tested locally
- [ ] Deployed to hosting

---

**Last Updated:** November 19, 2025
**Migration:** From `bakery-house-f7e32` to `bakery-house-bf7a5`
