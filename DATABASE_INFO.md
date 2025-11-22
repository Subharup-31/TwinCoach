# Database Information

## ✅ Database is Already Set Up!

SkillForge uses the **same Supabase database** as AI_Resume_Analyzer. This means:

- ✅ All tables are already created
- ✅ All RLS policies are active
- ✅ All triggers and functions are working
- ✅ You can start using it immediately

## Shared Database Benefits

Since both apps use the same database:

1. **Single User Base**: Users created in one app can log into the other
2. **Shared Data**: Resume analyses and roadmaps are accessible from both apps
3. **No Duplicate Setup**: Database is already configured and tested
4. **Consistent Schema**: Both apps use the same data structure

## Database Connection

**Supabase Project**: https://zjvrtonyztmejsazhzbe.supabase.co

Already configured in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://zjvrtonyztmejsazhzbe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Database Schema

### Tables

#### 1. profiles
```sql
- id (UUID, Primary Key, references auth.users)
- full_name (TEXT)
- avatar_url (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 2. resume_analyses
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key to auth.users)
- file_name (TEXT)
- job_description (TEXT)
- ats_score (INTEGER, 0-100)
- analysis_result (JSONB)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 3. career_roadmaps
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key to auth.users)
- current_role (TEXT)
- target_role (TEXT)
- skills (TEXT)
- roadmap_data (JSONB)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 4. user_activity
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key to auth.users)
- activity_type (TEXT)
- metadata (JSONB)
- created_at (TIMESTAMP)
```

## Row Level Security (RLS)

All tables have RLS enabled with policies that ensure:
- Users can only see their own data
- Users can only modify their own data
- Automatic profile creation on signup

## Helper Functions

Available database functions:
- `get_user_resume_count(user_uuid)` - Count user's resumes
- `get_user_roadmap_count(user_uuid)` - Count user's roadmaps
- `get_user_latest_activity(user_uuid, limit)` - Get recent activity
- `get_user_stats(user_uuid)` - Get comprehensive user statistics

## SQL Files

All SQL schema files are in the `supabase/` folder:

```
supabase/
├── 00_run_all.sql              # Master migration file
├── 01_enable_extensions.sql    # PostgreSQL extensions
├── 02_create_profiles.sql      # Profiles table + triggers
├── 03_create_resume_analyses.sql
├── 04_create_career_roadmaps.sql
├── 05_create_user_activity.sql
├── 06_create_rls_policies.sql  # Security policies
├── 07_create_helper_functions.sql
├── 08_seed_data.sql            # Optional test data
└── README.md                   # Setup instructions
```

**Note**: These files are for **documentation only**. The database is already set up!

## When Would You Run SQL Files?

Only run the SQL files if:
1. You're creating a **brand new** Supabase project
2. You want to set up a separate development database
3. You need to recreate the schema from scratch

For the current setup, **you don't need to run anything** - just start coding!

## Verifying Database Access

Test the database connection:

```typescript
import { getCurrentUser } from '@/lib/auth';
import { getProfile, getResumeAnalyses } from '@/lib/database';

// Get current user
const user = await getCurrentUser();
console.log('User:', user?.email);

// Get user profile
const profile = await getProfile();
console.log('Profile:', profile);

// Get resume analyses
const analyses = await getResumeAnalyses();
console.log('Analyses:', analyses.length);
```

## Database Dashboard

Access your database:
1. Go to https://supabase.com
2. Select your project
3. Navigate to:
   - **Table Editor** - View/edit data
   - **SQL Editor** - Run queries
   - **Database** - View schema
   - **Authentication** - Manage users

## Need Help?

- Check `SUPABASE_INTEGRATION.md` for integration details
- See `supabase/README.md` for schema information
- Review `lib/database.ts` for available functions
- Look at `lib/auth.ts` for authentication functions
