"use client";

// import BottomNavigation from "../../components/ButtonNavigation";
// import Footer from "../../components/footer";
import Navbar from "../../components/navclient";
import { motion } from "framer-motion";
import { FaMobileAlt, FaWifi, FaTv, FaPlug, FaSms, FaMoneyBillWave, FaCreditCard, FaExchangeAlt } from "react-icons/fa";

export default function ServiceSection() {
  const services = [
    { name: "Airtime", icon: <FaMobileAlt className="text-4xl text-blue-500" /> },
    { name: "Data", icon: <FaWifi className="text-4xl text-green-500" /> },
    { name: "Cable TV", icon: <FaTv className="text-4xl text-purple-500" /> },
    { name: "Result PIN", icon: <FaCreditCard className="text-4xl text-orange-500" /> },
    { name: "Electricity", icon: <FaPlug className="text-4xl text-yellow-500" /> },
    { name: "Bulk SMS", icon: <FaSms className="text-4xl text-pink-500" /> },
    { name: "Airtime PIN", icon: <FaMoneyBillWave className="text-4xl text-indigo-500" /> },
    { name: "Airtime 2 Cash", icon: <FaExchangeAlt className="text-4xl text-teal-500" /> },
  ];

  return (
    <section className="bg-gray-100 py-16">
        <Navbar/>
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our <span className="text-blue-500">Services</span> 🛒
        </motion.h2>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-2xl transition transform hover:-translate-y-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">
                Fast and reliable {service.name.toLowerCase()} service at your fingertips.
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition">
                <FaCreditCard className="text-lg" /> Purchase
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* <BottomNavigation/> */}
   
    </section>
  );
}
