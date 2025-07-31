#!/bin/bash

echo "🚀 Deploying TokenizeAI..."

# Check if we're on main branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
  echo "❌ Error: Must be on main branch to deploy"
  exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Error: Uncommitted changes found. Please commit all changes before deploying."
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run tests
echo "🧪 Running tests..."
npm test -- --coverage --watchAll=false

if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Deployment aborted."
  exit 1
fi

# Build the application
echo "🏗️ Building application..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Deployment aborted."
  exit 1
fi

# Deploy to production (customize based on your deployment method)
echo "🌐 Deploying to production..."

# Option 1: Deploy to Vercel
# vercel --prod

# Option 2: Deploy to Netlify
# netlify deploy --prod --dir=build

# Option 3: Deploy to AWS S3
# aws s3 sync build/ s3://your-bucket-name --delete

echo "✅ Deployment completed successfully!"
echo "🔗 Your app is now live at: https://tokenizeai.com"
