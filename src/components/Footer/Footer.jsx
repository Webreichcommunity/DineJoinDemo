import React from 'react';
import { MailIcon } from '@heroicons/react/outline';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 px-4 border-t border-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">NightHub <span className='text-yellow-400'>CAFE</span></h2>
          <p className="mb-2">The best place to enjoy your favorite meals.</p>
          <p className="mb-1">123 Main Street, Kaulkhed, Akola</p>
          <p className="mb-1">Phone: (123) 456-7890</p>
        </div>
        <div className="flex space-x-6 mb-2 md:mb-0">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-yellow-500 transition-transform transform hover:scale-125 duration-300"
          >
            <FaInstagram className="h-7 w-7" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-yellow-500 transition-transform transform hover:scale-125 duration-300"
          >
            <FaFacebook className="h-7 w-7" />
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-yellow-500 transition-transform transform hover:scale-125 duration-300"
          >
            <FaWhatsapp className="h-7 w-7" />
          </a>
          <a
            href="mailto:info@nighthubcafe.com"
            className="text-gray-800 hover:text-yellow-500 transition-transform transform hover:scale-125 duration-300"
          >
            <MailIcon className="h-7 w-7" />
          </a>
        </div>
      </div>
      <div className="mt-2 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} NightHub Cafe. All rights reserved.</p>
      </div>
      <style jsx>{`
        @keyframes slideUp {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        footer {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
