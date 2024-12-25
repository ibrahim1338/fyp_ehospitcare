import React, { useState } from 'react';

function AdminPharmacists() {
  const [activeTab, setActiveTab] = useState('pharmacists');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [pharmacists] = useState([
    { id: 1, name: 'Pharm. Ahmed', phone: '123-456-7890', email: 'ahmed@example.com', experience: '5 years' },
    { id: 2, name: 'Pharm. Sara', phone: '123-456-7890', email: 'sara@example.com', experience: '7 years' },
    { id: 3, name: 'Pharm. Ayesha', phone: '123-456-7890', email: 'ayesha@example.com', experience: '4 years' },
    { id: 4, name: 'Pharm. Bilal', phone: '123-456-7890', email: 'bilal@example.com', experience: '8 years' },
    { id: 5, name: 'Pharm. Sameer', phone: '123-456-7890', email: 'sameer@example.com', experience: '6 years' },
    { id: 6, name: 'Pharm. Nadia', phone: '123-456-7890', email: 'nadia@example.com', experience: '3 years' },
  ]);

  const filteredPharmacists = pharmacists.filter((pharmacist) =>
    pharmacist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPharmacists.length / itemsPerPage);

  const paginatedPharmacists = filteredPharmacists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'pharmacists' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('pharmacists')}
        >
          Pharmacists
        </button>
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'addPharmacist' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('addPharmacist')}
        >
          Add Pharmacist
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === 'pharmacists' && (
          <div className="w-full">
            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                className="w-1/3 px-4 py-2 border rounded-lg"
                placeholder="Search pharmacists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Pharmacists Table */}
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
                  {paginatedPharmacists.map((pharmacist, index) => (
                    <tr key={pharmacist.id}>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">{pharmacist.name}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{pharmacist.phone}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{pharmacist.email}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{pharmacist.experience}</td>
                      <td className="flex gap-2 px-4 py-2 border-b border-gray-200">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">Edit</button>
                        <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {paginatedPharmacists.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                        No pharmacists found.
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

        {activeTab === 'addPharmacist' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Pharmacist</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter pharmacist name"
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
                Add Pharmacist
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPharmacists;
