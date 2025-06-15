<h1 align="center">
  📦 Bulk Data Uploader
  <br/>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="version"/>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="license"/>
</h1>

> A **blazing‑fast**, **real‑time** CSV/Excel ingestion service that streams millions of rows to your database without breaking a sweat — complete with live progress bars, Redis queuing, and a sleek React + Tailwind UI.

---

## ✨ Demo

<p align="center">
  <img src="docs/demo_upload.gif" alt="Upload demo" width="720"/>
</p>

---

## 🚀 Features at a Glance
| | Feature |
|---|---|
| 📂 | Drag‑and‑drop CSV/Excel upload |
| ⚡ | Chunked batch processing powered by **Redis** + **worker threads** |
| 🔄 | **Socket.IO** pushes live % progress to the browser |
| 🩺 | Schema validation & duplicate skipping |
| 📨 | Browser toast **and** optional email summary on completion |
| 📊 | Beautiful summary report: success ✔︎ / failure ✖︎ per record |

---

## 🏗️ Architecture

```mermaid
flowchart LR
  subgraph Frontend (React + Vite)
    FE[File Uploader<br/>Progress Bar<br/>Report UI]
  end
  subgraph Backend
    API[Express API<br/>(/upload)]
    Worker[Node Worker<br/>Batch Parser]
  end
  DB[(MongoDB)]
  RQ((Redis Queue))
  FE -- HTTP: multipart/form‑data --> API
  API -- LPUSH job --> RQ
  Worker -- BRPOP job --> RQ
  Worker -- bulkInsert --> DB
  Worker -- progress via Socket.IO --> FE

```
## Tech Stack
- Frontend: React 18, Vite, Tailwind CSS, Socket.IO‑client

- Backend: Node 18+, Express, Multer, csv‑parser / xlsx, Socket.IO

- Queue: Redis (ioredis)

- Database: MongoDB + Mongoose<br/><sub><sup>(swap‐in PostgreSQL/MySQL easily)</sup></sub>

## 🔧 Quick Start
# 1. Clone
git clone https://github.com/sandeep-rnj/bulk-uploader.git
cd bulk-uploader

# 2. Backend
cp backend/.env.example backend/.env       # edit if needed
cd backend && npm i
npm run start                              # API  :5000
npm run worker                             # Worker:5001 (socket port)

# 3. Frontend (new terminal)
cd ../frontend && npm i
npm run dev                                # Vite :5173

 - Open http://localhost:5173 → upload a CSV → watch the real‑time magic ✨.

## 🗄️ Environment Variables
| Key           | Description             | Default                                  |
| ------------- | ----------------------- | ---------------------------------------- |
| `PORT`        | REST API port           | `5000`                                   |
| `SOCKET_PORT` | Socket.IO port          | `5001`                                   |
| `MONGO_URI`   | Mongo connection string | `mongodb://localhost:27017/bulkuploader` |
| `REDIS_URL`   | Redis connection string | `redis://localhost:6379`                 |
| `BATCH_SIZE`  | Records per bulk insert | `500`                                    |

- Create backend/.env and override as needed.

## 📑 API Reference

- POST /upload
- Headers: Content‑Type: multipart/form‑data
- Body   : file=<csv|xlsx>
- Returns: { "jobId": "uuid-v4" }

Use the emitted jobId to join the corresponding Socket.IO room for progress events:
- socket.emit("join", jobId);
- socket.on("progress", ({percent}) => ...);

## 🐳 Docker (One‑liner)
docker compose up --build

## 🤝 Contributing

- Fork 📌 → git checkout -b feature/awesome

- Code, test, lint (npm run lint)

- git commit -m "feat: add awesome"

- PR against main

## 📜 License
- MIT © 2025 Sandeep Ranjan

## 👋 Say Hi
|              | Link                                                                             |
| ------------ | -------------------------------------------------------------------------------- |
| 🌐 Portfolio | [https://sandeeps-portfolio.netlify.app](https://sandeeps-portfolio.netlify.app) |
| 💼 LinkedIn  | [https://linkedin.com/in/sandeep-rnj](https://linkedin.com/in/sandeep-rnj)       |
| 💻 GitHub    | [https://github.com/sandeep-rnj](https://github.com/sandeep-rnj)                 |

