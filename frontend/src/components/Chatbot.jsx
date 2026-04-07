import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { mockChatbotResponses } from '../utils/mock';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: mockChatbotResponses.greeting, timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMockResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return mockChatbotResponses.greeting;
    } else if (message.includes('syllabus') || message.includes('modules') || message.includes('curriculum') || message.includes('topics')) {
      return mockChatbotResponses.syllabus;
    } else if (message.includes('fee') || message.includes('price') || message.includes('cost') || message.includes('payment')) {
      return mockChatbotResponses.fees;
    } else if (message.includes('career') || message.includes('job') || message.includes('salary') || message.includes('placement')) {
      return mockChatbotResponses.career;
    } else if (message.includes('duration') || message.includes('long') || message.includes('time') || message.includes('complete')) {
      return mockChatbotResponses.duration;
    } else if (message.includes('certificate') || message.includes('certification')) {
      return mockChatbotResponses.certificate;
    } else if (message.includes('project')) {
      return mockChatbotResponses.projects;
    } else {
      return mockChatbotResponses.default;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const botResponse = {
        role: 'bot',
        content: getMockResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button with 3D effect */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white rounded-full p-5 shadow-3d-hover transition-all duration-500 transform hover:scale-110 btn-3d group"
          aria-label="Open chatbot"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <MessageCircle className="w-7 h-7 relative z-10" />
          <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg">
            1
          </span>
          {/* 3D glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity -z-10"></div>
          {/* Depth layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
        </button>
      )}

      {/* Chatbot Window with 3D effect */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] glass-effect rounded-3xl shadow-3d-hover flex flex-col overflow-hidden border-2 border-white/30 backdrop-blur-xl transform transition-all duration-500 animate-slide-up">
          {/* Header with 3D gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-5 flex items-center justify-between relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
              animation: 'pulse 3s ease-in-out infinite'
            }}></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm transform hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base">AI Course Assistant</h3>
                <p className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Always here to help
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-2 transition-all duration-300 transform hover:scale-110 hover:rotate-90 relative z-10"
              aria-label="Close chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area with improved styling */}
          <ScrollArea className="flex-1 p-4 bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} perspective-container`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-lg transform transition-all duration-300 hover:scale-[1.02] ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-sm'
                        : 'glass-effect text-gray-800 rounded-bl-sm border-2 border-white/50 backdrop-blur-xl'
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
                    <p className={`text-xs mt-1.5 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass-effect rounded-2xl rounded-bl-sm px-5 py-4 border-2 border-white/50 backdrop-blur-xl shadow-lg">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce shadow-md" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce shadow-md" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce shadow-md" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Suggestions with 3D effect */}
          <div className="px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['Syllabus', 'Fees', 'Career', 'Certificate'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInputMessage(suggestion);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="px-4 py-2 bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 text-xs font-bold rounded-full whitespace-nowrap transition-all duration-300 transform hover:scale-105 shadow-md border border-blue-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area with 3D styling */}
          <div className="p-4 bg-white/90 backdrop-blur-sm border-t border-gray-200/50">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about syllabus, fees, career..."
                className="flex-1 rounded-2xl border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-md px-4 py-3 font-medium"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-5 shadow-3d-hover transition-all duration-300 transform hover:scale-110 btn-3d"
              >
                {isTyping ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default Chatbot;
