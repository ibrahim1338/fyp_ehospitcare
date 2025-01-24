import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function SidebarBtn({ label, icon, to, display }) {
  const location = useLocation(); // Get the current location

  // Check if the current route matches the button's route
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center  pr-4 pl-2 py-4 font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out mx-4 my-2 group 
        ${
          isActive
            ? 'border-2 border-solid border-blue-600 bg-white scale-105 shadow-xl text-white ' // Active styles
            : 'bg-gradient-to-r from-blue-600 to-blue-900 text-white hover:scale-105 hover:shadow-xl'
        }`}
    >
      <span
        className={`mr-4 text-2xl transition-transform duration-300 ease-in-out ${
          isActive ? 'text-blue-900' : 'group-hover:rotate-12'
        }`}
      >
        {icon}
      </span>
      <span
        className={`${display} font-sans text-lg tracking-wide ${
          isActive ? 'text-blue-900' : 'group-hover:text-blue-300'
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

export default SidebarBtn;
