import React, { useState } from 'react';

function AdminReceptionists() {
  const [activeTab, setActiveTab] = useState('receptionists');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [receptionists] = useState([
    { id: 1, name: 'Amina Khan', phone: '123-456-7890', email: 'amina.khan@example.com', experience: '3 years' },
    { id: 2, name: 'Fatima Ali', phone: '123-456-7890', email: 'fatima.ali@example.com', experience: '2 years' },
    { id: 3, name: 'Zainab Siddiqui', phone: '123-456-7890', email: 'zainab.siddiqui@example.com', experience: '4 years' },
    { id: 4, name: 'Khalid Hussain', phone: '123-456-7890', email: 'khalid.hussain@example.com', experience: '5 years' },
    { id: 5, name: 'Mariam Ahmed', phone: '123-456-7890', email: 'mariam.ahmed@example.com', experience: '6 years' },
    { id: 6, name: 'Yasmin Ibrahim', phone: '123-456-7890', email: 'yasmin.ibrahim@example.com', experience: '2 years' },
  ]);

  const filteredReceptionists = receptionists.filter((receptionist) =>
    receptionist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReceptionists.length / itemsPerPage);

  const paginatedReceptionists = filteredReceptionists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'receptionists' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('receptionists')}
        >
          Receptionists
        </button>
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'addReceptionist' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('addReceptionist')}
        >
          Add Receptionist
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === 'receptionists' && (
          <div className="w-full">
            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                className="w-1/3 px-4 py-2 border rounded-lg"
                placeholder="Search receptionists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Receptionists Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">#</th>
                    <th className="px-4 py-2 border-b border-gray-200">Name</th>
                    <th className="px-4 py-2 border-b border-gray-200">Phone</th>
                    <th className="px-4 py-2 border-b border-gray-200">Email</th>
                    <th className="px-4 py-2 border-b border-gray-200">Experience</th>
                    <th className="px-4 py-2 border-b border-gray-200">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReceptionists.map((receptionist, index) => (
                    <tr key={receptionist.id}>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">{receptionist.name}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{receptionist.phone}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{receptionist.email}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{receptionist.experience}</td>
                      <td className="flex gap-2 px-4 py-2 border-b border-gray-200">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">Edit</button>
                        <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {paginatedReceptionists.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                        No receptionists found.
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

        {activeTab === 'addReceptionist' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Receptionist</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter receptionist name"
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
                  placeholder="Enter experience (e.g., 3 years)"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                Add Receptionist
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminReceptionists;
