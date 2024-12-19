"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Mainpage() {
  // Variants for text and image
  const textVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 2, ease: "linear" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 2, ease: "linear" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "linear" },
    },
  };

  return (
    <section className="w-full min-h-screen flex flex-col sm:flex-row items-center justify-center px-6 md:px-16 bg-gray-50">
      {/* Text Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 space-y-4"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-purple-900">
          VTU Services
        </h1>
        <p className="text-lg md:text-2xl text-gray-600">
          Instant Recharge on Bundle 4 Africa
        </p>
        <p className="text-sm md:text-lg text-gray-500 leading-relaxed max-w-lg">
          Buy Cheap Mobile Data, Airtime, Pay Electricity Bills, TV
          Subscriptions, Educational Payments, and Print Recharge Cards & Data
          Pins.
          {/* <LoginLink>Sign in</LoginLink> */}
        </p>

        {/* Buttons */}
        <div className="flex flex-row md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center al justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <Button
              asChild
              className="w-full md:w-auto text-white bg-purple-900 hover:bg-purple-700 transition-all duration-300 mt-4 md:mt-0  mr-3"
            >
              
                <LoginLink>Sign in</LoginLink>
             
            </Button>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <Button
              asChild
              className="w-full md:w-auto text-white bg-green-700 hover:bg-green-600 transition-all duration-300 ml-2"
            >
              
            
                <RegisterLink>Sign up</RegisterLink>
             
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
        >
          {/* <Button className="w-full md:w-auto text-white bg-purple-900 font-bold hover:bg-purple-700 transition-all duration-300">
            Register
          </Button> */}
        </motion.div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={imageVariants}
        className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0"
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
    </section>
  );
}
