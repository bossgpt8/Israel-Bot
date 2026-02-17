# Deployment Guide

This project consists of a frontend and a backend. Follow the instructions below to deploy them to Vercel and Railway.

## Deployment to Railway (Backend)

1. **Create a Railway Account:** If you don't have one, sign up at [railway.app](https://railway.app/).
2. **New Project:** Create a new project and select "Deploy from GitHub repo".
3. **Environment Variables:** Add the following environment variables in the Railway dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `SUPABASE_URL`: Your Supabase project URL.
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key.
   - `PORT`: 5000 (or Railway will assign one).
4. **Build Command:** Railway should automatically detect the `package.json` and use `npm install` and `npm start`.

## Deployment to Vercel (Frontend)

1. **Create a Vercel Account:** Sign up at [vercel.com](https://vercel.com/).
2. **New Project:** Import your GitHub repository.
3. **Framework Preset:** Select "Vite".
4. **Environment Variables:**
   - `VITE_API_URL`: The URL of your Railway backend (e.g., `https://your-project.up.railway.app`).
5. **Root Directory:** If your project structure has the frontend in a specific folder (e.g., `client`), set the root directory accordingly.
6. **Deploy:** Click deploy.

## Supabase Setup (Session Storage)

1. **Create a Supabase Project:** Go to [supabase.com](https://supabase.com/).
2. **Storage Bucket:** Create a public storage bucket named `whatsapp-sessions`.
3. **API Keys:** Obtain your `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from the project settings.
