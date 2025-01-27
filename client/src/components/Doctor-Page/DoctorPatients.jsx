import React, { useState, useEffect } from 'react';

function DoctorPatients() {
  const [activeTab, setActiveTab] = useState('patients');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    cnic: '',
    age: '',
    gender: '',
    address: '',
    phone: '',
    email: ''
  });

  // Fetch patients from API
  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/patients');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched patients:', data);
        setPatients(data);
      } else {
        console.error('Failed to fetch patients');
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Add a new patient
  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/patients/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient),
      });

      if (response.ok) {
        setNewPatient({
          name: '',
          cnic: '',
          age: '',
          gender: '',
          address: '',
          phone: '',
          email: ''
        });
        alert('Patient added successfully!');
        fetchPatients();
        setActiveTab('patients');
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Failed to add patient');
    }
  };

  // Filtered and paginated patients
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === 'patients' && (
          <div className="w-full">
            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                className="w-1/3 px-4 py-2 border rounded-lg"
                placeholder="Search by name or patient ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Patients Table */}
            <table className="w-full table-auto">
              <thead>
                <tr>
                  
                  <th className="px-4 py-2 border-b border-gray-200">Name</th>
                  <th className="px-4 py-2 border-b border-gray-200">CNIC</th>
                  <th className="px-4 py-2 border-b border-gray-200">Phone</th>
                  <th className="px-4 py-2 border-b border-gray-200">Gender</th>
                  <th className="px-4 py-2 border-b border-gray-200">Email</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPatients.map((patient) => (
                  <tr key={patient.name}>
                    
                    <td className="px-4 py-2 border-b">{patient.name}</td>
                    <td className="px-4 py-2 border-b">{patient.cnic}</td>
                    <td className="px-4 py-2 border-b">{patient.phone}</td>
                    <td className="px-4 py-2 border-b">{patient.gender}</td>
                    <td className="px-4 py-2 border-b">{patient.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <div className="flex items-center">
                <span className="mr-4">Page {currentPage} of {totalPages}</span>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'addPatient' && (
          <div className="w-full">
            {/* Add Patient Form */}
            <form onSubmit={handleAddPatient}>
              <div className="mb-4">
                <label className="block text-lg">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg">CNIC</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newPatient.cnic}
                  onChange={(e) => setNewPatient({ ...newPatient, cnic: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg">Age</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg">Gender</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-lg">Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg">Phone</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add Patient
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorPatients;
