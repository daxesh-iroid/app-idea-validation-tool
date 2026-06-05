# CLAUDE.md — App Idea Validation Tool

This file is the single source of truth for AI-assisted development on this project. Claude must read and follow every rule here before generating any code, file, or suggestion.

---

## 📁 Project Overview

| Layer | Technology |
| :---- | :---- |
| Frontend | Next.js (JavaScript, not TypeScript) |
| Backend | Node.js + Express + Sequelize ORM |
| Database | PostgreSQL |
| Auth | JWT-based with middleware |
| PDF | PDFKit |
| Email | Nodemailer |

**Project Path**: `/Users/daxeshpatel/projects/app-idea-validation-tool`

---

## 🎯 Project Purpose

A **free lead generation tool** for iRoid Solutions that helps startup founders validate their app ideas before investing in development. The tool scores ideas on 5 dimensions, captures leads, sends email reports, and provides an admin panel for the sales team.

**Live URL**: TBD
**Admin URL**: TBD/admin

---

## 🖥️ FRONTEND — Next.js Rules

### Stack

- **Framework**: Next.js (JavaScript only — no TypeScript, no `.ts`/`.tsx` files)
- **Styling**: Tailwind CSS (use utility classes; avoid inline styles unless truly dynamic)
- **State**: React Context or Zustand (no Redux unless project grows significantly)
- **Forms**: React Hook Form
- **HTTP Client**: `axios` (configured instance in `lib/axios.js`)

---

### Folder Structure

```
frontend/
├── app/
│   ├── (auth)/                   # Admin auth group (login)
│   │   └── login/
│   │       └── page.js
│   ├── (admin)/                  # Admin dashboard group
│   │   ├── layout.js             # Admin layout with auth check
│   │   ├── dashboard/
│   │   │   └── page.js           # Lead list, stats
│   │   ├── leads/
│   │   │   ├── page.js           # Lead management
│   │   │   └── [id]/
│   │   │       └── page.js       # Lead detail view
│   │   ├── settings/
│   │   │   └── page.js           # Score weights, email templates
│   │   └── reports/
│   │       └── page.js           # Export, analytics
│   ├── api/                      # Next.js Route Handlers
│   │   └── [...proxy]/
│   │       └── route.js
│   ├── validation-tool/
│   │   └── page.js               # Main multi-step validation form
│   ├── result/
│   │   └── page.js               # Validation result display
│   ├── lead-capture/
│   │   └── page.js               # Email capture for full report
│   ├── layout.js                 # Root layout (metadata, fonts)
│   ├── page.js                   # Landing page (SEO hero + CTA)
│   └── globals.css               # Tailwind imports + CSS variables
│
├── components/
│   ├── ui/                       # Button, Input, Modal, Card, Badge
│   ├── forms/                    # FormField, SelectField, MultiSelect
│   ├── layout/                   # Header, Footer, Navbar, AdminSidebar
│   ├── validation/               # StepIndicator, ScoreGauge, ResultCard
│   └── admin/                    # LeadTable, StatsCard, Chart
│
├── lib/
│   ├── axios.js                  # Axios instance (base URL, interceptors)
│   └── utils.js                  # Helper functions
│
├── hooks/                        # useAuth, useFetch, useValidation
├── context/                      # AuthContext, ValidationContext
├── services/                     # authService, validationService, leadService, adminService
├── middleware.js                 # Next.js Edge Middleware (admin auth protection)
├── public/                       # Static assets, og-image.png
└── .env.local
```

---

### API Calling Rules

#### ✅ Public API Calls → Server Side Only
All public/unauthenticated API calls must go through **Next.js Server Components** or **Route Handlers**, never directly from the client.

#### ✅ Authorized API Calls → via Axios with Token Interceptor
Admin API calls use axios with JWT token from localStorage.

```javascript
// lib/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
```

---

### Middleware — Admin Auth Protection

```javascript
// middleware.js
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/leads', '/settings', '/reports'];
const authRoutes = ['/login'];

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.some((r) => path.startsWith(r));
  const isAuthRoute = authRoutes.some((r) => path.startsWith(r));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
};
```

