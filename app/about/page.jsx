"use client";

import Footer from "../../components/footer";
// import Navbar from "../../components/navclient";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative bg-gray-100 py-0">
        
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('./woman and baby.jpg')",
        }}
      ></div>

      {/* Overlay */}
      <div className="relative container mx-auto px-4">
        {/* Section Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-blue-500 mt-4">Us</span> 🌟
        </motion.h2>

        {/* About Content */}
        <div className=" gap-8  flex justify-center items-center flex-col py-10">
          {/* Text Content */}
          <motion.div
            className="space-y-6 text-gray-700 text-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p>
              Welcome to <span className="text-blue-500 font-bold">Bundle4Africa</span>! 🚀 We are passionate about creating
              innovative solutions that make your life easier and more exciting. Our goal is to merge technology with
              creativity to deliver unforgettable experiences. 🎨
            </p>
            <p>
              At <span className="text-blue-500 font-bold">Bundle4Africa</span>, we believe in:
            </p>
            <ul className="list-disc list-inside">
              <li>🌍 Empowering communities through technology.</li>
              <li>💡 Innovation that transforms ideas into reality.</li>
              <li>🤝 Building meaningful connections with our users.</li>
            </ul>
            <p>
              Join us on this incredible journey as we explore the endless possibilities of the digital age. 🌟
            </p>
          </motion.div>

          {/* Image Content */}
        
        </div>
      </div>
      <Footer/>
    </section>
  );
}
