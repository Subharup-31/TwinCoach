# Certificate System Documentation

## Overview
SkillForge now has a complete certificate generation system that allows users to earn certificates after completing interviews.

## Features

### 1. Interview Results Tracking
- Automatically saves interview results to database
- Stores score, questions, strengths, and weaknesses
- Links to certificate generation

### 2. Certificate Generation
- Beautiful certificate design with gradient backgrounds
- Displays user name, role, score, and date
- Unique certificate ID for verification
- Professional layout with decorative borders

### 3. Certificate Management
- View all earned certificates
- Download certificates as PNG images
- Share certificates (on supported devices)
- Track minting status (blockchain integration ready)

## User Flow

```
Interview → Results → Generate Certificate → Download/Share → View All Certificates
```

### Step-by-Step:

1. **Complete Interview**
   - User completes interview at `/dashboard/interview`
   - System calculates score and feedback

2. **View Results**
   - Results displayed at `/dashboard/interview/results`
   - Shows score, strengths, weaknesses, question breakdown
   - "Generate Certificate" button appears

3. **Generate Certificate**
   - Click "Generate Certificate" button
   - System saves interview results to database
   - Redirects to `/dashboard/certificates/generate?interviewId=xxx`

4. **Certificate Preview**
   - Beautiful certificate preview shown
   - User can generate, download, or share
   - Certificate saved to database with unique ID

5. **View All Certificates**
   - Access at `/dashboard/certificates`
   - Grid view of all earned certificates
   - Shows role, score, date, and minting status

## Database Schema

### interview_results Table
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- role (TEXT) - Job role/position
- score (INTEGER) - 0-100
- questions (JSONB) - Array of questions with scores
- strengths (TEXT[]) - Array of strengths
- weaknesses (TEXT[]) - Array of weaknesses
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### certificates Table
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- interview_id (UUID, Foreign Key)
- role (TEXT) - Job role/position
- score (INTEGER) - 0-100
- certificate_data (JSONB) - Additional certificate info
- minted (BOOLEAN) - Blockchain minting status
- blockchain_hash (TEXT) - Hash if minted
- minted_at (TIMESTAMP) - When minted
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## API Functions

### Database Functions (lib/database.ts)

#### Interview Results
```typescript
// Save interview results
saveInterviewResult(role, score, questions, strengths, weaknesses)

// Get all interview results for user
getInterviewResults()

// Get specific interview result
getInterviewResult(id)
```

#### Certificates
```typescript
// Save certificate
saveCertificate(interviewId, role, score, certificateData)

// Get all certificates for user
getCertificates()

// Get specific certificate
getCertificate(id)

// Mark certificate as minted on blockchain
mintCertificate(id, blockchainHash)

// Get user's full name
getUserName()
```

## Pages

### 1. Interview Results Page
**Path**: `/dashboard/interview/results`

Features:
- Overall score display
- Strengths and weaknesses cards
- Question breakdown with individual scores
- "Generate Certificate" button
- "Practice Again" button

### 2. Certificate Generation Page
**Path**: `/dashboard/certificates/generate?interviewId=xxx`

Features:
- Beautiful certificate preview
- User name, role, score, date
- Decorative borders and gradients
- Generate button (saves to database)
- Download button (exports as PNG)
- Share button (native sharing)
- Certificate ID display

### 3. Certificates List Page
**Path**: `/dashboard/certificates`

Features:
- Grid view of all certificates
- Certificate cards with role, score, date
- Minting status indicator
- "Earn New Certificate" button
- Empty state with call-to-action

## Components

### CertificateCard
**Path**: `components/certificate-card.tsx`

Props:
```typescript
{
  certificate: {
    role: string;
    score: number;
    date: string;
    minted: boolean;
  }
}
```

Displays:
- Award icon with gradient background
- Role name
- Score badge
- Date
- Minting status

## Certificate Design

### Visual Elements:
- **Background**: Gradient from purple-50 via white to blue-50
- **Borders**: Double decorative border (purple-200 and purple-100)
- **Logo**: Circular gradient badge with Award icon
- **Title**: "SkillForge" in large bold text
- **Subtitle**: "Certificate of Achievement"
- **Recipient**: User's full name in large text
- **Role**: Job role in purple gradient
- **Score**: Circular badge with gradient background
- **Date**: Formatted date (e.g., "November 22, 2025")
- **Signature**: Signature line with "SkillForge AI"
- **ID**: Unique certificate ID (truncated)

### Download Feature:
- Uses `html2canvas` library
- Exports certificate as PNG image
- Scale: 2x for high quality
- Background: White
- Filename: `skillforge-certificate-{role}.png`

## Future Enhancements

### Blockchain Integration
The system is ready for blockchain minting:

1. **Mint Certificate**
   - Call blockchain API to mint NFT
   - Store transaction hash
   - Update `minted` status
   - Set `minted_at` timestamp

2. **Verify Certificate**
   - Check blockchain for certificate hash
   - Verify authenticity
   - Display verification status

### Additional Features
- Email certificate to user
- Social media sharing with preview
- Certificate templates (different designs)
- Certificate verification page (public)
- Certificate analytics (views, shares)
- Batch certificate generation
- Certificate expiration dates
- Certificate revocation

## Setup Instructions

### 1. Run SQL Migrations
```sql
-- Run these in Supabase SQL Editor
\i 09_create_interview_results.sql
\i 10_create_certificates.sql
```

Or run the master file:
```sql
\i 00_run_all.sql
```

### 2. Install Dependencies
```bash
cd frontend
npm install html2canvas
```

### 3. Test the Flow
1. Go to `/dashboard/interview?new=true`
2. Complete an interview
3. View results at `/dashboard/interview/results`
4. Click "Generate Certificate"
5. Download or share your certificate
6. View all certificates at `/dashboard/certificates`

## Security

### Row Level Security (RLS)
All tables have RLS policies ensuring:
- Users can only view their own data
- Users can only create/update their own records
- No cross-user data access

### Authentication
- All API calls require authenticated user
- User ID automatically attached to records
- Session managed by Supabase

## Troubleshooting

### Certificate Not Generating
- Check browser console for errors
- Verify user is authenticated
- Ensure interview results exist
- Check database connection

### Download Not Working
- Verify html2canvas is installed
- Check browser compatibility
- Try different browser
- Check console for errors

### Certificates Not Loading
- Verify database tables exist
- Check RLS policies are active
- Ensure user is authenticated
- Check network tab for API errors

## API Endpoints

All database operations use Supabase client:
- No custom API endpoints needed
- Direct database access via RLS
- Real-time updates supported
- Automatic caching

## Performance

### Optimizations:
- Lazy loading of certificates
- Image optimization for downloads
- Efficient database queries
- Indexed columns for fast lookups

### Caching:
- Certificate data cached in state
- Interview results cached
- User profile cached

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast colors
- Readable font sizes

## Mobile Support

- Responsive design
- Touch-friendly buttons
- Mobile-optimized certificate layout
- Native share API support
- Optimized image downloads

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Dependencies

```json
{
  "html2canvas": "^1.4.1",
  "framer-motion": "^11.x",
  "recharts": "^2.x",
  "@supabase/supabase-js": "^2.x"
}
```

## Conclusion

The certificate system is fully functional and ready to use. Users can now:
- ✅ Complete interviews
- ✅ View detailed results
- ✅ Generate beautiful certificates
- ✅ Download certificates as images
- ✅ Share certificates
- ✅ View all earned certificates
- ✅ Track minting status

The system is also prepared for future blockchain integration!
