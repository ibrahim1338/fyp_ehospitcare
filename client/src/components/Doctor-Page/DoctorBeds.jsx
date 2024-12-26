import React, { useState } from 'react'

function DoctorBeds() {

  
  const [activeTab, setActiveTab] = useState('patients');
  const [searchTerm, setSearchTerm] = useState('');
  const [patientData, setPatientData] = useState([
    { id: 1, name: 'Cameron Stanley', cnic: '3450112345678', age: 23, sex: 'Male', phone: '03000000000', registrationDate: '2022-12-12' },
    { id: 2, name: 'Jessica Green', cnic: '3450112345679', age: 25, sex: 'Female', phone: '03000000001', registrationDate: '2022-11-10' },
    { id: 3, name: 'Michael Black', cnic: '3450112345680', age: 30, sex: 'Male', phone: '03000000002', registrationDate: '2022-10-15' },
    { id: 4, name: 'Sarah White', cnic: '3450112345681', age: 27, sex: 'Female', phone: '03000000003', registrationDate: '2022-09-05' }
  ]);

  const [bedAllotments, setBedAllotments] = useState([
    { patientId: 1, patientName: 'Cameron Stanley', bedNumber: 101, status: 'Under Treatment', allotmentDate: '2023-01-05', dischargeDate: '2023-01-15' },
    { patientId: 2, patientName: 'Jessica Green', bedNumber: 102, status: 'Recovered', allotmentDate: '2023-02-10', dischargeDate: '2023-02-20' },
    { patientId: 3, patientName: 'Michael Black', bedNumber: 103, status: 'Critical', allotmentDate: '2023-03-10', dischargeDate: '2023-03-25' },
    { patientId: 4, patientName: 'Sarah White', bedNumber: 104, status: 'Discharged', allotmentDate: '2023-04-15', dischargeDate: '2023-04-20' }
  ]);

  // Filter bed allotments based on the search term
  const filteredBedAllotments = bedAllotments.filter((allotment) =>
    allotment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    allotment.bedNumber.toString().includes(searchTerm)
  );

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'patients' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('patients')}
        >
          Bed Allotments
        </button>
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'addBedAllotment' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('addBedAllotment')}
        >
          Add Bed Allotment
        </button>
      </div>

      {/* Tab Content */}
      <div className='flex justify-center'>
        {activeTab === 'patients' && (
          <div className="overflow-x-auto w-full">
            <div className="mb-4 flex justify-between items-center">
              {/* Search Bar */}
              <input
                type="text"
                className="px-4 py-2 border rounded-lg w-1/3"
                placeholder="Search by patient name or bed number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-200">#</th>
                  <th className="px-4 py-2 border-b border-gray-200">Patient Name</th>
                  <th className="px-4 py-2 border-b border-gray-200">Bed Number</th>
                  <th className="px-4 py-2 border-b border-gray-200">Status</th>
                  <th className="px-4 py-2 border-b border-gray-200">Allotment Date</th>
                  <th className="px-4 py-2 border-b border-gray-200">Discharge Date</th>
                  <th className="px-4 py-2 border-b border-gray-200">Options</th>
                </tr>
              </thead>
              <tbody>
                {filteredBedAllotments.map((allotment, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b border-gray-200">{index + 1}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{allotment.patientName}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{allotment.bedNumber}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{allotment.status}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{allotment.allotmentDate}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{allotment.dischargeDate}</td>
                    <td className="flex gap-5 px-4 py-2 border-b border-gray-200">
                      <button className="bg-blue-500 text-white px-4 py-1 rounded-lg mr-2">Edit</button>
                      <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'addBedAllotment' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Bed Allotment</h2>
            <form>
              {/* Select Patient */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="patient">
                  Select Patient
                </label>
                <select
                  id="patient"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  {patientData.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Patient Status */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="status">
                  Patient Status
                </label>
                <select
                  id="status"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="Under Treatment">Under Treatment</option>
                  <option value="Recovered">Recovered</option>
                  <option value="Critical">Critical</option>
                  <option value="Discharged">Discharged</option>
                  <option value="Transferred">Transferred</option>
                </select>
              </div>

              {/* Bed Number */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="bedNumber">
                  Bed Number
                </label>
                <input
                  type="number"
                  id="bedNumber"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter bed number"
                  required
                />
              </div>

              {/* Allotment Date */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="allotmentDate">
                  Allotment Date
                </label>
                <input
                  type="date"
                  id="allotmentDate"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              {/* Discharge Date */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="dischargeDate">
                  Discharge Date
                </label>
                <input
                  type="date"
                  id="dischargeDate"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                Add Bed Allotment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );


  
}

export default DoctorBeds