# For Tahura 💌

A beautiful, animated single-page Next.js experience — an apologetic, romantic message for Tahura, ready to deploy on Vercel.

## Features

- 💎 **3D animated heart** — Three.js via `@react-three/fiber` + `@react-three/drei`
- 💖 **Floating heart particles** — lightweight HTML Canvas animation
- 📖 **7-step story flow** — smooth Framer Motion transitions
- 🎵 **YouTube song embed** — "Tujhe Kitna Chahne Lage" by Arijit Singh
- ✍️ **Original Urdu shayari** dedicated to Tahura
- 🎨 **Flirty typography** — Google Fonts: Great Vibes + Lato (loaded via `<link>` tag)
- 📱 **Fully responsive** — mobile and desktop

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm run start
```

## Deploying to Vercel

### Option 1 — Vercel Dashboard

1. Push to GitHub (already done)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the `thedownface/AI-Agents` repo
4. Set **Root Directory** to `for-tahura`
5. Click **Deploy**

### Option 2 — Vercel CLI

```bash
npm i -g vercel
cd for-tahura
vercel --prod
```

The main experience is at the **root route** (`/`).

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework |
| Tailwind CSS v4 | Styling |
| Three.js + @react-three/fiber | 3D heart scene |
| @react-three/drei | Float + MeshDistortMaterial |
| Framer Motion | Page transitions |
| HTML Canvas | Floating heart particles |
| Google Fonts (Great Vibes + Lato) | Typography |
