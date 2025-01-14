import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { FaTachometerAlt,FaUsers,FaHospitalUser ,FaUserMd,FaUserNurse,FaVials,FaUserTie,FaFileMedicalAlt,FaChild,FaSkull, FaUser, FaGripLines } from "react-icons/fa";
import { IoReorderFour, IoReorderThree, IoReorderThreeSharp } from "react-icons/io5";
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

    <SidebarBtn label="Dashboard" icon={<FaTachometerAlt />} to="/doctor" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`} />
            <SidebarBtn label="Patients" icon={<FaUsers />} to="/doctor/patients" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`} />
            <SidebarBtn label="Precriptions" icon={<FaUserMd />} to="/doctor/prescriptions" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`} />
            <SidebarBtn label="Appointments" icon={<FaUsers />} to="/doctor/appointments" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`} />
            <SidebarBtn label="Beds" icon={<FaUserNurse />} to="/doctor/Beds" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`} />
            <SidebarBtn label="Lab Reports" icon={<FaVials />} to="/doctor/reports" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
            <SidebarBtn label="Scans " icon={<FaVials />} to="/doctor/radioScans" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
            <SidebarBtn label="Treated Patients" icon={<FaUserTie />} to="/doctor/patientsTreated" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`} />
            <SidebarBtn label="Operation" icon={<FaFileMedicalAlt />} to="/doctor/operations" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`} />
            <SidebarBtn label="Birth Report" icon={<FaChild />} to="/doctor/birth-report" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`} />
            <SidebarBtn label="Death Report" icon={<FaSkull />} to="/doctor/death-report" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`} />
            <SidebarBtn label="Profile" icon={<FaUser />} to="/doctor/profile" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`} />
    </div>
    


    <div className="right">
    <Header role={user.role} username={user.name} handleLogout={handleLogout} width={`${isCollapsed? "w-[95%]" : "w-[85%]"}`}/>

    <div className={`main-container ${isCollapsed ? 'w-[93%]' : 'w-[83%]'}` } id='sideBar'>
      <Outlet/>
    </div>

    </div>

    </>
  )
}

export default DoctorLayout