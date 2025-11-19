# 🔄 Firebase Cross-Account Migration Checklist

## Overview
Migrating from `bakery-house-f7e32` (Account A) → `bakery-house-bf7a5` (Account B)

---

## ✅ Pre-Migration Checklist

- [ ] Verify new Firebase project `bakery-house-bf7a5` is created
- [ ] Enable required services in new project:
  - [ ] Firestore Database
  - [ ] Authentication (Email/Password)
  - [ ] Cloud Storage
  - [ ] Firebase Hosting
  - [ ] Analytics (optional)
- [ ] Install Google Cloud SDK (for `gsutil` commands)
- [ ] Have access to both Google accounts

---

## 📋 Migration Steps

### PHASE 1: Export from Old Account (Account A)

#### Step 1: Authenticate with Old Account
```bash
# Check current login status
firebase login:list

# Login to old account
firebase login --no-localhost
# Select Account A when prompted

# Verify project
firebase use bakery-house-f7e32
firebase projects:list
```

- [ ] Successfully authenticated with Account A
- [ ] Verified project `bakery-house-f7e32` is accessible

---

#### Step 2: Download Service Account Key (Old Account)

1. Go to: https://console.firebase.google.com/
2. Login with **Account A**
3. Select project: `bakery-house-f7e32`
4. Navigate: **⚙️ Project Settings** > **Service Accounts** tab
5. Click: **Generate New Private Key**
6. Save file as: `migration-scripts/old-account-service-key.json`

- [ ] Service account key downloaded for old account
- [ ] File saved in `migration-scripts/old-account-service-key.json`

---

#### Step 3: Export Firestore Data

```bash
cd migration-scripts
npm install
node export-firestore.js
```

**Expected output:**
```
🚀 Starting Firestore export...
📦 Exporting collection: products
✅ Exported 50 documents from products
📦 Exporting collection: orders
✅ Exported 120 documents from orders
...
✅ Export complete! Total documents: XXX
📁 Data saved to: ./migration-data/firestore/
```

- [ ] Migration scripts dependencies installed
- [ ] Firestore data exported successfully
- [ ] JSON files created in `migration-data/firestore/`

---

#### Step 4: Export Storage Files

```bash
# Create backup directory
mkdir -p migration-data/storage

# Download all storage files
gsutil -m cp -r gs://bakery-house-f7e32.appspot.com/* migration-data/storage/

# Verify download
ls -la migration-data/storage/
```

- [ ] Storage backup directory created
- [ ] All files downloaded from Firebase Storage
- [ ] Verified files are in `migration-data/storage/`

**If `gsutil` not found:**
- macOS: `brew install google-cloud-sdk`
- Windows: Download from https://cloud.google.com/sdk/docs/install

---

#### Step 5: Export Firestore Rules and Indexes

```bash
# Copy current Firestore rules
cp firestore.rules migration-data/firestore.rules.backup

# Copy Firestore indexes (if exists)
cp firestore.indexes.json migration-data/firestore.indexes.json.backup 2>/dev/null || echo "No indexes file"
```

- [ ] Firestore rules backed up
- [ ] Firestore indexes backed up (if exists)

---

#### Step 6: Export Authentication Users (Manual)

1. Go to: https://console.firebase.google.com/project/bakery-house-f7e32/authentication/users
2. Click: **⋮ (three dots menu)** > **Export Users**
3. Save file as: `migration-data/auth-users.csv`

- [ ] Authentication users exported
- [ ] CSV file saved

---

### PHASE 2: Switch to New Account (Account B)

#### Step 7: Logout and Login to New Account

```bash
# Logout from old account
firebase logout

# Login to new account
firebase login --no-localhost
# Select Account B when prompted

# Verify new account
firebase login:list
```

- [ ] Logged out from Account A
- [ ] Successfully logged in to Account B
- [ ] Verified new account is active

---

#### Step 8: Configure New Firebase Project

```bash
# Add new project
firebase use --add
# Select: bakery-house-bf7a5
# Alias: production (or any name)

# Verify project
firebase use bakery-house-bf7a5
firebase projects:list
```

- [ ] New project added to Firebase CLI
- [ ] Project alias configured
- [ ] Verified new project is accessible

