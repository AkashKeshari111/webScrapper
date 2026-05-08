# 🔥 WebScraper News App

🌐 Live Demo: https://scrapenews.vercel.app/

A full-stack MERN application that scrapes trending Hacker News stories, allows users to bookmark articles, and provides secure authentication using JWT stored in HTTP-only cookies.

---

# 🚀 Features

- 🧠 Live web scraping of Hacker News (Top Stories)
- 🔐 Authentication (Register / Login)
- 🍪 Secure JWT authentication using HTTP-only cookies
- 🔖 Bookmark / Unbookmark stories
- 📄 Server-side pagination
- ⚡ Optimized MongoDB bulkWrite for scraping
- 🎯 Global state management using Context API
- 🎨 Responsive UI with Tailwind CSS
- 🔄 Instant UI sync for bookmarks (no refresh required)

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- Context API

## Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js
- Cheerio (Web Scraping)
- Axios

---

# 📁 Project Structure

backend/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
└── server.js

frontend/
├── components/
├── pages/
├── context/
├── services/
└── App.jsx

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

git clone https://github.com/your-username/webscraper.git
cd webscraper

---

## 2️⃣ Backend Setup

cd backend
npm install

---

## 3️⃣ Frontend Setup

cd frontend
npm install

---

# 🔐 Environment Variables

## Backend (.env)

PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173

---

## Frontend (.env)

VITE_API_URL=http://localhost:8080/api

---

# ▶️ Run Project Locally

## Start Backend

cd backend
npm run dev

Server runs at:
http://localhost:8080

---

## Start Frontend

cd frontend
npm run dev

Frontend runs at:
http://localhost:5173

---

# 🔗 API Endpoints

## Auth
- POST /api/auth/register
- POST /api/auth/login

## Stories
- GET /api/stories
- GET /api/stories/:id
- POST /api/stories/:id/bookmark

## User
- GET /api/user/bookmarks

## Scraper
- GET /api/scrape

---

# 🔥 Key Highlights

- ⚡ Real-time scraping from Hacker News
- 🔐 Secure JWT authentication with cookies
- 📦 Optimized backend using bulk database operations
- 🔄 Instant bookmark toggle (optimistic UI)
- 📊 Pagination support for scalability
- 🎯 Fully responsive modern UI

---

# 🚀 Deployment

- Frontend: Vercel
- Backend: Node.js server (Render/AWS compatible)
- Database: MongoDB Atlas

---

# 👨‍💻 Author

Built with ❤️ by Akash

---

# 🌐 Live Project

https://scrapenews.vercel.app/
