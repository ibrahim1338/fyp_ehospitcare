import React from 'react'
import Card from '../Dashboard/Card'
import './doctorPage.css'
import CalenderComponent from '../Dashboard/CalenderComponent'
function DoctorDashboard() {
  
  return (
    <div className="DoctorDashboard-container">
        <div className="cards-container">
            <Card number={6} title={'Patients'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'}/>
            <Card number={7} title={'Prescriptions'} imageSrc={'https://static.thenounproject.com/png/5451167-200.png'}/>
            <Card number={6} title={'Appointments'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'}/>
            <Card number={6} title={'Beds'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'}/>
            <Card number={6} title={'Operation'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'}/>
            <Card number={6} title={'Birth Report'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'}/>
            <Card number={6} title={'Death Report'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'}/>
            <Card number={6} title={'Profile'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'}/>
           
        </div>

        <CalenderComponent/>
    </div>
  )
}

export default DoctorDashboard