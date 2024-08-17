import React from "react";
import Link from "next/link"; // Assuming you're using Next.js

const NavBar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="/path-to-your-logo.png"
            alt="Logo"
            className="h-12 w-auto"
          />
          <div className="ml-2">
            <h1 className="text-lg font-semibold">PARENT RESOURCE CENTRE</h1>
            <p className="text-xs text-pink-500">OTTAWA</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-sm">
          <Link
            href="/"
            className="inline-block text-left leading-[50px] px-2 transition-colors duration-400 ease-out hover:text-purple-600"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="inline-block text-left leading-[50px] px-2 transition-colors duration-400 ease-out hover:text-purple-600"
          >
            About Us
          </Link>
          <Link
            href="/get-involved"
            className="inline-block text-left leading-[50px] px-2 transition-colors duration-400 ease-out hover:text-purple-600"
          >
            Get Involved
          </Link>
          <Link
            href="/parents"
            className="inline-block text-left leading-[50px] px-2 transition-colors duration-400 ease-out hover:text-purple-600"
          >
            Parents
          </Link>
          <Link
            href="/professionals"
            className="inline-block text-left leading-[50px] px-2 transition-colors duration-400 ease-out hover:text-purple-600"
          >
            Professionals
          </Link>
          <Link
            href="/blog"
            className="inline-block text-left leading-[50px] px-2 transition-colors duration-400 ease-out hover:text-purple-600"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="inline-block text-left leading-[50px] px-2 transition-colors duration-400 ease-out hover:text-purple-600"
          >
            Contact
          </Link>
        </div>

        {/* Social Icons and Button */}
        <div className="flex items-center space-x-3">
          <a
            href="https://www.facebook.com/parentresourcecentre"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://static.wixstatic.com/media/11062b_0bec1cadb27b4d4a9898a740648fc5a9~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_0bec1cadb27b4d4a9898a740648fc5a9~mv2.png"
              alt="Facebook"
              className="h-[39px] w-[39px] object-cover"
            />
          </a>
          <a
            href="https://www.instagram.com/parentresource"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://static.wixstatic.com/media/11062b_482d38aa2aaa49a5b45774ebe9a5b544~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_482d38aa2aaa49a5b45774ebe9a5b544~mv2.png"
              alt="Instagram"
              className="h-[39px] w-[39px] object-cover"
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://static.wixstatic.com/media/11062b_23e5890c2dfc4a04af80178b43ef66fd~mv2.png/v1/fill/w_39,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_23e5890c2dfc4a04af80178b43ef66fd~mv2.png"
              alt="LinkedIn"
              className="h-[39px] w-[39px] object-cover"
            />
          </a>
          <button className="relative bg-blue-500 text-white border-transparent border-solid border-0 rounded-lg shadow-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-400 ease-out">
            <span className="flex items-center justify-center w-full h-full">
              Donate Now
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
