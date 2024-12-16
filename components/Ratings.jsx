'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const CustomerTestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      position: 'Marketing Director',
      comment: 'An incredible service that exceeded all my expectations. The support team is phenomenal!',
      rating: 5,
      image: '/sarah.jpeg',
    },
    {
      name: 'Michael Chen',
      position: 'Tech Entrepreneur',
      comment: 'Revolutionary platform that simplifies complex business processes. Truly game-changing!',
      rating: 5,
      image: '/micheal.jpeg',
    },
    {
      name: 'Emily Rodriguez',
      position: 'Small Business Owner',
      comment: 'Affordable, reliable, and incredibly user-friendly. It has transformed how I manage my business.',
      rating: 5,
      image: '/emely.jpeg',
    },
    {
      name: 'David Kim',
      position: 'Finance Manager',
      comment: "Seamless integration and top-notch customer support. Couldn't ask for a better service!",
      rating: 5,
      image: '/david.jpg',
    },
  ];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-6 h-6 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-4">
            Satisfied Customers
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Hear what our incredible customers have to say about their experience
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative overflow-hidden">
          <AnimatePresence>
          <motion.div
  key={currentIndex}
  className="flex w-full"
  animate={{
    x: `-${currentIndex * 100}%`, // Move horizontally based on index
  }}
  transition={{
    ease: 'easeInOut',
    duration: 1.2, // Smooth and steady transition
  }}
>
  {testimonials.map((testimonial, index) => (
    <div
      key={index}
      className="min-w-full bg-white shadow-2xl rounded-2xl p-8 md:p-12 flex flex-col items-center space-y-6"
    >
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-24 h-24 rounded-full border-4 border-purple-800"
      />
      <p className="text-gray-600 italic">"{testimonial.comment}"</p>
      <h4 className="text-xl font-bold">{testimonial.name}</h4>
      <p className="text-gray-500">{testimonial.position}</p>
    </div>
  ))}
</motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-purple-800 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerTestimonialCarousel;
