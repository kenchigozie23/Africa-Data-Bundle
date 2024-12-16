'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const services = [
    {
      name: "Airtime",
      icon: "📱",
      description: "Quick and easy mobile top-up services",
      color: "bg-blue-50"
    },
    {
      name: "Cheap Data",
      icon: "🌐",
      description: "Affordable internet data packages",
      color: "bg-green-50"
    },
    {
      name: "CableTV",
      icon: "📺",
      description: "Wide range of cable television subscriptions",
      color: "bg-purple-50"
    },
    {
      name: "Electricity",
      icon: "⚡",
      description: "Convenient electricity bill payments",
      color: "bg-yellow-50"
    },
    {
      name: "Exam Pin",
      icon: "📝",
      description: "Secure exam registration pins",
      color: "bg-red-50"
    },
    {
      name: "Print Recharge",
      icon: "🖨️",
      description: "Print and recharge services",
      color: "bg-indigo-50"
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotate with smooth direction handling
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Increased duration for more peaceful transitions

    return () => clearInterval(interval);
  }, [services.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const slideTransition = {
    duration: 0.8,
    ease: [0.4, 0, 0.2, 1],
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl text-center relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm md:text-base text-purple-600 uppercase tracking-wide font-semibold">
            Our Services
          </p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mt-2">
            Network and Billing
          </h3>
        </motion.div>

        <div className="relative w-full overflow-hidden px-4">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Carousel Content */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className={`
                ${services[currentIndex].color} 
                rounded-3xl shadow-xl p-12 md:p-16
                flex flex-col items-center justify-center
                transform transition-all duration-500
                backdrop-blur-sm
              `}
            >
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                className="text-7xl md:text-8xl mb-6 cursor-pointer"
              >
                {services[currentIndex].icon}
              </motion.div>
              <motion.h4 
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {services[currentIndex].name}
              </motion.h4>
              <motion.p 
                className="text-base md:text-lg text-gray-600 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {services[currentIndex].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {services.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`
                h-3 rounded-full transition-all duration-500
                ${currentIndex === index ? 'w-8 bg-blue-600' : 'w-3 bg-blue-200'}
                hover:bg-blue-400
              `}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;