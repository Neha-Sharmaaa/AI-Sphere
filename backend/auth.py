from fastapi import HTTPException, Request
from typing import Optional
from datetime import datetime, timezone
import os

async def get_current_user(request: Request) -> dict:
    """
    Get current authenticated user from session token.
    Checks cookie first, then Authorization header as fallback.
    """
    from server import db
    
    # Get session token from cookie or header
    session_token = request.cookies.get("session_token")
    
    # Fallback to Authorization header
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.replace("Bearer ", "")
    
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Find session in database
    session_doc = await db.user_sessions.find_one(
        {"session_token": session_token},
        {"_id": 0}
    )
    
    if not session_doc:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    # Check session expiry
    expires_at = session_doc["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    
    if expires_at < datetime.now(timezone.utc):
        # Delete expired session
        await db.user_sessions.delete_one({"session_token": session_token})
        raise HTTPException(status_code=401, detail="Session expired")
    
    # Get user data
    user_doc = await db.users.find_one(
        {"user_id": session_doc["user_id"]},
        {"_id": 0}
    )
    
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user_doc

async def require_role(request: Request, allowed_roles: list) -> dict:
    """
    Check if user has required role.
    """
    user = await get_current_user(request)
    
    if user["role"] not in allowed_roles:
        raise HTTPException(
            status_code=403,
            detail=f"Access denied. Required roles: {allowed_roles}"
        )
    
    return user

async def require_admin(request: Request) -> dict:
    """Admin only access"""
    return await require_role(request, ["admin"])

async def require_instructor_or_admin(request: Request) -> dict:
    """Instructor or Admin access"""
    return await require_role(request, ["admin", "instructor"])
