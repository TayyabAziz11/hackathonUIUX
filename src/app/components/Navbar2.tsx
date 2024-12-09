import React from 'react'
import Image from 'next/image'
import Logo from '/public/navbar-brand.png'
import Link from 'next/link';

const Navbar2 = () => {
  return (
    // Main div
    <nav className="flex items-center justify-around py-6">
        <div className="font-bold text-xl">Bandage</div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-gray-600">
            Home
          </a>
          <a href="#" className="text-gray-600">
            Product
          </a>
          <a href="#" className="text-gray-600">
            Pricing
          </a>
          <a href="/Contact" className="text-gray-600">
            Contact
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-blue-500">
            Login
          </a>
          <a
            href="#"
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          >
            Become a member
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </nav>
  )
}

export default Navbar2
