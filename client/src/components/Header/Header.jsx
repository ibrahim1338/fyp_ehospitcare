import React from 'react'

function Header({ role, username, handleLogout,width }) {
  return (
    <div className={`${width} h-[6%] flex justify-between items-center bg-white p-4 shadow-bottom-only border-b border-gray-300 fixed top-0 right-0 z-10`}>
      <div className="">
        <span className="text-2xl font-bold text-gray-700 capitalize">{role}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xl font-semibold text-gray-800 uppercase tracking-wide">{username.toUpperCase()}</span>
        <button
          className="px-3 py-1 text-sm font-semibold text-blue-600 bg-white border-2 border-solid border-blue-600 rounded-xl cursor-pointer transition duration-300 ease-in-out transform shadow-md hover:bg-blue-700 hover:scale-105 active:bg-blue-80 hover:text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}


export default Header