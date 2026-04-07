import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardRouter = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // Redirect based on user role
    switch (user.role) {
      case 'admin':
        navigate('/admin/dashboard', { state: { user }, replace: true });
        break;
      case 'instructor':
        navigate('/instructor/dashboard', { state: { user }, replace: true });
        break;
      case 'student':
      default:
        navigate('/student/dashboard', { state: { user }, replace: true });
        break;
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <p className="text-gray-600">Redirecting to your dashboard...</p>
    </div>
  );
};

export default DashboardRouter;
