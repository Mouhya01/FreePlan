<div align="center">

<img src="client/public/favicon.svg" alt="FreePlan Logo" width="60" height="60" />

# FreePlan

**The all-in-one project management tool built for freelancers.**  
Manage your projects, tasks, clients, and invoices — all in one beautiful dashboard.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-6c63ff?style=for-the-badge&logo=vercel)](https://freeplan.vercel.app)
[![API Status](https://img.shields.io/badge/API-Online-10b981?style=for-the-badge&logo=render)](https://freeplan-api.onrender.com/api/health)

![FreePlan Dashboard Preview](https://placehold.co/1200x600/0f0e1a/6c63ff?text=FreePlan+Dashboard)

</div>

---

## Features

- **JWT Authentication** — Secure register, login, and session persistence
- **Project Management** — Full CRUD with status tracking and priority levels
- **Kanban Board** — Drag & drop tasks between columns with real-time persistence
- **Client Management** — Track your clients with contact details and notes
- **Invoice Tracking** — Create invoices, track draft/sent/paid status, monitor revenue
- **Live Dashboard** — Real-time KPIs, completion rates, and recent activity
- **Animated UI** — Page transitions, staggered lists, and SVG logo animation
- **Fully Responsive** — Works on desktop and mobile

---

## Tech Stack

### Frontend
| Tech | Usage |
|------|-------|
| React 19 + Vite | UI framework & build tool |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations & page transitions |
| Shadcn/ui | Component library |
| TanStack React Query | Server state & caching |
| React Hook Form + Zod | Form management & validation |
| @dnd-kit | Drag & drop Kanban |
| Recharts | Dashboard charts |

### Backend
| Tech | Usage |
|------|-------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT + bcryptjs | Authentication & password hashing |
| Helmet + CORS | Security middleware |

---

## Getting Started

### Prerequisites
- Node.js v20+
- MongoDB Atlas account
- Git

### Installation

**1. Clone the repository**
\```bash
git clone https://github.com/ton-username/FreePlan.git
cd FreePlan
\```

**2. Setup the backend**
\```bash
cd server
npm install
\```

Create a `.env` file in `/server`:
\```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
\```

\```bash
npm run dev
\```

**3. Setup the frontend**
\```bash
cd client
npm install
npm run dev
\```

Open `http://localhost:5173` in your browser.

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |
| PUT | `/api/auth/password` | Change password |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/:id/tasks` | List tasks |
| POST | `/api/projects/:id/tasks` | Create task |
| PUT | `/api/projects/:id/tasks/:taskId` | Update task |
| DELETE | `/api/projects/:id/tasks/:taskId` | Delete task |

### Clients & Invoices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/clients` | List / Create |
| PUT/DELETE | `/api/clients/:id` | Update / Delete |
| GET/POST | `/api/invoices` | List / Create |
| PUT/DELETE | `/api/invoices/:id` | Update / Delete |

---

## Project Structure

\```
freeplan/
├── client/                  # React frontend
│   └── src/
│       ├── api/             # Axios instance
│       ├── components/      # UI + layout components
│       ├── context/         # Auth context
│       ├── hooks/           # React Query hooks
│       ├── pages/           # Route pages
│       └── routes/          # Router config
└── server/                  # Express backend
    ├── config/              # DB connection
    ├── controllers/         # Business logic
    ├── middleware/          # Auth + error handlers
    ├── models/              # Mongoose schemas
    └── routes/              # API routes
\```

---

## Deployment

- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Render](https://render.com)
- **Database** → [MongoDB Atlas](https://mongodb.com/atlas)

---

<div align="center">

Built with passion as a portfolio project · 2025

</div>