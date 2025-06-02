import React from "react";
import { FiHome, FiUsers, FiSettings, FiAward } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-yellow-400 shadow-lg p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Tournament Dashboard</div>
      <ul className="flex space-x-6">
        <li className="hover:text-yellow-300 cursor-pointer flex items-center">
          <FiHome className="mr-2" /> Home
        </li>
        <li className="hover:text-yellow-300 cursor-pointer flex items-center">
          <FiUsers className="mr-2" /> Players
        </li>
        <li className="hover:text-yellow-300 cursor-pointer flex items-center">
          <FiAward className="mr-2" /> Tournaments
        </li>
        <li className="hover:text-yellow-300 cursor-pointer flex items-center">
          <FiSettings className="mr-2" /> Settings
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
