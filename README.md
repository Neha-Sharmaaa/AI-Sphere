# AI Sphere

AI Sphere is a full-stack learning platform for managing and delivering AI courses.  
It supports role-based access (Admin, Instructor, Student), course publishing, student enrollments, progress tracking, announcements, and discussion forums.

## What This Project Is About
- Build and manage structured AI courses with modules and topics.
- Let students enroll, track module-level progress, and view their learning status.
- Provide a communication layer through announcements and course discussions.
- Enable admin-level visibility with user management and platform analytics.

## Core Features
- **Authentication & Sessions**: OAuth session exchange, secure cookie-based session handling.
- **Role-Based Access**: Admin, Instructor, and Student permissions.
- **Course Management**: Create courses, add modules, and publish/unpublish courses.
- **Enrollment & Progress**: Enroll students and store per-module completion state.
- **Community Layer**: Announcements, discussions, and threaded replies.
- **Admin Controls**: User role updates and dashboard analytics endpoints.

## Tech Stack
- **Frontend**: React (CRA + CRACO)
- **Backend**: FastAPI (Python)
- **Database**: MongoDB (Motor async driver)
- **Auth**: Session-based flow with role checks

## Backend API Scope
- Auth: `/api/auth/*`
- Admin: `/api/admin/*`
- Courses: `/api/courses`, `/api/my-courses`
- Learning: `/api/enrollments`, `/api/progress/*`
- Community: `/api/announcements`, `/api/discussions/*`

## Run Locally
1. Backend
   - `cd backend`
   - `pip install -r requirements.txt`
   - `python server.py`
2. Frontend
   - `cd frontend`
   - `npm install`
   - `npm start`
