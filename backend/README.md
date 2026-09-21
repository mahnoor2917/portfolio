# Usama Asghar & Co — Backend API

Node.js + Express + MongoDB (Mongoose). It receives the website's contact and
distributor forms, counts page views, and powers the admin dashboard.

## Settings (environment variables)

Copy `.env.example` to `.env` and fill it in. On Render you type the same
names into the "Environment" tab.

| Name             | What it is                                                              |
|------------------|-------------------------------------------------------------------------|
| `MONGO_URI`      | Your MongoDB Atlas connection string                                    |
| `FRONTEND_URL`   | Your website address, e.g. `https://usama-asghar.vercel.app`            |
| `ADMIN_EMAIL`    | Email you will use to log in to the dashboard                           |
| `ADMIN_PASSWORD` | Your dashboard password (make it long and unique)                       |
| `JWT_SECRET`     | Any long random text (16+ characters) used to protect login sessions    |

## Run locally

```bash
cd backend
npm install
npm run dev
```

## API

Public (used by the website):

| Method | Endpoint            | Purpose                          |
|--------|---------------------|----------------------------------|
| GET    | `/`                 | Health check                     |
| POST   | `/api/contact`      | Contact form                     |
| POST   | `/api/distribution` | Become-a-distributor form        |
| POST   | `/api/track`        | Anonymous page-view counter      |

Admin (needs login — `POST /api/admin/login` returns a token):

| Method | Endpoint                          | Purpose                       |
|--------|-----------------------------------|-------------------------------|
| GET    | `/api/admin/stats`                | Dashboard numbers             |
| GET    | `/api/admin/messages`             | List messages (search/filter) |
| PATCH  | `/api/admin/messages/:id`         | Change status / add notes     |
| DELETE | `/api/admin/messages/:id`         | Delete                        |
| GET    | `/api/admin/messages/export.csv`  | Download as CSV               |
| ...    | `/api/admin/inquiries...`         | Same set for distributor inquiries |

## Security notes

- Customer data is never public: the old open `GET /api/contact` and
  `GET /api/distribution` lists were removed.
- Forms are rate-limited per IP and every field is length-checked.
- Only the addresses in `FRONTEND_URL` can call the API from a browser.
- Login attempts are limited (8 per 15 minutes). Sessions last 12 hours.
- Page views are anonymous (random visitor id, no personal data) and are
  auto-deleted after 180 days.
