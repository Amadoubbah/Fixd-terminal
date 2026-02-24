# FIXD — GitHub Deployment Guide

Two deployment paths. GitHub Pages is free and live in ~2 minutes. Vercel adds the AI memo feature.

---

## Option A — GitHub Pages (free, no AI memo)

The dashboard, bond pricing, portfolio risk, and explainability scoring all work with zero setup.
The AI credit memo tab requires a backend proxy — skip it for now or use Option B.

### Step 1 — Edit repo name in vite.config.js

Open `vite.config.js` and change the `base` to match your actual GitHub repo name:

```js
base: '/your-repo-name/',   // e.g. '/fixd-terminal/'
```

### Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/fixd-terminal.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Settings → Pages
3. Source: **GitHub Actions**
4. That's it — the workflow in `.github/workflows/deploy.yml` handles the rest

Your site will be live at: `https://YOUR_USERNAME.github.io/fixd-terminal/`

The first deploy takes ~2 minutes. After that, every `git push` to `main` auto-deploys.

---

## Option B — Vercel (free tier, AI memo enabled)

Vercel runs the `/api/memo.js` proxy so the Anthropic API key stays server-side.

### Step 1 — Push to GitHub (same as above)

### Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

### Step 3 — Add your API key

In Vercel project settings → Environment Variables:

```
ANTHROPIC_API_KEY = sk-ant-...your key here...
```

### Step 4 — Update the base URL

In `vite.config.js`, change:
```js
base: '/',   // Vercel serves from root, not a subpath
```

Then push again — Vercel auto-deploys on every push.

Your site will be live at: `https://fixd-terminal.vercel.app` (or your custom domain)

---

## Local Development

```bash
npm install
npm run dev
```

For local AI memo testing, create a `.env` file:
```
ANTHROPIC_API_KEY=sk-ant-...
```

And run a local proxy server (optional — or just use the Vercel deployment for the AI feature).

---

## What works where

| Feature                    | GitHub Pages | Vercel |
|----------------------------|:---:|:---:|
| Dashboard + heatmap        | ✓   | ✓  |
| Credit scoring + explainability | ✓ | ✓ |
| Bond pricing calculator    | ✓   | ✓  |
| Portfolio risk + scenarios | ✓   | ✓  |
| Sector / rating exposure   | ✓   | ✓  |
| Live Treasury yield curve  | ✓   | ✓  |
| AI credit memo             | ✗   | ✓  |

---

## Sharing with recruiters

Put this URL on your resume next to the FIXD project line:

```
github.com/YOUR_USERNAME/fixd-terminal  ·  Live: fixd-terminal.vercel.app
```

The live link lets them open it immediately. The GitHub link shows the code.
