"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

function Offer() {
  const services = [
    "Data Recharge",
    "Airtime Recharge",
    "Print Recharge Card",
    "CableTV Bill",
    "Exam Pin Purchase",
    "Utility Bills",
  ];

  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2,
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  const serviceItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "#6B21A8", // Darker purple
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.95 
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-12 py-10 bg-gray-50 gap-10 overflow-hidden">
      {/* Image Section */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={imageVariants}
      >
        <Image
          src="/data.svg"
          alt="VTU Services Illustration"
          width={500}
          height={500}
          priority
          className="object-contain"
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-start text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={contentVariants}
      >
        <motion.h4 
          className="text-lg font-semibold text-purple-600 mb-2"
          variants={titleVariants}
        >
          What We Offer
        </motion.h4>

        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          variants={titleVariants}
        >
          We Made OneCrediit For You
        </motion.h2>

        <motion.p 
          className="text-gray-600 mb-6 leading-relaxed"
          variants={titleVariants}
        >
          We offer instant recharge of Airtime, Data bundles, CableTV (DStv,
          GOtv & Startimes), Electricity Bill Payment, and Educational PIN(s)
          with instant delivery.
        </motion.p>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full">
          {services.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={serviceItemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm"
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <FaCheckCircle className="text-purple-600 text-lg" />
              </motion.div>
              <p className="text-gray-700 font-medium">{service}</p>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="bg-purple-900 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Get Discount
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Offer;