---

#### Step 9: Download Service Account Key (New Account)

1. Go to: https://console.firebase.google.com/
2. Login with **Account B**
3. Select project: `bakery-house-bf7a5`
4. Navigate: **⚙️ Project Settings** > **Service Accounts** tab
5. Click: **Generate New Private Key**
6. Save file as: `migration-scripts/new-account-service-key.json`

- [ ] Service account key downloaded for new account
- [ ] File saved in `migration-scripts/new-account-service-key.json`

---

### PHASE 3: Import to New Account

#### Step 10: Import Firestore Data

```bash
cd migration-scripts
node import-firestore.js
```

**Expected output:**
```
🚀 Starting Firestore import...
📥 Importing collection: products
  ✓ Committed 50 documents...
✅ Imported 50 documents to products
...
✅ Import complete! Total documents: XXX
```

- [ ] Firestore data imported successfully
- [ ] All collections imported
- [ ] Verified document counts match

---

#### Step 11: Upload Storage Files

```bash
# Ensure you're using new project
firebase use bakery-house-bf7a5

# Upload all storage files
gsutil -m cp -r migration-data/storage/* gs://bakery-house-bf7a5.firebasestorage.app/

# Verify upload
gsutil ls gs://bakery-house-bf7a5.firebasestorage.app/
```

- [ ] All storage files uploaded
- [ ] Verified files in new Storage bucket

---

#### Step 12: Deploy Firestore Rules

```bash
# Copy rules to project root (if needed)
cp migration-data/firestore.rules.backup firestore.rules

# Deploy rules
firebase deploy --only firestore:rules
```

- [ ] Firestore rules deployed
- [ ] Rules are active in new project

---

#### Step 13: Deploy Firestore Indexes (if exists)

```bash
# Copy indexes (if you have them)
cp migration-data/firestore.indexes.json.backup firestore.indexes.json

# Deploy indexes
firebase deploy --only firestore:indexes
```

- [ ] Firestore indexes deployed (if applicable)

---

#### Step 14: Import Authentication Users

1. Go to: https://console.firebase.google.com/project/bakery-house-bf7a5/authentication/users
2. Enable **Email/Password** sign-in method
3. Click: **⋮ (three dots menu)** > **Import Users**
4. Upload: `migration-data/auth-users.csv`
5. Follow the import wizard

- [ ] Email/Password authentication enabled
- [ ] Users imported successfully
- [ ] Verified user count matches

---

### PHASE 4: Update Application Code

#### Step 15: Update Firebase Configuration

**Option A: Automated (Recommended)**
```bash
cd migration-scripts
chmod +x update-config.sh
./update-config.sh
```

**Option B: Manual**
Update these files with new Firebase config:
- `shared-configs/firebase-config.js`
- `bakery-public/composables/useClientFirebase.js`
- `bakery-admin/composables/useClientFirebase.js`

New config:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDaMUzqQ_HLNI2yrzFAgioucAZ2ipAmXH8",
  authDomain: "bakery-house-bf7a5.firebaseapp.com",
  projectId: "bakery-house-bf7a5",
  storageBucket: "bakery-house-bf7a5.firebasestorage.app",
  messagingSenderId: "433307387606",
  appId: "1:433307387606:web:57a57e0e736885f797ab77",
  measurementId: "G-5X6YLGVP1Z"
}
```

- [ ] Configuration files updated
- [ ] Backup files created (.backup extension)
- [ ] Verified all three files updated

---

#### Step 16: Test Applications Locally

```bash
# Test public app
cd bakery-public
npm run dev

# In another terminal, test admin app
cd bakery-admin
npm run dev
```

**Test checklist:**
- [ ] Public app loads without errors
- [ ] Can view products from Firestore
- [ ] Images load from Storage
- [ ] Admin app loads without errors
- [ ] Can authenticate with admin account
- [ ] Can perform CRUD operations
- [ ] No console errors related to Firebase

---

#### Step 17: Update .firebaserc

```bash
# This should already be updated by 'firebase use' command
# Verify it points to new project
cat .firebaserc
```

Expected content:
```json
{
  "projects": {
    "default": "bakery-house-bf7a5",
    "production": "bakery-house-bf7a5"
  }
}
```

- [ ] .firebaserc updated with new project ID

---

### PHASE 5: Deployment

#### Step 18: Set Up Hosting Targets

```bash
# List existing hosting sites in new project
firebase hosting:sites:list

