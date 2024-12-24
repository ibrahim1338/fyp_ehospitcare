import React from 'react'
import './dashboard.css'
function Card({ number, title, imageSrc }) {
  return (
    <div className="card-container">
      <div className="card-content">
        <div className="card-number-title">
          <span className="card-number">{number}</span>
          <span className="card-title">{title}</span>
        </div>
        <img src={imageSrc} alt={title} className="card-image" />
      </div>
      <div className="card-footer-line"></div>
    </div>
  )
}

export default Card