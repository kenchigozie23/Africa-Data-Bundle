import React from "react";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import Link from "next/link";

const Firstnav = () => {
  return (
    <main className="w-full hidden md:flex justify-between items-center lg:px-32 px-10 md:px-10 mx-auto border border-b-1 border-t-0 border-l-0 border-gray-300 border-r-0 ">
      <article className="lg:flex lg:justify-between lg:items-center grid-cols-1">
        <div className="flex lg:justify-center lg:items-center cursor-pointer">
          <div className="px-2">
            <CiMail />
          </div>
          <p className="text-xs pr-8">support@melvisworld.com</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="px-2">
            <CiLocationOn />
          </div>
          <p className="text-xs">
            No 10 Sir (Engr.) & Lady E.B.E Aloku Street, Delta State.
          </p>
        </div>
      </article>
      <article className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <div className="px-2">
            
            <Link href="/login"><BsPerson /></Link>
          </div>

          <p className="pr-3 text-sm">
            <Link href="/login">login</Link>
          </p>
        </div>
        <div>
          <button className="text-sm bg-black text-white border-solid md:py-2 md:px-4 py-2 px-4 font-semibold cursor-pointer">
            Contact Us
          </button>
        </div>
      </article>
    </main>
  );
};

export default Firstnav;