# AI & Machine Learning Course Landing Page - PRD

## Original Problem Statement
Create a landing page for an AI & Machine Learning course featuring syllabus, interactive preview, enrollment countdown, FAQ accordion, chatbot, and a clean modern responsive design.

## User Personas
- **Aspiring AI/ML Engineers**: Individuals looking to transition into AI/ML careers
- **Students**: College students wanting to learn AI/ML skills
- **Working Professionals**: People seeking career advancement in tech
- **Career Switchers**: Professionals from other fields looking to enter AI/ML

## Core Requirements
1. **Hero Section** - Compelling headline, CTA buttons, stats showcase
2. **Course Modules Section** - Interactive carousel with 8 modules
3. **Features Section** - 6 key course features
4. **Testimonials Section** - Success stories from graduates
5. **Enrollment Countdown** - 30-day countdown timer with urgency
6. **FAQ Section** - Accordion-style frequently asked questions
7. **AI Chatbot** - Mock chatbot for course queries (will be integrated with OpenAI GPT)
8. **Header & Footer** - Navigation and contact information
9. **Responsive Design** - Mobile-first, fully responsive
10. **Modern Design** - Tech-focused with blue accents, clean typography

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Shadcn UI components
- **Backend**: FastAPI (to be implemented)
- **Database**: MongoDB (to be implemented)
- **AI Integration**: OpenAI GPT-5.1 (pending implementation)

## What's Been Implemented (Phase 1 - Frontend with Mock Data)
**Date**: December 20, 2025

### ✅ Completed Features:
1. **Home Page** (`/app/frontend/src/pages/Home.jsx`)
   - Hero section with gradient text, CTA buttons, stats
   - Floating animation cards
   - Image from Unsplash

2. **Course Modules Carousel** (`/app/frontend/src/components/CourseModules.jsx`)
   - 8 interactive modules with navigation
   - Module details with topics list
   - Pagination dots and quick module grid
   - Smooth transitions

3. **Countdown Timer** (`/app/frontend/src/components/CountdownTimer.jsx`)
   - Real-time countdown (30 days)
   - Animated timer units
   - Call-to-action with urgency messaging

4. **FAQ Component** (`/app/frontend/src/components/FAQ.jsx`)
   - Shadcn accordion with 8 FAQs
   - Smooth expand/collapse animation
   - Additional help CTA section

5. **Chatbot Component** (`/app/frontend/src/components/Chatbot.jsx`)
   - Floating chatbot button
   - Chat window with message history
   - Mock responses based on keywords
   - Quick suggestion buttons
   - Typing indicator animation

6. **Header & Footer** (`/app/frontend/src/components/Header.jsx`, `Footer.jsx`)
   - Sticky header with smooth scroll navigation
   - Mobile-responsive hamburger menu
   - Footer with social links and contact info

7. **Features Section**
   - 6 feature cards with hover effects
   - Icons from lucide-react
   - Grid layout responsive design

8. **Testimonials Section**
   - 3 graduate testimonials with images
   - Star ratings
   - Card-based design

9. **Mock Data** (`/app/frontend/src/utils/mock.js`)
   - Course modules data
   - FAQs
   - Testimonials
   - Features
   - Stats
   - Mock chatbot responses

