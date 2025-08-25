# VanMaps 2.0 — Next.js + Sanity v3 Starter (v2 FULL)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME)

Mobile-first rebuild for **vanmaps.net**, dropping Gatsby and targeting **Next.js 14 (App Router) + React 18 + TypeScript**.

## ✨ Features

- **Next.js 14 App Router** with React 18 + TypeScript
- **Sanity v3 Studio** mounted at `/studio`
- **Mobile-first UI** (TailwindCSS + Typography)
- **Search**: serverless API with GROQ queries
- **Browse page**: initial server-rendered list + live search
- **Location detail pages** with Google/Apple Maps links, radio channel, additional info, and sharing
- **Custom 404** page (“Lost the route”)
- **SEO** via Next.js `metadata` and `generateMetadata`
- **Contact → Thanks** flow using Netlify Forms
- **Info page** with usage and safety tips
- **Netlify ready** (`@netlify/plugin-nextjs`)

---

## 🚀 Quickstart

```bash
npm install
cp .env.local.example .env.local
# Fill in SANITY project values + tokens
npm run dev
```

- App: http://localhost:3000  
- Studio: http://localhost:3000/studio

---

## 🔧 Environment Variables

Copy `.env.local.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=hu0ksp6y
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
SANITY_WEBHOOK_SECRET=your_secret_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 📦 Sanity Schema

The schema is included at:

```
schemas/completeLocationSchema.js
```

It defines `name`, `slug`, `radioChannel`, `additionalInfo`, `googleMapsUrl`, `appleMapsUrl`, `coordinates`, and `image`.

To modify, edit this file and restart the dev server.

---

## 🔍 Search API

Implemented at:

```
app/api/search/route.ts
```

Searches across `name` and `additionalInfo` fields.  
Results power the `/browse` page with live search.

---

## 🔔 Sanity → Next.js Webhook Setup

To make sure updates in Sanity show up instantly (without waiting for ISR):

1. **Add a secret**  
   - In Netlify → Site settings → Environment variables:  
     ```
     SANITY_WEBHOOK_SECRET=YOUR_LONG_RANDOM_SECRET
     ```
   - Use the same value in the webhook header below.

2. **Sanity webhook**  
   - Go to [sanity.io/manage](https://sanity.io/manage) → your project → API → Webhooks → Create webhook.  
   - **URL:**  
     ```
     https://vanmaps.net/api/revalidate
     ```
     (for local dev, use ngrok: `https://<id>.ngrok.io/api/revalidate`)  
   - **Method:** `POST`  
   - **Headers:**  
     ```
     x-sanity-secret: YOUR_LONG_RANDOM_SECRET
     ```
   - **Trigger:** on **Create, Update, Delete, Publish, Unpublish**  
   - **Filter:**  
     ```
     _type == "location"
     ```
   - **Projection:**  
     ```groq
     {
       _type,
       "slug": slug.current,
       operation
     }
     ```
   - Disable drafts.

3. **How it works**  
   - When you publish a `location` doc, Sanity calls `/api/revalidate`.  
   - Next.js revalidates `/browse` and the affected location detail page.  
   - Visitors see the update instantly.

---

## 🌐 Deployment

- Deploy to **Netlify** (recommended)
- Uses `@netlify/plugin-nextjs` for serverless functions and ISR
- Netlify detects and parses the Contact form automatically

---

## 🗺️ Pages

- `/` — Home
- `/browse` — Location list + search
- `/locations/[slug]` — Detail pages with maps + info
- `/info` — Info page with usage/safety notes
- `/contact` — Netlify form
- `/thanks` — Form confirmation
- `/studio` — Sanity Studio
- `/404` → `app/not-found.tsx` — Custom 404

---

## ⚙️ Dev Notes

- TailwindCSS is preconfigured with custom colors and typography
- Images are optimized with Next Image and Sanity CDN
- Data fetching uses `next-sanity` + GROQ
- ISR is bypassed in favor of **webhook-triggered revalidation**

---

© VanMaps
