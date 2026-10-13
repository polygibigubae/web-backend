# Gubaie — Spiritual Community Web Platform

A full-stack web application for a spiritual community, featuring member registration, role-based authentication, multilingual support (English & Amharic), and a dedicated spiritual content hub ("Mary's Joy").

---

## 🗂️ Project Structure

```
gubaie/
├── gub_back/          # Express.js REST API (Node.js backend)
│   ├── src/
│   │   ├── app.js             # Express app setup, middleware, route mounting
│   │   ├── server.js          # DB connection, port-retry, server start
│   │   ├── config/            # env.js, db.js (Sequelize + MySQL)
│   │   ├── middleware/        # auth, error, role middleware
│   │   ├── models/            # User, Membership, Event, Announcement
│   │   ├── modules/
│   │   │   ├── auth/          # signup, login, profile routes + JWT
│   │   │   ├── members/       # member registration + listing
│   │   │   ├── roles/         # role management
│   │   │   ├── events/        # (scaffolded)
│   │   │   └── announcements/ # (scaffolded)
│   │   └── utils/
│   └── docs/                  # api-spec.md, architecture.md, database-schema.md
│
└── gub_front/
    └── web-frontend/          # React 19 + Vite + TailwindCSS 4 frontend
        └── src/
            ├── App.jsx                # BrowserRouter + all page routes
            ├── i18n.js                # i18next setup
            ├── locales/en/ & am/      # English & Amharic translations
            ├── context/               # React context (auth state etc.)
            ├── components/            # Shared + page-level UI components
            ├── modules/
            │   ├── auth/              # Login/Signup pages + services
            │   ├── members/           # Member registration + listing
            │   ├── events/            # (scaffolded)
            │   └── announcements/     # (scaffolded)
            ├── routes/                # Route config
            └── utils/
```

---

## ✅ What Has Been Done

### Backend (`gub_back`)

| Area                 | Status        | Details                                                                                                                            |
| -------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Project Setup        | ✅ Done       | Express 5, ES Modules, nodemon dev server                                                                                          |
| Database Config      | ✅ Done       | MySQL via Sequelize ORM, auto-sync on startup                                                                                      |
| Port Management      | ✅ Done       | Auto-retry on EADDRINUSE (up to 20 ports)                                                                                          |
| **Auth Module**      | ✅ Done       | `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/profile`                                                           |
| JWT Authentication   | ✅ Done       | `auth.middleware.js` — Bearer token verification                                                                                   |
| Role Middleware      | ✅ Done       | `role.middleware.js` — role-based access control                                                                                   |
| **User Model**       | ✅ Done       | UUID PK, email, password (hashed via bcryptjs), firstName, lastName, role (`Super Admin` / `Admin` / `Member` / `Guest`), isActive |
| **Membership Model** | ✅ Done       | Full registration fields: woreda, zone, batchDept, family, programAttending, sundaySchool history, departmentToServe               |
| **Members Module**   | ✅ Done       | `POST /api/members/register`, `GET /api/members/`                                                                                  |
| **Roles Module**     | ✅ Done       | Role CRUD routes                                                                                                                   |
| Input Validation     | ✅ Done       | Joi schemas (`auth.validation.js`, `member.validation.js`)                                                                         |
| Error Handling       | ✅ Done       | Centralized `errorHandler` + `notFoundHandler` middleware                                                                          |
| Health Check         | ✅ Done       | `GET /health` endpoint                                                                                                             |
| Event Model          | 🔶 Scaffolded | Model created, routes/controller not yet wired to app                                                                              |
| Announcement Model   | 🔶 Scaffolded | Model created, routes/controller not yet wired to app                                                                              |
| Documentation        | ✅ Done       | `docs/api-spec.md`, `docs/architecture.md`, `docs/database-schema.md`                                                              |
| Git                  | ✅ Done       | Pushed to `github.com/polygibigubae/web-backend` with individual file commits                                                      |

---

### Frontend (`gub_front/web-frontend`)

| Area                      | Status        | Details                                                                                            |
| ------------------------- | ------------- | -------------------------------------------------------------------------------------------------- |
| Project Setup             | ✅ Done       | React 19, Vite 7, TailwindCSS 4, ESLint                                                            |
| Routing                   | ✅ Done       | React Router v7 — all pages wired in `App.jsx`                                                     |
| Internationalisation      | ✅ Done       | i18next + `i18next-browser-languagedetector` — English (`en`) & Amharic (`am`) locales             |
| Animations                | ✅ Done       | Framer Motion integrated                                                                           |
| **Header / Navbar**       | ✅ Done       | Full responsive header (`Header.jsx` — 16 KB)                                                      |
| **Footer**                | ✅ Done       | Footer component (`Footer.jsx`)                                                                    |
| **Home Page**             | ✅ Done       | Hero, FeaturesSection, StatsSection, HighlightSection, TopicCards, JoinSection, TestimonialSection |
| **About Page**            | ✅ Done       | Full about page (`About.jsx` — 16 KB)                                                              |
| **FAQ Page**              | ✅ Done       | FAQ component with expandable Q&A                                                                  |
| **Login Page**            | ✅ Done       | Form UI + `auth` module service                                                                    |
| **Signup Page**           | ✅ Done       | Form UI + `auth` module service                                                                    |
| **Member Registration**   | ✅ Done       | Full detailed registration form (`Registration.jsx` — 18 KB)                                       |
| **User Profile**          | ✅ Done       | Profile page (`Profile.jsx`)                                                                       |
| **Mary's Joy — Articles** | ✅ Done       | `SpiritualArticles.jsx` at `/marys-joy/articles`                                                   |
| **Mary's Joy — Games**    | ✅ Done       | `SpiritualGames.jsx` at `/marys-joy/games`                                                         |
| **Mary's Joy — Q&A**      | ✅ Done       | `ContactQA.jsx` at `/marys-joy/qa`                                                                 |
| Auth Context              | ✅ Done       | `context/` folder in place for global auth state                                                   |
| Members Module (FE)       | ✅ Done       | Pages, components, and services scaffolded                                                         |
| Events Module (FE)        | 🔶 Scaffolded | Folder structure exists, UI not yet built                                                          |
| Announcements Module (FE) | 🔶 Scaffolded | Folder structure exists, UI not yet built                                                          |
| Git                       | ✅ Done       | Pushed to `github.com/polygibigubae/web-frontend` with individual file commits                     |

