# SkillForge Supabase Integration

## Overview
SkillForge now has full Supabase authentication and database integration copied from AI_Resume_Analyzer.

## What Was Added

### 1. Supabase Configuration
- **`.env.local`** - Contains Supabase URL and anon key
- **`lib/supabase/client.ts`** - Browser client for Supabase
- **`lib/supabase/middleware.ts`** - Server-side session management
- **`middleware.ts`** - Next.js middleware for auth

### 2. Authentication
- **`lib/auth.ts`** - Authentication functions:
  - `signUp()` - Create new user account
  - `signIn()` - Email/password login
  - `signOut()` - Logout user
  - `signInWithProvider()` - OAuth (Google/GitHub)
  - `getCurrentUser()` - Get current user
  - `isAuthenticated()` - Check auth status

### 3. Database Functions
- **`lib/database.ts`** - Database operations:
  - Resume analysis CRUD
  - Career roadmap CRUD
  - User profile management
  - Activity tracking

### 4. UI Components
- **`components/ProtectedRoute.tsx`** - Route protection wrapper
- **`components/ui/animated-shader-hero.tsx`** - WebGL animated hero component

### 5. Pages
- **`app/page.tsx`** - New landing page with full features section
- **`app/login/page.tsx`** - Login page with Supabase integration
- **`app/signup/page.tsx`** - Signup page with Supabase integration
- **`app/auth/callback/route.ts`** - OAuth callback handler

## Supabase Database Schema

⚠️ **Important**: SkillForge uses the **same Supabase project** as AI_Resume_Analyzer!

This means:
- The database is already set up and running
- Both apps share the same users and data
- You don't need to run SQL migrations
- SQL files are in `supabase/` folder for reference only

### Tables (Already Created):
1. **profiles** - User profiles (auto-created on signup)
2. **resume_analyses** - Stores resume analysis results
3. **career_roadmaps** - Stores generated career roadmaps
4. **user_activity** - Tracks user actions

### Supabase Project Details:
- **URL**: https://zjvrtonyztmejsazhzbe.supabase.co
- **Project**: Shared with AI_Resume_Analyzer
- **Database**: Already configured with all tables and RLS policies

### SQL Files Location:
- See `supabase/` folder for all SQL schema files
- These are for documentation/reference only
- Only run them if setting up a NEW Supabase project

## Usage

### Protecting Routes
```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Protected content</div>
    </ProtectedRoute>
  );
}
```

### Using Auth Functions
```tsx
import { signIn, signUp, signOut, getCurrentUser } from '@/lib/auth';

// Sign up
await signUp('email@example.com', 'password', 'Full Name');

// Sign in
await signIn('email@example.com', 'password');

// Sign out
await signOut();

// Get current user
const user = await getCurrentUser();
```

### Using Database Functions
```tsx
import { saveResumeAnalysis, getResumeAnalyses } from '@/lib/database';

// Save analysis
await saveResumeAnalysis('resume.pdf', 'job description', 85, analysisData);

// Get all analyses
const analyses = await getResumeAnalyses();
```

## Next Steps

1. **Update Dashboard** - Add ProtectedRoute wrapper to dashboard pages
2. **Integrate Resume Analyzer** - Connect resume upload to database
3. **Add Profile Page** - Create user profile management
4. **OAuth Setup** - Configure Google/GitHub OAuth in Supabase dashboard
5. **Email Templates** - Customize Supabase email templates

## Dependencies Installed
- `@supabase/ssr` - Server-side rendering support
- `@supabase/supabase-js` - Supabase JavaScript client

## Running the App
All three services are running:
- Frontend: http://localhost:3000
- FastAPI: http://localhost:8000
- Node.js: http://localhost:8080

## Notes
- The landing page features a stunning WebGL animated background
- OAuth redirect is configured to `/auth/callback`
- All auth state is managed automatically by Supabase
- Session cookies are handled by middleware
