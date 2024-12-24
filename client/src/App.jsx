import React, { useEffect } from 'react'
import './App.css'
import './index.css'

import 'antd/dist/reset.css';  // For Ant Design v5+
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import  { Toaster } from 'react-hot-toast';
import AdminLaouts from './Layouts/AdminLaouts'
import UserLayout from './Layouts/UserLayout'
import PublicLayouts from './Layouts/PublicLayouts'
import { useDispatch,useSelector } from 'react-redux'
import { updateUser } from './redux/AuthSlice'
import DoctorLayout from './Layouts/DoctorLayout'
import DoctorDashboard from './components/Doctor-Page/DoctorDashboard'
import DoctorPrescriptions from './components/Doctor-Page/DoctorPrescriptions'
import DoctorPatients from './components/Doctor-Page/DoctorPatients'
import DoctorAppointments from './components/Doctor-Page/DoctorAppointments'
import DoctorBeds from './components/Doctor-Page/DoctorBeds'
import DoctorLabRep from './components/Doctor-Page/DoctorLabRep'
import DoctorRadScans from './components/Doctor-Page/DoctorRadScans'
import DoctorTPatients from './components/Doctor-Page/DoctorTPatients'
import DoctorOperations from './components/Doctor-Page/DoctorOperations'
import DoctorBirthReports from './components/Doctor-Page/DoctorBirthReports'
import DoctorDeathReports from './components/Doctor-Page/DoctorDeathReports'
import DoctorProfile from './components/Doctor-Page/DoctorProfile'
import AdminDashboard from './components/Admin-Page/AdminDashboard';
import AdminDepartments from './components/Admin-Page/AdminDepartments';
import AdminDoctors from './components/Admin-Page/AdminDoctors';
import AdminPharmacists from './components/Admin-Page/AdminPharmacists';
import AdminLaboratorists from './components/Admin-Page/AdminLaboratorists';
import AdminReceptionists from './components/Admin-Page/AdminReceptionists';
import AdminOperations from './components/Admin-Page/AdminOperations';
import AdminBirthReports from './components/Admin-Page/AdminBirthReports';
import AdminDeathReports from './components/Admin-Page/AdminDeathReports';
import AdminProfile from './components/Admin-Page/AdminProfile';


export default function App() {
  const user=useSelector((state)=>state.Auth.user)
const disptch=useDispatch()
  useEffect(()=>{
         
        disptch(updateUser())
  },[])

  return (
    <>
          <BrowserRouter>
          <Toaster/>
            <Routes>
              
              <Route path='/' element={<UserLayout/>} >
              <Route index element={<Home/>}/>
              </Route>
           
              {/* admin routes */}
              <Route path='/admin' element={<AdminLaouts/>}>
              <Route index element={<AdminDashboard/>}/>
              <Route path='/admin/departments' element={<AdminDepartments/>} />
              <Route path='/admin/doctors' element={<AdminDoctors/>} />
              <Route path='/admin/pharmacists' element={<AdminPharmacists/>} />
              <Route path='/admin/laboratorists' element={<AdminLaboratorists/>} />
              <Route path='/admin/receptionists' element={<AdminReceptionists/>} />
              <Route path='/admin/operations' element={<AdminOperations/>} />
              <Route path='/admin/birth-report' element={<AdminBirthReports/>} />
              <Route path='/admin/death-report' element={<AdminDeathReports/>} />
              <Route path='/admin/profile' element={<AdminProfile/>} />
              </Route>

{/*  doctor-routes */}
              <Route path='/doctor' element={<DoctorLayout/>}>
              <Route index element={<DoctorDashboard/>}/>
              <Route path='/doctor/prescriptions' element={<DoctorPrescriptions/>}/>
              <Route path='/doctor/patients' element={<DoctorPatients/>}/>
              <Route path='/doctor/appointments' element={<DoctorAppointments/>}/>
              <Route path='/doctor/beds' element={<DoctorBeds/>}/>
              <Route path='/doctor/reports' element={<DoctorLabRep/>}/>
              <Route path='/doctor/radioScans' element={<DoctorRadScans/>}/>
              <Route path='/doctor/patientsTreated' element={<DoctorTPatients/>}/>
              <Route path='/doctor/operations' element={<DoctorOperations/>}/>
              <Route path='/doctor/birth-report' element={<DoctorBirthReports/>}/>
              <Route path='/doctor/death-report' element={<DoctorDeathReports/>}/>
              <Route path='/doctor/profile' element={<DoctorProfile/>}/>
              </Route>

              <Route path='/' element={<PublicLayouts/>}>
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
              </Route>
              
            </Routes>
          </BrowserRouter>



    </>
  )
}
