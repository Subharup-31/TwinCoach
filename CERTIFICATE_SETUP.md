# Certificate System - Quick Setup Guide

## ✅ What's Been Added

### New Features:
1. **Interview Results Tracking** - Saves interview data to database
2. **Certificate Generation** - Beautiful certificate design with download
3. **Certificate Management** - View all earned certificates
4. **Database Integration** - New tables for interviews and certificates

## 🚀 Setup Steps

### 1. Run SQL Migrations

You need to create two new tables in your Supabase database:

**Option A: Run Individual Files**
1. Go to Supabase Dashboard → SQL Editor
2. Run `09_create_interview_results.sql`
3. Run `10_create_certificates.sql`

**Option B: Run Master File**
1. Go to Supabase Dashboard → SQL Editor
2. Run `00_run_all.sql` (includes all migrations)

### 2. Verify Installation

Dependencies are already installed:
- ✅ `html2canvas` - For certificate downloads
- ✅ `@supabase/supabase-js` - Database client
- ✅ `framer-motion` - Animations

### 3. Test the Flow

1. **Start Interview**
   ```
   http://localhost:3000/dashboard/interview?new=true
   ```

2. **Complete Interview**
   - Answer questions
   - Get scored

3. **View Results**
   ```
   http://localhost:3000/dashboard/interview/results
   ```
   - See your score
   - View strengths/weaknesses
   - Click "Generate Certificate"

4. **Generate Certificate**
   ```
   http://localhost:3000/dashboard/certificates/generate?interviewId=xxx
   ```
   - Preview certificate
   - Click "Generate Certificate"
   - Download as PNG
   - Share (if supported)

5. **View All Certificates**
   ```
   http://localhost:3000/dashboard/certificates
   ```
   - See all earned certificates
   - Track minting status

## 📊 Database Tables

### interview_results
Stores interview session data:
- User ID
- Role/Position
- Score (0-100)
- Questions with feedback
- Strengths array
- Weaknesses array

### certificates
Stores generated certificates:
- User ID
- Interview ID (reference)
- Role/Position
- Score
- Certificate data (JSON)
- Minted status (for blockchain)
- Blockchain hash (when minted)

## 🎨 Certificate Design

The certificate includes:
- SkillForge branding
- User's full name
- Job role/position
- Score badge
- Date of achievement
- Unique certificate ID
- Professional layout with gradients

## 🔧 API Functions

### New Functions in `lib/database.ts`:

```typescript
// Interview Results
saveInterviewResult(role, score, questions, strengths, weaknesses)
getInterviewResults()
getInterviewResult(id)

// Certificates
saveCertificate(interviewId, role, score, certificateData)
getCertificates()
getCertificate(id)
mintCertificate(id, blockchainHash)
getUserName()
```

## 📱 Pages Added/Updated

### New Pages:
- `/dashboard/certificates/generate` - Certificate generation page

### Updated Pages:
- `/dashboard/interview/results` - Added "Generate Certificate" button
- `/dashboard/certificates` - Now fetches from database

## 🔐 Security

All tables have Row Level Security (RLS):
- Users can only see their own data
- Automatic user ID attachment
- Secure database access

## 🎯 User Flow

```
┌─────────────┐
│  Interview  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Results   │ ← Shows score, feedback
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Generate   │ ← Click "Generate Certificate"
│ Certificate │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Download/  │ ← Save as PNG or share
│    Share    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  View All   │ ← See all certificates
│Certificates │
└─────────────┘
```

## ✨ Features

### Certificate Generation:
- ✅ Beautiful design with gradients
- ✅ User name from profile
- ✅ Role and score display
- ✅ Date of achievement
- ✅ Unique certificate ID
- ✅ Download as PNG (high quality)
- ✅ Share functionality
- ✅ Responsive design

### Certificate Management:
- ✅ View all certificates
- ✅ Grid layout
- ✅ Minting status
- ✅ Empty state with CTA
- ✅ Loading states

### Database Integration:
- ✅ Save interview results
- ✅ Save certificates
- ✅ Track minting status
- ✅ User-specific data
- ✅ RLS policies

## 🚀 Next Steps

### Immediate:
1. Run SQL migrations in Supabase
2. Test the interview flow
3. Generate a test certificate
4. Verify download works

### Future Enhancements:
1. **Blockchain Minting**
   - Integrate with blockchain
   - Mint certificates as NFTs
   - Store transaction hashes

2. **Certificate Verification**
   - Public verification page
   - QR code on certificates
   - Blockchain verification

3. **Social Sharing**
   - LinkedIn integration
   - Twitter cards
   - Custom share images

4. **Email Delivery**
   - Send certificate via email
   - PDF generation
   - Automated delivery

## 📝 SQL Migration Commands

Copy and paste these in Supabase SQL Editor:

### Create interview_results table:
```sql
-- See: supabase/09_create_interview_results.sql
```

### Create certificates table:
```sql
-- See: supabase/10_create_certificates.sql
```

Or run the master file:
```sql
-- See: supabase/00_run_all.sql
```

## 🐛 Troubleshooting

### Certificate not generating?
- Check browser console for errors
- Verify user is authenticated
- Ensure interview results exist

### Download not working?
- Verify html2canvas is installed
- Try different browser
- Check browser console

### Certificates not loading?
- Run SQL migrations
- Check RLS policies
- Verify authentication

## 📚 Documentation

- `CERTIFICATE_SYSTEM.md` - Complete system documentation
- `supabase/09_create_interview_results.sql` - Interview results table
- `supabase/10_create_certificates.sql` - Certificates table
- `lib/database.ts` - API functions

## ✅ Checklist

Before testing:
- [ ] Run SQL migrations in Supabase
- [ ] Verify tables exist in Supabase dashboard
- [ ] Check RLS policies are active
- [ ] Ensure user is authenticated
- [ ] Frontend is running (npm run dev)

## 🎉 You're Ready!

The certificate system is fully set up and ready to use. Complete an interview and earn your first certificate!

**Test URL**: http://localhost:3000/dashboard/interview?new=true