---

## 🔜 What To Do Next

### 🔴 High Priority

#### Backend

- [ ] **Wire Events & Announcements routes** — Mount `eventRoutes` and `announcementRoutes` into `app.js` (mirrors the existing auth/member pattern)
- [ ] **Protect Member routes** — Add `authenticate` middleware to `GET /api/members/` so only logged-in users can list members
- [ ] **Role-based guards** — Apply `role.middleware.js` to admin-only routes (e.g., deleting members, managing roles)
- [ ] **Password reset flow** — `POST /api/auth/forgot-password` and `POST /api/auth/reset-password` with email token
- [ ] **File / image upload** — Profile photo upload using `multer` (stored locally or cloud bucket)

#### Frontend

- [ ] **Connect Login/Signup to backend** — Wire `auth` service calls to `/api/auth/login` and `/api/auth/signup`; store JWT in `localStorage` / auth context
- [ ] **Auth Context implementation** — Complete `context/` to expose `user`, `token`, `login()`, `logout()` to the whole app
- [ ] **Protected routes** — Wrap `/profile`, `/register`, and admin pages in a `<ProtectedRoute>` component
- [ ] **Connect Registration form to backend** — Wire `Registration.jsx` form submit to `POST /api/members/register`
- [ ] **Connect Profile page to backend** — Fetch user data from `GET /api/auth/profile`

---

### 🟡 Medium Priority

#### Backend

- [ ] **Events CRUD** — Complete controller + service for creating, listing, updating, deleting events
- [ ] **Announcements CRUD** — Complete controller + service for announcements
- [ ] **Pagination** — Add `page` + `limit` query params to `GET /api/members/` and future list endpoints
- [ ] **Search & Filtering** — Filter members by family, zone, role, batchDept
- [ ] **Rate limiting** — Add `express-rate-limit` to auth routes to prevent brute-force
- [ ] **CORS hardening** — Restrict `cors()` to the production frontend origin only
- [ ] **Logging** — Integrate `morgan` for HTTP request logging in development and production

#### Frontend

- [ ] **Events UI** — Build pages and components inside `modules/events/` (list, detail, create form for admins)
- [ ] **Announcements UI** — Build pages and components inside `modules/announcements/`
- [ ] **Admin Dashboard** — Role-gated dashboard for `Admin` / `Super Admin` users: member list, event management, announcements
- [ ] **Amharic Translations** — Complete all missing keys in `locales/am/` (currently partially filled)
- [ ] **Toast / Alert System** — Replace `console.log` error handling in forms with user-visible toast notifications
- [ ] **Form Validation (FE)** — Add client-side validation feedback (field errors, character counters)

---

### 🟢 Nice to Have / Future

#### Backend

- [ ] **Refresh tokens** — Implement refresh token rotation for persistent sessions
- [ ] **Email service** — Send welcome email on signup using `nodemailer` or a transactional email provider
- [ ] **Unit & integration tests** — Add Jest/Supertest test suite for all routes
- [ ] **Docker** — Containerise backend + MySQL for consistent local setup and deployment
- [ ] **CI/CD** — GitHub Actions pipeline for linting, testing, and deployment

#### Frontend

- [ ] **Dark mode** — Toggle dark/light theme, respect system preference
- [ ] **PWA support** — Service worker + web manifest for offline capability
- [ ] **SEO** — Add `<meta>` descriptions, Open Graph tags, and page-level `<title>` updates
- [ ] **Accessibility (a11y)** — Audit with axe/Lighthouse; ensure keyboard navigation and screen reader support
- [ ] **End-to-end tests** — Playwright or Cypress test suite covering the main user flows

---

## 🛠️ Technology Stack

| Layer           | Technology                                                      |
| --------------- | --------------------------------------------------------------- |
| **Frontend**    | React 19, Vite 7, TailwindCSS 4, Framer Motion, React Router v7 |
| **i18n**        | i18next, react-i18next, i18next-browser-languagedetector        |
| **HTTP Client** | Axios                                                           |
| **Backend**     | Node.js, Express 5 (ES Modules)                                 |
| **ORM / DB**    | Sequelize 6, MySQL2, MySQL                                      |
| **Auth**        | JWT (`jsonwebtoken`), bcryptjs                                  |
| **Validation**  | Joi                                                             |
| **Dev Tools**   | nodemon, ESLint, Vite HMR                                       |

---

## 🚀 Local Development

### Backend

```bash
cd gub_back
cp .env.example .env      # fill in DB_HOST, DB_USER, DB_PASS, DB_NAME, JWT_SECRET, PORT
npm install
npm run dev               # starts with nodemon on PORT (default 5000)
```

### Frontend

```bash
cd gub_front/web-frontend
npm install
npm run dev               # starts Vite dev server (default http://localhost:5173)
```

> Make sure the backend is running first so the frontend can reach the API.

---

## 🌐 Repositories

| Project  | GitHub                                        |
| -------- | --------------------------------------------- |
| Backend  | https://github.com/polygibigubae/web-backend  |
| Frontend | https://github.com/polygibigubae/web-frontend |
