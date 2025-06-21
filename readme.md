# 🛠️ Admin Dashboard Backend

This is the backend for the Admin Dashboard application built using Node.js, Express, Prisma ORM, and PostgreSQL. It supports role-based access control, user management, product APIs, password reset flow, rate limiting, pagination, filtering, and Prisma-powered migrations.

Full interactive API docs are available at:

➡️ [http://localhost:5000/docs](http://localhost:5000/docs)

---

## 🚀 Features

- ✅ Authentication with JWT
- ✅ Role-based access (USER / MODERATOR / ADMIN)
- ✅ Prisma ORM with PostgreSQL
- ✅ Password reset via email
- ✅ Pagination & filtering on product listings
- ✅ Rate limiting using `express-rate-limit`
- ✅ Multi-stage Docker build with Prisma migrations
- ✅ Secure token-based actions

---

## 📦 Tech Stack

- Node.js + Express
- PostgreSQL
- Prisma ORM
- TypeScript
- Docker & Docker Compose
- Nodemailer (with Ethereal for dev)
- express-rate-limit

---

## 📂 Folder Structure

```

.
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   └── app.ts
├── prisma/
│   └── schema.prisma
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md

````

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/tanmayvaij/admin-dashboard-be.git
cd admin-dashboard-be
````

### 2. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/mydb
JWT_SECRET=your-secret-key
```

### 3. Run with Docker Compose

```bash
docker-compose up --build
```

> This starts both the backend API and PostgreSQL container.

---

## 🔁 API Endpoints

### 🔐 Auth

* `POST /auth/register`
* `POST /auth/login`
* `POST /auth/request-password-reset`
* `POST /auth/reset-password?token=...`

### 👤 Users

* `GET /users` (admin/moderator only)
* `POST /users` (admin only, super-admin bypass if first user)
* `PUT /users/:id`
* `DELETE /users/:id`

### 📦 Products

* `GET /products?page=1&limit=10&search=abc`
* `POST /products` (admin only)
* `PUT /products/:id` (admin only)
* `DELETE /products/:id` (admin only)

---

## 🧪 Dev Scripts

```bash
# Run locally without Docker
yarn install
yarn prisma generate
yarn prisma migrate dev
yarn dev
```

---

## 🐳 Docker Image

Build manually (optional):

```bash
docker build -t admin-api .
docker run -p 5000:5000 --env-file .env admin-api
```

---

## 🧠 Notes

* Prisma migrations run automatically in the Docker container via `migrate deploy`
* Rate limiting is applied to product endpoints (30 req/min per IP)
* JWT secret must be kept secure in production

---
