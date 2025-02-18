import React, { useState } from "react";

function ReceptionistAppointnents() {
 const [activeTab, setActiveTab] = useState('appointments');
 const [searchQuery, setSearchQuery] = useState('');
 const [appointments] = useState([
   {
     id: 1,
     name: 'Cameron Stanley',
     cnic: '3450112345678',
     age: 23,
     sex: 'Male',
     phone: '03000000000',
     registrationTime: '2022-12-12',
   },
   // Add more dummy appointments if needed
 ]);
 
 const filteredAppointments = appointments.filter((appointment) =>
   appointment.name.toLowerCase().includes(searchQuery.toLowerCase())
 );
 
 return (
   <div className="w-full p-4">
     {/* Tab Buttons */}
     <div className="flex border-b-2 border-gray-200 mb-4">
       <button
         className={`px-6 py-2 text-lg ${
           activeTab === 'appointments' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'
         }`}
         onClick={() => setActiveTab('appointments')}
       >
         Appointments
       </button>
       <button
         className={`px-6 py-2 text-lg ${
           activeTab === 'addAppointments' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'
         }`}
         onClick={() => setActiveTab('addAppointments')}
       >
         Add Appointments
       </button>
     </div>
 
     {/* Tab Content */}
     <div className="flex justify-center">
       {activeTab === 'appointments' && (
         <div className="w-full">
           {/* Search Box */}
           <div className="mb-4">
             <input
               type="text"
               className="w-2/3 px-4 py-2 border rounded-lg"
               placeholder="Search appointments..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
 
           {/* Appointments Table */}
           <div className="overflow-x-auto">
             <table className="min-w-full bg-white border border-gray-300">
               <thead>
                 <tr>
                   <th className="px-4 py-2 border-b border-gray-200">#</th>
                   <th className="px-4 py-2 border-b border-gray-200">Name</th>
                   <th className="px-4 py-2 border-b border-gray-200">CNIC</th>
                   <th className="px-4 py-2 border-b border-gray-200">Age</th>
                   <th className="px-4 py-2 border-b border-gray-200">Sex</th>
                   <th className="px-4 py-2 border-b border-gray-200">Phone</th>
                   <th className="px-4 py-2 border-b border-gray-200">Registration Time</th>
                   <th className="px-10 py-2 border-b border-gray-200">Options</th>
                 </tr>
               </thead>
               <tbody>
                 {filteredAppointments.map((appointment) => (
                   <tr key={appointment.id}>
                     <td className="px-4 py-2 border-b border-gray-200">{appointment.id}</td>
                     <td className="px-4 py-2 border-b border-gray-200">{appointment.name}</td>
                     <td className="px-4 py-2 border-b border-gray-200">{appointment.cnic}</td>
                     <td className="px-4 py-2 border-b border-gray-200">{appointment.age}</td>
                     <td className="px-4 py-2 border-b border-gray-200">{appointment.sex}</td>
                     <td className="px-4 py-2 border-b border-gray-200">{appointment.phone}</td>
                     <td className="px-4 py-2 border-b border-gray-200">{appointment.registrationTime}</td>
                     <td className="flex gap-5 px-4 py-2 border-b border-gray-200">
                       <button className="bg-blue-500 text-white px-4 py-1 rounded-lg mr-2">Edit</button>
                       <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Delete</button>
                     </td>
                   </tr>
                 ))}
                 {filteredAppointments.length === 0 && (
                   <tr>
                     <td colSpan="8" className="px-4 py-2 text-center text-gray-500">
                       No appointments found.
                     </td>
                   </tr>
                 )}
               </tbody>
             </table>
           </div>
         </div>
       )}
 
       {activeTab === 'addAppointments' && (
         <div className="p-4 bg-gray-100 rounded-lg w-3/5">
           <h2 className="text-2xl mb-4">Add Appointment</h2>
           <form>
             <div className="mb-4">
               <label className="block text-gray-700 mb-2" htmlFor="name">
                 Name
               </label>
               <input
                 type="text"
                 id="name"
                 className="w-full px-4 py-2 border rounded-lg"
                 placeholder="Enter patient name"
               />
             </div>
             <div className="mb-4">
               <label className="block text-gray-700 mb-2" htmlFor="cnic">
                 CNIC
               </label>
               <input
                 type="number"
                 id="cnic"
                 className="w-full px-4 py-2 border rounded-lg"
                 placeholder="Enter CNIC"
               />
             </div>
             <div className="mb-4">
               <label className="block text-gray-700 mb-2" htmlFor="age">
                 Age
               </label>
               <input
                 type="number"
                 id="age"
                 className="w-full px-4 py-2 border rounded-lg"
                 placeholder="Enter age"
               />
             </div>
             <div className="mb-2">
               <label className="block text-gray-700">Sex</label>
               <select
                 name="Sex"
                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                 required
               >
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
                 <option value="Other">Other</option>
               </select>
             </div>
             <div className="mb-4">
               <label className="block text-gray-700 mb-2" htmlFor="phone">
                 Phone
               </label>
               <input
                 type="tel"
                 id="phone"
                 className="w-full px-4 py-2 border rounded-lg"
                 placeholder="Enter phone number"
               />
             </div>
             <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
               Add Appointment
             </button>
           </form>
         </div>
       )}
     </div>
   </div>
 );
}

export default ReceptionistAppointnents