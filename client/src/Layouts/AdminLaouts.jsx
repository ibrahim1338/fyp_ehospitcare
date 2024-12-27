import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTachometerAlt,FaFileMedicalAlt, FaChild, FaSkull, FaUser} from "react-icons/fa";
import { HiBuildingLibrary } from "react-icons/hi2";
import { FaUserDoctor,FaDesktop } from "react-icons/fa6";
import { MdLocalPharmacy } from "react-icons/md";
import { RiTestTubeFill } from "react-icons/ri";
import SidebarBtn from '../components/Sidebar/SidebarBtn';
import Header from '../components/Header/Header';
import { post } from '../services/ApiEndpoint';
import { Logout } from '../redux/AuthSlice';

export default function AdminLaouts() {
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
    if (!user || user.role != 'admin' ) {
        navigate('/login')
    }
  },[user])
  return (
    <>
    <div className="left">
      
  <div className='sidebar'>
  <SidebarBtn label="Dashboard" icon={<FaTachometerAlt />} to="/admin" />
          <SidebarBtn label="Departments" icon={<HiBuildingLibrary />} to="/admin/departments" />
          <SidebarBtn label="Doctors" icon={<FaUserDoctor />} to="/admin/doctors" />
          <SidebarBtn label="Pharmacists" icon={<MdLocalPharmacy />} to="/admin/pharmacists" />
          <SidebarBtn label="Laboratorists" icon={<RiTestTubeFill />} to="/admin/laboratorists" />
          <SidebarBtn label="Receptionists" icon={<FaDesktop />} to="/admin/receptionists" />
          <SidebarBtn label="Operations" icon={<FaFileMedicalAlt />} to="/admin/operations" />
          <SidebarBtn label="Birth Report" icon={<FaChild />} to="/admin/birth-report" />
          <SidebarBtn label="Death Report" icon={<FaSkull />} to="/admin/death-report" />
          <SidebarBtn label="Profile" icon={<FaUser />} to="/admin/profile" />
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
