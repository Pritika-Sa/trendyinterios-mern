# Vercel Deployment Guide for Trendyinterios MERN

This guide explains how to deploy your MERN application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your project to GitHub (or GitLab/Bitbucket)
3. **MongoDB Atlas**: Set up your MongoDB instance and get connection string
4. **Environment Variables**: Gather all required secrets

## Step 1: Prepare Your Project

### 1.1 Create Environment Files

Create `.env.local` files in both server and client directories:

**server/.env.local**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trendyinterios?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-here
NODE_ENV=production
CLIENT_ORIGIN=https://your-domain.vercel.app
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
GROQ_API_KEY=your-groq-api-key
```

**client/.env.local**
```
REACT_APP_API_URL=https://your-domain.vercel.app
REACT_APP_GOOGLE_AI_KEY=your-google-ai-key
```

### 1.2 Push to GitHub

```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended for Beginners)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. **Root Directory**: Leave as root (or select your repo root)
5. **Framework**: Select "Create React App"
6. **Build Command**: `cd client && npm run build`
7. **Output Directory**: `./client/build`
8. **Install Command**: `npm install && cd server && npm install`

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Step 3: Configure Environment Variables in Vercel

### 3.1 Dashboard Method

1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add each variable:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_ORIGIN` (set to your Vercel deployment URL)
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `GROQ_API_KEY`
   - `NODE_ENV=production`

### 3.2 Via vercel.json

Update `CLIENT_ORIGIN` in vercel.json to match your deployment URL:

```json
"env": {
  "CLIENT_ORIGIN": {
    "production": "https://your-project.vercel.app"
  }
}
```

## Step 4: Configure API Routing

The `vercel.json` file already handles routing:
- Requests to `/api/*` are routed to your Express server
- All other requests serve from the React build directory

## Step 5: Verify Deployment

1. **Health Check**: Visit `https://your-domain.vercel.app/api/health`
   - Should return: `{"success": true, "message": "Server is running"}`

2. **React App**: Visit `https://your-domain.vercel.app`
   - Should load your React application

## Troubleshooting

### 502 Bad Gateway Error
- Check if all environment variables are set
- Verify MongoDB connection string is correct
- Check build logs in Vercel dashboard

### API Not Found (404)
- Ensure routes are under `/api/` path
- Check `vercel.json` rewrites configuration
- Verify Express routes are correctly defined

### Build Failure
- Check build logs: Settings → Deployments → select deployment → Logs
- Ensure `npm install` runs in both root and client directories
- Verify all dependencies in package.json are correct

### Environment Variables Not Working
- Rebuild: Settings → Deployments → select deployment → ... → Redeploy
- Check that variables are set for correct environment (Production/Preview)
- Ensure variable names match exactly

## Post-Deployment

### 1. Update Client API URL

In `client/src/socketClient.js` and anywhere you fetch from API:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

### 2. Update CORS Origin

The server already uses `process.env.CLIENT_ORIGIN` for CORS, which will be set in Vercel environment variables.

### 3. Monitor Logs

View real-time logs:
```bash
vercel logs --follow
```

## Performance Optimization

### 1. Reduce Bundle Size
```bash
cd client
npm run build
# Check build size
npm install -g serve
serve -s build
```

### 2. Database Optimization
- Create MongoDB indexes for frequently queried fields
- Use pagination for large datasets

## Additional Configuration

### Custom Domain
1. Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Update DNS records (follow Vercel's instructions)
4. Update `CLIENT_ORIGIN` to your custom domain

### Caching Headers
Add to `vercel.json`:
```json
"headers": [
  {
    "source": "/api/(.*)",
    "headers": [
      { "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }
    ]
  }
]
```

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel MongoDB Integration](https://vercel.com/docs/integrations/mongodb)
- [Express on Vercel Guide](https://vercel.com/guides/using-express-with-vercel)
