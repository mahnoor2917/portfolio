# Usama Asghar & Co — Company Website

A full-stack website for **Usama Asghar & Co**, a Distribution & Retailing
company based in Sama Satta, Punjab, serving as a Wholesale & Supply Store and
Foodservice Distributor since the 1990s.

- **Frontend:** `frontend/` — Next.js 14 + Tailwind CSS
- **Backend:** `backend/` — Node.js + Express + MongoDB (Mongoose)

## Quick Start

**1. Start the backend:**
```bash
cd backend
npm install
cp .env.example .env      # then edit MONGO_URI
npm run dev
```

**2. Start the frontend (in a new terminal):**
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

**3. Open** `http://localhost:3000`

## What's included

- Home page with an animated hero, scrolling brand strip, category grid, and
  featured products with a 3D tilt hover effect
- About page with company history, owners (Malik Asghar & Malik Zafar),
  mission, vision and core values
- Products page — all 16 products across 6 categories (Beverages & Juices,
  Cooking Oil & Banaspati, Detergents & Home Care, Pasta & Kitchen Essentials,
  Spices & Grocery, Dairy & Tea) using your uploaded brand images
- "Become a Distributor" page with a real form that saves submissions to
  MongoDB through the backend API
- Contact page with a form (saved to MongoDB), phone/email, and an embedded
  Google Map
- Video-ready product cards — just paste a YouTube video ID per product in
  `frontend/lib/data.js` and a play button appears automatically

## Admin dashboard

Open `/admin` on your website (e.g. `https://your-site.vercel.app/admin`) and log
in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` set on the backend. You can see
new messages and distributor inquiries, change their status, add private notes,
call or WhatsApp the sender in one tap, download everything as a CSV (opens in
Excel), and watch visits, top pages and devices.

## What to add next

- **Product/brand videos**: paste real YouTube video IDs into `frontend/lib/data.js`
  (see `frontend/README.md` → "Adding a product video")
- **Deployment**: deploy `backend` to a Node host (Railway, Render) and
  `frontend` to Vercel, then point `NEXT_PUBLIC_API_URL` at your live backend URL
- **Precise map pin**: the Contact page currently embeds a general Sama Satta map;
  swap in an embed URL generated from your exact Google Maps listing for a
  pinpoint marker
