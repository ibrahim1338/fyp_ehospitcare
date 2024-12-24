import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import  { toast } from 'react-hot-toast';
import {useDispatch,useSelector } from 'react-redux'
import { SetUser } from '../redux/AuthSlice';
// import './login.css'
export default function Login() {
 const user=useSelector((state)=>state.Auth)
 console.log(user)
   const dispatch=useDispatch()
    const [email,setEmail]=useState('')
    const navigate=useNavigate()
    const [password,setPassword]=useState('')

       const handleSubmit= async(e)=>{
        e.preventDefault();
          console.log(email,password)
          try {
              const request= await post('/api/auth/login',{email,password})
              const reponse= request.data 

              if (request.status==200) {
                if (reponse.user.role ==='admin') {
                  navigate('/admin')
                }else if (reponse.user.role ==='doctor') {
                   navigate('/doctor')
                }
                else{
                  navigate('/')
                }
                toast.success(reponse.message)
                dispatch(SetUser(reponse.user))
              }
              console.log(reponse)
          } catch (error) {
            console.log(error)
          }   
       }
  return (
    <>
        <div className='main flex items-center justify-center min-h-screen bg-cover bg-center' >
        <div className='login-container w-96'>
            <h1 className='w-full text-center font-bold text-red-500'>e-HospitCare</h1>
            <h2 className='w-full text-center'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor="Email">Email</label>
                    <input type="email" name="" id="email" 
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor="passowrd">Password</label>
                    <input type="password" name=""
                      onChange={(e)=>setPassword(e.target.value)} id="password" />
                </div>
                <button type='submit' className='bg-red-500 p-1.5 text-white'>Login</button>
                <p className='register-link'>
                Not registered? <Link to={'/register'}>Register here</Link>
                </p>
            </form>
        </div>
        </div>
    </>
  )
}
