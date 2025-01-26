import React, { useState, useEffect } from 'react';

function AdminDoctors() {
  const [activeTab, setActiveTab] = useState('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/doctors');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched doctors:', data);
        setDoctors(data);
      } else {
        console.error('Failed to fetch doctors');
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    console.log('Current doctors state:', doctors);
  }, [doctors]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const [newDoctor, setNewDoctor] = useState({
    doctorId: '',
    name: '',
    department: '',
    phone: '',
    email: '',
    experience: ''
  });

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.doctorId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDoctors.length / 8);

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * 8,
    currentPage * 8
  );

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/doctors/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor)
      });

      if (response.ok) {
        setNewDoctor({
          doctorId: '',
          name: '',
          department: '',
          phone: '',
          email: '',
          experience: ''
        });
        alert('Doctor added successfully!');
        fetchDoctors();
        setActiveTab('doctors');
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Failed to add doctor');
    }
  };

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'doctors' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('doctors')}
        >
          Doctors
        </button>
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'addDoctor' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('addDoctor')}
        >
          Add Doctor
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === 'doctors' && (
          <div className="w-full">
            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                className="w-1/3 px-4 py-2 border rounded-lg"
                placeholder="Search by name or doctor ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Doctors Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">ID</th>
                    <th className="px-4 py-2 border-b border-gray-200">Name</th>
                    <th className="px-4 py-2 border-b border-gray-200">Department</th>
                    <th className="px-4 py-2 border-b border-gray-200">Phone</th>
                    <th className="px-4 py-2 border-b border-gray-200">Email</th>
                    <th className="px-4 py-2 border-b border-gray-200">Experience</th>
                    <th className="px-4 py-2 border-b border-gray-200">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors && doctors.length > 0 ? (
                    doctors.map((doctor, index) => (
                      <tr key={doctor._id || index} className="border-b border-gray-200">
                        <td className="px-4 py-2 border-none">{doctor.doctorId}</td>
                        <td className="px-4 py-2 border-none">{doctor.name}</td>
                        <td className="px-4 py-2 border-none">{doctor.department}</td>
                        <td className="px-4 py-2 border-none">{doctor.phone}</td>
                        <td className="px-4 py-2 border-none">{doctor.email}</td>
                        <td className="px-4 py-2 border-none">{doctor.experience}</td>
                        <td className="px-4 py-2 border-none">
                          <div className="flex gap-2">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg">
                              Edit
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                        No doctors found
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

        {activeTab === 'addDoctor' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Doctor</h2>
            <form onSubmit={handleAddDoctor}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="doctorId">
                  Doctor ID
                </label>
                <input
                  type="text"
                  id="doctorId"
                  value={newDoctor.doctorId}
                  onChange={(e) => setNewDoctor({...newDoctor, doctorId: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter doctor ID"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter doctor name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="department">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  value={newDoctor.department}
                  onChange={(e) => setNewDoctor({...newDoctor, department: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter department"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={newDoctor.phone}
                  onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={newDoctor.email}
                  onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="experience">
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  value={newDoctor.experience}
                  onChange={(e) => setNewDoctor({...newDoctor, experience: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter experience (e.g., 10 years)"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                Add Doctor
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDoctors;
