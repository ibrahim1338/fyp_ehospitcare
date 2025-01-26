import React from 'react'
import './dashboard.css'
import { Link } from 'react-router-dom'
function Card({ number, title, imageSrc, to }) { 
  return (

    <Link to={to}>
    <div className="card-container flex justify-between items-stretch rounded-lg shadow-md bg-white overflow-hidden h-[200px] w-[285px] border-b-8 border-blue-600 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <div className="card-number-title flex flex-col p-6 gap-2">
        <span className="card-number text-4xl text-blue-600 font-bold">{number}</span>
        <span className="card-title text-gray-700 font-medium">{title}</span>
      </div>
      <img
        src={imageSrc}
        alt={title + ' image'}
        className="card-image transform transition-transform duration-300 ease-in-out hover:scale-110"
      />
    </div>
  </Link>
  
  )
}

export default Card