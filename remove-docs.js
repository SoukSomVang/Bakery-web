const fs = require('fs');
const path = require('path');

const filesToRemove = [
  'CLOUDFLARE_AUTO_DEPLOY.md',
  'CLOUDFLARE_LIMITS.md',
  'CLOUDFLARE_SETUP.md',
  'DEPLOYMENT_SUMMARY.md',
  'GITHUB_ACTIONS_SETUP.md',
  'NEWS_GUIDE.md',
  'CLOUDFLARE_SAFARI_FIX.md',
  'FREE_DOMAIN_SETUP.md',
  'MIGRATION-CHECKLIST.md',
  'ENABLE-FIRESTORE.md',
  'MIGRATION-COMPLETE.md',
  'FIREBASE-PROJECT.md',
  'cleanup.sh'
];

const baseDir = '/Users/souksom/Documents/Web_project/Bakery-web';

filesToRemove.forEach(file => {
  const filePath = path.join(baseDir, file);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ Removed: ${file}`);
    }
  } catch (err) {
    console.log(`⚠️  Could not remove: ${file}`);
  }
});

console.log('\n✅ Cleanup complete!');
