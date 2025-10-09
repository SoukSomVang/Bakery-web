# 🧹 Project Cleanup Plan

## 📋 Files to Remove (Safe to Delete)

### **1. Test & Debug Files (Root Directory)**
```
❌ test-storage-connection.js          # Firebase storage test
❌ test-firebase-connection.js         # Firebase connection test
❌ test-useFirebase.js                 # useFirebase composable test
❌ test-deployment.html                # Deployment test page
❌ deploy.js                           # Old deployment script
❌ deploy.sh                           # Old deployment script
```

### **2. Test Pages (bakery-public/pages/)**
```
❌ test-firebase.vue                   # Firebase test page
❌ firebase-test.vue                   # Firebase test page (duplicate)
❌ test-firestore.vue                  # Firestore test page
❌ debug-data.vue                      # Debug data page
```

### **3. Test Pages (bakery-admin/pages/)**
```
❌ test.vue                            # Simple test page
❌ simple.vue                          # Simple test page
```

### **4. Old Build Artifacts**
```
❌ bakery-public/dist/                 # Old build directory (use .output/)
❌ bakery-admin/dist/                  # Old build directory (use .output/)
❌ bakery-public/bakery-public/        # Duplicate nested directory
```

### **5. Duplicate/Unused Config Files**
```
❌ bakery-public/.firebaserc           # Duplicate (use root .firebaserc)
❌ bakery-public/firebase.json         # Duplicate (use root firebase.json)
❌ shared-configs/firebase-config-new.js  # Old/unused config
```

### **6. Test Deployment Directory**
```
❌ test-deploy/                        # Old test deployment folder
```

### **7. Unused Documentation**
```
❌ DEPLOYMENT_GUIDE.md                 # Replaced by new guides
```

---

## ✅ Files to KEEP (Important!)

### **Essential Configuration:**
```
✅ firebase.json                       # Firebase hosting config
✅ .firebaserc                         # Firebase project config
✅ firestore.rules                     # Firestore security rules
✅ firestore.indexes.json              # Firestore indexes
✅ storage.rules                       # Storage security rules
✅ package.json                        # Root dependencies
```

### **Documentation (New):**
```
✅ CLAUDE.md                           # Project documentation
✅ CLOUDFLARE_SETUP.md                 # Cloudflare guide
✅ CLOUDFLARE_LIMITS.md                # Cloudflare limits info
✅ DEPLOYMENT_STATUS.md                # Deployment status
✅ DEPLOYMENT_SUMMARY.md               # Quick reference
✅ GITHUB_ACTIONS_SETUP.md             # GitHub Actions guide
✅ README.md                           # Project readme
```

### **Shared Configuration:**
```
✅ shared-configs/firebase-config.js   # Current Firebase config
✅ shared-configs/types.ts             # TypeScript types
✅ shared-configs/types.js             # JavaScript types
✅ shared-configs/constants.js         # Constants
```

### **Bakery Public (Keep All):**
```
✅ bakery-public/pages/index.vue       # Home page
✅ bakery-public/pages/manual.vue      # Manual page
✅ bakery-public/pages/about-us.vue    # About page
✅ bakery-public/pages/contact-us/     # Contact pages
✅ bakery-public/pages/products/       # Product pages
✅ bakery-public/composables/          # All composables
✅ bakery-public/layouts/              # All layouts
✅ bakery-public/assets/               # All assets
```

### **Bakery Admin (Keep All Active):**
```
✅ bakery-admin/pages/index.vue        # Dashboard
✅ bakery-admin/pages/bakery-items/    # Bakery items management
✅ bakery-admin/pages/branches/        # Branches management
✅ bakery-admin/composables/           # All composables
✅ bakery-admin/components/            # All components
✅ bakery-admin/stores/                # Pinia stores
```

---

## 📊 Cleanup Summary

**Total files to remove:** ~25 files/directories
**Disk space to free:** ~50-100 MB (mostly old builds)
**Risk level:** 🟢 LOW (only test/debug files)

---

## 🔒 Safety Measures

### **Before Deletion:**
1. ✅ Create Git commit (so you can restore if needed)
2. ✅ Verify current deployments are working
3. ✅ Review each file before deletion

### **After Deletion:**
1. ✅ Test build: `npm run generate` in both apps
2. ✅ Verify deployments still work
3. ✅ Check all pages load correctly

---

## 📁 Proposed New Structure

```
Bakery-web/
├── 📁 bakery-admin/           # Admin dashboard
│   ├── 📁 components/         # Admin components
│   ├── 📁 composables/        # Admin composables
│   ├── 📁 pages/              # Admin pages (cleaned)
│   ├── 📁 stores/             # Pinia stores
│   ├── 📁 assets/             # Admin assets
│   └── 📄 nuxt.config.ts      # Admin config
│
├── 📁 bakery-public/          # Public website
│   ├── 📁 components/         # Public components
│   ├── 📁 composables/        # Public composables
│   ├── 📁 pages/              # Public pages (cleaned)
│   ├── 📁 layouts/            # Page layouts
│   ├── 📁 assets/             # Public assets
│   └── 📄 nuxt.config.ts      # Public config
│
├── 📁 shared-configs/         # Shared configuration
│   ├── 📄 firebase-config.js  # Firebase config
│   ├── 📄 types.ts            # TypeScript types
│   └── 📄 constants.js        # Constants
│
├── 📁 .github/workflows/      # GitHub Actions
│   └── 📄 firebase-hosting.yml
│
├── 📄 firebase.json           # Firebase config
├── 📄 .firebaserc             # Firebase projects
├── 📄 firestore.rules         # Firestore rules
├── 📄 storage.rules           # Storage rules
│
├── 📄 CLAUDE.md               # Main documentation
├── 📄 CLOUDFLARE_SETUP.md     # Cloudflare guide
├── 📄 DEPLOYMENT_STATUS.md    # Deployment info
└── 📄 README.md               # Project readme
```

---

## ⚠️ Review Before Proceeding

**Please confirm you want to:**
- [ ] Remove all test files
- [ ] Remove old build artifacts
- [ ] Remove duplicate config files
- [ ] Clean up old documentation

**After confirmation, I will:**
1. Create a backup commit
2. Carefully remove each file
3. Test builds
4. Verify everything works

---

**Ready to proceed?** Let me know and I'll start the cleanup! 🚀