---

### SEO — Default Setup

```javascript
// app/layout.js
export const metadata = {
  title: {
    default: 'Free App Idea Validation Tool | iRoid Solutions',
    template: '%s | iRoid Solutions',
  },
  description: 'Validate your app idea before spending money on development. Check clarity, market risk, MVP feasibility, monetization fit, and development complexity.',
  keywords: ['app idea validation', 'startup idea checker', 'MVP feasibility', 'app development cost', 'startup validation tool'],
  authors: [{ name: 'iRoid Solutions' }],
  creator: 'iRoid Solutions',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'iRoid Solutions',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free App Idea Validation Tool',
    description: 'Check if your app idea is ready for MVP development.',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

- Always use `next/image` for images
- Always use `next/link` for internal navigation
- Use semantic HTML (`<main>`, `<section>`, `<article>`, `<nav>`, `<h1>` etc.)
- Only one `<h1>` per page
- Add `alt` to every image

---

### Frontend Design Principles

- Use **distinctive fonts** from Google Fonts — avoid Inter, Roboto, Arial (use Poppins or Outfit)
- Commit to a **cohesive color palette** using CSS variables:
  - Primary: `#2563EB` (blue-600)
  - Secondary: `#7C3AED` (violet-600)
  - Accent: `#059669` (emerald-600)
  - Warning: `#D97706` (amber-600)
  - Danger: `#DC2626` (red-600)
  - Background: `#F8FAFC` (slate-50)
  - Dark: `#0F172A` (slate-900)
- Use **Tailwind** for layout; extract repeated patterns into components
- Micro-interactions and hover animations improve UX
- **Never** hardcode colors outside of Tailwind config or CSS variables
- Design must be **mobile-first**
- Prefer **dark/light mode** support via Tailwind's `dark:` variant

---

## 🔧 BACKEND — Node.js + Express + Sequelize Rules

### Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize
- **Database**: PostgreSQL
- **Auth**: JWT (`jsonwebtoken`)
- **Validation**: `express-validator` or `joi`
- **Email**: `nodemailer`
- **PDF**: `pdfkit`
- **Environment**: `dotenv`

---

### Folder Structure (MVC)

```
backend/
├── config/
│   ├── database.js               # Sequelize connection config
│   └── email.js                  # Nodemailer transporter config
│
├── models/
│   ├── index.js                  # Sequelize instance + associations
│   ├── Validation.js             # Validation submission
│   ├── Lead.js                   # Captured lead details
│   ├── AdminUser.js              # Admin users
│   ├── ScoreWeight.js            # Configurable score weights
│   └── EmailTemplate.js          # Email templates
│
├── migrations/                   # Sequelize migrations
│
├── routes/
│   ├── index.js                  # Mounts all route groups
│   ├── validationRoutes.js       # Public: submit validation, get result
│   ├── leadRoutes.js             # Public: capture lead
│   ├── adminAuthRoutes.js        # Admin login
│   ├── adminLeadRoutes.js        # Admin: CRUD leads
│   ├── adminSettingsRoutes.js    # Admin: score weights, templates
│   └── reportRoutes.js           # PDF report generation
│
├── controllers/
│   ├── validationController.js
│   ├── leadController.js
│   ├── adminAuthController.js
│   ├── adminLeadController.js
│   ├── adminSettingsController.js
│   └── reportController.js
│
├── services/
│   ├── validationService.js      # Validation CRUD + scoring orchestration
│   ├── scoringService.js         # Rule-based scoring engine (5 scores)
│   ├── leadService.js            # Lead CRUD + lead scoring (Hot/Warm/Cold)
│   ├── adminAuthService.js       # Admin authentication
│   ├── adminSettingsService.js   # Score weights, email templates
│   ├── emailService.js           # Send emails (user report + sales notification)
│   └── pdfService.js             # PDF report generation
│
├── resources/
│   ├── validationResource.js
│   ├── leadResource.js
│   └── adminResource.js
│
├── middlewares/
│   ├── authMiddleware.js         # JWT verification
│   ├── errorHandler.js           # Global error handler
│   └── validate.js               # Validation middleware
│
├── utils/
│   ├── apiResponse.js            # Standard response wrapper
│   ├── jwtUtil.js                # JWT helpers
│   └── paginate.js               # Pagination helper
│
├── scripts/
│   └── syncDb.js                 # DB sync script
│
├── app.js                        # Express app setup
├── server.js                     # HTTP server entry point
├── .env
└── package.json
```

