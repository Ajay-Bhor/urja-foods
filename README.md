# 🌾 Urja Foods & Agro - Modern Agri-Tech & Careers Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Google Identity](https://img.shields.io/badge/OAuth-Google-EA4335?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/identity)
[![Apple Sign In](https://img.shields.io/badge/OAuth-Apple-000000?style=for-the-badge&logo=apple&logoColor=white)](https://developer.apple.com/sign-in-with-apple/)

> **Urja Foods & Agro Industries Pvt. Ltd.** is an agritech and animal nutrition enterprise based in Ambegaon, Pune, Maharashtra. This enterprise web application encompasses a high-performance corporate platform, an interactive European feed pellet manufacturing showcase, farmer yield calculators, a multilingual translation engine, and a Workday-grade ATS **Career Application Portal** with multi-provider OAuth authentication.

---

## 📑 Table of Contents

- [Key Highlights & Capabilities](#-key-highlights--capabilities)
- [Career Portal & ATS Application Flow](#-career-portal--ats-application-flow)
- [Authentication & Security](#-authentication--security)
- [Integrated Country Phone Selector](#-integrated-country-phone-selector)
- [Multilingual System & CMS](#-multilingual-system--cms)
- [Technology Stack](#-technology-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [API Endpoints Reference](#-api-endpoints-reference)
- [Environment Configuration](#-environment-configuration)
- [License](#-license)

---

## 🚀 Key Highlights & Capabilities

### 🏢 Corporate & Industrial Platform
- **European EC-Certified Technology Showcase**: Interactive telemetry display featuring 4-stage steam conditioning, continuous double-pass counterflow cooling, and automated robotic bagging lines.
- **Farmer Profit & Milk Yield ROI Calculator**: Real-time calculator estimating milk yield increases, fat percentage optimization, and monthly profit margins with Urja Cattle Feed rations.
- **Product Catalog**: Nutritional specifications and profiles for cattle feeds (*Urja Gold*, *Urja Doodh Vardhak*, *Bypass Fat Pellets*) and poultry formulations.
- **Brand Story & Infrastructure**: Leadership profiles, chairman's address, corporate history timeline, and certified laboratory quality controls.

### 💼 ATS Career Application Portal
- **Role-Based Job Discovery**: Search, department filtering, and detailed job requirement cards.
- **Mandatory Authentication Gate**: Candidates authenticate before accessing the application form.
- **3-Step Application Form**:
  - **Step 1: Personal & Reference Details**: Resume/CV upload (PDF/DOCX, up to 5MB), Personal details, Address, and prior Urja employment reference verification.
  - **Step 2: My Experience & Credentials**: Dynamic multi-item work history, educational degrees, professional certifications with validity dates, skill tags, and portfolio/website links.
  - **Step 3: Review & Submission**: Summary dossier review with candidate confirmation and automated reference generation (`URJA-CAREER-XXXXXX`).
- **HR Dispatch & Candidate Email Acknowledgment**: Instant candidate email confirmation and dossier transmission to HR recruitment desks via Nodemailer / SMTP.

---

## 🔄 Career Portal & ATS Application Flow

```text
CAREER PAGE (/careers)
     │
     ▼
Select Job / View Job Details
     │
     ▼
   APPLY NOW
     │
     ▼
LOGIN / SIGN IN PAGE (/careers/login)
     │
     ├── Sign in with Google (Google Identity Services)
     ├── Sign in with Apple (Official Apple JS SDK)
     └── Email + Password (with 6-Digit Verification Code)
             │
             ▼
       LOGIN VALIDATION
             │
      ┌──────┴──────┐
      │             │
   Failed        Successful (Session JWT Issued)
      │             │
      ▼             ▼
Error Message   APPLICATION PAGE (/careers/apply)
                    │
                    ▼
             APPLICATION FORM
                    │
        ┌───────────┼────────────┐
        ▼           ▼            ▼
   1. Resume   2. Personal   3. Reference   4. Address
      Upload      Details       Details        Details
        │           │             │              │
        └───────────┼─────────────┴──────────────┘
                    ▼
               SAVE & CONTINUE
                    │
                    ▼
            STEP 2: MY EXPERIENCE
        ┌───────────┼────────────┐
        ▼           ▼            ▼
    Experience   Education   Certifications / Skills
        │           │            │
        └───────────┼────────────┘
                    ▼
               SAVE & CONTINUE
                    │
                    ▼
             STEP 3: REVIEW & SUBMIT
                    │
                    ▼
            APPLICATION SUBMITTED
        (Dossier to HR + Email to Candidate)
```

---

## 🔐 Authentication & Security

The candidate portal features hardened authentication complying with OAuth 2.0, OpenID Connect, and JWT security standards:

1. **Official Sign in with Apple**:
   - Integrates Apple's official `appleid.auth.js` SDK.
   - Cryptographic server-side verification of Apple `id_token` (signature, issuer `https://appleid.apple.com`, audience check against Apple Client ID, and expiry).
   - Generates candidate session upon successful cryptographic proof.
2. **Official Sign in with Google**:
   - Google Identity Services (GIS) One Tap / OAuth 2.0 token verification via Google tokeninfo service.
   - Extracts verified email, subject ID, full name, and avatar picture.
3. **Email & Password Authentication**:
   - Password hashing using `bcryptjs` (salt rounds: 10).
   - Account activation guarded by a 6-digit email verification code with a 15-minute expiry.
   - Self-service password reset using secure 6-digit OTP verification.
4. **JWT Session Management**:
   - Candidate session tokens signed with HMAC SHA-256 (`jsonwebtoken`).
   - Client-side token storage in `localStorage` with authorization header injection (`Bearer <token>`).
   - Protected routes (`/careers/apply`, candidate profile, submitted applications).
5. **Content Protection Suite**:
   - Right-click context menu prevention, image drag protection, and developer tools inspection shortcuts monitor (`F12`, `Ctrl+Shift+I`, `Ctrl+U`) with security notification toasts.

---

## 📱 Integrated Country Phone Selector

The Phone Number input provides an integrated country code selector built without external bulky dependencies:

- **Integrated Single Input Box**: The country flag, calling code, and dropdown chevron sit seamlessly inside the left edge of the phone input container, followed by the national phone number.
- **Default Country**: **India (`🇮🇳 +91`)** with high-resolution flag rendering on all operating systems (including Windows, resolving raw text fallback).
- **Searchable Country Directory**: Filter 45+ international countries by country name, calling code (`+91`, `+1`, `+971`, `+44`, etc.), or ISO code (`IN`, `US`, `AE`, `GB`).
- **Country-Specific Phone Validation**:
  - **India (`IN`)**: 10 digits starting with 6, 7, 8, or 9 (`/^[6-9]\d{9}$/`).
  - **United States & Canada (`US`, `CA`)**: 10 digits starting with 2–9.
  - **UAE & Saudi Arabia (`AE`, `SA`)**: 9 digits starting with 5.
  - **United Kingdom & Germany (`GB`, `DE`)**: 10 to 11 digits.
  - **International**: Standard E.164 verification (7 to 15 digits).
- **Independent Field Storage**: The dialing code (`phoneCountryCode`, e.g. `+91`) and national number (`phoneNumber`, e.g. `9876543210`) are stored separately in form state, application records, MySQL, and HR notifications.

---

## 🌐 Multilingual System & CMS

- **Supported Languages**: English (`en`), Marathi (`mr` - मराठी), and Hindi (`hi` - हिंदी).
- **Language Switcher**: Persistent language selection stored in `localStorage` with instant UI translation.
- **Admin Translations CMS (`/admin/translations`)**:
  - Searchable, category-filtered translation manager.
  - Edit UI text keys across English, Marathi, and Hindi.
  - Persisted in `server/data/translations.json` and synchronized with the frontend in real time.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18.3, Vite 5.4, React Router 7, TailwindCSS 4, Lucide React |
| **Backend** | Node.js (ES Modules), Express 4.19, Nodemailer 10 |
| **Authentication** | JWT (`jsonwebtoken`), Bcrypt (`bcryptjs`), Google Identity Services, Apple Sign-In SDK |
| **Database** | MySQL 8.x (`mysql2`) with resilient JSON flat-file fallback (`server/data/`) |
| **Styling** | Vanilla CSS Design System, Responsive Breakpoints, Custom CSS Keyframes |

---

## 📁 Project Directory Structure

```text
urja-foods/
├── index.html                           # Root HTML with Google & Apple SDK scripts
├── package.json                         # Node dependencies & npm run dev scripts
├── vite.config.js                       # Vite build & frontend development server config
├── public/
│   ├── images/                          # High-resolution brand assets & photography
│   └── favicon.ico                      # Brand favicon
├── server/
│   ├── index.js                         # Express entrypoint & API gateway (Port 5000)
│   ├── config/
│   │   └── db.js                        # MySQL connection pool & resilient query handler
│   ├── middleware/
│   │   └── authMiddleware.js            # JWT Bearer token authentication middleware
│   ├── services/
│   │   └── authService.js               # Google/Apple token verification, password hashing, JWT
│   ├── routes/
│   │   ├── careers.js                   # Career ATS endpoints, auth, application submissions
│   │   └── translations.js              # Multilingual translations CRUD endpoints
│   └── data/
│       ├── applications.json            # Persistent candidate application dossiers
│       ├── email_logs.json              # Outbound HR & candidate notification logs
│       └── translations.json            # Multilingual key-value dictionary (EN, MR, HI)
├── src/
│   ├── main.jsx                         # React root mount
│   ├── App.jsx                          # Router configuration & top-level layout
│   ├── components/
│   │   ├── CountryPhoneInput.jsx        # Integrated country flag + dial code phone input
│   │   ├── Navbar.jsx                   # Main navigation with language selector
│   │   ├── Topbar.jsx                   # Contact hotline & corporate meta-strip
│   │   ├── ContentProtection.jsx        # Security & inspect protection layer
│   │   ├── UrjaFoodsShowcase.jsx        # European feed plant & telemetry showcase
│   │   ├── Footer.jsx                   # Corporate footer & legal links
│   │   └── ...                          # Section components (About, Products, Calculators)
│   ├── pages/
│   │   ├── HomePage.jsx                 # Corporate landing page
│   │   ├── CareersPage.jsx              # Job listings & department filters
│   │   ├── CareerAuthPage.jsx           # Candidate Login, Registration & Password Reset
│   │   ├── CareerApplicationPortal.jsx  # 3-step ATS job application portal
│   │   ├── AdminTranslationsPage.jsx    # Live translation CMS manager
│   │   └── ...                          # Corporate pages (About, Products, Contact, Mission)
│   ├── utils/
│   │   ├── auth.js                      # Client-side JWT session & token utilities
│   │   └── countries.js                 # 45+ country calling codes, flags, regex validation
│   └── styles/
│       ├── main.css                     # Global reset & layout typography
│       ├── careers.css                  # Career portal, step wizard, and country selector styles
│       ├── career-auth.css              # Authentication form & provider button styling
│       └── admin-translations.css       # Translation CMS styling
└── README.md                            # Project documentation
```

---

## 💻 Getting Started & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MySQL**: (Optional) v8.0+ on `localhost:3306` (application automatically falls back to file storage if MySQL is offline)

### 2. Clone the Repository
```bash
git clone git@github.com:Ajay-Bhor/urja-foods.git
cd urja-foods
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
APPLE_CLIENT_ID=com.urjafoods.careers.client
HR_EMAIL=careers@urjafoods.net

# Optional MySQL Database
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=urja_foods_db

# Optional SMTP Email Dispatch
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=careers@urjafoods.net
SMTP_PASS=your_app_password
```

### 5. Run Development Servers
Start both the Express backend and the Vite frontend simultaneously with one command:
```bash
npm run dev
```

- **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **Backend API Server**: [http://localhost:5000](http://localhost:5000)
- **Careers Portal**: [http://localhost:3000/careers](http://localhost:3000/careers)
- **Candidate Login**: [http://localhost:3000/careers/login](http://localhost:3000/careers/login)
- **Admin Translations**: [http://localhost:3000/admin/translations](http://localhost:3000/admin/translations)

### 6. Build for Production
```bash
npm run build
```

---

## 📡 API Endpoints Reference

### Candidate Authentication (`/api/careers`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/careers/google-auth` | Verify Google ID token and establish candidate session |
| `POST` | `/api/careers/apple-auth` | Verify Apple ID token and establish candidate session |
| `POST` | `/api/careers/register` | Register email/password and dispatch 6-digit verification code |
| `POST` | `/api/careers/verify-email` | Verify candidate email with 6-digit OTP code |
| `POST` | `/api/careers/resend-code` | Resend 6-digit verification code |
| `POST` | `/api/careers/login` | Authenticate candidate via email and password |
| `POST` | `/api/careers/forgot-password` | Request 6-digit password reset OTP |
| `POST` | `/api/careers/reset-password` | Reset password using 6-digit reset code |
| `GET` | `/api/careers/session` | Validate active JWT session (*Bearer Token required*) |

### Job Applications (`/api/careers`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/careers/apply` | Submit job application dossier with separated country code and phone number |
| `GET` | `/api/careers/my-applications` | Retrieve applications submitted by the logged-in candidate |

### Content & Translations (`/api/translations`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/translations` | Retrieve current dictionary for English, Marathi, and Hindi |
| `PUT` | `/api/translations` | Update translation key values across supported languages |

---

## 📄 License

Copyright © 2026 **Urja Foods & Agro Industries Pvt. Ltd.** All rights reserved.
