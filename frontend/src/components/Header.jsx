import React from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AI Academy</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('modules')}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Modules
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection('enrollment')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Enroll Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="flex flex-col p-4 space-y-3">
            <button
              onClick={() => scrollToSection('modules')}
              className="text-left text-gray-600 hover:text-blue-600 font-medium py-2 px-4 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Modules
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left text-gray-600 hover:text-blue-600 font-medium py-2 px-4 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-left text-gray-600 hover:text-blue-600 font-medium py-2 px-4 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left text-gray-600 hover:text-blue-600 font-medium py-2 px-4 hover:bg-blue-50 rounded-lg transition-colors"
            >
              FAQ
            </button>
            <Button
              onClick={() => scrollToSection('enrollment')}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-full font-medium shadow-lg"
            >
              Enroll Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
