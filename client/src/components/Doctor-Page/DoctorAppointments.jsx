import React, { useState } from 'react'

function DoctorAppointments() {
  const [activeTab, setActiveTab] = useState('appointments');

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${
            activeTab === 'patients' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointements
        </button>
        <button
          className={`px-6 py-2 text-lg ${
            activeTab === 'addPatient' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('addAppointments')}
        >
          Add Appointments
        </button>
      </div>

      {/* Tab Content */}
      <div className='flex justify-center'>
        {activeTab === 'appointments' && (
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
                  <th className="px-4 py-2 border-b border-gray-200">Time of Registration</th>
                  <th className="px-4 py-2 border-b border-gray-200">Options</th>
                </tr>
              </thead>
              <tbody>
                {/* Add patient rows here */}
                <tr>
                  <td className="px-4 py-2 border-b border-gray-200">1</td>
                  <td className="px-4 py-2 border-b border-gray-200">Cameron Stanley</td>
                  <td className="px-4 py-2 border-b border-gray-200">3450112345678</td>
                  <td className="px-4 py-2 border-b border-gray-200">23</td>
                  <td className="px-4 py-2 border-b border-gray-200">Male</td>
                  <td className="px-4 py-2 border-b border-gray-200">03000000000</td>
                  <td className="px-4 py-2 border-b border-gray-200">2022-12-12</td>
                  <td className="flex gap-5 px-4 py-2 border-b border-gray-200">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-lg mr-2">Edit</button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'addAppointments' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Patient</h2>
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
                  placeholder="Enter age"
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


{/* gender */}
              <div className='mb-2'>
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

        {/* Phone */}
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
                Add Patient
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorAppointments