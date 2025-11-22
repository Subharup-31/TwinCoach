# Twin Coach AI - Project Structure

## Complete File Tree

```
twin-coach-ai/
│
├── app/
│   ├── dashboard/
│   │   ├── certificates/
│   │   │   └── page.tsx          # Certificates grid page
│   │   ├── interview/
│   │   │   ├── results/
│   │   │   │   └── page.tsx      # Interview results with scores
│   │   │   └── page.tsx          # Interview setup and questions
│   │   ├── resume/
│   │   │   └── page.tsx          # Resume analyzer with upload
│   │   ├── roadmap/
│   │   │   └── page.tsx          # Roadmap generator
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   └── page.tsx              # Dashboard home
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── signup/
│   │   └── page.tsx              # Signup page
│   ├── layout.tsx                # Root layout with theme provider
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles with Tailwind
│
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── progress.tsx
│   │   ├── skeleton.tsx
│   │   └── textarea.tsx
│   ├── certificate-card.tsx      # Certificate display component
│   ├── navbar.tsx                # Top navigation bar
│   ├── question-card.tsx         # Interview question component
│   ├── roadmap-phase.tsx         # Roadmap phase component
│   ├── sidebar.tsx               # Dashboard sidebar navigation
│   ├── theme-provider.tsx        # Theme context provider
│   ├── theme-toggle.tsx          # Dark/light mode toggle
│   └── upload-box.tsx            # File upload component
│
├── lib/
│   └── utils.ts                  # Utility functions
│
├── components.json               # shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── README.md                     # Project documentation
└── PROJECT_STRUCTURE.md          # This file
```

## Page Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero and features |
| `/login` | User login page |
| `/signup` | User registration page |
| `/dashboard` | Dashboard home with module cards |
| `/dashboard/interview` | Interview practice setup |
| `/dashboard/interview/results` | Interview results and feedback |
| `/dashboard/resume` | Resume analyzer |
| `/dashboard/roadmap` | Learning roadmap generator |
| `/dashboard/certificates` | Certificates gallery |

## Key Features by Module

### 1. Interview Assistant
- Role selection (Full-Stack, Data Analyst, ML Engineer, etc.)
- AI question generation (placeholder)
- Answer input with textarea
- Results page with:
  - Overall score
  - Question-by-question breakdown
  - Strengths and weaknesses
  - Certificate minting option

### 2. Resume Analyzer
- PDF file upload
- Analysis results:
  - ATS score with progress bar
  - Missing skills badges
  - Improvement suggestions
  - Formatting feedback

### 3. Roadmap Maker
- Goal input field
- Generated roadmap with phases:
  - Phase name and duration
  - Collapsible subtasks
  - Resource links
  - Progress tracking
- PDF download option (placeholder)

### 4. Certificates
- Grid layout of earned certificates
- Certificate details:
  - Role and score
  - Issue date
  - Blockchain mint status
- Mint new certificate button

## Reusable Components

### Layout Components
- **Sidebar**: Navigation with active state highlighting
- **Navbar**: User avatar and theme toggle

### Feature Components
- **QuestionCard**: Interview question with answer textarea
- **UploadBox**: Drag-and-drop file upload
- **RoadmapPhase**: Expandable phase with subtasks and resources
- **CertificateCard**: Certificate preview with mint status

### UI Components (shadcn/ui)
- Button, Card, Input, Textarea
- Avatar, Badge, Progress, Skeleton
- Dropdown Menu

## Styling

- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Pre-built accessible components
- **Framer Motion**: Smooth animations and transitions
- **Dark Mode**: Full theme support with next-themes

## Placeholder Functions

All backend logic is marked with `// TODO:` comments:
- `generateQuestions(role: string)`
- `analyzeResume(file: File)`
- `generateRoadmap(goal: string)`
- Authentication handlers
- Certificate minting

## Next Steps

1. Integrate Ollama for AI features
2. Add Supabase for authentication and data
3. Implement blockchain certificate minting
4. Add API routes for backend logic
5. Connect real data to UI components
