import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, LogIn, Sparkles, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '../components/ui/button';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
          credentials: 'include'
        });
        if (response.ok) {
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        // Not authenticated, show login page
      }
    };
    checkAuth();
  }, [navigate]);

  const handleGoogleLogin = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + '/auth/callback';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden">
      {/* 3D Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-float-3d"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-float-3d" style={{ animationDelay: '1s' }}></div>
      
      {/* 3D Grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 2px, transparent 2px),
                         linear-gradient(90deg, rgba(255, 255, 255, 0.2) 2px, transparent 2px)`,
        backgroundSize: '60px 60px',
        transform: 'perspective(800px) rotateX(60deg)',
        transformOrigin: 'center bottom'
      }}></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Branding */}
          <div className="text-white space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-3d">
                <GraduationCap className="w-9 h-9 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI Academy</h1>
                <p className="text-blue-100">Transform Your Future</p>
              </div>
            </div>

            <div>
              <h2 className="text-5xl font-bold mb-4 text-3d">
                Start Your AI/ML Journey Today
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join 15,000+ students learning cutting-edge AI & Machine Learning.
                Access world-class courses, earn certificates, and advance your career.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-effect p-5 rounded-2xl backdrop-blur-xl border border-white/20 shadow-3d">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">15K+</p>
                    <p className="text-blue-100 text-sm">Active Students</p>
                  </div>
                </div>
              </div>
              <div className="glass-effect p-5 rounded-2xl backdrop-blur-xl border border-white/20 shadow-3d">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">150%</p>
                    <p className="text-blue-100 text-sm">Salary Increase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Login Card */}
          <div className="glass-effect p-10 rounded-3xl backdrop-blur-2xl border-2 border-white/30 shadow-3d-hover">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/20">
                <Sparkles className="w-4 h-4" />
                Welcome Back
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Sign In to Your Account</h3>
              <p className="text-blue-100">Access your dashboard and continue learning</p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="group relative w-full bg-white hover:bg-gray-50 text-gray-900 px-8 py-5 rounded-2xl font-bold text-lg shadow-3d-hover transition-all duration-500 transform hover:scale-105 btn-3d flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity -z-10"></div>
            </button>

            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex items-center justify-center gap-8 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>Certified Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  <span>Secure Login</span>
                </div>
              </div>
            </div>

            <p className="text-center text-blue-100 text-sm mt-6">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
