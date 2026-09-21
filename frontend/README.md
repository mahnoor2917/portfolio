# Usama Asghar & Co — Frontend

Next.js 14 (App Router) + Tailwind CSS frontend for the company website.

## Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Make sure NEXT_PUBLIC_API_URL points to your running backend
npm run dev
```

Visit `http://localhost:3000`.

**Important:** start the `backend` server first (see `../backend/README.md`),
otherwise the Contact and "Become a Distributor" forms will show an error
when submitted.

## Pages

- `/` — Home: hero, brand strip, categories, featured products, mission & vision
- `/about` — Company story, owners, mission, vision, values
- `/products` — All products grouped by category, with 3D tilt cards
- `/distribution` — "Become a Distributor" interest form (saved to MongoDB via backend)
- `/contact` — Contact form + map + phone/email

## Editing product content

All product & category content lives in one file: `lib/data.js`.
Add, edit or remove products and categories there — the site updates automatically.

### Adding a product video
Find the product's video on YouTube, copy the ID from the URL
(the part after `v=`, e.g. `dQw4w9WgXcQ` in
`https://www.youtube.com/watch?v=dQw4w9WgXcQ`), and paste it into that
product's `youtubeId` field in `lib/data.js`. A play button will automatically
appear on that product's card, opening the video in a modal.

### Editing images
Product images live in `public/images/brands/`. Replace a file (keep the same
name) or add a new one and point a product's `image` field at it in `lib/data.js`.

## 3D tilt effect

Product cards use a lightweight mouse-tracking 3D tilt (`components/ProductCard.js`)
— no extra libraries needed, works smoothly on desktop and gracefully on mobile/touch.
