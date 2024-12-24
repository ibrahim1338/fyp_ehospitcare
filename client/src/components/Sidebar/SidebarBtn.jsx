import React from 'react'
import { Link } from 'react-router-dom'
function SidebarBtn({ label, icon, to }) {
  
  return (

    <Link to={to} className="sidebar-button">
            <span className="sidebar-icon">{icon}</span>
            <span className="sidebar-label">{label}</span>
        </Link>
  )
}

export default SidebarBtn