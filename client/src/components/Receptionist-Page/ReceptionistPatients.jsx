import React, { useState } from "react";

function ReceptionistPatients() {
  const [activeTab, setActiveTab] = useState('patients');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for patients
  const patients = [
    { id: 1, name: 'Cameron Stanley', cnic: '3450112345678', age: 23, sex: 'Male', phone: '03000000000', registrationDate: '2022-12-12' },
    { id: 2, name: 'Sarah Lee', cnic: '3450112345679', age: 30, sex: 'Female', phone: '03000000001', registrationDate: '2023-01-10' },
    { id: 3, name: 'John Doe', cnic: '3450112345680', age: 45, sex: 'Male', phone: '03000000002', registrationDate: '2021-05-05' },
    // Add more patient data here
  ];

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.cnic.includes(searchQuery)
  );

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'patients' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients
        </button>
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'addPatient' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('addPatient')}
        >
          Add Patient
        </button>
      </div>

      {/* Search Input */}
      {activeTab === 'patients' && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Name or CNIC"
            className="w-full px-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Tab Content */}
      <div className='flex justify-center'>
        {activeTab === 'patients' && (
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
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient, index) => (
                    <tr key={patient.id}>
                      <td className="px-4 py-2 border-b border-gray-200">{index + 1}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{patient.name}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{patient.cnic}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{patient.age}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{patient.sex}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{patient.phone}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{patient.registrationDate}</td>
                      <td className="flex gap-5 px-4 py-2 border-b border-gray-200">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg mr-2">Edit</button>
                        <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-4 py-2 border-b border-gray-200 text-center">
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'addPatient' && (
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
              {/* Gender */}
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

export default ReceptionistPatients