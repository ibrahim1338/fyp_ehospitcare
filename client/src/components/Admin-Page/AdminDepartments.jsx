import React, { useState } from 'react';

function AdminDepartments() {
  const [activeTab, setActiveTab] = useState('patients');
  const [searchQuery, setSearchQuery] = useState('');
  const [departments] = useState([
    { id: 1, name: 'Heart', description: 'Description about Heart (Emergency Department)' },
    { id: 2, name: 'Neurology', description: 'Neurology Department for brain-related issues' },
    { id: 3, name: 'Pediatrics', description: 'Department for child care' },
  ]);

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'patients' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'
            }`}
          onClick={() => setActiveTab('patients')}
        >
          Departments
        </button>
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'addPatient' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'
            }`}
          onClick={() => setActiveTab('addPatient')}
        >
          Add Department
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === 'patients' && (
          <div className="w-full">
            {/* Search Box is responsible*/}
            <div className="mb-4">
              <input
                type="text"
                className="w-1/3 px-4 py-2 border rounded-lg"
                placeholder="Search doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Departments Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">#</th>
                    <th className="px-4 py-2 border-b border-gray-200">Department</th>
                    <th className="px-20 py-2 border-b border-gray-200">Description</th>
                    <th className="px-10 py-2 border-b border-gray-200">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepartments.map((department) => (
                    <tr key={department.id}>
                      <td className="px-4 py-2 border-b border-gray-200">{department.id}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{department.name}</td>
                      <td className="px-10 py-2 border-b border-gray-200">{department.description}</td>
                      <td className="flex gap-5 px-4 py-2 border-b border-gray-200">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg mr-2">Edit</button>
                        <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {filteredDepartments.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                        No departments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'addPatient' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Department</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="departmentName">
                  Department Name
                </label>
                <input
                  type="text"
                  id="departmentName"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter department name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter department description"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                Add Department
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDepartments;
