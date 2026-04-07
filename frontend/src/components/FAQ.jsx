import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { faqs } from '../utils/mock';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* 3D Grid background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 px-5 py-2 rounded-full text-sm font-bold mb-4 shadow-lg border border-blue-200">
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 text-3d">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to know about the course. Can't find the answer you're looking for?
            Chat with our AI assistant below.
          </p>
        </div>

        {/* FAQ Accordion with 3D effects */}
        <Accordion type="single" collapsible className="w-full space-y-4 perspective-container">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={`item-${faq.id}`}
              className="glass-effect rounded-3xl border-2 border-white/50 px-6 hover:border-blue-300 transition-all duration-500 shadow-lg hover:shadow-3d backdrop-blur-xl transform hover:scale-[1.02] tilt-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <AccordionTrigger className="text-left hover:no-underline py-6 group">
                <span className="text-lg font-bold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-6 font-medium">
                {faq.answer}
              </AccordionContent>
              {/* 3D depth layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-3xl transform translate-z-[-3px] opacity-0 hover:opacity-100 transition-opacity -z-10"></div>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Help CTA with 3D effect */}
        <div className="mt-12 perspective-container">
          <div className="glass-effect p-8 rounded-3xl border-2 border-white/50 shadow-3d backdrop-blur-xl transform transition-all duration-500 hover:scale-[1.02] tilt-3d" style={{ transformStyle: 'preserve-3d' }}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4">
              Our AI-powered chatbot is available 24/7 to answer all your queries instantly
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-bold shadow-3d-hover transition-all duration-500 transform hover:scale-105 btn-3d">
              <HelpCircle className="w-5 h-5" />
              Ask AI Assistant
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-40 hover:opacity-60 transition-opacity -z-10"></div>
            </button>
            {/* 3D depth effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl transform translate-z-[-5px] -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
