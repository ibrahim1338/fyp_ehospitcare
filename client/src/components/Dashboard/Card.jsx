import React from 'react'
import './dashboard.css'
import { Link } from 'react-router-dom'
function Card({ number, title, imageSrc, to }) { 
  return (

    <Link to={to}>
    <div className="card-container flex justify-between items-stretch rounded-lg shadow-md bg-white overflow-hidden h-[200px] w-[285px] border-b-8 border-blue-600">
        <div className="card-number-title flex flex-col p-6 gap-2"> {/* Adjusted gap for better spacing */}
            <span className="card-number text-4xl text-blue-600 font-bold">{number}</span>
            <span className="card-title">{title}</span>
        </div>
        
        <img src={imageSrc} alt={title + ' image'} className="card-image " />
    </div>
</Link>
  )
}

export default Card