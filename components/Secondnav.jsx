"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
// import melvislogo from "./africa.png";
import StaggeredDropDown from "../components/dropdown";

export default function Secondnav() {
  const [nav, setNav] = useState(false);
  const [shadow, setShadow] = useState(false);

  const handleNav = () => setNav(!nav);

  useEffect(() => {
    const handleScroll = () => setShadow(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed w-full top-0 z-20 transition-all duration-300 ${
        shadow ? "shadow-md bg-white" : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Container */}
      <div className="container mx-auto flex justify-between items-center px-6 py-4 lg:px-20  text-white bg-purple-900">
        {/* Logo */}
        <Link href="/">
          <Image
            src={'./africa.png'}
            alt="Melvis Logo"
            width={100}
            height={50}
            priority
            className="cursor-pointer md:w-20 w-10"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 items-center text-white font-semibold ">
          {["Home", "About", "Service", "Contact Us"].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, color: "#6D28D9" }}
              className="cursor-pointer transition"
            >
              <Link href="/">{item}</Link>
            </motion.li>
          ))}
          <StaggeredDropDown />
        </ul>

        {/* Search */}
        <div className="md:flex hidden w-full sm:w-96 rounded-md overflow-hidden">
  <input
    type="text"
    placeholder="Search..."
    className="flex-1 px-2 py-2 text-sm bg-gray-100 placeholder-gray-500 focus:outline-none"
  />
  <motion.button
    whileHover={{ scale: 1.05 }}
    className="bg-purple-600 text-white px-4 py-2 hover:bg-purple-700 transition-all duration-300"
  >
    <BsSearch size={20} />
  </motion.button>
</div>


        {/* Mobile Menu Button */}
        <motion.button
          onClick={handleNav}
          whileHover={{ scale: 1.2 }}
          className="md:hidden"
        >
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`fixed inset-0 bg-gray-800 text-white flex flex-col items-center justify-center space-y-6 transition-transform duration-300 md:hidden ${
          nav ? "translate-x-0" : "translate-x-full"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: nav ? 1 : 0 }}
      >
        {["Home", "About", "FAQ", "Contact"].map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1, color: "#A78BFA" }}
            onClick={handleNav}
            className="cursor-pointer list-none text-2xl"
          >
            <Link href="/">{item}</Link>
          </motion.li>
        ))}
      </motion.div>
    </motion.nav>
  );
}
