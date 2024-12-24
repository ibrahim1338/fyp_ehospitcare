import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Doctor() {
  const navigate = useNavigate()
    const user=useSelector((state)=>state.Auth.user)
    
    console.log(user)
  

  return (
    <>
      
    </>
  )
}

export default Doctor