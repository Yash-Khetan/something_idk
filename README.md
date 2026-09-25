# PM-AJAY Livelihood Assistant Prototype

A production-deployable full-stack web application prototype for the PM-AJAY problem statement.

## Architecture & Tech Stack

**Frontend:**
- React (TypeScript) + Vite
- React Router
- Tailwind CSS
- Deployed on Vercel

**Backend:**
- Node.js + Express (TypeScript)
- Zod for validation
- Drizzle ORM
- Neon (Serverless PostgreSQL)
- Deployed on Render

## Folder Structure
- `/frontend`: React web application
- `/backend`: Express REST API
- `README.md`: This file

## Local Setup

### 1. Database Setup (Neon)
1. Create a project in [Neon](https://neon.tech/)
2. Copy your connection string (e.g., `postgresql://user:password@hostname/dbname?sslmode=require`)

### 2. Backend
```bash
cd backend
npm install
# Set environment variables
cp .env.example .env 
# Update .env with your Neon DATABASE_URL
# Run migrations
npm run db:generate
npm run db:migrate
# Seed database
npm run db:seed
# Start dev server
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
# Set environment variables
cp .env.example .env
# Update .env if your backend is running on a different port
# Start dev server
npm run dev
```

## API Endpoints

- `GET /api/health` - Check backend status
- `POST /api/beneficiaries` - Create a beneficiary
- `GET /api/beneficiaries` - Get all beneficiaries
- `GET /api/beneficiaries/:id` - Get a specific beneficiary

### Example Requests

**Health Check**
```bash
curl http://localhost:5000/api/health
```

**Create Beneficiary**
```bash
curl -X POST http://localhost:5000/api/beneficiaries \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "language": "English", "state": "Delhi"}'
```

## Deployment

### Backend (Render)
1. Create a Web Service on Render.
2. Build command: `npm install && npm run build`
3. Start command: `npm start`
4. Set Environment Variables: `DATABASE_URL`, `FRONTEND_URL`

### Frontend (Vercel)
1. Create a Project on Vercel.
2. Framework Preset: Vite
3. Root Directory: `frontend`
4. Build Command: `npm run build`
5. Set Environment Variable: `VITE_API_URL` to your Render backend URL

## Future Phases
- Integrate Recommendation Engine
- Add Multi-lingual Voice Interface
- Implement Authentication & RBAC
- NSQF matching