---

### Scoring Engine Rules

The scoring engine is **rule-based** (no AI required for v1). It calculates 5 scores:

1. **Idea Clarity Score** (0-100): Based on completeness of idea description, target audience clarity, problem definition, differentiation, and MVP feature clarity.

2. **Market Risk Score** (0-100, higher = riskier): Based on competition level, demand uncertainty, user acquisition difficulty, market size clarity, location complexity, regulatory risk, and user validation status.

3. **MVP Feasibility Score** (0-100): Based on feature count, user roles, backend complexity, integrations, admin needs, real-time features, AI needs, and timeline.

4. **Monetization Fit Score** (0-100): Based on user willingness to pay, usage frequency, value delivered, market purchasing power, and revenue model suitability.

5. **Development Complexity Score** (0-100, higher = more complex): Based on platforms, roles, workflows, payment logic, real-time features, AI features, admin control, security, integrations, and reporting.

**Scoring weights are configurable from the admin panel.**

```javascript
// services/scoringService.js - Key structure
// Each score is calculated by:
// 1. Taking user inputs for that dimension
// 2. Applying weighted scoring based on selected options
// 3. Normalizing to 0-100 scale
// 4. Returning score + label + description
```

---

### Lead Scoring Rules

Leads are internally scored as **Hot**, **Warm**, or **Cold**:

**Hot Lead**: Clear idea + has target audience + has budget + timeline 1-3 months + researched competitors + shared phone + wants MVP dev

**Warm Lead**: Interesting idea + flexible timeline + budget not final + needs guidance

**Cold Lead**: No clear problem + no budget + just exploring + no launch plan + no contact number

---

### Email Automation Rules

1. **User Report Email**: Sent after lead capture with validation summary
2. **Sales Notification Email**: Sent to iRoid team on every new lead
3. Both use templates stored in DB (admin-editable)

---

### PDF Report Rules

Generated using PDFKit. Includes:
- iRoid Solutions branding
- Founder name and app idea
- All 5 scores with visual indicators
- Strengths and risks
- MVP recommendation
- Features to build first / delay
- Consultation CTA

---

### MVC Pattern Rules

#### Controller — Only handle HTTP in/out
```javascript
// controllers/validationController.js
const validationService = require('../services/validationService');
const { apiResponse } = require('../utils/apiResponse');

exports.submitValidation = async (req, res, next) => {
  try {
    const result = await validationService.createAndScore(req.body);
    return res.json(apiResponse(true, 'Validation completed', result));
  } catch (err) {
    next(err);
  }
};
```

#### Service — All business logic lives here
```javascript
// services/validationService.js
const { Validation } = require('../models');
const scoringService = require('./scoringService');

exports.createAndScore = async (data) => {
  const scores = scoringService.calculateAllScores(data);
  const validation = await Validation.create({ ...data, ...scores });
  return validation;
};
```

#### Resource — Control what data is returned
```javascript
// resources/validationResource.js
const ValidationResource = {
  single: (v) => ({
    id: v.id,
    ideaName: v.ideaName,
    overallScore: v.overallScore,
    ideaClarity: v.ideaClarity,
    marketRisk: v.marketRisk,
    mvpFeasibility: v.mvpFeasibility,
    monetizationFit: v.monetizationFit,
    developmentComplexity: v.developmentComplexity,
    resultType: v.resultType,
    createdAt: v.createdAt,
  }),
};
module.exports = ValidationResource;
```

**Rule**: Every API response MUST pass through a Resource. No raw Sequelize model objects in responses.

---

### Standard API Response Wrapper

