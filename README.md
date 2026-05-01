<div align="center">

# ⚡ FreePlan

### The all-in-one project management tool built for freelancers.
Manage your projects, tasks, clients, and invoices — beautifully.

<br />

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-freeplan--inky.vercel.app-6c63ff?style=for-the-badge)](https://freeplan-inky.vercel.app)
[![API](https://img.shields.io/badge/⚙️_API-Online-10b981?style=for-the-badge)](https://freeplan-api.onrender.com/api/health)
[![License](https://img.shields.io/badge/License-MIT-white?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure register, login and session persistence
- 📁 **Project Management** — Full CRUD with status, priority and deadline tracking
- 🗂️ **Kanban Board** — Drag and drop tasks between columns with real-time API sync
- 👥 **Client Management** — Track clients with contact details, company and notes
- 🧾 **Invoice Tracking** — Create invoices, manage draft / sent / paid status
- 📊 **Live Dashboard** — Animated KPI cards, completion rates and weekly progress chart
- 🎨 **Premium Animations** — Page transitions, staggered lists and SVG logo animation
- 📱 **Responsive Design** — Works on desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 + Vite | UI framework and build tool |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Animations and page transitions |
| Shadcn/ui | Component library |
| TanStack React Query | Server state and caching |
| React Hook Form + Zod | Forms and validation |
| @dnd-kit | Kanban drag and drop |
| Recharts | Dashboard charts |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JWT + bcryptjs | Auth and password hashing |
| Helmet + CORS | Security |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Mouhya01/FreePlan.git
cd FreePlan
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in `/server`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../client
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📡 API Endpoints

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
| GET | `/api/projects/:id` | Get single project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/:id/tasks` | List tasks |
| POST | `/api/projects/:id/tasks` | Create task |
| PUT | `/api/projects/:id/tasks/:taskId` | Update task |
| DELETE | `/api/projects/:id/tasks/:taskId` | Delete task |

### Clients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/clients` | List all clients |
| POST | `/api/clients` | Create client |
| PUT | `/api/clients/:id` | Update client |
| DELETE | `/api/clients/:id` | Delete client |

### Invoices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/invoices` | List all invoices |
| POST | `/api/invoices` | Create invoice |
| PUT | `/api/invoices/:id` | Update invoice |
| DELETE | `/api/invoices/:id` | Delete invoice |

### Stats
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Dashboard KPIs |

---

## 🌍 Deployment

| Service | URL |
|---------|-----|
| Frontend — Vercel | https://freeplan-inky.vercel.app |
| Backend — Render | https://freeplan-api.onrender.com |
| Database — MongoDB Atlas | Cloud hosted |

Every push to `main` triggers an automatic redeploy on Vercel.

---

## 🔒 Security

- Passwords hashed with bcryptjs (12 salt rounds)
- Routes protected with JWT Bearer tokens
- HTTP headers secured with Helmet
- CORS restricted to frontend origin only
- `.env` excluded from version control

---

## 👨‍💻 Author

Built from scratch as a portfolio project — architecture, backend, frontend and deployment.

[![GitHub](https://img.shields.io/badge/GitHub-Mouhya01-181717?style=for-the-badge&logo=github)](https://github.com/Mouhya01)

---

<div align="center">

**FreePlan** · React + Node.js · Vercel + Render · 2025

</div>