import React, { useState } from 'react';

function AdminLaboratorists() {
  const [activeTab, setActiveTab] = useState('laboratorists');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [laboratorists] = useState([
    { id: 1, name: 'Lab. Imran', phone: '123-456-7890', email: 'imran@example.com', experience: '6 years' },
    { id: 2, name: 'Lab. Fatima', phone: '123-456-7890', email: 'fatima@example.com', experience: '4 years' },
    { id: 3, name: 'Lab. Zain', phone: '123-456-7890', email: 'zain@example.com', experience: '5 years' },
    { id: 4, name: 'Lab. Maria', phone: '123-456-7890', email: 'maria@example.com', experience: '7 years' },
    { id: 5, name: 'Lab. Ahmad', phone: '123-456-7890', email: 'ahmad@example.com', experience: '3 years' },
    { id: 6, name: 'Lab. Saba', phone: '123-456-7890', email: 'saba@example.com', experience: '6 years' },
  ]);

  const filteredLaboratorists = laboratorists.filter((laboratorist) =>
    laboratorist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLaboratorists.length / itemsPerPage);

  const paginatedLaboratorists = filteredLaboratorists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'laboratorists' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('laboratorists')}
        >
          Laboratorists
        </button>
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'addLaboratorist' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('addLaboratorist')}
        >
          Add Laboratorist
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === 'laboratorists' && (
          <div className="w-full">
            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                className="w-1/3 px-4 py-2 border rounded-lg"
                placeholder="Search laboratorists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Laboratorists Table */}
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
                  {paginatedLaboratorists.map((laboratorist, index) => (
                    <tr key={laboratorist.id}>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">{laboratorist.name}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{laboratorist.phone}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{laboratorist.email}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{laboratorist.experience}</td>
                      <td className="flex gap-2 px-4 py-2 border-b border-gray-200">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">Edit</button>
                        <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {paginatedLaboratorists.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                        No laboratorists found.
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

        {activeTab === 'addLaboratorist' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Laboratorist</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter laboratorist name"
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
                  placeholder="Enter experience (e.g., 5 years)"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                Add Laboratorist
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminLaboratorists;
