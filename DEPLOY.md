# Deployment Guide

Since you want the API to run effectively "forever" without needing your local computer on, you should deploy it to a cloud provider.

Here are the two easiest free options:

## Option 1: Render (Recommended)
Render is great for Node.js web services. It has a free tier that spins down after inactivity but wakes up when accessed.

1.  **Push your code to GitHub/GitLab**.
    - If you haven't already, create a repo and push this code.
2.  **Sign up for Render** at [render.com](https://render.com).
3.  **Click "New + "** and select **"Web Service"**.
4.  **Connect your repository**.
5.  **Configure**:
    - **Name**: `roblox-username-tools` (or similar)
    - **Runtime**: `Node`
    - **Build Command**: `npm install`
    - **Start Command**: `npm start`
6.  **Click "Create Web Service"**.

Once deployed, Render will give you a public URL (e.g., `https://roblox-username-tools.onrender.com`) that you can use anywhere.

## Option 2: Replit
Since you have a `.replit` file, this project is already set up for Replit.

1.  **Go to Replit** (replit.com) and create a new Repl.
2.  **Import from GitHub** (if you pushed your code) OR verify if you are already in a Replit environment.
3.  **Click Run**. Replit handles the hosting for you.
    - Note: On the free tier, Replit Repls might sleep. You may need "Hacker" plan or "Always On" boosts for true 24/7 uptime without sleep, but standard usage usually wakes it up quickly.

## Option 3: GlueOps / Vercel
- **Vercel** is great but primarily for static sites and serverless. This app uses a long-running Express server. It *can* work on Vercel but Render is a more natural fit for this exact codebase structure.