```javascript
// utils/apiResponse.js
exports.apiResponse = (success, message, data = null, meta = null) => ({
  success,
  message,
  ...(data !== null && { data }),
  ...(meta !== null && { meta }),
});
```

---

### Global Error Handler

```javascript
// middlewares/errorHandler.js
exports.errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
```

---

### Model Rules

```javascript
// models/Validation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Validation = sequelize.define('Validation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ideaName: { type: DataTypes.STRING, allowNull: false },
  ideaDescription: { type: DataTypes.TEXT },
  appCategory: { type: DataTypes.STRING },
  appType: { type: DataTypes.ENUM('mobile_app', 'website', 'web_app', 'marketplace', 'saas', 'platform') },
  businessModel: { type: DataTypes.ENUM('b2b', 'b2c', 'b2b2c', 'internal', 'marketplace') },
  ideaNovelty: { type: DataTypes.ENUM('new', 'improvement') },
  targetAudience: { type: DataTypes.STRING },
  audienceScope: { type: DataTypes.ENUM('local', 'national', 'global') },
  ageGroup: { type: DataTypes.STRING },
  userType: { type: DataTypes.STRING },
  usageFrequency: { type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'occasionally', 'one_time') },
  painLevel: { type: DataTypes.ENUM('low', 'medium', 'high', 'urgent') },
  problemDescription: { type: DataTypes.TEXT },
  currentSolution: { type: DataTypes.TEXT },
  problemConsequence: { type: DataTypes.TEXT },
  spokenToUsers: { type: DataTypes.BOOLEAN },
  hasUserFeedback: { type: DataTypes.BOOLEAN },
  hasEarlyCustomers: { type: DataTypes.BOOLEAN },
  problemProven: { type: DataTypes.BOOLEAN },
  hasCompetitors: { type: DataTypes.BOOLEAN },
  competitorNames: { type: DataTypes.TEXT },
  differentiation: { type: DataTypes.TEXT },
  competitorStatus: { type: DataTypes.ENUM('none', 'few', 'many', 'strong', 'not_researched') },
  marketType: { type: DataTypes.ENUM('existing', 'new') },
  monetizationModel: { type: DataTypes.STRING },
  monetizationTiming: { type: DataTypes.ENUM('mvp', 'later') },
  launchLocation: { type: DataTypes.STRING },
  launchScope: { type: DataTypes.ENUM('city', 'state', 'country', 'multi_country', 'global') },
  hasLocalRequirements: { type: DataTypes.BOOLEAN },
  priceSensitive: { type: DataTypes.BOOLEAN },
  hasMarketAccess: { type: DataTypes.BOOLEAN },
  mvpFeatures: { type: DataTypes.JSON },
  userRoles: { type: DataTypes.JSON },
  needsAdminPanel: { type: DataTypes.BOOLEAN },
  needsPayment: { type: DataTypes.BOOLEAN },
  needsChat: { type: DataTypes.BOOLEAN },
  needsLocation: { type: DataTypes.BOOLEAN },
  needsAI: { type: DataTypes.BOOLEAN },
  needsIntegrations: { type: DataTypes.BOOLEAN },
  platformNeeds: { type: DataTypes.STRING },
  // Scores
  ideaClarity: { type: DataTypes.INTEGER },
  marketRisk: { type: DataTypes.INTEGER },
  mvpFeasibility: { type: DataTypes.INTEGER },
  monetizationFit: { type: DataTypes.INTEGER },
  developmentComplexity: { type: DataTypes.INTEGER },
  overallScore: { type: DataTypes.INTEGER },
  resultType: { type: DataTypes.ENUM('ready_for_mvp', 'needs_validation', 'too_broad', 'high_risk', 'strong_complex') },
  recommendedMvp: { type: DataTypes.TEXT },
  featuresToAvoid: { type: DataTypes.TEXT },
  suggestedTech: { type: DataTypes.TEXT },
}, {
  tableName: 'validations',
  timestamps: true,
  underscored: true,
});

module.exports = Validation;
```

---

## 🔒 Security Rules

