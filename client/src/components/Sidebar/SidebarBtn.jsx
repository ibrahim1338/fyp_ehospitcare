import React from 'react'
import { Link } from 'react-router-dom'
function SidebarBtn({ label, icon, to, dispaly }) {
  
  return (

    <Link
    to={to}
    className="flex items-center justify-between pr-4 pl-2 py-4 text-white bg-gradient-to-r from-blue-600 to-blue-900 font-bold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out mx-4 my-2 group"
  >
    <span className="mr-4 text-2xl transition-transform duration-300 ease-in-out group-hover:rotate-12">{icon}</span>
    <span className={`${dispaly} font-sans text-lg tracking-wide group-hover:text-blue-300`}>{label}</span>
  </Link>
  

  )
}

export default SidebarBtn