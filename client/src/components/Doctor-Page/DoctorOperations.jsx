import React, { useState } from 'react';

function DoctorOperations() {
  const [activeTab, setActiveTab] = useState('patients');
  const [searchQuery, setSearchQuery] = useState('');
  const [patientData, setPatientData] = useState([
    { id: 1, name: 'Cameron Stanley' },
    { id: 2, name: 'Jessica Green' },
    { id: 3, name: 'Michael Black' },
    { id: 4, name: 'Sarah White' }
  ]);

  const [surgeons, setSurgeons] = useState([
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Dr. Jane Smith' }
  ]);

  const [operationTypes, setOperationTypes] = useState([
    'Appendectomy', 'C-section', 'Gallbladder Removal', 'Heart Surgery'
  ]);

  const [operations, setOperations] = useState([]);
  const [newOperation, setNewOperation] = useState({
    patientId: '',
    operationType: '',
    surgeonId: '',
    date: ''
  });

  const handleAddOperation = (e) => {
    e.preventDefault();
    const newOp = {
      ...newOperation,
      patientName: patientData.find(patient => patient.id === newOperation.patientId)?.name,
      surgeonName: surgeons.find(surgeon => surgeon.id === newOperation.surgeonId)?.name
    };
    setOperations([...operations, newOp]);
    setNewOperation({ patientId: '', operationType: '', surgeonId: '', date: '' });
  };

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'patients' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('patients')}
        >
          Operations
        </button>
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'addOperation' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('addOperation')}
        >
          Add Operation
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
                  <th className="px-4 py-2 border-b border-gray-200">Operation Type</th>
                  <th className="px-4 py-2 border-b border-gray-200">Surgeon</th>
                  <th className="px-4 py-2 border-b border-gray-200">Date</th>
                </tr>
              </thead>
              <tbody>
                {operations.map((operation, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b border-gray-200">{index + 1}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{operation.patientName}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{operation.operationType}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{operation.surgeonName}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{operation.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'addOperation' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Operation</h2>
            <form onSubmit={handleAddOperation}>
              {/* Patient Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="patient">
                  Select Patient
                </label>
                <select
                  id="patient"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newOperation.patientId}
                  onChange={(e) => setNewOperation({ ...newOperation, patientId: e.target.value })}
                  required
                >
                  <option value="">Select a Patient</option>
                  {patientData.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Operation Type */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="operationType">
                  Select Operation Type
                </label>
                <select
                  id="operationType"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newOperation.operationType}
                  onChange={(e) => setNewOperation({ ...newOperation, operationType: e.target.value })}
                  required
                >
                  <option value="">Select Operation Type</option>
                  {operationTypes.map((operation) => (
                    <option key={operation} value={operation}>
                      {operation}
                    </option>
                  ))}
                </select>
              </div>

              {/* Surgeon Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="surgeon">
                  Select Surgeon
                </label>
                <select
                  id="surgeon"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newOperation.surgeonId}
                  onChange={(e) => setNewOperation({ ...newOperation, surgeonId: e.target.value })}
                  required
                >
                  <option value="">Select Surgeon</option>
                  {surgeons.map((surgeon) => (
                    <option key={surgeon.id} value={surgeon.id}>
                      {surgeon.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="date">
                  Operation Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newOperation.date}
                  onChange={(e) => setNewOperation({ ...newOperation, date: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                Add Operation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}


export default DoctorOperations