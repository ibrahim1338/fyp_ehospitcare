import React, { useState } from 'react';

const DoctorDeathReports = () => {
  const [activeTab, setActiveTab] = useState('deathReports');
  const [searchQuery, setSearchQuery] = useState('');
  const [deathReports, setDeathReports] = useState([
    {
      id: 1,
      name: 'John Doe',
      deathCause: 'Heart Attack',
      date: '2024-12-15',
    },
    // Add more dummy death reports if needed
  ]);

  const filteredDeathReports = deathReports.filter((report) =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDeathReport = (e) => {
    e.preventDefault();
    const newReport = {
      id: deathReports.length + 1,
      name: e.target.name.value,
      deathCause: e.target.deathCause.value,
      date: e.target.date.value,
    };
    setDeathReports([...deathReports, newReport]);
    e.target.reset(); // Reset form fields after submitting
  };

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${
            activeTab === 'deathReports' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('deathReports')}
        >
          Death Reports
        </button>
        <button
          className={`px-6 py-2 text-lg ${
            activeTab === 'addDeathReport' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('addDeathReport')}
        >
          Add Death Report
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === 'deathReports' && (
          <div className="w-full">
            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                className="w-2/3 px-4 py-2 border rounded-lg"
                placeholder="Search death reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Death Reports Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">#</th>
                    <th className="px-4 py-2 border-b border-gray-200">Name</th>
                    <th className="px-4 py-2 border-b border-gray-200">Death Cause</th>
                    <th className="px-4 py-2 border-b border-gray-200">Date</th>
                    <th className="px-10 py-2 border-b border-gray-200">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeathReports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-4 py-2 border-b border-gray-200">{report.id}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.name}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.deathCause}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.date}</td>
                      <td className="flex gap-5 px-4 py-2 border-b border-gray-200">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg mr-2">Edit</button>
                        <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {filteredDeathReports.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                        No death reports found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'addDeathReport' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Death Report</h2>
            <form onSubmit={handleAddDeathReport}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Patient Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter patient name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="deathCause">
                  Death Cause
                </label>
                <input
                  type="text"
                  id="deathCause"
                  name="deathCause"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter death cause"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="date">
                  Date of Death
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                Add Death Report
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};



export default DoctorDeathReports