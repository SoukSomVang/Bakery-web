#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const runCommand = (command, cwd = process.cwd()) => {
  console.log(`\n🔥 Running: ${command}`);
  console.log(`📂 In: ${cwd}\n`);
  
  try {
    execSync(command, { 
      stdio: 'inherit', 
      cwd,
      shell: true 
    });
  } catch (error) {
    console.error(`❌ Error running command: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
};

const deployApp = async (appName) => {
  const appPath = path.join(process.cwd(), appName);
  
  console.log(`\n🚀 Deploying ${appName}...`);
  console.log('=' .repeat(50));
  
  // Install dependencies
  console.log(`📦 Installing dependencies for ${appName}...`);
  runCommand('npm install', appPath);
  
  // Build the app
  console.log(`🔨 Building ${appName}...`);
  runCommand('npm run generate', appPath);
  
  console.log(`✅ ${appName} built successfully!`);
};

const deployBoth = async () => {
  try {
    console.log('🎯 Starting deployment of both applications...\n');
    
    // Deploy bakery-public
    await deployApp('bakery-public');
    
    // Deploy bakery-admin  
    await deployApp('bakery-admin');
    
    // Deploy to Firebase
    console.log('\n🔥 Deploying to Firebase...');
    console.log('=' .repeat(50));
    runCommand('firebase deploy --only hosting');
    
    console.log('\n🎉 Deployment completed successfully!');
    console.log('\n📱 Your applications are now live:');
    console.log('🌐 Public Site: https://bakery-public-site.web.app');
    console.log('⚙️  Admin Panel: https://bakery-admin-panel.web.app');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
};

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--public')) {
  deployApp('bakery-public').then(() => {
    console.log('\n🎉 Public site deployment completed!');
  });
} else if (args.includes('--admin')) {
  deployApp('bakery-admin').then(() => {
    console.log('\n🎉 Admin panel deployment completed!');
  });
} else {
  deployBoth();
}