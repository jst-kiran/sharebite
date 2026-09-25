# ShareBite - Deployment Guide

This guide covers deploying the **ShareBite** project to **Vercel** and configuring backend services.

---

## 1. Prerequisites & Preparation

1. **GitHub Repository**: Ensure the project is pushed to a private GitHub repository (`sharebite`).
2. **Environment Variables**:
   - Never commit sensitive `.env` files. Set environment variables directly in the Vercel dashboard.

---

## 2. Deploying Frontend to Vercel

### Option A: Via Vercel Web Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." -> "Project"**.
2. Import your GitHub repository: **`sharebite`**.
3. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables (in **Environment Variables** tab):
   - `VITE_API_BASE_URL`: `https://your-backend-url.com/api` (or relative path if using proxy/serverless)
5. Click **Deploy**.

---

## 3. Deploying Backend (Python Flask)

### Option A: Render / Railway / Fly.io (Recommended for Flask)

1. Connect your GitHub repository to [Render.com](https://render.com) or [Railway.app](https://railway.app).
2. Set Root Directory: `backend`
3. Set Start Command: `gunicorn app:app` (or `python app.py`)
4. Set Environment Variables:
   - `USE_MOCK_DATA`: `true` or `false`
   - `SUPABASE_URL`: `<your-supabase-url>`
   - `SUPABASE_SERVICE_KEY`: `<your-supabase-service-key>`
   - `GEMINI_API_KEY`: `<your-gemini-api-key>`

### Option B: Vercel Serverless Functions

If hosting the backend on Vercel as serverless Python functions:
- Configure `api/index.py` wrapping the Flask `app`.

---

## 4. Post-Deployment Checklist

- [ ] Verify CORS settings in `backend/app.py` allow your production Vercel frontend URL.
- [ ] Test Donor, NGO, and Admin login flows.
- [ ] Verify image uploads and AI food freshness analysis features.
