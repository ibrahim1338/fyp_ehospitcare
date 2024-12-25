import React, { useState } from 'react';

function AdminDoctors() {
  const [activeTab, setActiveTab] = useState('doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [doctors] = useState([
    { id: 1, name: 'Dr. Ali', department: 'Cardiology', phone: '123-456-7890', email: 'ali@example.com', experience: '10 years' },
    { id: 2, name: 'Dr. Asad', department: 'Neurology', phone: '123-456-7890', email: 'asad@example.com', experience: '8 years' },
    { id: 3, name: 'Dr. Bilal', department: 'Orthopedics', phone: '123-456-7890', email: 'bilal@example.com', experience: '12 years' },
    { id: 4, name: 'Dr. Tasawar', department: 'Pediatrics', phone: '123-456-7890', email: 'tasawar@example.com', experience: '5 years' },
    { id: 5, name: 'Dr. Shahid', department: 'Dermatology', phone: '123-456-7890', email: 'shahid@example.com', experience: '15 years' },
    { id: 6, name: 'Dr. Tuba', department: 'Radiology', phone: '123-456-7890', email: 'tuba@example.com', experience: '7 years' },
    // Add more doctor records as needed
  ]);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
                placeholder="Search doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Doctors Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">#</th>
                    <th className="px-4 py-2 border-b border-gray-200">Name</th>
                    <th className="px-4 py-2 border-b border-gray-200">Department</th>
                    <th className="px-4 py-2 border-b border-gray-200">Phone</th>
                    <th className="px-4 py-2 border-b border-gray-200">Email</th>
                    <th className="px-4 py-2 border-b border-gray-200">Experience</th>
                    <th className="px-4 py-2 border-b border-gray-200">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedDoctors.map((doctor, index) => (
                    <tr key={doctor.id}>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">{doctor.name}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{doctor.department}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{doctor.phone}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{doctor.email}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{doctor.experience}</td>
                      <td className="flex gap-2 px-4 py-2 border-b border-gray-200">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">Edit</button>
                        <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {paginatedDoctors.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                        No doctors found.
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
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
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
