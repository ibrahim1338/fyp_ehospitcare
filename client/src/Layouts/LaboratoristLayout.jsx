import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import { Logout } from '../redux/AuthSlice'
import SidebarBtn from '../components/Sidebar/SidebarBtn'
import Header from '../components/Header/Header'
import { LuTestTubes } from "react-icons/lu";
import { FaTachometerAlt, FaUser, FaUsers } from 'react-icons/fa'
import { IoReorderThreeSharp } from 'react-icons/io5'

function LaboratoristLayout() {
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
        <SidebarBtn label="Dashboard" icon={<FaTachometerAlt />} to="/laboratorist" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
        <SidebarBtn label="Patients" icon={<FaUsers />} to="/laboratorist/patients" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
        <SidebarBtn label="Patients Tests" icon={<LuTestTubes />} to="/laboratorist/patientTests" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>
        <SidebarBtn label="Profile" icon={<FaUser />} to="/laboratorist/profile" dispaly={`${isCollapsed ? 'hidden w-fit' : 'block w-10/12'}`}/>

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

export default LaboratoristLayout