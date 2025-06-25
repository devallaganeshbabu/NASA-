# 🚀 NASA Data Explorer

A full-stack web application that utilizes NASA's Open APIs to provide users with rich, interactive, and visual space data — including Mars Rover photos, APOD, EPIC Earth imagery, and more.

> Built with: **React**, **Node.js**, **Express**, and **MongoDB**

---

## 🌌 Live Demo

- 🔹 **Frontend (Vercel)**: [https://nasa-final-henna.vercel.app](https://nasa-final-henna.vercel.app)
- 🔹 **Backend (Render)**: [https://nasa-final.onrender.com](https://nasa-final.onrender.com)

---

## 🧠 Key Features

- 🌠 Astronomy Picture of the Day (APOD)_
- 🚗 Mars Rover Photos Viewer
- 🌍 EPIC Earth Images Explorer
- ☄️ Near-Earth Object Tracker
- 🔍 NASA Image & Video Search
- 🖤 Beautiful dark-themed UI with hover animations
- 🧑‍🚀 User login and signup functionality
- 📦 MongoDB Atlas integration for storing user data
- ⚙️ API proxy setup between frontend and backend

---

## 📁 Folder Structure

nasa-final/
├── frontend/ # React frontend
│ ├── public/
│ ├── src/
│ └── package.json
│
├── backend/ # Node.js Express backend
│ ├── routes/
│ ├── controllers/
│ ├── .env
│ └── package.json
│
└── README.md
Getting Started Locally
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/nasa-final.git
cd nasa-final
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
touch .env  # create and paste variables above
npm start
3. Setup Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm start
Make sure your frontend/package.json includes:

json
Copy
Edit
"proxy": "http://localhost:10000"
🚀 Deployment
✅ Backend (Render)
Go to https://render.com

Connect your GitHub repo

Set:

Build Command: npm install

Start Command: node index.js

Root Directory: backend

Add environment variables

Deploy!

✅ Frontend (Vercel)
Go to https://vercel.com

Import project from GitHub

Set Root Directory to frontend

Deploy and copy your frontend URL

LICENSE:
Devalla Ganesh Babu
devallaganeshbabu07@gmail.com