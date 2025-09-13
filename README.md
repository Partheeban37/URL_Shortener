
# 📌 URL Shortener - Three-Tier Application (Next.js + Node.js + PostgreSQL)

A fully containerized **three-tier URL Shortener** application built with:

- **Frontend (Presentation Layer):** Next.js (React)  
- **Backend (Application Layer):** Node.js + Express  
- **Database (Data Layer):** PostgreSQL  
- **Orchestration:** Docker Compose  

This project allows users to input a long URL and receive a shortened link.  
Includes a `/status` page to check system health and an `/about` page for project info.

---

## 🏗 Architecture

```

\[ Next.js (Frontend) ]  --->  \[ Node.js API (Backend) ]  --->  \[ PostgreSQL (Database) ]

````

- **Frontend:** User interface for shortening URLs and navigating to other pages.  
- **Backend:** REST API for creating, retrieving, and redirecting shortened URLs.  
- **Database:** Stores mapping between long URLs and short codes.

---

## 📦 Prerequisites

Before running the project, ensure you have:

- **Docker** (>= 20.x)  
- **Docker Compose** (>= v2.x)  

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/` based on `.env.example`:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@db:5432/urlshortener
````

> **Note:** Credentials are for local dev only. Use secrets in production.

---

## 🚀 Setup & Run

1️⃣ **Clone the repository**

```bash
git clone https://github.com/yourusername/url-shortener-app.git
cd url-shortener-app
```

2️⃣ **Build and start services**

```bash
docker compose up --build -d
```

3️⃣ **Check running containers**

```bash
docker ps
```

4️⃣ **Access the app**

* Frontend: [http://localhost:3000](http://localhost:3000)
* Health Check: [http://localhost:5000/health](http://localhost:5000/health)

---

## 📂 Project Structure

```
url-shortener-app/
│
├── frontend/              # Next.js UI
│   ├── app/
│   │   ├── page.js         # Main page
│   │   ├── status/page.js  # System health
│   │   └── about/page.js   # About info
│   ├── package.json
│   └── Dockerfile
│
├── backend/               # Express.js API
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
│
├── db/                    # Database container setup
│   └── Dockerfile
│
└── docker-compose.yml     # Orchestration
```

---

## 🛠 API Endpoints

### Health Check

```http
GET /health
```

Returns:

```json
{ "status": "OK" }
```

### Shorten URL

```http
POST /api/shorten
```

Body:

```json
{ "longUrl": "https://example.com/very-long-url" }
```

Response:

```json
{ "shortUrl": "http://localhost:5000/abc123" }
```

### Redirect Short URL

```http
GET /:shortCode
```

Redirects user to original long URL.

---

## 💾 Persistent Storage

The PostgreSQL database is stored in a **Docker volume** so data is not lost on container restart.

```yaml
volumes:
  db_data:
```

---

## 🧪 Health Monitoring

* `/status` page in the frontend calls the backend `/health` endpoint.
* Docker Compose **healthcheck** is configured for DB and API.

---

## 🛑 Stop the App

```bash
docker compose down
```

To remove volumes (delete DB data):

```bash
docker compose down -v
```

---

## 📜 License

MIT License © 2025 Partheeban

---

## 📷 Screenshots


**Main Page**
![Main Page] <img width="1920" height="1080" alt="Screenshot_13-Aug_16-21-27_1513" src="https://github.com/user-attachments/assets/0ebc7e01-d19e-4531-8ff7-0cc5801e95c8" />

**Status Page**
![Status Page]<img width="1920" height="1080" alt="Screenshot_13-Aug_16-21-42_13307" src="https://github.com/user-attachments/assets/63200f0f-edf4-4b79-b19c-fc110d4ac2ff" />

