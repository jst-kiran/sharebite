# ShareBite

A platform that connects food donors with NGOs to reduce food waste. This is
the **project foundation**: folder structure, routing, shared layout, the
public pages, and a basic Flask API — no database or dashboards yet.

```
sharebite/
├── frontend/   React (Vite) + Tailwind CSS + React Router + Axios
└── backend/    Python Flask REST API (mock data, no database)
```

## Frontend

```bash
cd frontend
npm install        # already run for you if you're using this scaffold as-is
npm run dev         # starts the dev server at http://localhost:5173
```

Optional: copy `.env.example` to `.env` if your Flask backend runs somewhere
other than `http://127.0.0.1:5000`.

**Pages:** Home, About, Login, Register, 404
**Structure:**
```
frontend/src/
├── components/
│   ├── common/     Button, InputField, Card, Logo — small reusable pieces
│   └── layout/     Navbar, Footer, Layout (shared page shell)
├── pages/          One file per route
├── services/       api.js (Axios instance), authService.js
├── App.jsx         Route definitions
└── main.jsx        App entry point + BrowserRouter
```

## Backend

```bash
cd backend
python3 -m venv venv          # already created for you if using this scaffold as-is
source venv/bin/activate      # on Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py                  # starts the API at http://127.0.0.1:5000
```

**Structure:**
```
backend/
├── app.py                 App factory, blueprint registration, error handlers
├── routes/
│   ├── main_routes.py     GET /api/health
│   └── auth_routes.py     POST /api/auth/login, POST /api/auth/register
├── data/
│   └── mock_users.py      In-memory Python list standing in for a database
└── requirements.txt
```

**Endpoints (placeholder, no real persistence or hashing yet):**

| Method | Route               | Body                                   | Notes                                  |
|--------|----------------------|-----------------------------------------|-----------------------------------------|
| GET    | `/api/health`         | —                                        | Quick check the API is up               |
| POST   | `/api/auth/register`  | `name`, `email`, `password`, `role`      | `role` must be `"donor"` or `"ngo"`     |
| POST   | `/api/auth/login`     | `email`, `password`                      | Checks against the mock user list       |

Two mock accounts already exist for testing login:
- `donor@example.com` / `password123` (Donor)
- `ngo@example.com` / `password123` (NGO Partner)
- `admin@example.com` / `password123` (System Admin)

## What's intentionally not here yet

- No database (Python lists only, resets on server restart)
- No real password hashing or session/JWT auth
- No dashboards or donation-listing pages
- No protected routes

These come in later milestones once the foundation is in place.
