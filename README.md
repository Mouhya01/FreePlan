<div align="center">

# ⚡ FreePlan

### The all-in-one project management tool built for freelancers.
Manage your projects, tasks, clients, and invoices — beautifully.

<br />

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-freeplan--inky.vercel.app-6c63ff?style=for-the-badge)](https://freeplan-inky.vercel.app)
[![API](https://img.shields.io/badge/⚙️_API-Online-10b981?style=for-the-badge)](https://freeplan-api.onrender.com/api/health)
[![License](https://img.shields.io/badge/License-MIT-white?style=for-the-badge)](LICENSE)

<br />

---

## 🖥️ Preview

| Dashboard | Projects & Kanban |
|-----------|------------------|
| ![Dashboard](https://placehold.co/600x340/0f0e1a/6c63ff?text=Dashboard+KPIs) | ![Kanban](https://placehold.co/600x340/0f0e1a/6c63ff?text=Kanban+Board) |

| Clients | Invoices |
|---------|----------|
| ![Clients](https://placehold.co/600x340/0f0e1a/10b981?text=Clients+Page) | ![Invoices](https://placehold.co/600x340/0f0e1a/10b981?text=Invoices+Page) |

---

</div>

## ✨ Features

- 🔐 **JWT Authentication** — Secure register, login & session persistence
- 📁 **Project Management** — Full CRUD with status, priority & deadline tracking
- 🗂️ **Kanban Board** — Drag & drop tasks between columns with real-time API sync
- 👥 **Client Management** — Track clients with contact details, company & notes
- 🧾 **Invoice Tracking** — Create invoices, manage draft/sent/paid status & revenue
- 📊 **Live Dashboard** — Animated KPI cards, completion rates & weekly progress chart
- 🎨 **Premium UI/UX** — Page transitions, staggered animations & SVG logo animation
- 📱 **Responsive** — Works seamlessly on desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19 + Vite** | UI framework & lightning-fast build tool |
| **Tailwind CSS v4** | Utility-first styling with custom design tokens |
| **Framer Motion** | Page transitions & micro-animations |
| **Shadcn/ui** | Accessible, customizable component library |
| **TanStack React Query** | Server state management & intelligent caching |
| **React Hook Form + Zod** | Performant forms with schema validation |
| **@dnd-kit** | Accessible drag & drop for the Kanban board |
| **Recharts** | Dashboard charts & data visualization |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js + Express** | REST API server |
| **MongoDB + Mongoose** | NoSQL database & ODM |
| **JWT + bcryptjs** | Authentication & secure password hashing |
| **Helmet + CORS** | Security headers & cross-origin protection |

### Infrastructure
| Service | Usage |
|---------|-------|
| **Vercel** | Frontend hosting with CI/CD |
| **Render** | Backend hosting |
| **MongoDB Atlas** | Cloud database |
| **GitHub** | Version control & source of truth |

---

## 🚀 Getting Started

### Prerequisites
```bash
node -v  # v20+
npm -v   # v10+
```

### 1. Clone the repository
```bash
git clone https://github.com/Mouhya01/FreePlan.git
cd FreePlan
```

### 2. Setup the Backend
```bash
cd server
npm install
```

Create a `.env` file in `/server`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
# Server running on http://localhost:5000
```

### 3. Setup the Frontend
```bash
cd ../client
npm install
npm run dev
# App running on http://localhost:5173
```

> The Vite proxy automatically forwards `/api` calls to `localhost:5000` — no CORS issues in development.

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Create new account |
| `POST` | `/api/auth/login` | ❌ | Sign in & receive JWT |
| `GET` | `/api/auth/me` | ✅ | Get current user |
| `PUT` | `/api/auth/profile` | ✅ | Update profile info |
| `PUT` | `/api/auth/password` | ✅ | Change password |

### Projects
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/projects` | ✅ | List with filters & pagination |
| `POST` | `/api/projects` | ✅ | Create project |
| `GET` | `/api/projects/:id` | ✅ | Get project with tasks |
| `PUT` | `/api/projects/:id` | ✅ | Update project |
| `DELETE` | `/api/projects/:id` | ✅ | Delete project |

### Tasks
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/projects/:id/tasks` | ✅ | List tasks with filters |
| `POST` | `/api/projects/:id/tasks` | ✅ | Create task |
| `PUT` | `/api/projects/:id/tasks/:taskId` | ✅ | Update / move task |
| `DELETE` | `/api/projects/:id/tasks/:taskId` | ✅ | Delete task |

### Clients & Invoices
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET/POST` | `/api/clients` | ✅ | List / Create client |
| `PUT/DELETE` | `/api/clients/:id` | ✅ | Update / Delete client |
| `GET/POST` | `/api/invoices` | ✅ | List / Create invoice |
| `PUT/DELETE` | `/api/invoices/:id` | ✅ | Update status / Delete |

### Stats
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/stats` | ✅ | Aggregated dashboard KPIs |

---

## 🗂️ Project Structure