### 🎨 Design Implementation:
- Tech-focused blue accent colors (#3B82F6)
- Clean, modern typography
- Ample whitespace and spacing
- Hover effects and micro-animations
- Smooth scrolling behavior
- Custom scrollbar styling
- Floating animation for hero cards
- Responsive grid layouts

### 📦 Components Used:
- Shadcn UI: Accordion, Button, Card, Input, ScrollArea
- Lucide React: 30+ icons
- React Router: Navigation

## Prioritized Backlog

### P0 Features (Next Phase - Backend Integration)
1. **OpenAI GPT Chatbot Integration**
   - Backend endpoint for chat
   - Session management
   - Context-aware responses
   - Chat history storage in MongoDB

2. **Enrollment Form & Database**
   - User enrollment form
   - MongoDB schema for users
   - Email validation
   - Payment integration placeholder

3. **Admin Dashboard** (Optional)
   - View enrollments
   - Manage course content
   - Analytics

### P1 Features (Enhancements)
1. Video preview modal for "Watch Demo" button
2. Course syllabus PDF download
3. Email newsletter signup
4. Social sharing functionality
5. Blog integration
6. Live chat support

### P2 Features (Future)
1. User authentication
2. Course progress tracking
3. Payment gateway integration (Stripe/Razorpay)
4. Certificate generation
5. Student dashboard
6. Discussion forums

## Next Tasks
1. **User Decision**: Do you want to proceed with backend integration for chatbot?
2. Test chatbot mock functionality thoroughly
3. Implement OpenAI GPT integration for intelligent responses
4. Create MongoDB schemas for users and chat history
5. Build API endpoints for chat and enrollment

## API Contracts (To Be Implemented)

### Chatbot API
```
POST /api/chat
Request: {
  "message": "string",
  "session_id": "string"
}
Response: {
  "response": "string",
  "timestamp": "datetime"
}
```

### Enrollment API
```
POST /api/enroll
Request: {
  "name": "string",
  "email": "string",
  "phone": "string",
  "course": "string"
}
Response: {
  "success": boolean,
  "enrollment_id": "string"
}
```

## Notes
- All frontend currently uses mock data for demonstration
- Chatbot responses are keyword-based (not AI-powered yet)
- Ready for OpenAI GPT integration (playbook received)
- Need EMERGENT_LLM_KEY or user's OpenAI API key for chatbot
- Backend development pending user confirmation

---

## Phase 2 Update - 3D UI/UX Transformation
**Date**: December 20, 2025

### ✅ 3D Design Implementation Complete:

**Added 3D Effects & Styling:**
1. **Global 3D CSS Framework** (`App.css`):
   - Perspective containers (1500px perspective)
   - 3D card transformations with preserve-3d
   - Tilt effects on hover (rotateX, rotateY, translateZ)
   - Glassmorphism with backdrop-blur (20px)
   - Multiple depth shadow layers (shadow-3d)
   - 3D gradient backgrounds with layered effects
   - 3D button press effects
   - Floating animations with translateZ
   - 3D text shadows
   - Isometric and parallax effects

2. **Hero Section 3D Upgrades**:
   - 3D grid background with perspective
   - Floating animated orbs with translateZ
   - 3D stat cards with tilt-on-hover
   - Enhanced glassmorphism on floating cards
   - Multi-layer glow effects (3 layers)
   - 3D button effects with depth layers

3. **Course Modules Carousel**:
   - 3D card with scale and rotation on hover
   - Module icon with 3D depth layers
   - 3D navigation buttons with press effect
   - Enhanced topic cards with 3D numbered badges
   - 3D shimmer border animation
   - Perspective-based quick module grid

4. **Features Section**:
   - 3D tilt cards with transform-style: preserve-3d
   - Icon containers with rotation and scale
   - Multi-layer glow effects
   - 3D depth indicators on hover
   - Shimmer animations

5. **Countdown Timer**:
   - 3D timer units with group hover effects
   - Multi-layered shadows and glows
   - Glassmorphism container
   - 3D grid background pattern
   - Animated floating background orbs

6. **FAQ Accordion**:
   - Glassmorphism cards with backdrop-blur
   - 3D tilt effects on hover
   - Enhanced borders and depth layers
   - 3D CTA card at bottom

7. **Testimonials**:
   - 3D cards with tilt-on-hover
   - Animated star ratings (scale & rotate)
   - 3D avatar rings with gradient glow
   - Quote decorations
   - Depth layers

8. **Chatbot**:
   - 3D floating toggle button with multi-layer glow
   - Glassmorphism chat window
   - 3D gradient header with animated background
   - Enhanced message bubbles with depth
   - 3D suggestion buttons
   - Slide-up animation on open

9. **Final CTA Section**:
   - 3D grid perspective background
   - Animated floating orbs
   - 3D buttons with depth layers
   - Enhanced glassmorphism

**Technical Implementation:**
- All components use `perspective-container` classes
- `transform-style: preserve-3d` for 3D space
- Multiple shadow layers for depth (2px, 8px, 16px, 32px, 64px)
- Backdrop-blur for glassmorphism (20px)
- Gradient glows with blur effects
- Smooth transitions (300-700ms)
- Hover scale transforms (1.02-1.10x)
- Rotate effects (-10deg to 12deg)
- TranslateZ for depth (5px-30px)

**Design Features:**
- Depth perception through layered shadows
- Glassmorphism with frosted glass effect
- 3D grid patterns with perspective
- Floating animations (4s ease-in-out)
- Shimmer border effects
- Multi-layer gradient glows
- Tilt interactions on cards
- Press-down button effects
- Text with 3D shadows

**Performance Considerations:**
- CSS transforms (GPU-accelerated)
- Will-change properties for animations
- Optimized blur effects
- Smooth 60fps animations


---

## Phase 3 - Authentication & Dashboards (In Progress)
**Date**: December 20, 2025

### ✅ Completed Features:

**Backend Authentication System:**
1. Complete auth endpoints with Emergent Google OAuth
2. Session management with JWT tokens
3. Role-based access control (Admin, Instructor, Student)
4. MongoDB models for users, sessions, courses, enrollments, progress
5. Protected API endpoints with middleware
6. Analytics endpoints for admin
7. Discussion forum APIs
8. Announcement system

**Frontend Authentication:**
1. Login page with Google OAuth integration
2. AuthCallback component for session exchange
3. ProtectedRoute for auth gating
4. DashboardRouter for role-based routing
5. Student Dashboard with courses, stats, announcements

**API Endpoints Created:**
- `/api/auth/session` - Exchange session_id for token
- `/api/auth/me` - Get current user
- `/api/auth/logout` - Logout
- `/api/admin/users` - User management
- `/api/courses` - Course CRUD
- `/api/enrollments` - Enrollment management
- `/api/progress` - Progress tracking
- `/api/announcements` - Announcements
- `/api/discussions` - Discussion forum
- `/api/admin/analytics` - Platform analytics

### 🚧 Remaining Tasks (Next Phase):
1. Admin Dashboard (analytics, user management, course management)
2. Instructor Dashboard (course creation, content management)
3. Course player page (video lectures, materials)
4. Discussion forum UI
5. Certificate generation
6. Payment integration (Stripe/Razorpay placeholder)
7. Complete testing with testing agent

