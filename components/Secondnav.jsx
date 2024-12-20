'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Home, GraduationCap as Grad, BookOpen as Book, Phone } from 'lucide-react';
import Image from 'next/image';

const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setShadow(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { title: 'Home', icon: Home, href: '/' },
    { title: 'Services', icon: Grad, href: '/services' },
    { title: 'About', icon: Book, href: '/about' },
    { title: 'Contact', icon: Phone, href: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-shadow duration-300 ${
        shadow ? 'shadow-md bg-white' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4 lg:px-20">
        {/* Logo */}
        <div className="flex items-center">
          <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl"><Image src={'/bundle.png'} width={300} height={300} alt='bubdle4africa'/></span>
          </div>
          <span className="ml-2 text-xl font-bold text-blue-600 hidden md:block">Bundle4Africa</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, color: '#2563EB' }}
              className="cursor-pointer transition-all"
            >
              <a href={item.href} className="flex items-center space-x-2">
                <item.icon className="w-5 h-5 text-blue-600" />
                <span>{item.title}</span>
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden p-2 rounded-lg">
          {isOpen ? <X className="h-6 w-6 text-blue-600" /> : <Menu className="h-6 w-6 text-blue-600" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 bg-white flex flex-col items-center justify-center space-y-6 text-gray-700 font-medium md:hidden ${
          isOpen ? 'visible' : 'hidden'
        }`}
      >
        {menuItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            className="flex items-center space-x-4 py-2 px-4 rounded-lg transition-colors hover:bg-blue-50"
            whileHover={{ scale: 1.1 }}
            onClick={toggleMenu}
          >
            <item.icon className="h-5 w-5 text-blue-600" />
            <span>{item.title}</span>
          </motion.a>
        ))}
      </motion.div>
    </nav>
  );
};

export default ResponsiveNavbar;
