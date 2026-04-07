from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    INSTRUCTOR = "instructor"
    STUDENT = "student"

class User(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None
    role: UserRole = UserRole.STUDENT
    created_at: datetime
    updated_at: Optional[datetime] = None

class UserSession(BaseModel):
    session_id: str
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime

class CourseModule(BaseModel):
    module_id: str
    title: str
    description: str
    duration: str
    topics: List[str]
    video_url: Optional[str] = None
    order: int

class Course(BaseModel):
    course_id: str
    title: str
    description: str
    instructor_id: str
    instructor_name: str
    modules: List[CourseModule]
    thumbnail: Optional[str] = None
    price: float = 49999.0
    currency: str = "INR"
    total_duration: str
    level: str = "Beginner to Advanced"
    created_at: datetime
    updated_at: Optional[datetime] = None
    is_published: bool = False

class Enrollment(BaseModel):
    enrollment_id: str
    user_id: str
    course_id: str
    enrolled_at: datetime
    status: str = "active"  # active, completed, cancelled
    progress_percentage: float = 0.0
    last_accessed: Optional[datetime] = None

class Progress(BaseModel):
    progress_id: str
    user_id: str
    course_id: str
    module_id: str
    completed: bool = False
    completed_at: Optional[datetime] = None
    time_spent_minutes: int = 0
    last_position: Optional[str] = None  # for video timestamp

class Announcement(BaseModel):
    announcement_id: str
    title: str
    content: str
    author_id: str
    author_name: str
    target_audience: str  # all, students, instructors
    created_at: datetime
    is_pinned: bool = False

class Discussion(BaseModel):
    discussion_id: str
    course_id: str
    user_id: str
    user_name: str
    user_picture: Optional[str] = None
    title: str
    content: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    replies_count: int = 0

class DiscussionReply(BaseModel):
    reply_id: str
    discussion_id: str
    user_id: str
    user_name: str
    user_picture: Optional[str] = None
    content: str
    created_at: datetime

class Certificate(BaseModel):
    certificate_id: str
    user_id: str
    course_id: str
    issued_at: datetime
    certificate_url: Optional[str] = None

# Request/Response models
class UserCreate(BaseModel):
    email: str
    name: str
    picture: Optional[str] = None
    role: UserRole = UserRole.STUDENT

class CourseCreate(BaseModel):
    title: str
    description: str
    total_duration: str
    level: str = "Beginner to Advanced"
    price: float = 49999.0

class ModuleCreate(BaseModel):
    title: str
    description: str
    duration: str
    topics: List[str]
    video_url: Optional[str] = None

class AnnouncementCreate(BaseModel):
    title: str
    content: str
    target_audience: str = "all"
    is_pinned: bool = False

class DiscussionCreate(BaseModel):
    course_id: str
    title: str
    content: str

class ReplyCreate(BaseModel):
    content: str

class EnrollmentCreate(BaseModel):
    course_id: str

class ProgressUpdate(BaseModel):
    module_id: str
    completed: bool
    time_spent_minutes: Optional[int] = None
    last_position: Optional[str] = None
