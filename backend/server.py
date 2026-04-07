from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
import uuid
from datetime import datetime, timezone, timedelta
import httpx
from typing import List, Optional

from models import (
    User, UserRole, Course, Enrollment, Progress, Announcement,
    Discussion, DiscussionReply, CourseCreate, ModuleCreate,
    AnnouncementCreate, DiscussionCreate, ReplyCreate,
    EnrollmentCreate, ProgressUpdate
)
from auth import get_current_user, require_admin, require_instructor_or_admin

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'ai_course_db')]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============= AUTH ENDPOINTS =============

@api_router.post("/auth/session")
async def create_session(request: Request, response: Response):
    """
    Exchange session_id for session_token and user data.
    Called from frontend after Google OAuth redirect.
    """
    data = await request.json()
    session_id = data.get("session_id")
    
    if not session_id:
        raise HTTPException(status_code=400, detail="session_id required")
    
    # Call Emergent Auth API to get session data
    async with httpx.AsyncClient() as http_client:
        try:
            auth_response = await http_client.get(
                "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
                headers={"X-Session-ID": session_id},
                timeout=10.0
            )
            auth_response.raise_for_status()
            auth_data = auth_response.json()
        except Exception as e:
            logger.error(f"Auth API error: {str(e)}")
            raise HTTPException(status_code=401, detail="Invalid session_id")
    
    # Extract user data
    email = auth_data.get("email")
    name = auth_data.get("name")
    picture = auth_data.get("picture")
    session_token = auth_data.get("session_token")
    
    if not all([email, session_token]):
        raise HTTPException(status_code=400, detail="Incomplete auth data")
    
    # Check if user exists
    existing_user = await db.users.find_one({"email": email}, {"_id": 0})
    
    if existing_user:
        user_id = existing_user["user_id"]
        # Update user data
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {
                "name": name,
                "picture": picture,
                "updated_at": datetime.now(timezone.utc)
            }}
        )
        user_data = existing_user
        user_data.update({"name": name, "picture": picture})
    else:
        # Create new user with default student role
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        user_data = {
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "role": UserRole.STUDENT.value,
            "created_at": datetime.now(timezone.utc)
        }
        await db.users.insert_one(user_data.copy())
        user_data.pop("_id", None)
    
    # Store session in database
    session_doc = {
        "session_id": f"sess_{uuid.uuid4().hex[:16]}",
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": datetime.now(timezone.utc) + timedelta(days=7),
        "created_at": datetime.now(timezone.utc)
    }
    await db.user_sessions.insert_one(session_doc)
    
    # Set httpOnly cookie
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=7 * 24 * 60 * 60,  # 7 days
        path="/"
    )
    
    return {"user": user_data, "message": "Session created successfully"}

@api_router.get("/auth/me")
async def get_me(request: Request):
    """Get current authenticated user"""
    user = await get_current_user(request)
    return user

@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    """Logout user and clear session"""
    try:
        user = await get_current_user(request)
        session_token = request.cookies.get("session_token")
        
        if session_token:
            await db.user_sessions.delete_one({"session_token": session_token})
        
        response.delete_cookie(key="session_token", path="/")
        return {"message": "Logged out successfully"}
    except:
        response.delete_cookie(key="session_token", path="/")
        return {"message": "Logged out"}

# ============= USER MANAGEMENT (ADMIN) =============

@api_router.get("/admin/users")
async def get_all_users(request: Request):
    """Get all users (Admin only)"""
    await require_admin(request)
    
    users = await db.users.find({}, {"_id": 0}).to_list(1000)
    return {"users": users, "total": len(users)}

