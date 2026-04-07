import React from 'react';
import { Sparkles, TrendingUp, Users, Award, Video, Code2, FolderOpen, Briefcase, CheckCircle, Star, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseModules from '../components/CourseModules';
import CountdownTimer from '../components/CountdownTimer';
import FAQ from '../components/FAQ';
import Chatbot from '../components/Chatbot';
import { courseFeatures, stats, testimonials } from '../utils/mock';
import { Card } from '../components/ui/card';

const Home = () => {
  const iconMap = {
    video: Video,
    'code-2': Code2,
    'folder-open': FolderOpen,
    users: Users,
    award: Award,
    briefcase: Briefcase,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden perspective-container">
        {/* 3D Background decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30 animate-float-3d"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30 animate-float-3d" style={{ animationDelay: '2s' }}></div>
        
        {/* 3D Grid background */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 2px, transparent 2px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.3) 2px, transparent 2px)`,
          backgroundSize: '80px 80px',
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'center top'
        }}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 px-5 py-2.5 rounded-full text-sm font-bold shadow-lg border border-blue-200 transform hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 animate-pulse" />
                #1 AI & Machine Learning Course
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Master AI & ML
                <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent text-3d">
                  Launch Your Tech Career
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Transform from beginner to AI professional in 6 months. Build real-world projects, 
                earn industry certification, and join 15,000+ successful graduates.
              </p>

              {/* CTA Buttons with 3D effect */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-3d-hover transition-all duration-500 transform hover:scale-105 btn-3d">
                  Start Learning Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity -z-10"></div>
                  {/* 3D depth layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
                </button>
                <button className="inline-flex items-center gap-2 glass-effect hover:bg-white/50 text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg border-2 border-white/50 hover:border-blue-300 shadow-lg hover:shadow-3d transition-all duration-500 transform hover:scale-105">
                  Watch Demo
                  <Video className="w-5 h-5" />
                </button>
              </div>

              {/* Stats with 3D cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center sm:text-left group perspective-container">
                    <div className="bg-gradient-to-br from-white to-blue-50 p-4 rounded-2xl shadow-lg border border-blue-100 transform transition-all duration-500 group-hover:scale-110 tilt-3d">
                      <div className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual Element with 3D effect */}
            <div className="relative perspective-container">
              <div className="relative z-10 transform transition-all duration-700 hover:scale-105 tilt-3d" style={{ transformStyle: 'preserve-3d' }}>
                <img
                  src="https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop"
                  alt="AI Learning"
                  className="rounded-3xl shadow-3d w-full object-cover border-4 border-white/50"
                />
                {/* 3D Floating Cards */}
                <div className="absolute -top-6 -left-6 glass-effect rounded-2xl shadow-3d p-5 animate-float-3d border border-white/30 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Career Growth</p>
                      <p className="text-2xl font-bold text-gray-900">150%+</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 glass-effect rounded-2xl shadow-3d p-5 animate-float-3d border border-white/30 backdrop-blur-xl" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Active Learners</p>
                      <p className="text-2xl font-bold text-gray-900">15K+</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Enhanced 3D background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-blue-500 rounded-3xl blur-3xl opacity-30 -z-10 animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-300 to-purple-300 rounded-3xl blur-3xl opacity-10 -z-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules Section */}
      <div id="modules">
        <CourseModules />
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white relative overflow-hidden">
        {/* 3D Grid background */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 px-5 py-2 rounded-full text-sm font-bold mb-4 shadow-lg border border-blue-200">
              Why Choose Us
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-3d">
              Everything You Need to Succeed
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive learning experience with tools, support, and resources for your AI journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container">
            {courseFeatures.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Video;
              return (
                <Card
                  key={index}
                  className="group p-8 glass-effect hover:bg-gradient-to-br hover:from-blue-50/80 hover:to-purple-50/80 border-2 border-white/50 hover:border-blue-200 rounded-3xl transition-all duration-500 shadow-3d hover:shadow-3d-hover transform hover:scale-105 tilt-3d backdrop-blur-xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* 3D Icon container */}
                  <div className="relative perspective-container mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-purple-600 rounded-2xl flex items-center justify-center shadow-3d transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12" style={{ transformStyle: 'preserve-3d' }}>
                      <IconComponent className="w-8 h-8 text-white relative z-10" />
                      {/* 3D depth layer */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-50 blur-sm transform translate-z-[-6px]"></div>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity -z-10"></div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* 3D depth indicator */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-3xl transform translate-z-[-5px] opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-shimmer"></div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2s ease-in-out;
          }
        `}</style>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* 3D decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 animate-float-3d"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20 animate-float-3d" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 px-5 py-2 rounded-full text-sm font-bold mb-4 shadow-lg border border-blue-200">
              Success Stories
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-3d">
              Hear From Our Graduates
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Real stories from students who transformed their careers with our course
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 perspective-container">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-8 glass-effect border-2 border-white/50 hover:border-blue-200 rounded-3xl transition-all duration-500 shadow-3d hover:shadow-3d-hover transform hover:scale-105 tilt-3d backdrop-blur-xl group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Rating with 3D effect */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="relative">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" style={{ transitionDelay: `${i * 50}ms` }} />
                    </div>
                  ))}
                </div>

                {/* Testimonial Text with depth */}
                <div className="mb-6 relative">
                  <p className="text-gray-700 leading-relaxed italic font-medium">
                    "{testimonial.text}"
                  </p>
                  {/* Quote decoration */}
                  <div className="absolute -top-4 -left-2 text-6xl text-blue-100 font-serif opacity-50">"</div>
                </div>

                {/* Author with 3D avatar */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200/50">
                  <div className="relative perspective-container group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-200 shadow-lg"
                    />
                    {/* 3D ring effect */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity -z-10"></div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>
                
                {/* 3D depth layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-3xl transform translate-z-[-5px] opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Countdown Section */}
      <div id="enrollment">
        <CountdownTimer />
      </div>

      {/* FAQ Section */}
      <div id="faq">
        <FAQ />
      </div>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden">
        {/* 3D Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 2px, transparent 2px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.2) 2px, transparent 2px)`,
          backgroundSize: '60px 60px',
          transform: 'perspective(800px) rotateX(60deg)',
          transformOrigin: 'center bottom'
        }}></div>
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-float-3d"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-float-3d" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 perspective-container">
          <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-3d">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-medium">
            Join 15,000+ students building successful careers in AI & Machine Learning. 
            30-day money-back guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg shadow-3d-hover transition-all duration-500 transform hover:scale-110 btn-3d">
              Enroll Now - Save 20%
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              {/* 3D depth layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-200/30 to-transparent rounded-2xl"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-white/50 to-blue-200/50 rounded-2xl blur-lg opacity-50 -z-10"></div>
            </button>
            <button className="inline-flex items-center gap-2 glass-effect hover:bg-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg border-2 border-white/30 shadow-lg hover:shadow-3d transition-all duration-500 transform hover:scale-105 backdrop-blur-xl">
              <CheckCircle className="w-5 h-5" />
              View Syllabus
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
