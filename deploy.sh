#!/bin/bash

# Deployment script for Bakery Web Projects
echo "🚀 Starting deployment of Bakery Web projects..."

# Check if logged in to Firebase
echo "📋 Checking Firebase authentication..."
firebase projects:list

if [ $? -ne 0 ]; then
    echo "❌ Not authenticated with Firebase. Please run 'firebase login' first."
    exit 1
fi

echo "✅ Firebase authentication confirmed"

# Set the project
echo "🎯 Setting Firebase project..."
firebase use bakery-house-f7e32

# Build both applications
echo "🔨 Building public website..."
cd bakery-public
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Public build failed"
    exit 1
fi

# Copy public build to dist
echo "📁 Copying public build to dist folder..."
cp -r .output/public dist

cd ..

echo "🔨 Building admin website..."
cd bakery-admin
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Admin build failed"
    exit 1
fi

# Copy admin build to dist
echo "📁 Copying admin build to dist folder..."
cp -r .output/public dist

cd ..

# Deploy to Firebase Hosting
echo "🚀 Deploying to Firebase Hosting..."
firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo "🎉 Deployment successful!"
    echo ""
    echo "🌐 Your websites are now live:"
    echo "📱 Public Site: https://bakery-public-site.web.app"
    echo "🔧 Admin Panel: https://bakery-admin-panel.web.app"
    echo ""
    echo "You can also check your Firebase console for the exact URLs."
else
    echo "❌ Deployment failed"
    exit 1
fi