# TokenizeAI Deployment Guide

## Prerequisites

- Node.js 16+ and npm
- Git
- Access to deployment platform (Vercel, Netlify, or AWS)

## Environment Setup

1. Copy environment variables:
```bash
cp .env.example .env
```

2. Configure environment variables:
```env
REACT_APP_API_URL=https://api.tokenizeai.com
REACT_APP_WEBSOCKET_URL=wss://api.tokenizeai.com
REACT_APP_BLOCKCHAIN_NETWORK=ethereum-mainnet
REACT_APP_WALLET_CONNECT_PROJECT_ID=your_project_id
```

## Build Process

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build for production
npm run build
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. Add environment variables in Vercel dashboard

### Option 2: Netlify

1. Connect GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`

3. Add environment variables in Netlify dashboard

### Option 3: AWS S3 + CloudFront

1. Build the application:
```bash
npm run build
```

2. Upload build folder to S3 bucket
3. Configure CloudFront distribution
4. Set up Route 53 for custom domain

## Domain Configuration

1. Purchase domain (recommend: tokenizeai.com)
2. Configure DNS settings
3. Set up SSL certificate
4. Configure redirects (www → non-www)

## Monitoring & Analytics

1. Set up error tracking (Sentry)
2. Configure analytics (Google Analytics)
3. Set up uptime monitoring
4. Configure performance monitoring

## Security Considerations

- Enable HTTPS only
- Configure Content Security Policy
- Set up rate limiting
- Enable CORS properly
- Secure environment variables

## Post-Deployment Checklist

- [ ] Test all chat flows
- [ ] Verify mobile responsiveness
- [ ] Check performance scores
- [ ] Test error handling
- [ ] Verify analytics tracking
- [ ] Test with real users

## Rollback Plan

1. Keep previous build artifacts
2. Use deployment platform rollback features
3. Have database backup strategy
4. Monitor for issues post-deployment
