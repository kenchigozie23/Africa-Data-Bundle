import React from "react";
import { CiMail, CiLocationOn } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import Link from "next/link";

const Firstnav = () => {
  return (
    <nav className="w-full hidden md:flex justify-between items-center px-6 md:px-10 lg:px-32 border-b border-gray-300">
      {/* Left Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0">
        <div className="flex items-center space-x-2">
          <CiMail size={20} />
          <p className="text-sm text-gray-700">support@melvisworld.com</p>
        </div>
        <div className="flex items-center space-x-2 lg:ml-8">
          <CiLocationOn size={20} />
          <p className="text-sm text-gray-700">
            No 10 Sir (Engr.) & Lady E.B.E Aloku Street, Delta State.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Link href="/login">
            <BsPerson size={20} className="cursor-pointer" />
          </Link>
          <Link href="/login" className="text-sm text-gray-700">
            Login
          </Link>
        </div>
        <button className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition duration-300">
          Contact Us
        </button>
      </div>
    </nav>
  );
};

export default Firstnav;
