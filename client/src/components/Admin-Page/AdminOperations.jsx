import React, { useState } from 'react';

function AdminOperations() {
  const [activeTab, setActiveTab] = useState('operations');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [operations, setOperations] = useState([
    { 
      id: 1,
      operationName: 'Appendectomy', 
      patient: 'Ali Ahmed', 
      surgeon: 'Dr. Amina Khan', 
      assistantSurgeon: 'Dr. Imran Ali', 
      date: '2024-12-10', 
      status: 'Completed', 
      operationType: 'Surgery',
      preOpDiagnosis: 'Acute Appendicitis',
      postOpDiagnosis: 'Post-surgical Recovery',
      operationDuration: '1 hour',
      operationRoom: 'Room 2',
      patientAge: 30,
      patientGender: 'Male',
      operationCost: '15000',
    },
    { 
      id: 2, 
      operationName: 'Gallbladder Removal', 
      patient: 'Zainab Siddiqui', 
      surgeon: 'Dr. Bilal Ali', 
      assistantSurgeon: 'Dr. Farhan Shah', 
      date: '2024-12-15', 
      status: 'In Progress', 
      operationType: 'Surgery',
      preOpDiagnosis: 'Cholelithiasis',
      postOpDiagnosis: 'Post-surgical Recovery',
      operationDuration: '2 hours',
      operationRoom: 'Room 5',
      patientAge: 45,
      patientGender: 'Female',
      operationCost: '20000',
    },
    // More operations data can be added
  ]);

  const filteredOperations = operations.filter((operation) =>
    operation.operationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    operation.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    operation.surgeon.toLowerCase().includes(searchQuery.toLowerCase()) ||
    operation.operationType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOperations.length / itemsPerPage);

  const paginatedOperations = filteredOperations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddOperation = (newOperation) => {
    setOperations([...operations, newOperation]);
  };

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'operations' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('operations')}
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
        {activeTab === 'operations' && (
          <div className="w-full">
            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                className="w-1/3 px-4 py-2 border rounded-lg"
                placeholder="Search operations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Operations Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">#</th>
                    <th className="px-4 py-2 border-b border-gray-200">Operation</th>
                    <th className="px-4 py-2 border-b border-gray-200">Patient</th>
                    <th className="px-4 py-2 border-b border-gray-200">Surgeon</th>
                    <th className="px-4 py-2 border-b border-gray-200">Assistant Surgeon</th>
                    <th className="px-4 py-2 border-b border-gray-200">Date</th>
                    <th className="px-4 py-2 border-b border-gray-200">Status</th>
                    <th className="px-4 py-2 border-b border-gray-200">Operation Type</th>
                    <th className="px-4 py-2 border-b border-gray-200">Operation Room</th>
                    <th className="px-4 py-2 border-b border-gray-200">Patient Age</th>
                    <th className="px-4 py-2 border-b border-gray-200">Patient Gender</th>
                    <th className="px-4 py-2 border-b border-gray-200">Cost</th>
                    <th className="px-4 py-2 border-b border-gray-200">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOperations.map((operation, index) => (
                    <tr key={operation.id}>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">{operation.operationName}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{operation.patient}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{operation.surgeon}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{operation.assistantSurgeon}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{operation.date}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{operation.status}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{operation.operationType}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{operation.operationRoom}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{operation.patientAge}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{operation.patientGender}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{operation.operationCost}</td>
                      <td className="flex gap-2 px-4 py-2 border-b border-gray-200">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">Edit</button>
                        <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {paginatedOperations.length === 0 && (
                    <tr>
                      <td colSpan="13" className="px-4 py-2 text-center text-gray-500">
                        No operations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`w-32 px-2 py-2 rounded-lg transition-all ${currentPage === 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => (currentPage < totalPages ? prev + 1 : prev))
                }
                className={`w-32 px-4 py-2 rounded-lg transition-all ${currentPage === totalPages
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {activeTab === 'addOperation' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Operation</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newOperation = {
                  id: operations.length + 1,
                  operationName: e.target.operationName.value,
                  patient: e.target.patient.value,
                  surgeon: e.target.surgeon.value,
                  assistantSurgeon: e.target.assistantSurgeon.value,
                  date: e.target.date.value,
                  status: e.target.status.value,
                  operationType: e.target.operationType.value,
                  preOpDiagnosis: e.target.preOpDiagnosis.value,
                  postOpDiagnosis: e.target.postOpDiagnosis.value,
                  operationDuration: e.target.operationDuration.value,
                  operationRoom: e.target.operationRoom.value,
                  patientAge: e.target.patientAge.value,
                  patientGender: e.target.patientGender.value,
                  operationCost: e.target.operationCost.value,
                };
                handleAddOperation(newOperation);
                setActiveTab('operations'); // Switch back to operations tab
              }}
            >
              {/* Form Fields */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="operationName">Operation Name</label>
                <input type="text" id="operationName" name="operationName" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter operation name" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="patient">Patient Name</label>
                <input type="text" id="patient" name="patient" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter patient name" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="surgeon">Surgeon Name</label>
                <input type="text" id="surgeon" name="surgeon" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter surgeon name" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="assistantSurgeon">Assistant Surgeon Name</label>
                <input type="text" id="assistantSurgeon" name="assistantSurgeon" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter assistant surgeon name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="date">Operation Date</label>
                <input type="date" id="date" name="date" className="w-full px-4 py-2 border rounded-lg" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
                <select id="status" name="status" className="w-full px-4 py-2 border rounded-lg" required>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="operationType">Operation Type</label>
                <select id="operationType" name="operationType" className="w-full px-4 py-2 border rounded-lg" required>
                  <option value="Surgery">Surgery</option>
                  <option value="Diagnostic">Diagnostic</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="preOpDiagnosis">Pre-op Diagnosis</label>
                <input type="text" id="preOpDiagnosis" name="preOpDiagnosis" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter pre-op diagnosis" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="postOpDiagnosis">Post-op Diagnosis</label>
                <input type="text" id="postOpDiagnosis" name="postOpDiagnosis" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter post-op diagnosis" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="operationDuration">Operation Duration</label>
                <input type="text" id="operationDuration" name="operationDuration" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter operation duration" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="operationRoom">Operation Room</label>
                <input type="text" id="operationRoom" name="operationRoom" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter operation room" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="patientAge">Patient Age</label>
                <input type="number" id="patientAge" name="patientAge" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter patient age" required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="patientGender">Patient Gender</label>
                <select id="patientGender" name="patientGender" className="w-full px-4 py-2 border rounded-lg" required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="operationCost">Operation Cost</label>
                <input type="text" id="operationCost" name="operationCost" className="w-full px-4 py-2 border rounded-lg" placeholder="Enter operation cost" />
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

export default AdminOperations;
