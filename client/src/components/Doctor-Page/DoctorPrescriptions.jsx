import React, { useState } from 'react';

function DoctorPrescriptions() {
  const [activeTab, setActiveTab] = useState('patients');
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [patientData, setPatientData] = useState([
    { id: 1, name: 'Cameron Stanley', cnic: '3450112345678', age: 23, sex: 'Male', phone: '03000000000', registrationDate: '2022-12-12' },
    { id: 2, name: 'Jessica Green', cnic: '3450112345679', age: 25, sex: 'Female', phone: '03000000001', registrationDate: '2022-11-10' },
    { id: 3, name: 'Michael Black', cnic: '3450112345680', age: 30, sex: 'Male', phone: '03000000002', registrationDate: '2022-10-15' },
    { id: 4, name: 'Sarah White', cnic: '3450112345681', age: 27, sex: 'Female', phone: '03000000003', registrationDate: '2022-09-05' }
  ]);

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patientId: 1,
      doctorName: 'Dr. Smith',
      date: '2024-12-20',
      caseHistory: 'History of hypertension.',
      description: 'Take medication A for 2 weeks.',
      medication: 'Medication A',
      amount: 500
    },
    {
      id: 2,
      patientId: 2,
      doctorName: 'Dr. Brown',
      date: '2024-12-21',
      caseHistory: 'History of diabetes.',
      description: 'Take medication B for 3 weeks.',
      medication: 'Medication B',
      amount: 600
    }
  ]);

  const [viewPrescription, setViewPrescription] = useState(null);

  const handleViewPrescription = (id) => {
    setViewPrescription(id);
  };

  // Filter prescriptions based on search query
  const filteredPrescriptions = prescriptions.filter((prescription) =>
    prescription.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patientData.find(patient => patient.id === prescription.patientId)?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.medication.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'patients' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('patients')}
        >
          Prescriptions
        </button>
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'addPrescription' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('addPrescription')}
        >
          Add Prescription
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === 'patients' && (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-200">#</th>
                  <th className="px-4 py-2 border-b border-gray-200">Patient Name</th>
                  <th className="px-4 py-2 border-b border-gray-200">CNIC</th>
                  <th className="px-4 py-2 border-b border-gray-200">Doctor's Name</th>
                  <th className="px-4 py-2 border-b border-gray-200">Date</th>
                  <th className="px-4 py-2 border-b border-gray-200">Options</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription) => (
                  <tr key={prescription.id}>
                    <td className="px-4 py-2 border-b border-gray-200">{prescription.id}</td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {patientData.find(patient => patient.id === prescription.patientId)?.name}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {patientData.find(patient => patient.id === prescription.patientId)?.cnic}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">{prescription.doctorName}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{prescription.date}</td>
                    <td className="flex gap-5 px-4 py-2 border-b border-gray-200">
                      <button
                        className="bg-blue-500 text-white px-4 py-1 rounded-lg mr-2"
                        onClick={() => handleViewPrescription(prescription.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'addPrescription' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Prescription</h2>
            <form>
              {/* Patient Selection */}
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

              {/* Case History */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="caseHistory">
                  Case History
                </label>
                <textarea
                  id="caseHistory"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter case history"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter prescription description"
                />
              </div>

              {/* Medication */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="medication">
                  Medication
                </label>
                <input
                  type="text"
                  id="medication"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter prescribed medication"
                />
              </div>

              {/* Amount */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="amount">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter amount"
                />
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                Add Prescription
              </button>
            </form>
          </div>
        )}

        {/* View Prescription Data */}
        {viewPrescription && (
          <div className="p-4 bg-white rounded-lg mt-4">
            <h2 className="text-xl mb-4">Prescription Details</h2>
            <p><strong>Patient Name:</strong> {patientData.find(patient => patient.id === prescriptions.find(p => p.id === viewPrescription).patientId)?.name}</p>
            <p><strong>CNIC:</strong> {patientData.find(patient => patient.id === prescriptions.find(p => p.id === viewPrescription).patientId)?.cnic}</p>
            <p><strong>Doctor's Name:</strong> {prescriptions.find(p => p.id === viewPrescription)?.doctorName}</p>
            <p><strong>Date:</strong> {prescriptions.find(p => p.id === viewPrescription)?.date}</p>
            <p><strong>Case History:</strong> {prescriptions.find(p => p.id === viewPrescription)?.caseHistory}</p>
            <p><strong>Description:</strong> {prescriptions.find(p => p.id === viewPrescription)?.description}</p>
            <p><strong>Medication:</strong> {prescriptions.find(p => p.id === viewPrescription)?.medication}</p>
            <p><strong>Amount:</strong> {prescriptions.find(p => p.id === viewPrescription)?.amount}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorPrescriptions;
