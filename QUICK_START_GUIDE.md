# SkillForge Quick Start Guide

## 🚀 Your App is Running!

### Access Points
- **Landing Page**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Signup**: http://localhost:3000/signup
- **Dashboard**: http://localhost:3000/dashboard
- **FastAPI Docs**: http://localhost:8000/docs
- **Node.js Backend**: http://localhost:8080

## 🎯 Quick Test Flow

1. **Visit Landing Page**
   - Go to http://localhost:3000
   - See the animated WebGL hero background
   - Scroll through features, pricing, testimonials

2. **Create Account**
   - Click "Get Started" or go to /signup
   - Enter email, password, and name
   - Click "Create Account"
   - You'll be redirected to dashboard

3. **Login**
   - Go to /login
   - Enter your credentials
   - Access protected dashboard

## 🔐 Supabase Credentials

Already configured in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://zjvrtonyztmejsazhzbe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📝 Common Tasks

### Protect a Route
```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MyPage() {
  return (
    <ProtectedRoute>
      <div>Protected content here</div>
    </ProtectedRoute>
  );
}
```

### Get Current User
```tsx
import { getCurrentUser } from '@/lib/auth';

const user = await getCurrentUser();
console.log(user?.email);
```

### Save Data to Database
```tsx
import { saveResumeAnalysis } from '@/lib/database';

await saveResumeAnalysis(
  'resume.pdf',
  'Job description here',
  85,
  { /* analysis data */ }
);
```

## 🛠️ Development Commands

### Start All Services
```bash
# From SkillForge root
./start-dev.bat
```

### Individual Services
```bash
# Frontend
cd frontend && npm run dev

# FastAPI Backend
cd backend/fastapi && python main.py

# Node.js Backend
cd backend/node && node server.js
```

## 📦 What's Included

### Frontend Features
- ✅ Next.js 16 with Turbopack
- ✅ Tailwind CSS
- ✅ Framer Motion animations
- ✅ WebGL shader backgrounds
- ✅ Supabase authentication
- ✅ Protected routes
- ✅ Responsive design

### Backend Features
- ✅ FastAPI (Python) - AI/ML endpoints
- ✅ Node.js - WebSocket for interviews
- ✅ Ollama integration
- ✅ Resume scoring
- ✅ Interview AI

### Database
- ✅ Supabase PostgreSQL
- ✅ User profiles
- ✅ Resume analyses
- ✅ Career roadmaps
- ✅ Activity tracking

## 🎨 Customization

### Change Landing Page Content
Edit `frontend/app/page.tsx`:
- Update headline text
- Modify feature cards
- Change pricing tiers
- Update testimonials

### Modify Auth Flow
Edit auth functions in `frontend/lib/auth.ts`:
- Add custom validation
- Modify redirect URLs
- Add additional user metadata

### Update Database Schema
1. Go to Supabase dashboard
2. Navigate to Table Editor
3. Modify tables or add new ones
4. Update RLS policies as needed

## 🐛 Troubleshooting

### Frontend Won't Start
```bash
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

### Auth Not Working
- Check `.env.local` exists
- Verify Supabase credentials
- Check browser console for errors

### Database Errors
- Verify user is authenticated
- Check RLS policies in Supabase
- Ensure tables exist

## 📚 Documentation Files

- `MIGRATION_COMPLETE.md` - Full migration details
- `SUPABASE_INTEGRATION.md` - Supabase setup guide
- `PROJECT_GUIDE.md` - Overall project structure
- `README.md` - Project overview

## 🎉 You're All Set!

SkillForge is fully configured with:
- Beautiful landing page
- Complete authentication system
- Database integration
- All backend services running

Start building your features! 🚀
