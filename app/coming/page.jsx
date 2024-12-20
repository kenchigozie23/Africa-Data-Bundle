'use client'
import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, Loader2, Star, Sparkles, CircleDot } from 'lucide-react';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [progress, setProgress] = useState(0);

  // Progress bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full relative">
        {/* Floating Elements Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            >
              {i % 3 === 0 ? (
                <Star className="text-yellow-300 opacity-30" size={24} />
              ) : i % 3 === 1 ? (
                <Sparkles className="text-blue-300 opacity-30" size={24} />
              ) : (
                <CircleDot className="text-purple-300 opacity-30" size={24} />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 animate-fade-in relative">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 overflow-hidden rounded-t-2xl">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 animate-slide-up">
              Something Amazing is Brewing
            </h1>
            <p className="text-lg text-gray-600 animate-slide-up delay-100">
              We're crafting something special just for you. Be the first to know when we launch!
            </p>
          </div>

          {/* Email Subscription */}
          <div className="max-w-md mx-auto mb-16 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-full bg-white border border-gray-200 focus:outline-none focus:border-blue-500 pr-36 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2 group"
              >
                {isSubscribed ? (
                  <>
                    <span>Subscribed!</span>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Notify Me</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
            {[
              {
                title: 'Innovative Design',
                description: 'Experience a completely new way of managing your digital services',
                icon: <Sparkles className="h-6 w-6 text-blue-500" />
              },
              {
                title: 'Seamless Experience',
                description: 'Everything you need, connected in one powerful platform',
                icon: <Star className="h-6 w-6 text-purple-500" />
              },
              {
                title: 'Advanced Platform',
                description: 'Built with cutting-edge technology for optimal performance',
                icon: <CircleDot className="h-6 w-6 text-indigo-500" />
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-lg bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.8s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 100ms;
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;