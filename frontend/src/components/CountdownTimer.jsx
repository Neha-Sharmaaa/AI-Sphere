import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    // Set target date to 30 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    
    const difference = targetDate - new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center perspective-container">
      <div className="relative group">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-3d flex items-center justify-center border border-blue-200 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-y-12" style={{ transformStyle: 'preserve-3d' }}>
          <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent text-3d">
            {String(value).padStart(2, '0')}
          </span>
          {/* 3D Depth layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl transform translate-z-[-10px] blur-sm"></div>
        </div>
        {/* Enhanced glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity -z-10 animate-pulse"></div>
        {/* Additional depth layer */}
        <div className="absolute -inset-2 bg-gradient-to-br from-blue-300 to-purple-300 rounded-2xl blur-2xl opacity-10 -z-20"></div>
      </div>
      <span className="mt-3 text-sm font-semibold text-gray-700 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* 3D Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 animate-float-3d"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 animate-float-3d" style={{ animationDelay: '2s' }}></div>
      
      {/* 3D Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        transform: 'perspective(500px) rotateX(60deg)',
        transformOrigin: 'center top'
      }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="perspective-container">
          <Card className="glass-effect border-2 border-white/30 rounded-3xl shadow-3d overflow-hidden backdrop-blur-xl transform transition-all duration-700 hover:scale-[1.02]" style={{ transformStyle: 'preserve-3d' }}>
            <div className="p-8 sm:p-12 bg-gradient-to-br from-white/90 to-white/70">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg transform transition-all hover:scale-105 btn-3d">
                  <AlertCircle className="w-4 h-4" />
                  Limited Time Offer
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-3 text-3d">
                  Enrollment Closes In
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Join 15,000+ students and kickstart your AI/ML career. Early bird discount ends soon!
                </p>
              </div>

              {/* Countdown with 3D effect */}
              <div className="flex justify-center items-center gap-4 sm:gap-8 mb-10">
                <TimeUnit value={timeLeft.days} label="Days" />
                <span className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent -mt-8 animate-pulse">:</span>
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <span className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent -mt-8 animate-pulse">:</span>
                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                <span className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent -mt-8 animate-pulse">:</span>
                <TimeUnit value={timeLeft.seconds} label="Seconds" />
              </div>

              {/* CTA */}
              <div className="text-center space-y-4">
                <button className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-3d-hover transition-all duration-500 transform hover:scale-105 btn-3d">
                  <Clock className="w-5 h-5" />
                  Enroll Now & Save 20%
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity -z-10"></div>
                  {/* 3D depth effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
                </button>
                <p className="text-sm text-gray-500 font-medium">
                  🎉 Get ₹10,000 OFF • 30-Day Money-Back Guarantee
                </p>
              </div>
            </div>
            
            {/* 3D Border shimmer effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </Card>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default CountdownTimer;
