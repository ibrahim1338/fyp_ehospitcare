import React from 'react'
import Card from '../Dashboard/Card'
import "./adminDashboard.css"
import CalenderComponent from '../Dashboard/CalenderComponent'

function AdminDashboard() {
  return (
    <div className="AdminDashboard-container">
      <div className="cards-container">
        <Card number={1} title={'Patients'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} />
        <Card number={2} title={'Doctor'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} />
        <Card number={3} title={'Recep'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} />
        <Card number={4} title="Pharm" imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} />
        <Card number={5} title={'Bed'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} />
        <Card number={6} title={'Blood-Bank'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} />
        <Card number={7} title={'Appt'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} />
        <Card number={8} title={'Payments'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} />
        <Card number={9} title={'Nurse'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} />
        <Card number={10} title={'Profile'} imageSrc={'https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png'} />


      </div>

      <CalenderComponent />
    </div>
  )
}

export default AdminDashboard