# Create hosting sites if needed
firebase hosting:sites:create bakeryhouse-shop-bf7a5
firebase hosting:sites:create bakery-admin-bf7a5

# Apply hosting targets
firebase target:apply hosting bakery-public bakeryhouse-shop-bf7a5
firebase target:apply hosting bakery-admin bakery-admin-bf7a5
```

- [ ] Hosting sites created in new project
- [ ] Hosting targets configured

---

#### Step 19: Build Applications

```bash
# Build public app
cd bakery-public
npm run build

# Build admin app
cd ../bakery-admin
npm run build
```

- [ ] Public app built successfully
- [ ] Admin app built successfully
- [ ] No build errors

---

#### Step 20: Deploy to Firebase Hosting

```bash
# Deploy both apps
firebase deploy --only hosting

# Or deploy individually
firebase deploy --only hosting:bakery-public
firebase deploy --only hosting:bakery-admin
```

- [ ] Public app deployed successfully
- [ ] Admin app deployed successfully
- [ ] Deployment URLs received

---

#### Step 21: Test Deployed Applications

Visit deployment URLs and test:

**Public App:**
- [ ] Website loads
- [ ] Products display correctly
- [ ] Images load
- [ ] Navigation works
- [ ] Contact forms work

**Admin App:**
- [ ] Dashboard loads
- [ ] Can login with admin account
- [ ] Can view/edit products
- [ ] Can upload images
- [ ] Can view orders

---

### PHASE 6: Post-Migration

#### Step 22: Update Custom Domain (if applicable)

If you have a custom domain:
1. Go to: Firebase Console > Hosting
2. Add custom domain to new project
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

- [ ] Custom domain added
- [ ] DNS records updated
- [ ] SSL certificate active

---

#### Step 23: Clean Up

```bash
# Remove service account keys (IMPORTANT FOR SECURITY!)
rm migration-scripts/old-account-service-key.json
rm migration-scripts/new-account-service-key.json

# Archive migration data (optional)
tar -czf migration-data-backup-$(date +%Y%m%d).tar.gz migration-data/
mv migration-data-backup-*.tar.gz ~/Documents/Backups/

# Remove migration data from project
rm -rf migration-data/
```

- [ ] Service account keys deleted
- [ ] Migration data archived
- [ ] Project directory cleaned

---

#### Step 24: Monitor New Project

Check for 24-48 hours:
- [ ] No Firebase errors in console
- [ ] Database operations working
- [ ] Storage uploads working
- [ ] Authentication working
- [ ] Analytics tracking (if enabled)

---

## 🎉 Migration Complete!

**Final Verification:**
- [ ] All data migrated successfully
- [ ] Applications working on new project
- [ ] Old project can be decommissioned (keep backup!)
- [ ] Team members notified of migration
- [ ] Documentation updated

---

## 🆘 Troubleshooting

### Common Issues

**Permission Denied Errors:**
- Verify service account keys are correct
- Ensure you have Owner/Editor role in both projects
- Check IAM permissions in Google Cloud Console

**gsutil Not Found:**
- Install Google Cloud SDK
- Run `gcloud init` to authenticate

**Import Failures:**
- Check Firestore data format in JSON files
- Verify project quotas aren't exceeded
- Check for special characters in document IDs

**Authentication Issues:**
```bash
# Clear all Firebase auth
firebase logout
rm -rf ~/.config/firebase

# Re-authenticate
firebase login --no-localhost
```

**Build Errors:**
```bash
# Clear caches
rm -rf node_modules package-lock.json
rm -rf .nuxt .output

# Reinstall
npm install
```

---

## 📞 Support

If you encounter issues:
1. Check Firebase Console for error messages
2. Review Cloud Functions logs (if using)
3. Check browser console for client errors
4. Review this checklist for missed steps

---

**Migration Date:** _______________

**Performed By:** _______________

**Verified By:** _______________
