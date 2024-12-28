import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import { Logout } from '../redux/AuthSlice'
import SidebarBtn from '../components/Sidebar/SidebarBtn'
import Header from '../components/Header/Header'
import { FaTachometerAlt, FaUser, FaUsers } from 'react-icons/fa'
import { LuTestTube } from 'react-icons/lu'
import { MdMedication } from 'react-icons/md'

function PharmacistLayout() {
    const user=useSelector((state) => state.Auth.user)
    const disptach = useDispatch()
    const navigate = useNavigate()
  const handleLogout=async()=>{
    try {
      const request= await post('/api/auth/logout')
       const response= request.data
       if (request.status==200) {
           disptach(Logout())
          navigate('/login')
       }
    } catch (error) {
      console.log(error)
    }
  }
    useEffect(()=>{
      if (!user) {
          navigate('/login')
      }
    },[user])
  return (
    <>
    <div className="left">
        <div className="sidebar">
        <SidebarBtn label="Dashboard" icon={<FaTachometerAlt />} to="/pharmacist" />
        <SidebarBtn label="Patients" icon={<FaUsers />} to="/pharmacist/patients" />
        <SidebarBtn label="Provide Medication" icon={<MdMedication />} to="/pharmacist/provideMed" />
        <SidebarBtn label="Profile" icon={<FaUser />} to="/pharmacist/profile" />

        </div>
    </div>
    <div className="right">

    <Header role={user.role} username={user.name} handleLogout={handleLogout}/>
    <div className="main-container">
    <Outlet/>
    </div>
    </div>
    </>
  )
}

export default PharmacistLayout