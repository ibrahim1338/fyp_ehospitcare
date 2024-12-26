import React, { useState } from 'react';

function DoctorBirthReports() {

  const [activeTab, setActiveTab] = useState("birthReports");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for birth reports
  const [birthReports, setBirthReports] = useState([
    {
      id: 1,
      patientName: "John Doe",
      birthType: "Normal",
      date: "2024-12-15",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      birthType: "C-Section",
      date: "2024-12-16",
    },
    // Add more dummy birth reports if needed
  ]);

  // Handle adding a new birth report
  const handleAddBirthReport = (event) => {
    event.preventDefault();
    const patientName = event.target.patientName.value;
    const birthType = event.target.birthType.value;
    const date = event.target.date.value;

    const newReport = {
      id: birthReports.length + 1, // Adjust this logic for unique ID
      patientName,
      birthType,
      date,
    };

    setBirthReports([...birthReports, newReport]);
  };

  // Filter birth reports based on the search query
  const filteredBirthReports = birthReports.filter((report) =>
    report.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${
            activeTab === "birthReports"
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("birthReports")}
        >
          Birth Reports
        </button>
        <button
          className={`px-6 py-2 text-lg ${
            activeTab === "addBirthReport"
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("addBirthReport")}
        >
          Add Birth Report
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === "birthReports" && (
          <div className="w-full">
            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                className="w-2/3 px-4 py-2 border rounded-lg"
                placeholder="Search birth reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Birth Reports Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">#</th>
                    <th className="px-4 py-2 border-b border-gray-200">Patient Name</th>
                    <th className="px-4 py-2 border-b border-gray-200">Birth Type</th>
                    <th className="px-4 py-2 border-b border-gray-200">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBirthReports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-4 py-2 border-b border-gray-200">{report.id}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.patientName}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.birthType}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.date}</td>
                    </tr>
                  ))}
                  {filteredBirthReports.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                        No birth reports found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "addBirthReport" && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Birth Report</h2>
            <form onSubmit={handleAddBirthReport}>
              {/* Patient Name */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="patientName">
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patientName"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter patient name"
                  required
                />
              </div>

              {/* Birth Type */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="birthType">
                  Birth Type
                </label>
                <select
                  id="birthType"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="Normal">Normal</option>
                  <option value="C-Section">C-Section</option>
                  {/* Add other birth types if needed */}
                </select>
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg"
              >
                Add Birth Report
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};


export default DoctorBirthReports