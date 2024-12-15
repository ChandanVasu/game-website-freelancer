// components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-start p-6 border-t border-gray-200">
      <div className="text-lg font-bold text-gradient">
        <span className="text-blue-600">G</span>
        <span className="text-yellow-500">a</span>
        <span className="text-green-500">m</span>
        <span className="text-red-500">e</span>
        <span className="text-pink-500">s</span>
      </div>
      <div className="flex justify-start space-x-4 text-blue-500 text-sm mt-4">
        <a href="#" className="hover:underline">
          All Games
        </a>
        <a href="#" className="hover:underline">
          Contact Us
        </a>
        <a href="#" className="hover:underline">
          Developers
        </a>
        <a href="#" className="hover:underline">
          Privacy
        </a>
        <a href="#" className="hover:underline">
          Join our Discord
        </a>
      </div>
      <div className="text-gray-500 text-xs mt-4">© Lagged 2024</div>
    </footer>
  );
};

export default Footer;
