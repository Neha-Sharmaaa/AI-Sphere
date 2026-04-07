import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Brain, Code, Target, Layers, Network, MessageSquare, Eye, Rocket, Clock, CheckCircle } from 'lucide-react';
import { courseModules } from '../utils/mock';
import { Card } from './ui/card';

const iconMap = {
  brain: Brain,
  code: Code,
  target: Target,
  layers: Layers,
  network: Network,
  'message-square': MessageSquare,
  eye: Eye,
  rocket: Rocket,
};

const CourseModules = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % courseModules.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + courseModules.length) % courseModules.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentModule = courseModules[currentIndex];
  const IconComponent = iconMap[currentModule.icon] || Brain;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* 3D Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30 animate-float-3d"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 animate-float-3d" style={{ animationDelay: '1.5s' }}></div>

      {/* 3D Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.2) 2px, transparent 2px),
                         linear-gradient(90deg, rgba(59, 130, 246, 0.2) 2px, transparent 2px)`,
        backgroundSize: '60px 60px',
        transform: 'perspective(800px) rotateX(60deg)',
        transformOrigin: 'center center'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 px-5 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg border border-blue-200">
            Course Curriculum
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-3d">
            Explore Our Course Modules
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A comprehensive 8-module journey from fundamentals to advanced AI/ML concepts
          </p>
        </div>

        {/* Carousel with 3D perspective */}
        <div className="relative perspective-container">
          {/* Main Card with 3D effect */}
          <Card className="glass-effect border-2 border-white/50 rounded-3xl shadow-3d-hover overflow-hidden backdrop-blur-xl transform transition-all duration-700 hover:scale-[1.02] card-3d">
            <div className="grid md:grid-cols-2 gap-8 p-8 sm:p-12 bg-gradient-to-br from-white/95 to-white/85">
              {/* Left: Module Info */}
              <div className="space-y-6">
                {/* Module Number & Icon with 3D effect */}
                <div className="flex items-center gap-4">
                  <div className="relative perspective-container group">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-3d transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" style={{ transformStyle: 'preserve-3d' }}>
                      <IconComponent className="w-9 h-9 text-white relative z-10" />
                      {/* 3D depth layer */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-50 blur-sm transform translate-z-[-8px]"></div>
                    </div>
                    {/* Enhanced glow */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity -z-10"></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-600">Module {currentModule.id}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {currentModule.duration}
                    </p>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3 text-3d">
                    {currentModule.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {currentModule.description}
                  </p>
                </div>

                {/* Navigation Controls with 3D effect */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={prevSlide}
                    className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-blue-600 hover:to-blue-700 hover:text-white text-gray-700 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 btn-3d"
                    aria-label="Previous module"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-3d hover:shadow-3d-hover transform hover:scale-110 btn-3d"
                    aria-label="Next module"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="ml-4 text-sm text-gray-600 font-bold bg-gray-100 px-4 py-2 rounded-full">
                    {currentIndex + 1} / {courseModules.length}
                  </div>
                </div>
              </div>

              {/* Right: Topics List with 3D cards */}
              <div className="relative perspective-container">
                <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 rounded-3xl p-8 shadow-3d transform transition-all duration-500 hover:scale-[1.02]" style={{ transformStyle: 'preserve-3d' }}>
                  <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                    Key Topics Covered
                  </h4>
                  <ul className="space-y-4">
                    {currentModule.topics.map((topic, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 group"
                      >
                        <div className="relative perspective-container">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300 transform group-hover:rotate-12">
                            <span className="text-white text-sm font-bold">{index + 1}</span>
                          </div>
                          <div className="absolute -inset-0.5 bg-blue-400 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity -z-10"></div>
                        </div>
                        <span className="text-gray-700 leading-relaxed font-medium">
                          {topic}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {/* 3D border effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-white/50 pointer-events-none"></div>
                </div>
              </div>
            </div>
            
            {/* 3D shimmer border */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </Card>

          {/* Pagination Dots with 3D effect */}
          <div className="flex justify-center gap-3 mt-10">
            {courseModules.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 rounded-full shadow-lg transform hover:scale-125 ${
                  index === currentIndex
                    ? 'w-12 h-4 bg-gradient-to-r from-blue-600 to-purple-600 shadow-3d'
                    : 'w-4 h-4 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to module ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Quick Module Grid with 3D cards */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 perspective-container">
          {courseModules.map((module, index) => {
            const ModuleIcon = iconMap[module.icon] || Brain;
            return (
              <button
                key={module.id}
                onClick={() => goToSlide(index)}
                className={`p-5 rounded-2xl border-2 transition-all duration-500 text-left shadow-lg transform hover:scale-105 tilt-3d ${
                  index === currentIndex
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-600 shadow-3d scale-105'
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-xl'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg' 
                    : 'bg-gray-100'
                }`}>
                  <ModuleIcon className={`w-5 h-5 ${index === currentIndex ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <p className={`text-xs font-bold mb-1 ${index === currentIndex ? 'text-blue-600' : 'text-gray-500'}`}>
                  Module {module.id}
                </p>
                <p className={`text-sm font-bold ${index === currentIndex ? 'text-gray-900' : 'text-gray-700'}`}>
                  {module.title.split(' ').slice(0, 3).join(' ')}
                </p>
                {/* 3D depth indicator */}
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-2xl transform translate-z-[-5px] -z-10"></div>
                )}
              </button>
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
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default CourseModules;
