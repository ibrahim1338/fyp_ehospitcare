import React from 'react'
import './header.css'

function Header({role,username,handleLogout}) {
    
  return (
    <div className="header ">
        <div className="left">
          <span className="user-role">{role}</span>
        </div>
        <div className="right">
          <span className="user-name">{username}</span>
          <button className="logout-button w-24 h-10" onClick={handleLogout}>Logout</button>
        </div>
     </div>
  )
}

export default Header