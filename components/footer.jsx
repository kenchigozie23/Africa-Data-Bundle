"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
// import melvislogo from "../public/africa.png";
// import Image from "next/image"

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  // Toggle scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gray-900 text-gray-300 px-6 md:px-16 py-10">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Company Information */}
        <motion.div
          className="w-full md:w-1/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Bundle4Africa.</h3>
          <p className="text-sm leading-relaxed">
            Instant Topup Platform to Buy Cheap Mobile Data, Airtime, Pay Electricity Bill, Pay TV
            Subscription, Educational Payment, Print Recharge Card & Data Pin.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          className="w-full md:w-1/3 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div>
            <h3 className="font-bold text-white mb-2">Company</h3>
            <ul className="space-y-2 ">
              <li className="hover:text-purple-900 cursor-pointer hover:scale-105 ">Home</li>
              <li className="hover:text-purple-900 cursor-pointer hover:scale-105" >About Us</li>
              <li className="hover:text-purple-900 cursor-pointer hover:scale-105" >Contact Us</li>
              <li className="hover:text-purple-900 cursor-pointer hover:scale-105">Download App</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">Policy Menu</h3>
            <ul className="space-y-2">
              <li className="hover:text-purple-900 cursor-pointer hover:scale-105">Giveaway Policy</li>
              <li className="hover:text-purple-900 cursor-pointer hover:scale-105">Account Deletion</li>
              <li className="hover:text-purple-900 cursor-pointer hover:scale-105">Terms of Service</li>
              <li className="hover:text-purple-900 cursor-pointer hover:scale-105">Privacy Policy</li>
            </ul>
          </div>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          className="w-full md:w-1/3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h4 className="font-bold text-white mb-4">Subscribe to Our Newsletter</h4>
          <p className="text-sm mb-4 ">
            Get updates on new features, discounts, and announcements.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
      >
        <p>&copy; 2024 Bundle4Africa. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0 cursor-pointer">
          <FaPhone className="hover:text-purple-900 cursor-pointer hover:scale-105" />
          <FaEnvelope className="hover:text-purple-900 cursor-pointer hover:scale-105" />
          <FaFacebook  className="hover:text-purple-900 cursor-pointer hover:scale-105"/>
          <FaTwitter  className="hover:text-purple-900 cursor-pointer hover:scale-105"/>
          <FaInstagram className="hover:text-purple-900 cursor-pointer hover:scale-105" />
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition duration-300"
        >
          <FaArrowUp size={20} />
        </motion.button>
      )}
    </footer>
  );
}
