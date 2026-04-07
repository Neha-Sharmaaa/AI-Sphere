import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, TrendingUp, MessageSquare, Award, LogOut, User, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const StudentDashboard = ({ user: initialUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesRes, announcementsRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/my-courses`, { credentials: 'include' }),
        fetch(`${BACKEND_URL}/api/announcements`, { credentials: 'include' })
      ]);

      if (coursesRes.ok) {
        const coursesData = await coursesRes.json();
        setCourses(coursesData.courses || []);
      }

      if (announcementsRes.ok) {
        const announcementsData = await announcementsRes.json();
        setAnnouncements(announcementsData.announcements || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  const handleEnroll = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Academy</h1>
                <p className="text-xs text-gray-500">Student Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <img
                  src={user?.picture || 'https://via.placeholder.com/40'}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full border-2 border-blue-200"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white border-2 border-gray-100 hover:border-blue-200 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                <p className="text-sm text-gray-600">Enrolled Courses</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-2 border-gray-100 hover:border-green-200 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0%</p>
                <p className="text-sm text-gray-600">Avg Progress</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-2 border-gray-100 hover:border-purple-200 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Certificates</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-2 border-gray-100 hover:border-orange-200 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600">Discussions</p>
              </div>
            </div>
          </Card>
        </div>

        {/* My Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">My Courses</h3>
            <Button
              onClick={handleEnroll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
            >
              Browse Courses
            </Button>
          </div>

          {courses.length === 0 ? (
            <Card className="p-12 text-center bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">No Courses Enrolled Yet</h4>
              <p className="text-gray-600 mb-4">Start your AI/ML journey by enrolling in a course</p>
              <Button
                onClick={handleEnroll}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
              >
                Explore Courses
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.course_id}
                  className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-blue-200 cursor-pointer"
                >
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-blue-600">
                        {course.enrollment?.progress_percentage || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.enrollment?.progress_percentage || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl">
                    Continue Learning
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Announcements */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Latest Announcements</h3>
          {announcements.length === 0 ? (
            <Card className="p-8 text-center bg-white rounded-2xl shadow-lg">
              <p className="text-gray-600">No announcements yet</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {announcements.slice(0, 5).map((announcement) => (
                <Card
                  key={announcement.announcement_id}
                  className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-blue-200 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {announcement.title}
                      </h4>
                      <p className="text-gray-600 mb-3">{announcement.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>By {announcement.author_name}</span>
                        <span>•</span>
                        <span>{new Date(announcement.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {announcement.is_pinned && (
                      <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                        Pinned
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