- **Never** commit `.env` files
- **Never** return password, tokens, or internal fields in API responses
- Use `bcryptjs` for password hashing (min rounds: 10)
- Set `JWT_SECRET` to a long random string (32+ chars)
- Use `helmet` middleware in Express
- Use `cors` with explicit `origin` whitelist
- Rate-limit auth endpoints (`express-rate-limit`)
- Validate all incoming request data before processing

---

## 📦 Package Conventions

### Frontend package.json
```json
{
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "axios": "latest",
    "react-hook-form": "latest",
    "zustand": "latest",
    "tailwindcss": "latest",
    "clsx": "latest"
  }
}
```

### Backend package.json
```json
{
  "dependencies": {
    "express": "latest",
    "sequelize": "latest",
    "pg": "^8.11.0",
    "pg-hstore": "^2.3.4",
    "jsonwebtoken": "latest",
    "bcryptjs": "latest",
    "dotenv": "latest",
    "cors": "latest",
    "helmet": "latest",
    "express-rate-limit": "latest",
    "express-validator": "latest",
    "nodemailer": "latest",
    "pdfkit": "latest"
  },
  "devDependencies": {
    "nodemon": "latest"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "db:sync": "node scripts/syncDb.js"
  }
}
```

---

## 🧠 Claude Behavior Rules

When generating code for this project, Claude must:

1. **Always follow the folder structure** — never place files in wrong directories
2. **Always use Resources** — never return raw Sequelize model instances in responses
3. **Never use TypeScript** — JavaScript only on the frontend
4. **Always use `apiResponse` wrapper** — consistent response format everywhere
5. **Never auto-sync DB** — remind to run `npm run db:sync` when models change
6. **Server-side public API calls** — never call unauthenticated backend from client components
7. **Middleware for protected routes** — use `middleware.js` in Next.js and `authMiddleware.js` in Express
8. **Thin controllers, fat services** — business logic belongs in services only
9. **Add SEO metadata** to every new page using Next.js `metadata` export
10. **Use `next/image` and `next/link`** — never raw `<img>` or `<a>` for internal use
11. **Follow naming conventions**: `camelCase` for JS variables/functions, `PascalCase` for components/models, `kebab-case` for file names
12. **Always hash passwords** with `bcryptjs` before saving to DB
13. **Validate request bodies** before passing to service layer
14. **Use `paranoid: true`** on models for soft deletes where appropriate
15. **Always wrap async route handlers** in try/catch and call `next(err)` on failure
16. **Scoring engine must be rule-based** — no AI dependency for v1
17. **All user-facing text should be professional** and aligned with iRoid Solutions brand

---

## 🗂️ Environment Variables

### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

### Backend `.env`
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=app_idea_validation
DB_USER=postgres
DB_PASSWORD=your_password
DB_DIALECT=postgres
JWT_SECRET=your_super_long_random_secret_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
SALES_EMAIL=daxesh.7224@gmail.com
```

---

## 📋 Validation Tool Steps (8 Steps)

| Step | Name | Fields |
|------|------|--------|
| 1 | Basic Idea | ideaName, ideaDescription, appCategory, appType, businessModel, ideaNovelty |
| 2 | Target Audience | targetAudience, audienceScope, ageGroup, userType, usageFrequency, painLevel |
| 3 | Problem Validation | problemDescription, currentSolution, problemConsequence, spokenToUsers, hasUserFeedback, hasEarlyCustomers, problemProven |
| 4 | Competitor Analysis | hasCompetitors, competitorNames, differentiation, competitorStatus, marketType |
| 5 | Monetization | monetizationModel, monetizationTiming |
| 6 | Launch Location | launchLocation, launchScope, hasLocalRequirements, priceSensitive, hasMarketAccess |
| 7 | MVP Features | mvpFeatures[], userRoles[], needsAdminPanel, needsPayment, needsChat, needsLocation, needsAI, needsIntegrations, platformNeeds |
| 8 | Results | Show scores, capture email |

---

*Last updated: 2026-06-05 | Maintained in CLAUDE.md at project root*
