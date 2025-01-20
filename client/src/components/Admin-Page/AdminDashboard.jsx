import React from 'react'
import Card from '../Dashboard/Card'
import "./adminDashboard.css"
import CalenderComponent from '../Dashboard/CalenderComponent'

function AdminDashboard() {
  return (
    <div className="dashboard-container flex p-4 flex-col">
<div className="cards-container flex flex-row gap-10 flex-wrap mb-5 ">
        
        <Card number={2} title={'Doctors'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} to={'/admin/doctors'}/>
        <Card number={3} title={'Receptionists'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} to={'/admin/receptionists'}/>
        <Card number={4} title="Pharmacists" imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} to={'/admin/pharmacists'}/>
        <Card number={9} title={'Radiologists'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} to={'/admin/doctors'}/>
        <Card number={9} title={'Laboratorists'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} to={'/admin/doctors'}/>


      </div>

      <CalenderComponent />
    </div>
  )
}

export default AdminDashboard