@api_router.patch("/admin/users/{user_id}/role")
async def update_user_role(user_id: str, role: UserRole, request: Request):
    """Update user role (Admin only)"""
    await require_admin(request)
    
    result = await db.users.update_one(
        {"user_id": user_id},
        {"$set": {"role": role.value, "updated_at": datetime.now(timezone.utc)}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "Role updated successfully"}

# ============= COURSE MANAGEMENT =============

@api_router.get("/courses")
async def get_courses(published_only: bool = True):
    """Get all courses"""
    query = {"is_published": True} if published_only else {}
    courses = await db.courses.find(query, {"_id": 0}).to_list(1000)
    return {"courses": courses}

@api_router.get("/courses/{course_id}")
async def get_course(course_id: str):
    """Get single course"""
    course = await db.courses.find_one({"course_id": course_id}, {"_id": 0})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@api_router.post("/admin/courses")
async def create_course(course_data: CourseCreate, request: Request):
    """Create course (Admin/Instructor)"""
    user = await require_instructor_or_admin(request)
    
    course_id = f"course_{uuid.uuid4().hex[:12]}"
    course = {
        "course_id": course_id,
        "title": course_data.title,
        "description": course_data.description,
        "instructor_id": user["user_id"],
        "instructor_name": user["name"],
        "modules": [],
        "price": course_data.price,
        "currency": "INR",
        "total_duration": course_data.total_duration,
        "level": course_data.level,
        "created_at": datetime.now(timezone.utc),
        "is_published": False
    }
    
    await db.courses.insert_one(course)
    course.pop("_id", None)
    return course

@api_router.post("/admin/courses/{course_id}/modules")
async def add_module(course_id: str, module_data: ModuleCreate, request: Request):
    """Add module to course"""
    user = await require_instructor_or_admin(request)
    
    course = await db.courses.find_one({"course_id": course_id}, {"_id": 0})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check if user is instructor of this course or admin
    if user["role"] != "admin" and course["instructor_id"] != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    module_id = f"module_{uuid.uuid4().hex[:12]}"
    module = {
        "module_id": module_id,
        "title": module_data.title,
        "description": module_data.description,
        "duration": module_data.duration,
        "topics": module_data.topics,
        "video_url": module_data.video_url,
        "order": len(course.get("modules", []))
    }
    
    await db.courses.update_one(
        {"course_id": course_id},
        {"$push": {"modules": module}}
    )
    
    return module

@api_router.patch("/admin/courses/{course_id}/publish")
async def publish_course(course_id: str, request: Request):
    """Publish course"""
    user = await require_instructor_or_admin(request)
    
    course = await db.courses.find_one({"course_id": course_id}, {"_id": 0})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    if user["role"] != "admin" and course["instructor_id"] != user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    await db.courses.update_one(
        {"course_id": course_id},
        {"$set": {"is_published": True, "updated_at": datetime.now(timezone.utc)}}
    )
    
    return {"message": "Course published successfully"}

# ============= ENROLLMENT =============

@api_router.post("/enrollments")
async def enroll_course(enrollment_data: EnrollmentCreate, request: Request):
    """Enroll in a course"""
    user = await get_current_user(request)
    
    # Check if already enrolled
    existing = await db.enrollments.find_one({
        "user_id": user["user_id"],
        "course_id": enrollment_data.course_id
    })
    
    if existing:
        raise HTTPException(status_code=400, detail="Already enrolled")
    
    enrollment_id = f"enroll_{uuid.uuid4().hex[:12]}"
    enrollment = {
        "enrollment_id": enrollment_id,
        "user_id": user["user_id"],
        "course_id": enrollment_data.course_id,
        "enrolled_at": datetime.now(timezone.utc),
        "status": "active",
        "progress_percentage": 0.0
    }
    
    await db.enrollments.insert_one(enrollment)
    enrollment.pop("_id", None)
    return enrollment

@api_router.get("/my-courses")
async def get_my_courses(request: Request):
    """Get user's enrolled courses"""
    user = await get_current_user(request)
    
    enrollments = await db.enrollments.find(
        {"user_id": user["user_id"]},
        {"_id": 0}
    ).to_list(100)
    
    course_ids = [e["course_id"] for e in enrollments]
    courses = await db.courses.find(
        {"course_id": {"$in": course_ids}},
        {"_id": 0}
    ).to_list(100)
    
    # Merge enrollment data with courses
    enrollment_map = {e["course_id"]: e for e in enrollments}
    for course in courses:
        course["enrollment"] = enrollment_map.get(course["course_id"])
    
    return {"courses": courses}

# ============= PROGRESS TRACKING =============

@api_router.post("/progress")
async def update_progress(progress_data: ProgressUpdate, request: Request):
    """Update module progress"""
    user = await get_current_user(request)
    
    # Find or create progress
    progress_doc = await db.progress.find_one({
        "user_id": user["user_id"],
        "module_id": progress_data.module_id
    }, {"_id": 0})
    
    if progress_doc:
        # Update existing
        update_data = {"completed": progress_data.completed}
        if progress_data.time_spent_minutes:
            update_data["time_spent_minutes"] = progress_data.time_spent_minutes
        if progress_data.last_position:
            update_data["last_position"] = progress_data.last_position
        if progress_data.completed:
            update_data["completed_at"] = datetime.now(timezone.utc)
        
        await db.progress.update_one(
            {"user_id": user["user_id"], "module_id": progress_data.module_id},
            {"$set": update_data}
        )
    else:
        # Create new
        progress_id = f"prog_{uuid.uuid4().hex[:12]}"
        progress = {
            "progress_id": progress_id,
            "user_id": user["user_id"],
            "module_id": progress_data.module_id,
            "completed": progress_data.completed,
            "time_spent_minutes": progress_data.time_spent_minutes or 0,
            "last_position": progress_data.last_position,
            "completed_at": datetime.now(timezone.utc) if progress_data.completed else None
        }
        await db.progress.insert_one(progress)
    
    return {"message": "Progress updated"}

@api_router.get("/progress/{course_id}")
async def get_course_progress(course_id: str, request: Request):
    """Get user's progress for a course"""
    user = await get_current_user(request)
    
    # Get all module IDs for this course
    course = await db.courses.find_one({"course_id": course_id}, {"_id": 0, "modules": 1})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    module_ids = [m["module_id"] for m in course.get("modules", [])]
    
    # Get progress for all modules
    progress_docs = await db.progress.find({
        "user_id": user["user_id"],
        "module_id": {"$in": module_ids}
    }, {"_id": 0}).to_list(100)
    
    return {"progress": progress_docs}

# ============= ANNOUNCEMENTS =============

@api_router.get("/announcements")
async def get_announcements(request: Request):
    """Get announcements"""
    user = await get_current_user(request)
    
    query = {"target_audience": {"$in": ["all", user["role"]]}}
    announcements = await db.announcements.find(
        query,
        {"_id": 0}
    ).sort("created_at", -1).to_list(50)
    
    return {"announcements": announcements}

@api_router.post("/admin/announcements")
async def create_announcement(announcement_data: AnnouncementCreate, request: Request):
    """Create announcement (Admin/Instructor)"""
    user = await require_instructor_or_admin(request)
    
    announcement_id = f"ann_{uuid.uuid4().hex[:12]}"
    announcement = {
        "announcement_id": announcement_id,
        "title": announcement_data.title,
        "content": announcement_data.content,
        "author_id": user["user_id"],
        "author_name": user["name"],
        "target_audience": announcement_data.target_audience,
        "is_pinned": announcement_data.is_pinned,
        "created_at": datetime.now(timezone.utc)
    }
    
    await db.announcements.insert_one(announcement)
    announcement.pop("_id", None)
    return announcement

# ============= DISCUSSION FORUM =============

@api_router.get("/discussions")
async def get_discussions(course_id: Optional[str] = None):
    """Get discussions"""
    query = {"course_id": course_id} if course_id else {}
    discussions = await db.discussions.find(
        query,
        {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    
    return {"discussions": discussions}

@api_router.post("/discussions")
async def create_discussion(discussion_data: DiscussionCreate, request: Request):
    """Create discussion"""
    user = await get_current_user(request)
    
    discussion_id = f"disc_{uuid.uuid4().hex[:12]}"
    discussion = {
        "discussion_id": discussion_id,
        "course_id": discussion_data.course_id,
        "user_id": user["user_id"],
        "user_name": user["name"],
        "user_picture": user.get("picture"),
        "title": discussion_data.title,
        "content": discussion_data.content,
        "created_at": datetime.now(timezone.utc),
        "replies_count": 0
    }
    
    await db.discussions.insert_one(discussion)
    discussion.pop("_id", None)
    return discussion

@api_router.get("/discussions/{discussion_id}/replies")
async def get_replies(discussion_id: str):
    """Get discussion replies"""
    replies = await db.discussion_replies.find(
        {"discussion_id": discussion_id},
        {"_id": 0}
    ).sort("created_at", 1).to_list(100)
    
    return {"replies": replies}

@api_router.post("/discussions/{discussion_id}/replies")
async def create_reply(discussion_id: str, reply_data: ReplyCreate, request: Request):
    """Reply to discussion"""
    user = await get_current_user(request)
    
    reply_id = f"reply_{uuid.uuid4().hex[:12]}"
    reply = {
        "reply_id": reply_id,
        "discussion_id": discussion_id,
        "user_id": user["user_id"],
        "user_name": user["name"],
        "user_picture": user.get("picture"),
        "content": reply_data.content,
        "created_at": datetime.now(timezone.utc)
    }
    
    await db.discussion_replies.insert_one(reply)
    
    # Increment reply count
    await db.discussions.update_one(
        {"discussion_id": discussion_id},
        {"$inc": {"replies_count": 1}}
    )
    
    reply.pop("_id", None)
    return reply

# ============= ANALYTICS (ADMIN) =============

@api_router.get("/admin/analytics")
async def get_analytics(request: Request):
    """Get platform analytics (Admin only)"""
    await require_admin(request)
    
    total_users = await db.users.count_documents({})
    total_courses = await db.courses.count_documents({})
    total_enrollments = await db.enrollments.count_documents({})
    total_revenue = total_enrollments * 49999  # Placeholder
    
    # Users by role
    users_by_role = {}
    for role in ["admin", "instructor", "student"]:
        count = await db.users.count_documents({"role": role})
        users_by_role[role] = count
    
    # Recent enrollments
    recent_enrollments = await db.enrollments.find(
        {},
        {"_id": 0}
    ).sort("enrolled_at", -1).limit(10).to_list(10)
    
    return {
        "total_users": total_users,
        "total_courses": total_courses,
        "total_enrollments": total_enrollments,
        "total_revenue": total_revenue,
        "users_by_role": users_by_role,
        "recent_enrollments": recent_enrollments
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
