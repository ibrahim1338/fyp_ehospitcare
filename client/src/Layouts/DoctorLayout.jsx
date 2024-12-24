import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { FaTachometerAlt,FaUsers,FaUserMd,FaUserNurse,FaVials, FaCashRegister,FaUserTie,FaFileMedicalAlt,FaChild,FaSkull, FaUser } from "react-icons/fa";
import SidebarBtn from '../components/Sidebar/SidebarBtn';
import Header from '../components/Header/Header';
import { post } from '../services/ApiEndpoint';
import { Logout } from '../redux/AuthSlice';

function DoctorLayout() {

  
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
        
    <div className='sidebar'>
    <SidebarBtn label="Dashboard" icon={<FaTachometerAlt />} to="/doctor" />
            <SidebarBtn label="Patients" icon={<FaUsers />} to="/doctor/patients" />
            <SidebarBtn label="Precriptions" icon={<FaUserMd />} to="/doctor/prescriptions" />
            <SidebarBtn label="Appointments" icon={<FaUsers />} to="/doctor/appointments" />
            <SidebarBtn label="Beds" icon={<FaUserNurse />} to="/doctor/Beds" />
            <SidebarBtn label="Lab Reports" icon={<FaVials />} to="/doctor/reports" />
            <SidebarBtn label="Scans " icon={<FaVials />} to="/doctor/radioScans" />
            <SidebarBtn label="Treated Patients" icon={<FaUserTie />} to="/doctor/patientsTreated" />
            <SidebarBtn label="Operation" icon={<FaFileMedicalAlt />} to="/doctor/operations" />
            <SidebarBtn label="Birth Report" icon={<FaChild />} to="/doctor/birth-report" />
            <SidebarBtn label="Death Report" icon={<FaSkull />} to="/doctor/death-report" />
            <SidebarBtn label="Profile" icon={<FaUser />} to="/doctor/profile" />
    </div>
    </div>


    <div className="right">
    <Header role={user.role} username={user.name} handleLogout={handleLogout}/>

    <div className="main-container ">
      <Outlet/>
    </div>

    </div>

    </>
  )
}

export default DoctorLayout