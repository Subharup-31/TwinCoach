# Setting Up a New Supabase Project for SkillForge

## Step 1: Create New Supabase Project

1. Go to https://supabase.com
2. Click "New Project"
3. Fill in:
   - **Name**: SkillForge (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine for development
4. Click "Create new project"
5. Wait 2-3 minutes for project to be ready

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

## Step 3: Update Your .env.local File

Open `SkillForge/frontend/.env.local` and replace with your new credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

## Step 4: Execute SQL Files in Order

Go to your Supabase dashboard → **SQL Editor** → Click "New query"

### Method A: Run All at Once (Recommended)

Copy and paste the entire content of each file in this exact order:

#### 1. Enable Extensions
```sql
-- File: 01_enable_extensions.sql
-- Copy the entire content and run it
```

**Content to paste:**
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

✅ Click **RUN** → Should see "Success. No rows returned"

---

#### 2. Create Profiles Table
```sql
-- File: 02_create_profiles.sql
-- Copy the entire content and run it
```

**What to paste:** Open `supabase/02_create_profiles.sql` and copy everything

✅ Click **RUN** → Should see "Success. No rows returned"

---

#### 3. Create Resume Analyses Table
```sql
-- File: 03_create_resume_analyses.sql
```

**What to paste:** Open `supabase/03_create_resume_analyses.sql` and copy everything

✅ Click **RUN** → Should see "Success. No rows returned"

---

#### 4. Create Career Roadmaps Table
```sql
-- File: 04_create_career_roadmaps.sql
```

**What to paste:** Open `supabase/04_create_career_roadmaps.sql` and copy everything

✅ Click **RUN** → Should see "Success. No rows returned"

---

#### 5. Create User Activity Table
```sql
-- File: 05_create_user_activity.sql
```

**What to paste:** Open `supabase/05_create_user_activity.sql` and copy everything

✅ Click **RUN** → Should see "Success. No rows returned"

---

#### 6. Create RLS Policies
```sql
-- File: 06_create_rls_policies.sql
```

**What to paste:** Open `supabase/06_create_rls_policies.sql` and copy everything

✅ Click **RUN** → Should see "Success. No rows returned"

---

#### 7. Create Helper Functions
```sql
-- File: 07_create_helper_functions.sql
```

**What to paste:** Open `supabase/07_create_helper_functions.sql` and copy everything

✅ Click **RUN** → Should see "Success. No rows returned"

---

#### 8. Create Interview Results Table
```sql
-- File: 09_create_interview_results.sql
```

**What to paste:** Open `supabase/09_create_interview_results.sql` and copy everything

✅ Click **RUN** → Should see "Success. No rows returned"

---

#### 9. Create Certificates Table
```sql
-- File: 10_create_certificates.sql
```

**What to paste:** Open `supabase/10_create_certificates.sql` and copy everything

✅ Click **RUN** → Should see "Success. No rows returned"

---

### Method B: Run Individual Queries (Alternative)

If you prefer, you can run each file separately:

1. Go to SQL Editor
2. Click "New query"
3. Copy content from file
4. Paste and run
5. Repeat for each file in order

## Step 5: Verify Tables Were Created

1. In Supabase dashboard, go to **Table Editor**
2. You should see these tables:
   - ✅ profiles
   - ✅ resume_analyses
   - ✅ career_roadmaps
   - ✅ user_activity
   - ✅ interview_results
   - ✅ certificates

## Step 6: Verify RLS Policies

1. Go to **Authentication** → **Policies**
2. Each table should have policies like:
   - "Users can view their own..."
   - "Users can insert their own..."
   - "Users can update their own..."
   - "Users can delete their own..."

## Step 7: Enable Email Auth (Optional but Recommended)

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email templates if desired

## Step 8: Configure OAuth (Optional)

If you want Google/GitHub login:

### Google OAuth:
1. Go to **Authentication** → **Providers** → **Google**
2. Enable Google provider
3. Add your Google OAuth credentials
4. Add authorized redirect URL: `http://localhost:3000/auth/callback`

### GitHub OAuth:
1. Go to **Authentication** → **Providers** → **GitHub**
2. Enable GitHub provider
3. Add your GitHub OAuth credentials
4. Add authorized redirect URL: `http://localhost:3000/auth/callback`

## Step 9: Test Your Setup

### Test Database Connection:

1. Restart your frontend:
   ```bash
   cd SkillForge/frontend
   npm run dev
   ```

2. Go to http://localhost:3000/signup

3. Create a test account

4. Check Supabase dashboard → **Authentication** → **Users**
   - You should see your new user

5. Check **Table Editor** → **profiles**
   - A profile should be auto-created for your user

## Step 10: Test Certificate Flow

1. Go to http://localhost:3000/dashboard/interview?new=true
2. Complete an interview
3. View results
4. Generate certificate
5. Check **Table Editor**:
   - **interview_results** should have your interview
   - **certificates** should have your certificate

## Troubleshooting

### Error: "relation does not exist"
- You didn't run all SQL files
- Run them in the correct order

### Error: "permission denied"
- RLS policies not set up correctly
- Re-run `06_create_rls_policies.sql`

### Error: "function does not exist"
- Helper functions not created
- Run `07_create_helper_functions.sql`

### Tables not showing in Table Editor
- Wait a few seconds and refresh
- Check SQL Editor for error messages
- Verify you're in the correct project

### Authentication not working
- Check `.env.local` has correct credentials
- Restart frontend server
- Clear browser cache/cookies

## Quick Verification Checklist

After setup, verify:

- [ ] All 6 tables exist in Table Editor
- [ ] RLS is enabled on all tables (green shield icon)
- [ ] Policies exist for each table
- [ ] Extensions are enabled (uuid-ossp, pgcrypto)
- [ ] `.env.local` has correct credentials
- [ ] Can create a user account
- [ ] Profile auto-creates on signup
- [ ] Can complete interview
- [ ] Can generate certificate

## SQL Execution Order Summary

```
1. 01_enable_extensions.sql       ← PostgreSQL extensions
2. 02_create_profiles.sql          ← User profiles + trigger
3. 03_create_resume_analyses.sql   ← Resume data
4. 04_create_career_roadmaps.sql   ← Roadmap data
5. 05_create_user_activity.sql     ← Activity tracking
6. 06_create_rls_policies.sql      ← Security policies
7. 07_create_helper_functions.sql  ← Utility functions
8. 09_create_interview_results.sql ← Interview data
9. 10_create_certificates.sql      ← Certificate data
```

## Important Notes

⚠️ **Run files in this exact order!** Some files depend on previous ones.

⚠️ **Don't skip files!** Each one is necessary for the system to work.

⚠️ **Check for errors!** If a file fails, fix it before continuing.

## Need Help?

If you encounter issues:

1. Check the error message in SQL Editor
2. Verify you ran all previous files
3. Check you're using the correct Supabase project
4. Try running the file again
5. Check browser console for frontend errors

## Success! 🎉

Once all steps are complete:
- Your database is fully set up
- Authentication is working
- All features are enabled
- You can start using SkillForge!

**Test it:** http://localhost:3000
