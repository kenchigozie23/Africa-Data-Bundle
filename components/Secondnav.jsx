"use client";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import Image from "next/image";
import melvislogo from "../public/data africa.png";
import Link from "next/link";

import StaggeredDropDown from "../components/dropdown";

function Secondnav() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  return (
    <main className="w-full lg:px-32 px-10 md:px-11 mx-auto  py-3 top-0 left-0 z-20 fixed ease-in duration-300">
      <div className="max-w-[1366px] mx-auto h-[100px]  md:flex justify-between items-center ">
        <article className="flex justify-between items-center">
          <div className="lg:w-36 w-36  pt-2 lg:pt-0">
            <Image
              className="pr-20 cursor-pointer"
              src={melvislogo}
              alt="melvisworld-logo
              max-w-full h-auto object-contain"


              priority={true} 
              quality={90} 
              placeholder="blur" 
            />
          </div>

          <div className="md:flex justify-between items-center gap-3 mx-9 pr-9 hidden ">
            <Link
              href="/"
              className="hover:text-indigo-500 hover:scale-110 duration-100"
            >
              Home
            </Link>
            <Link
              href="/"
              className="hover:text-indigo-500 hover:scale-110  duration-100"
            >
              About
            </Link>
            <Link
              href="/"
              className="hover:text-indigo-500 hover:scale-110 duration-100"
            >
              FAQ
            </Link>
            <Link
              href="/"
              className="hover:text-indigo-500 hover:scale-110  duration-100"
            >
              Contact
            </Link>

            <span className="">
              <StaggeredDropDown />
            </span>
            <div></div>
          </div>
          {/* Nav bar for mobile devices */}
          <div className="lg:hidden flex" onClick={handleNav}>
            {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </div>
        </article>

        <article className="flex justify-between items-center">
          <div className="hidden md:block">
            {/* Search input */}
            <div className=" rounded-md shadow-sm hidden lg:flex mx-auto">
              <input
                type="text"
                className=" bg-gray-100   border-none border-gray-300 h-9 px-3 pr-0 rounded-none text-sm focus:outline-none placeholder:text-black"
                placeholder="Search..."
              />
              <button className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border-l-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-100 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 border-r-0 border-t-0 border-b-0">
                <BsSearch className="h-5 w-5 text-black" aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>

        <div
          className={
            nav
              ? "lg:hidden absolute top-[100px] right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen bg-slate-800 text-white ease-in duration-300"
              : "md:hidden absolute top-[100px] right-0 left-[-100%] flex justify-center items-center w-full h-screen bg-slate-800 text-white text-center ease-in duration-300"
          }
        >
          <div className="w-full">
            <ul>
              <li onClick={handleNav}>
                <Link href="/">Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Secondnav;
