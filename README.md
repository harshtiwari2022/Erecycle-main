# ERecycle Frontend + Backend

This is a Next.js 14 app using the App Router. It includes API routes under `src/app/api` acting as the backend.

## Run locally

```bash
npm install
npm run dev
```

## Environment

Create a `.env.local` from the provided example:

```bash
cp .env.local.example .env.local
# set JWT_SECRET
```

## API Endpoints

- `POST /api/v1/auth/register` – Register a user
- `POST /api/v1/auth/login` – Login and receive a JWT token
- `GET /api/v1/auth/me` – Get current user from Bearer token
- `GET /api/v1/facility` – List facilities
- `POST /api/v1/booking` – Create a booking
- `GET /api/v1/booking?userId=...&userEmail=...` – List bookings, optionally filtered

## Data Storage

Simple JSON file storage under `src/server/data` (auto-created). Not for production.
