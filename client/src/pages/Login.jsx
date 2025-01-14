import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import  { toast } from 'react-hot-toast';
import {useDispatch,useSelector } from 'react-redux'
import { SetUser } from '../redux/AuthSlice';
// import './login.css'
export default function Login() {
  const user = useSelector((state) => state.Auth);
  console.log(user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const request = await post('/api/auth/login', { email, password });
      const response = request.data;

      if (request.status === 200) {
        if (response.user.role === 'admin') {
          navigate('/admin');
        } else if (response.user.role === 'doctor') {
          navigate('/doctor');
        } else {
          navigate('/');
        }
        toast.success(response.message);
        dispatch(SetUser(response.user));
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/loginbg.jpg')", // Replace with the correct path for your background image
      }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-red-500 mb-4">e-HospitCare</h1>
        <h2 className="text-lg font-medium text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Not registered?{' '}
            <a 
              href="/register"
              className="text-blue-500 font-medium hover:underline"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
