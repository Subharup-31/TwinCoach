# Quick Supabase Setup - Copy & Paste Guide

## 🚀 Fast Setup (5 Minutes)

### Step 1: Create Project
1. Go to https://supabase.com → New Project
2. Save your **Project URL** and **anon key**
3. Update `frontend/.env.local` with your credentials

### Step 2: Run SQL Files

Go to Supabase Dashboard → **SQL Editor** → **New Query**

Copy and paste each section below, one at a time, and click **RUN** after each.

---

## 📋 SQL Commands (Copy & Paste in Order)

### 1️⃣ Enable Extensions
```sql
-- Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```
✅ Click **RUN**

---

### 2️⃣ Create Profiles Table
```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```
✅ Click **RUN**

---

### 3️⃣ Create Resume Analyses Table
```sql
-- Create resume_analyses table
CREATE TABLE IF NOT EXISTS public.resume_analyses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    file_name TEXT NOT NULL,
    job_description TEXT,
    ats_score INTEGER CHECK (ats_score >= 0 AND ats_score <= 100),
    analysis_result JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS resume_analyses_user_id_idx ON public.resume_analyses(user_id);
CREATE INDEX IF NOT EXISTS resume_analyses_created_at_idx ON public.resume_analyses(created_at DESC);

DROP TRIGGER IF EXISTS set_updated_at ON public.resume_analyses;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.resume_analyses
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```
✅ Click **RUN**

---

### 4️⃣ Create Career Roadmaps Table
```sql
-- Create career_roadmaps table
CREATE TABLE IF NOT EXISTS public.career_roadmaps (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    "current_role" TEXT NOT NULL,
    "target_role" TEXT NOT NULL,
    skills TEXT,
    roadmap_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.career_roadmaps ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS career_roadmaps_user_id_idx ON public.career_roadmaps(user_id);
CREATE INDEX IF NOT EXISTS career_roadmaps_created_at_idx ON public.career_roadmaps(created_at DESC);

DROP TRIGGER IF EXISTS set_updated_at ON public.career_roadmaps;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.career_roadmaps
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```
✅ Click **RUN**

---

### 5️⃣ Create User Activity Table
```sql
-- Create user_activity table
CREATE TABLE IF NOT EXISTS public.user_activity (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    activity_type TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS user_activity_user_id_idx ON public.user_activity(user_id);
CREATE INDEX IF NOT EXISTS user_activity_created_at_idx ON public.user_activity(created_at DESC);
CREATE INDEX IF NOT EXISTS user_activity_type_idx ON public.user_activity(activity_type);
```
✅ Click **RUN**

---

### 6️⃣ Create Interview Results Table
```sql
-- Create interview_results table
CREATE TABLE IF NOT EXISTS public.interview_results (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL,
    score INTEGER CHECK (score >= 0 AND score <= 100) NOT NULL,
    questions JSONB,
    strengths TEXT[],
    weaknesses TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.interview_results ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS interview_results_user_id_idx ON public.interview_results(user_id);
CREATE INDEX IF NOT EXISTS interview_results_created_at_idx ON public.interview_results(created_at DESC);
CREATE INDEX IF NOT EXISTS interview_results_score_idx ON public.interview_results(score DESC);

DROP TRIGGER IF EXISTS set_updated_at ON public.interview_results;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.interview_results
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```
✅ Click **RUN**

---

### 7️⃣ Create Certificates Table
```sql
-- Create certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    interview_id UUID REFERENCES public.interview_results(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    score INTEGER CHECK (score >= 0 AND score <= 100) NOT NULL,
    certificate_data JSONB,
    minted BOOLEAN DEFAULT FALSE,
    blockchain_hash TEXT,
    minted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS certificates_user_id_idx ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS certificates_interview_id_idx ON public.certificates(interview_id);
CREATE INDEX IF NOT EXISTS certificates_created_at_idx ON public.certificates(created_at DESC);
CREATE INDEX IF NOT EXISTS certificates_minted_idx ON public.certificates(minted);

DROP TRIGGER IF EXISTS set_updated_at ON public.certificates;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.certificates
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```
✅ Click **RUN**

---

### 8️⃣ Create RLS Policies
```sql
-- Row Level Security Policies

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Resume analyses policies
CREATE POLICY "Users can view their own resume analyses"
    ON public.resume_analyses FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own resume analyses"
    ON public.resume_analyses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resume analyses"
    ON public.resume_analyses FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resume analyses"
    ON public.resume_analyses FOR DELETE
    USING (auth.uid() = user_id);

-- Career roadmaps policies
CREATE POLICY "Users can view their own career roadmaps"
    ON public.career_roadmaps FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own career roadmaps"
    ON public.career_roadmaps FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own career roadmaps"
    ON public.career_roadmaps FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own career roadmaps"
    ON public.career_roadmaps FOR DELETE
    USING (auth.uid() = user_id);

-- User activity policies
CREATE POLICY "Users can view their own activity"
    ON public.user_activity FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity"
    ON public.user_activity FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Interview results policies
CREATE POLICY "Users can view their own interview results"
    ON public.interview_results FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interview results"
    ON public.interview_results FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interview results"
    ON public.interview_results FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interview results"
    ON public.interview_results FOR DELETE
    USING (auth.uid() = user_id);

-- Certificates policies
CREATE POLICY "Users can view their own certificates"
    ON public.certificates FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own certificates"
    ON public.certificates FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own certificates"
    ON public.certificates FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own certificates"
    ON public.certificates FOR DELETE
    USING (auth.uid() = user_id);
```
✅ Click **RUN**

---

### 9️⃣ Create Helper Functions (Optional)
```sql
-- Helper functions for common operations

CREATE OR REPLACE FUNCTION public.get_user_resume_count(user_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)::INTEGER
        FROM public.resume_analyses
        WHERE user_id = user_uuid
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_user_roadmap_count(user_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)::INTEGER
        FROM public.career_roadmaps
        WHERE user_id = user_uuid
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_user_stats(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'resume_count', (SELECT COUNT(*) FROM public.resume_analyses WHERE user_id = user_uuid),
        'roadmap_count', (SELECT COUNT(*) FROM public.career_roadmaps WHERE user_id = user_uuid),
        'activity_count', (SELECT COUNT(*) FROM public.user_activity WHERE user_id = user_uuid),
        'avg_ats_score', (SELECT COALESCE(AVG(ats_score), 0) FROM public.resume_analyses WHERE user_id = user_uuid),
        'last_activity', (SELECT MAX(created_at) FROM public.user_activity WHERE user_id = user_uuid)
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```
✅ Click **RUN**

---

## ✅ Verification

After running all commands, verify in Supabase:

1. **Table Editor** → Should see 6 tables:
   - profiles
   - resume_analyses
   - career_roadmaps
   - user_activity
   - interview_results
   - certificates

2. **Authentication** → **Policies** → Each table should have RLS policies

3. **SQL Editor** → Run this to verify:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Should return all 6 tables.

---

## 🎉 Done!

Your database is ready! Now:

1. Update `.env.local` with your credentials
2. Restart frontend: `npm run dev`
3. Test: http://localhost:3000/signup

---

## 📝 Quick Reference

**Execution Order:**
1. Extensions
2. Profiles
3. Resume Analyses
4. Career Roadmaps
5. User Activity
6. Interview Results
7. Certificates
8. RLS Policies
9. Helper Functions (optional)

**Total Time:** ~5 minutes
**Total SQL Blocks:** 9
