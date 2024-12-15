import React from 'react';
import { MailIcon, PhoneIcon, MapIcon } from '@heroicons/react/outline';
import { FaInstagram, FaFacebook, FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-6 border-t border-gray-700">
      <div className="container mx-auto grid md:grid-cols-3 gap-12 items-start">
        {/* Cafe Information */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6 text-white">
            WebReich <span className='text-red-500'>CAFE</span>
          </h2>
          <div className="space-y-4 text-gray-300">
            <p className="flex items-center justify-center md:justify-start">
              <MapIcon className="h-6 w-6 mr-2 text-red-500" />
              123 Tech Street, Innovation Hub, Akola
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <PhoneIcon className="h-6 w-6 mr-2 text-red-500" />
              +91 (123) 456-7890
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <MailIcon className="h-6 w-6 mr-2 text-red-500" />
              contact@webreichcafe.com
            </p>
          </div>
        </div>

        {/* Developer & Social Links */}
        <div className="text-center md:text-right">
          <h3 className="text-2xl font-semibold mb-4 text-red-500">Connect With Us</h3>
          <div className="flex justify-center md:justify-end space-x-6 mb-6">
            {[
              { Icon: FaInstagram, href: "https://www.instagram.com" },
              { Icon: FaFacebook, href: "https://www.facebook.com" },
              { Icon: FaWhatsapp, href: "https://wa.me/1234567890" },
              { Icon: FaGithub, href: "https://github.com/yourusername" },
              { Icon: FaLinkedin, href: "https://linkedin.com/in/yourusername" }
            ].map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-red-500 transform transition-all duration-300 hover:scale-110"
              >
                <Icon className="h-8 w-8" />
              </a>
            ))}
          </div>
          <div className="text-gray-400 text-sm">
            <p>Developed by <span className='text-white font-medium'>WebReich Technologies</span></p>
            <p>Design & Concept by <span className='text-white font-medium'>Webreich</span></p>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 text-center text-gray-500 border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} WebReich Cafe. All Rights Reserved.</p>
        <p className="text-xs mt-2">Proudly built with React & Tailwind CSS</p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        footer {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
