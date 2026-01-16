# 🎓 Unified Virtual Study Collaboration Workspace 

> Your all-in-one productivity companion for engineering students - study smarter, not harder!

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://ultimate-b-tech-buddy-6bha.vercel.app/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)](https://www.mongodb.com/)

**🌐 Live Website:** [https://ultimate-b-tech-buddy-6bha.vercel.app/](https://ultimate-b-tech-buddy-6bha.vercel.app/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Ultimate B-Tech Buddy** is a comprehensive productivity platform designed specifically for engineering students. It combines essential tools like task management, note-taking, LeetCode tracking, music player, video chat, and AI chatbot - all in one beautiful, Swiss-design-inspired interface.

Whether you're preparing for placements, managing assignments, or collaborating with peers, this platform has everything you need to succeed in your B-Tech journey.

---

## ✨ Features

### 🏠 **Dashboard Home**
- Clean, modern Swiss-inspired design with glassmorphism effects
- 3D animated background using Three.js
- Quick access to all features
- Responsive layout for all devices

### ✅ **Task Management**
- Create, edit, and delete tasks
- Mark tasks as complete/incomplete
- Real-time task synchronization
- Persistent storage (MongoDB + localStorage fallback)
- Guest mode support

### 📝 **Notes System**
- Rich text note creation and editing
- Organize notes with titles and content
- Full CRUD operations
- Cloud sync with offline support
- Search and filter capabilities

### 💻 **LeetCode Tracker**
- Track your daily LeetCode practice
- Visual heat map showing your consistency
- Add problems with difficulty levels (Easy, Medium, Hard)
- View submission history
- Motivational quotes and stats

### 🎵 **Music Player (Focus Wave)**
- Built-in music player with curated focus playlists
- Support for royalty-free music and popular tracks metadata
- Full playback controls (play, pause, skip, seek)
- Volume control
- Create and manage favorites
- Search functionality
- Beautiful album art display
- Responsive design with now-playing view

### 💬 **AI Chatbot**
- Integrated AI assistant for academic help
- Real-time chat interface
- Markdown support for formatted responses
- Chat history persistence
- Powered by modern AI APIs

### 📹 **Video Chat (Video Lounge)**
- WebRTC-based peer-to-peer video calling
- Multi-party video conferencing
- Screen sharing capabilities
- Configurable ICE (STUN/TURN) servers
- Room-based connections
- Chat during video calls

### 📅 **Calendar**
- Monthly calendar view
- Event management
- Date highlighting
- Task integration

### ⏲️ **Pomodoro Timer**
- Focus timer with customizable intervals
- Break reminders
- Session tracking
- Productivity statistics

### 🎮 **Games**
- Mini-games for study breaks
- Stress relief activities
- Brain teasers and puzzles

### 📄 **Resume Builder**
- Create professional resumes
- Multiple templates
- Export to PDF
- ATS-friendly formatting

### 🔐 **Authentication**
- Secure user login/signup
- JWT-based authentication
- Guest mode for quick access
- Protected routes

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18.2** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Three.js** - 3D graphics and animations
- **React Three Fiber & Drei** - React renderer for Three.js
- **Lucide React** - Beautiful icon library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **React Markdown** - Markdown rendering
- **GSAP** - Advanced animations
- **Zustand** - State management

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - WebSocket server
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### **DevOps & Deployment**
- **Docker** - Containerization
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **Netlify** - Alternative deployment

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ultimate-b-tech-buddy.git
   cd ultimate-b-tech-buddy
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_ICE_SERVERS='[{"urls": "stun:stun.l.google.com:19302"}]'
   ```

   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/btech-buddy
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

6. **Run the application**

   **Development mode (both frontend and backend):**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`
   The backend API will run on `http://localhost:5000`

7. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🔧 Environment Variables

### Frontend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |
| `VITE_ICE_SERVERS` | WebRTC ICE servers configuration (JSON array) | Google STUN + OpenRelay TURN |

### Backend (backend/.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NODE_ENV` | Environment (development/production) | No |

### Video Chat Configuration

The WebRTC video lounge supports configurable ICE (STUN/TURN) servers for reliable connections even behind NAT/firewalls.

Add a JSON array of `RTCIceServer` objects to `VITE_ICE_SERVERS`:

```env
VITE_ICE_SERVERS='[
  {"urls": "turn:my-turn.example.com:3478", "username": "user", "credential": "pass"},
  {"urls": "stun:stun.l.google.com:19302"}
]'
```

If not provided, the app uses Google's public STUN servers plus OpenRelay's public TURN nodes. For production, use your own TURN credentials (Twilio, Cloudflare, Coturn, etc.).

---

## 📁 Project Structure

```
ultimate-b-tech-buddy/
├── backend/                    # Backend server
│   ├── models/                # Mongoose models
│   │   ├── User.js
│   │   ├── Task.js
│   │   ├── Note.js
│   │   ├── Leetcode.js
│   │   ├── Song.js
│   │   └── ChatMessage.js
│   ├── routes/                # API routes
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   ├── notes.js
│   │   ├── leetcode.js
│   │   └── songs.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.js
│   ├── scripts/               # Utility scripts
│   │   └── clear_chat.js
│   ├── server.js              # Entry point
│   ├── package.json
│   └── Dockerfile
├── src/                       # Frontend source
│   ├── components/            # React components
│   │   ├── Features/         # Feature components
│   │   │   ├── Home.tsx
│   │   │   ├── Tasks.tsx
│   │   │   ├── Notes.tsx
│   │   │   ├── LeetCode.tsx
│   │   │   ├── Spotify.tsx
│   │   │   ├── Chat.tsx
│   │   │   ├── Chatbot.tsx
│   │   │   ├── VideoChat.tsx
│   │   │   ├── Calendar.tsx
│   │   │   ├── Timer.tsx
│   │   │   ├── Games.tsx
│   │   │   └── Resume.tsx
│   │   ├── Layout/           # Layout components
│   │   │   ├── Dashboard.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── UI/               # Reusable UI components
│   │   ├── Background.tsx
│   │   ├── HeatMap.tsx
│   │   └── LoginForm.tsx
│   ├── lib/                  # Utilities
│   │   └── api.ts           # API client
│   ├── assets/              # Static assets
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                   # Public assets
├── .env                      # Frontend environment variables
├── package.json             # Frontend dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
├── Dockerfile               # Docker configuration
├── render.yaml              # Render deployment config
├── netlify.toml             # Netlify deployment config
└── README.md                # You are here!
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### LeetCode
- `GET /api/leetcode` - Get all submissions
- `POST /api/leetcode` - Add new submission
- `DELETE /api/leetcode/:id` - Delete submission

### Songs (Favorites)
- `GET /api/songs` - Get favorite songs
- `POST /api/songs` - Add to favorites
- `DELETE /api/songs/:id` - Remove from favorites

---

## 🎨 Features Showcase

### Swiss Design Aesthetics
- Clean, minimalist interface
- Grid-based layouts
- Typography-focused design
- Subtle animations and transitions
- Glassmorphism effects
- Dark/Light mode support

### Performance Optimizations
- Code splitting and lazy loading
- Optimized bundle size
- Efficient state management
- Debounced search and inputs
- Memoized components
- Service worker for offline support

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly controls
- Adaptive layouts

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Dhanvin**

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Music samples from [Bensound](https://www.bensound.com/)
- 3D graphics powered by [Three.js](https://threejs.org/)
- Design inspiration from Swiss design principles
- Open source community

---

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue
- Contact via email
- Join our Discord community

---

## 🗺️ Roadmap

- [ ] Dark/Light theme toggle
- [ ] Mobile app (React Native)
- [ ] More AI features
- [ ] Collaboration features
- [ ] Integration with university portals
- [ ] Advanced analytics dashboard
- [ ] Export/Import data
- [ ] Social features

---

<div align="center">

**Made with ❤️ for B-Tech students everywhere**

⭐ Star this repo if you find it helpful!

</div>

## Optional Firebase Chat Notifications

Opt-in browser notifications for signed-in users in public chat rooms, backed by Firebase Cloud Messaging and the existing Node.js/MongoDB API. Requires Firebase configuration before live delivery. See [setup and verification](docs/firebase-notifications.md).
