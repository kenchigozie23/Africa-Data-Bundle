'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Zap, Globe } from 'lucide-react';

const Ours = () => {
  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const features = [
    {
      icon: <CheckCircle2 className="text-blue-600 w-12 h-12" />,
      title: "Easy Verification",
      description: "Seamless and quick account verification process",
      image: "/api/placeholder/200/200"
    },
    {
      icon: <Shield className="text-green-600 w-12 h-12" />,
      title: "Secure Transactions",
      description: "Advanced security protocols to protect your data",
      image: "/api/placeholder/200/200"
    },
    {
      icon: <Zap className="text-purple-600 w-12 h-12" />,
      title: "Instant Services",
      description: "Lightning-fast digital solutions at your fingertips",
      image: "/api/placeholder/200/200"
    },
    {
      icon: <Globe className="text-red-600 w-12 h-12" />,
      title: "Global Accessibility",
      description: "Access services from anywhere, anytime",
      image: "/api/placeholder/200/200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mb-12"
      >
        <motion.p 
          variants={headerVariants} 
          className="text-sm md:text-base pb-2 font-semibold text-blue-800 uppercase tracking-wide"
        >
          Why OneCrediit
        </motion.p>
        
        <motion.h2 
          variants={headerVariants}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-950 mb-6"
        >
          We Are Always Here For Your Backup
        </motion.h2>
        
        <motion.p 
          variants={headerVariants}
          className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          OneCrediit has the technology power that offers solutions to digital needs at best possible price without compromising quality.
        </motion.p>
        
        <motion.button
          variants={headerVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-900 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Create an account 
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-6"
          >
            <div className="flex-shrink-0">{feature.icon}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Ours;