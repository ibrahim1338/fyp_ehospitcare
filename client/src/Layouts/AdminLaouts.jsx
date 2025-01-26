import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTachometerAlt,FaFileMedicalAlt, FaChild, FaSkull, FaUser} from "react-icons/fa";
import { HiBuildingLibrary } from "react-icons/hi2";
import { FaUserDoctor,FaDesktop } from "react-icons/fa6";
import { MdLocalPharmacy } from "react-icons/md";
import { RiTestTubeFill,RiCalendarScheduleFill } from "react-icons/ri";
import SidebarBtn from '../components/Sidebar/SidebarBtn';
import Header from '../components/Header/Header';
import { post } from '../services/ApiEndpoint';
import { Logout } from '../redux/AuthSlice';
import { IoReorderThreeSharp } from 'react-icons/io5';
import toast from 'react-hot-toast';

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
        toast.success(response.message)
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
   const [isCollapsed, setIsCollapsed] = useState(false);
  
    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };
      return (
        <>
        
          
      <div className={`sidebar ${isCollapsed ? 'w-[5%]' : 'w-[15%]'} transition-all duration-300`}>
      <div className='sidebarCollapse p-4 flex justify-between items-center '> 
      <h1 className={`font-bold flex gap-3 text-2xl ${isCollapsed ? 'hidden' : 'block'}`}> e-HospitCare</h1>
      
        <button onClick={toggleCollapse}><IoReorderThreeSharp/></button>
      
      </div> 
  <SidebarBtn label="Dashboard" icon={<FaTachometerAlt />} to="/admin" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
          <SidebarBtn label="Departments" icon={<HiBuildingLibrary />} to="/admin/departments" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`} />
          <SidebarBtn label="Doctors" icon={<FaUserDoctor />} to="/admin/doctors" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
          <SidebarBtn label="Pharmacists" icon={<MdLocalPharmacy />} to="/admin/pharmacists" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
          <SidebarBtn label="Laboratorists" icon={<RiTestTubeFill />} to="/admin/laboratorists" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
          <SidebarBtn label="Receptionists" icon={<FaDesktop />} to="/admin/receptionists" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
          <SidebarBtn label="Schedules" icon={<RiCalendarScheduleFill />} to="/admin/schedules" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
          <SidebarBtn label="Operations" icon={<FaFileMedicalAlt />} to="/admin/operations" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
          <SidebarBtn label="Birth Report" icon={<FaChild />} to="/admin/birth-report" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
          <SidebarBtn label="Death Report" icon={<FaSkull />} to="/admin/death-report" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
          <SidebarBtn label="Profile" icon={<FaUser />} to="/admin/profile" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`} />
  </div>
  


  <div className="right">
  <Header role={user.role} username={user.name} handleLogout={handleLogout} width={`${isCollapsed? "w-[95%]" : "w-[85%]"}`}/>

  <div className={`main-container ${isCollapsed ? 'w-[93%]' : 'w-[83%]'}` }>
    <Outlet/>
  </div>

  </div>

  </>
)
}
