# SQL Execution Checklist ✅

## Before You Start

- [ ] Created new Supabase project
- [ ] Saved Project URL and anon key
- [ ] Updated `frontend/.env.local` with credentials
- [ ] Opened Supabase Dashboard → SQL Editor

---

## Execute in This Order

### ✅ Step 1: Extensions
**File:** `01_enable_extensions.sql`

**What it does:** Enables UUID generation and encryption

**Status:** [ ] Done

---

### ✅ Step 2: Profiles Table
**File:** `02_create_profiles.sql`

**What it does:** 
- Creates user profiles table
- Auto-creates profile on signup
- Adds updated_at trigger

**Status:** [ ] Done

---

### ✅ Step 3: Resume Analyses
**File:** `03_create_resume_analyses.sql`

**What it does:** Stores resume analysis results

**Status:** [ ] Done

---

### ✅ Step 4: Career Roadmaps
**File:** `04_create_career_roadmaps.sql`

**What it does:** Stores generated career roadmaps

**Status:** [ ] Done

---

### ✅ Step 5: User Activity
**File:** `05_create_user_activity.sql`

**What it does:** Tracks user actions

**Status:** [ ] Done

---

### ✅ Step 6: Interview Results
**File:** `09_create_interview_results.sql`

**What it does:** Stores interview session data

**Status:** [ ] Done

---

### ✅ Step 7: Certificates
**File:** `10_create_certificates.sql`

**What it does:** Stores generated certificates

**Status:** [ ] Done

---

### ✅ Step 8: RLS Policies
**File:** `06_create_rls_policies.sql`

**What it does:** Sets up security policies

**Status:** [ ] Done

---

### ✅ Step 9: Helper Functions (Optional)
**File:** `07_create_helper_functions.sql`

**What it does:** Utility functions for stats

**Status:** [ ] Done

---

## Verification Checklist

After running all SQL:

### In Supabase Dashboard:

#### Table Editor
- [ ] profiles table exists
- [ ] resume_analyses table exists
- [ ] career_roadmaps table exists
- [ ] user_activity table exists
- [ ] interview_results table exists
- [ ] certificates table exists

#### Authentication → Policies
- [ ] profiles has 2 policies
- [ ] resume_analyses has 4 policies
- [ ] career_roadmaps has 4 policies
- [ ] user_activity has 2 policies
- [ ] interview_results has 4 policies
- [ ] certificates has 4 policies

#### Database → Extensions
- [ ] uuid-ossp is enabled
- [ ] pgcrypto is enabled

---

## Test Your Setup

### 1. Test Authentication
- [ ] Go to http://localhost:3000/signup
- [ ] Create test account
- [ ] Check Supabase → Authentication → Users
- [ ] User should appear

### 2. Test Profile Auto-Creation
- [ ] Check Table Editor → profiles
- [ ] Profile should exist for your user
- [ ] full_name should be populated

### 3. Test Interview Flow
- [ ] Go to /dashboard/interview?new=true
- [ ] Complete interview
- [ ] Check Table Editor → interview_results
- [ ] Interview should be saved

### 4. Test Certificate Generation
- [ ] View interview results
- [ ] Click "Generate Certificate"
- [ ] Check Table Editor → certificates
- [ ] Certificate should be saved

---

## Common Issues

### ❌ "relation does not exist"
**Fix:** Run files in correct order, don't skip any

### ❌ "permission denied"
**Fix:** Re-run RLS policies file

### ❌ "function does not exist"
**Fix:** Run helper functions file

### ❌ Tables not showing
**Fix:** Refresh page, check for SQL errors

---

## Quick Verification SQL

Run this in SQL Editor to see all tables:

```sql
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
ORDER BY table_name;
```

Should return:
```
career_roadmaps      | 7
certificates         | 10
interview_results    | 8
profiles             | 4
resume_analyses      | 7
user_activity        | 4
```

---

## Files Location

All SQL files are in: `SkillForge/supabase/`

```
supabase/
├── 01_enable_extensions.sql       ← Start here
├── 02_create_profiles.sql
├── 03_create_resume_analyses.sql
├── 04_create_career_roadmaps.sql
├── 05_create_user_activity.sql
├── 06_create_rls_policies.sql
├── 07_create_helper_functions.sql
├── 09_create_interview_results.sql
└── 10_create_certificates.sql     ← End here
```

---

## Need Help?

See these guides:
- `SUPABASE_QUICK_SETUP.md` - Copy-paste SQL commands
- `SUPABASE_NEW_PROJECT_SETUP.md` - Detailed step-by-step
- `DATABASE_INFO.md` - Database schema reference

---

## ✅ All Done!

When all checkboxes are checked:
- [ ] All SQL files executed
- [ ] All tables verified
- [ ] All policies verified
- [ ] Test account created
- [ ] Profile auto-created
- [ ] Interview tested
- [ ] Certificate generated

**You're ready to use SkillForge!** 🎉
