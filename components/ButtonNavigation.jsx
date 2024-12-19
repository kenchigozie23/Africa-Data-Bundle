"use client";

import Link from "next/link";
import { FaHome, FaBars, FaBriefcase, FaHistory } from "react-icons/fa";

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white md:hidden">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Menu Icon */}
        <Link href="/menu">
          <div className="flex flex-col items-center">
            <FaBars className="text-3xl" />
            <span className="text-sm font-bold">Menu</span>
          </div>
        </Link>

        {/* Home Icon (Center) */}
        <Link href="/">
          <div className="flex flex-col items-center">
            <FaHome className="text-4xl" />
            <span className="text-sm font-bold">Home</span>
          </div>
        </Link>

        {/* Services Icon */}
        <Link href="/services">
          <div className="flex flex-col items-center">
            <FaBriefcase className="text-3xl" />
            <span className="text-sm font-bold">Services</span>
          </div>
        </Link>

        {/* History Icon */}
        <Link href="/history">
          <div className="flex flex-col items-center">
            <FaHistory className="text-3xl" />
            <span className="text-sm font-bold">History</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
