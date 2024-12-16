"use client";
import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";


const cardData = [
  {
    logo: "/mtnlogo.png",
    title: "MTN Data Plan",
    content: [
      { plan: "500MB 30 Days", price: "₦130" },
      { plan: "1GB 30 Days", price: "₦260" },
      { plan: "2GB 30 Days", price: "₦520" },
    ],
  },
  {
    logo: "/airtel logo.png",
    title: "Airtel Data Plan",
    content: [
      { plan: "1GB 30 Days", price: "₦250" },
      { plan: "2GB 30 Days", price: "₦500" },
      { plan: "5GB 30 Days", price: "₦1,200" },
    ],
  },
  {
    logo: "/glo logo.jpeg",
    title: "Glo Data Plan",
    content: [
      { plan: "1GB 30 Days", price: "₦230" },
      { plan: "3GB 30 Days", price: "₦600" },
      { plan: "5GB 30 Days", price: "₦1,000" },
    ],
  },
  {
    logo: "/9mobile.jpg",
    title: "9Mobile Data Plan",
    content: [
      { plan: "500MB 7 Days", price: "₦150" },
      { plan: "1.5GB 30 Days", price: "₦500" },
      { plan: "3GB 30 Days", price: "₦900" },
    ],
  },
];
function Carrd() {
  return (
    <section className="w-full px-6 py-10 bg-gray-50">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden p-5 text-center cursor-pointer hover:shadow-2xl"
        >
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src={card.logo}
              alt={`${card.title} Logo`}
              width={70}
              height={70}
              className="rounded-full shadow-md object-cover"
            />
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {card.title}
          </h2>

          {/* Content */}
          <div className="grid grid-cols-2 gap-y-2 text-gray-700 text-sm mb-4">
            {card.content.map((item, idx) => (
              <React.Fragment key={idx}>
                <span className="font-medium">{item.plan}</span>
                <span className="text-right">{item.price}</span>
              </React.Fragment>
            ))}
          </div>

          {/* Footer Button */}
          <div className="mt-4">
            <button className="bg-purple-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out">
              Get Data
            </button>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="flex items-center justify-center py-9 w-full bg-gray-50">
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
        Become an Agent
      </button>
    </div>
  </section>
  );
}

export default Carrd;
