    import React, { useEffect } from 'react'
    import { useSelector } from 'react-redux'
    import { Outlet, useNavigate } from 'react-router-dom'
    export default function PublicLayouts() {
        const user=useSelector((state)=>state.Auth.user)
        const navigate=useNavigate()


        useEffect(()=>{
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin');  // Redirect admin to the admin-specific area
            } else if(user.role === 'doctor'){
                navigate('/doctor');      // direct logged-in doctors  to the doctor page
            }
            else if(user.role === 'receptionist'){
                navigate('/receptionist');      // direct logged-in receptionist  to the reception page
            }
            else if(user.role === 'laboratorist'){
                navigate('/laboratorist');      // direct logged-in receptionist  to the reception page

            }
            else{
                navigate('/')
            }
        }
        },[user,navigate])
        
    return (
        <Outlet/>
    )
    }
