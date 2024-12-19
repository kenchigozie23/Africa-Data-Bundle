"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Back Arrow */}
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <FaArrowLeft className="text-xl" aria-hidden="true" />
          <span className="hidden sm:inline text-lg font-medium cursor-pointer">Back</span>
        </Link>

        {/* Logo */}
        <motion.div
          className="text-xl font-bold flex-grow text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          MyApp
        </motion.div>

        {/* Hamburger Menu */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-white"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>

        {/* Links for larger screens */}
        <div className="hidden sm:flex space-x-8 text-lg">
          {["About", "Services", "Contact"].map((item, index) => (
            <motion.a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="hover:underline cursor-pointer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Responsive Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sm:hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4"
            role="menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ul className="space-y-4 px-4">
              {["About", "Services", "Contact"].map((item, index) => (
                <motion.li
                  key={index}
                  className="hover:underline cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
