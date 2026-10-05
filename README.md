# TechSphere

TechSphere is a student community app for sharing ideas, finding people with similar interests, and learning together. The project contains a React/Vite frontend and an Express/MongoDB backend.

## Features

- Responsive landing page and shared navigation with light and dark themes.
- Community directory, post creation, and messaging interfaces.
- Login and registration screens.
- Backend authentication API with password hashing, JWT-based sessions in HTTP-only cookies, and a MongoDB user model.
- Backend health check at `/api/health`.

> **Current implementation note:** The frontend pages are currently UI demonstrations. Login, registration, post publishing, community joining, and messaging are not yet connected to backend persistence. The backend currently exposes authentication routes only.

## Tech stack

**Frontend:** React 19, Vite, React Router, Tailwind CSS 4, and Lucide icons

**Backend:** Node.js ES modules, Express 5, MongoDB with Mongoose, JWT, and bcrypt

## Requirements

- Node.js 20 or later and npm.
- A MongoDB connection string, such as one for a local MongoDB instance or MongoDB Atlas.

## Getting started

Install dependencies separately in each app directory:

```powershell
cd frontend
npm install

cd ..\backend
npm install
```

### Configure the backend

Create `backend/.env` (do not commit this file) with:

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/techsphere
JWT_SECRET=replace-this-with-a-random-secret-at-least-32-characters-long
PORT=5000
CLIENT_URL=http://localhost:5173
```

- Set `MONGO_URI` to your MongoDB connection string.
- Set `JWT_SECRET` to a private, randomly generated value of at least 32 characters. Do not reuse a sample value in production.
- `PORT` is optional and defaults to `5000`.
- `CLIENT_URL` is optional and defaults to `http://localhost:5173`. Multiple allowed origins can be comma-separated.

Start the backend from the `backend` directory:

```powershell
npm run dev
```

Or use `npm start` to run without the development watcher. The server connects to MongoDB before it starts listening.

### Start the frontend

In a second terminal:

```powershell
cd frontend
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`). The frontend currently does not require a `.env` file.

## API

The backend runs on `http://localhost:5000` by default.

| Method | Endpoint | Description | Authentication |
| --- | --- | --- | --- |
| `GET` | `/` | Backend status message | No |
| `GET` | `/api/health` | JSON health status | No |
| `POST` | `/api/auth/register` | Create an account and set the session cookie | No |
| `POST` | `/api/auth/login` | Sign in and set the session cookie | No |
| `GET` | `/api/auth/me` | Return the signed-in user's profile | Yes |
| `POST` | `/api/auth/logout` | Clear the session cookie | No |

Registration accepts JSON with `username`, `email`, and `password`. Usernames must be 3–24 characters and may contain lowercase letters, numbers, dots, dashes, and underscores. Passwords must be 8–128 characters. Login accepts `email` and `password`.

The session is stored in an HTTP-only cookie. Browser API requests that use this session must send credentials, and the frontend origin must be allowed by the backend's `CLIENT_URL` setting.

Example health check:

```powershell
Invoke-RestMethod http://localhost:5000/api/health
```

## Project layout

```text
TechSphere/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/     # Authentication and user handlers
│   ├── middleware/      # JWT authentication middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # Express API routes
│   └── server.js
└── frontend/
    └── src/
        ├── components/  # Shared interface components
        ├── pages/       # Home, auth, community, post, and chat screens
        └── App.jsx      # Client-side routes
```

## Useful commands

Run these commands from `frontend`:

```powershell
npm run lint
npm run build
npm run preview
```

Run the backend development server from `backend` with `npm run dev`.

## Environment and secrets

The frontend and backend ignore local `.env` files. Keep MongoDB credentials and JWT secrets out of source control. For production, use a strong private JWT secret, HTTPS, a production MongoDB URI, and the correct frontend origin in `CLIENT_URL`.
