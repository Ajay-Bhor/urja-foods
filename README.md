# 🌾 Urja Foods & Agro - Advanced Agribusiness & Feed Milling Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)

> **Urja Foods & Agro Industries Pvt. Ltd.** is a modern full-stack agribusiness platform showcasing automated feed pellet manufacturing, livestock nutrition, contract farming, and farm-to-fork value chain integration.

---

## 🚀 Key Features

- ⚙️ **Manufacturing & Operations Showcase**: Highlights 150 TPD automated steam-conditioned pelleting, 4-stage conditioning, double-pass cooling, and robotic bagging.
- 📦 **Interactive Product Range**: Multi-category cattle feed, broiler feed, and nutrition supplement catalog with detailed nutrient specs, bypass fat formulation details, and direct rate inquiries.
- 🌾 **Five Core Agribusiness Sectors**: Dedicated portfolio pages and deep-dives for Urja Foods, Urja Pashu Aahar, Poushtik Chicken, Urja Organic, and Urja Soya.
- 📜 **Historical Journey & Milestones**: Interactive horizontal milestone journey from 2004 foundation to modern expansion.
- 🤝 **Dealer & Farmer Inquiries**: Real-time validated inquiry forms backed by MySQL and resilient JSON backup storage.
- 🌐 **Multi-Language Support**: Seamless Marathi, Hindi, and English localization across corporate information and navigation.
- 💾 **Dual Data Architecture**: Seamless auto-fallback to local JSON storage if MySQL database is not connected.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS & Modern Vanilla CSS Design System
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Port**: `http://localhost:3000`

### Backend
- **Server**: Node.js & Express
- **Database**: MySQL (`mysql2` connection pool) with auto-fallback to JSON
- **Port**: `http://localhost:5000`

---

## 📁 Project Structure

```text
urja-foods/
├── public/
│   ├── images/
│   │   ├── timeline/           # Milestone journey imagery (2004–2025)
│   │   └── *.jpg               # Business sector & banner assets
│   ├── company-plant.jpg       # Manufacturing plant imagery
│   ├── company.jpg             # Facility aerial photography
│   └── logo.png                # Official Urja Foods logo
├── server/
│   ├── config/
│   │   └── db.js               # MySQL pool, table creation & seeding
│   ├── data/
│   │   ├── businesses.json     # Business vertical fallback data
│   │   ├── company_info.json   # Corporate leadership & profile
│   │   ├── inquiries.json      # Stored inquiry leads
│   │   ├── milestones.json     # Historical timeline records
│   │   └── products.json       # Product formulations & specs
│   ├── routes/
│   │   ├── businesses.js       # /api/businesses endpoints
│   │   ├── calculator.js       # /api/calculate feed estimation
│   │   ├── companyInfo.js      # /api/company-info endpoints
│   │   ├── inquiry.js          # /api/inquiries lead dispatch
│   │   ├── milestones.js       # /api/milestones endpoints
│   │   └── products.js         # /api/products catalog endpoints
│   ├── scripts/
│   │   └── test-db.js          # MySQL connection diagnostic test
│   ├── index.js                # Express API & static server entry
│   └── schema.sql              # MySQL enterprise database schema
├── src/
│   ├── components/             # Reusable UI components & sections
│   ├── data/                   # Client-side data & translations
│   ├── hooks/                  # Custom hooks & LanguageContext
│   ├── pages/                  # Top-level view routes
│   ├── styles/                 # Modern styling tokens & CSS modules
│   ├── App.jsx                 # Route definitions & global layout
│   └── main.jsx                # React root mount
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML entry point
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration & API proxy
└── README.md
```

---

## 💻 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/Ajay-Bhor/urja-foods.git
cd urja-foods
npm install
```

### 2. Configure Environment

Copy the example environment file:
```bash
cp .env.example .env
```
*(Optional) Adjust MySQL credentials in `.env` if connecting to a local or remote MySQL server.*

### 3. Run Development Server

```bash
npm run dev
```
This runs both:
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

### 4. Build for Production

```bash
npm run build
```

---

## 📄 License
Copyright © 2026 **Urja Foods & Agro Industries Pvt. Ltd.** All rights reserved.
