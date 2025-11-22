# SkillForge - Unified Career Platform

A comprehensive AI-powered platform combining resume analysis, interview preparation, DSA practice, and career development tools.

## 🏗️ Project Structure

```
SkillForge/
│
├── backend/                               # All backend services
│   ├── fastapi/                           # Resume analyzer (FastAPI)
│   │   ├── main.py
│   │   ├── requirements.txt
│   │   └── services/
│   │       ├── ai_analyzer.py
│   │       ├── resume_parser.py
│   │       ├── roadmap_generator.py
│   │       ├── portfolio_generator.py
│   │       ├── dsa_service.py
│   │       ├── game_service.py
│   │       └── linkedin_service.py
│   │
│   ├── node/                              # Interview backend (Node.js)
│   │   ├── server.js
│   │   ├── whisperService.js
│   │   ├── scoring.js
│   │   ├── ollamaClient.js
│   │   └── package.json
│   │
│   └── README.md
│
├── frontend/                              # Single unified Next.js app
│   ├── app/
│   │   ├── page.tsx                       # New unified landing page
│   │   ├── layout.tsx
│   │   │
│   │   ├── resume/                        # Resume Analyzer UI
│   │   ├── roadmap/                       # Roadmap UI
│   │   ├── portfolio/                     # Portfolio maker
│   │   ├── dsa-dojo/                      # DSA Dojo
│   │   ├── game-box/                      # Game Box
│   │   ├── interview/                     # AI Interview
│   │   │   └── results/
│   │   ├── linkedin/                      # LinkedIn generator
│   │   │
│   │   ├── login/
│   │   ├── signup/
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       ├── layout.tsx
│   │       └── certificates/
│   │
│   ├── components/
│   │   ├── ui/                            # shadcn UI components
│   │   ├── landing/                       # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── interview/
│   │   ├── roadmap-phase.tsx
│   │   └── upload-box.tsx
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   ├── ollama.mjs
│   │   └── scoring.mjs
│   │
│   ├── public/
│   ├── globals.css
│   └── package.json
│
└── PROJECT_GUIDE.md
```

## 🚀 Features

### 1. **AI Resume Analyzer**
- Upload and parse PDF resumes
- AI-powered analysis and feedback
- Job description matching
- ATS optimization suggestions

### 2. **Career Roadmap Generator**
- Personalized learning paths
- Skill gap analysis
- Resource recommendations
- Progress tracking

### 3. **Portfolio Generator**
- Auto-generate portfolio websites
- Customizable templates
- Resume-based content generation

### 4. **DSA Dojo**
- Coding problem practice
- AI mentor (Yuvi) for hints
- Code execution and testing
- Multiple language support

### 5. **Game Box**
- Competitive coding challenges
- Battle mode
- Leaderboards
- Timed challenges

### 6. **AI Interview Coach**
- Voice-based interview practice
- Real-time transcription
- AI interviewer responses
- Detailed scoring and feedback

### 7. **LinkedIn Profile Optimizer**
- Generate compelling profiles
- Keyword optimization
- Industry-specific suggestions

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Animations**: Framer Motion
- **Charts**: Recharts
- **State Management**: React Hooks

### Backend - FastAPI (Python)
- **Framework**: FastAPI
- **PDF Parsing**: pdfplumber
- **AI Integration**: Custom AI services
- **Server**: Uvicorn

### Backend - Node.js
- **Framework**: Express.js
- **AI**: Ollama integration
- **Speech**: Whisper API
- **WebSocket**: ws library

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- Ollama (for AI features)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

### Backend Setup - FastAPI

```bash
cd backend/fastapi
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

The FastAPI backend will run on `http://localhost:8000`

### Backend Setup - Node.js

```bash
cd backend/node
npm install
node server.js
```

The Node.js backend will run on `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

Create `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_FASTAPI_URL=http://localhost:8000
NEXT_PUBLIC_NODE_API_URL=http://localhost:5000
NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434
```

### API Endpoints

#### FastAPI Backend (Port 8000)
- `POST /analyze` - Resume analysis
- `POST /roadmap` - Generate career roadmap
- `POST /generate-portfolio` - Generate portfolio
- `POST /dsa/generate` - Generate DSA question
- `POST /dsa/run` - Execute code
- `POST /game/generate` - Generate battle question
- `POST /linkedin/generate` - Generate LinkedIn profile

#### Node.js Backend (Port 5000)
- `POST /api/chat` - Interview chat
- `POST /api/evaluate` - Evaluate interview
- `POST /api/transcribe` - Speech to text
- `WebSocket /ws` - Real-time communication

## 🎨 UI Components

The project uses shadcn/ui components:
- Button, Card, Input, Textarea
- Progress, Badge, Avatar
- Dropdown Menu, Scroll Area
- And more...

## 📱 Pages & Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/signup` - User registration

### Feature Routes
- `/resume` - Resume analyzer
- `/roadmap` - Career roadmap
- `/portfolio` - Portfolio generator
- `/dsa-dojo` - DSA practice
- `/game-box` - Coding battles
- `/interview` - AI interview coach
- `/linkedin` - LinkedIn optimizer

### Dashboard Routes
- `/dashboard` - Main dashboard
- `/dashboard/certificates` - Certificates

## 🧪 Development

### Running in Development Mode

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - FastAPI Backend
cd backend/fastapi
python main.py

# Terminal 3 - Node.js Backend
cd backend/node
node server.js
```

### Building for Production

```bash
cd frontend
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn for the beautiful UI components
- Ollama for local AI capabilities
- All open-source contributors

## 📞 Support

For support, email support@skillforge.com or join our Discord community.

---

**Built with ❤️ by the SkillForge Team**
