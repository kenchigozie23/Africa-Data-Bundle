'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

const SubscriptionCard = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
      // Simulate subscription (replace with actual API call)
      setSubscribed(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    } else {
      // Optional: Add error handling
      alert('Please enter a valid email address');
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  const inputVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 md:p-12 text-center"
      >
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        >
          Subscribe to Our Service
        </motion.h2>
        
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-6"
        >
          Stay updated with our latest offerings and exclusive insights
        </motion.p>
        
        <form onSubmit={handleSubscribe} className="space-y-4">
          <motion.div 
            variants={inputVariants}
            initial="initial"
            animate="animate"
            className="relative"
          >
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={subscribed}
              className={`
                w-full px-4 py-3 rounded-lg border 
                ${subscribed 
                  ? 'bg-green-50 border-green-300 text-green-700' 
                  : 'bg-white border-gray-300 text-gray-800'}
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-300
              `}
            />
            {subscribed && (
              <CheckCircle2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600" />
            )}
          </motion.div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={subscribed}
            className={`
              w-full flex items-center justify-center space-x-2 
              py-3 rounded-lg text-white font-semibold 
              transition-all duration-300
              ${subscribed 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-600 hover:bg-blue-700'}
            `}
          >
            {subscribed ? (
              <>
                <CheckCircle2 className="mr-2" />
                Subscribed Successfully
              </>
            ) : (
              <>
                <Send className="mr-2" />
                Subscribe Now
              </>
            )}
          </motion.button>
        </form>
        
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-gray-500 mt-4"
        >
          We respect your privacy. Unsubscribe at any time.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SubscriptionCard;