import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" w-full p-3 bg-gray-50 text-gray-900 py-6 shadow-lg bg-gradient-to-r from-purple-700 to-black">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <h2>
              <Link
              href="/"
              className="text-4xl font-bold text-transparent text-white bg-clip-text hover:opacity-80 transition-all ease-in-out duration-300"
            >
              DealHaven.
            </Link>
          </h2>
        </div>

        {/* Copyright Section */}
        <p className="text-sm text-gray-100 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} DealHeaven. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
