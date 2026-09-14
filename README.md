# 🌾 Urja Foods & Agro - Advanced Feed Pellet & Agri-Tech Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)

> **Urja Foods & Agro Industries Pvt. Ltd.** is a state-of-the-art cattle and poultry feed manufacturing platform powered by cutting-edge European EC-certified 150 TPD (Tonnes Per Day) automated pellet technology.

---

## 🚀 Key Highlights & Features

- ⚙️ **European Engineering Showcase**: Interactive telemetry display featuring 4-stage conditioning, continuous double-pass cooling, and automated robotic bagging line.
- 📊 **Farmer Profit & Milk Yield ROI Calculator**: Interactive real-time calculator that computes projected milk yield increase and net monthly profit boost from Urja Feed rations.
- 🎨 **Modern High-Impact Animations**:
  - Continuous gradient flow buttons & border glows
  - Dynamic card shine & reflective light sweeps
  - Staggered floating badges with parallax micro-animations
  - Particle & twinkle effects on achievement milestones
- ⚡ **Full Data Loading Animation Suite**:
  - Skeleton catalog placeholders with realistic light beams
  - Telemetry HUD spinners for portal & asynchronous API fetches
  - Brand preloader splash animation on first boot
- 📦 **Multi-Brand Product Catalog**: Filtering across Cattle Feeds (Urja Gold, Urja Doodh Vardhak, Bypass Fat Pellets) and Poultry Feeds with nutritional profiles.
- 🤝 **Dealer & Partner Inquiries**: Integrated application forms with real-time feedback and validation.
- 💼 **HR & Careers Portal**: Job listings, department filters, and resume application workflow.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS & Custom CSS Keyframe Animations
- **Icons**: Lucide React
- **Client Port**: `http://localhost:5173`

### Backend
- **Server**: Node.js & Express.js
- **Database**: MySQL (`urja_foods`)
- **API Port**: `http://localhost:5000`

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/Ajay-Bhor/urja-foods.git
cd urja-foods
```

### 2. Backend Setup
```bash
# Install backend dependencies
npm install

# Start backend server
node server/index.js
```
*Backend runs on `http://localhost:5000`.*

### 3. Frontend Setup
```bash
# Install frontend dependencies
cd client
npm install

# Start Vite dev server
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 📁 Project Structure

```text
urja-foods/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── urja/
│   │   │       ├── UrjaNavbar.jsx
│   │   │       ├── UrjaHero.jsx
│   │   │       ├── UrjaHomeHighlights.jsx
│   │   │       ├── UrjaEuropeanTech.jsx
│   │   │       ├── UrjaFarmerCalculator.jsx
│   │   │       ├── UrjaFarmerTestimonials.jsx
│   │   │       ├── UrjaDataLoader.jsx
│   │   │       ├── UrjaProductsCatalog.jsx
│   │   │       ├── UrjaHrPortal.jsx
│   │   │       ├── UrjaContactSection.jsx
│   │   │       └── UrjaFooter.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   └── index.js
└── README.md
```

---

## 📄 License
Copyright © 2026 **Urja Foods & Agro Industries Pvt. Ltd.** All rights reserved.
