import React, { useState } from 'react';

function AdminDeathReports() {
  const [activeTab, setActiveTab] = useState('deathReports');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [deathReports, setDeathReports] = useState([
    {
      id: 1,
      fullName: 'Ahmed Ali',
      dob: '1960-01-15',
      gender: 'Male',
      address: 'Karachi, Pakistan',
      maritalStatus: 'Married',
      occupation: 'Teacher',
      idNumber: '12345-6789012-3',
      mrn: 'MRN-001',
      dateOfDeath: '2023-12-01',
      timeOfDeath: '14:30',
      placeOfDeath: 'Hospital',
      witness: 'Hassan Raza',
      mannerOfDeath: 'Natural',
      physician: 'Dr. Imran Khan',
      certificateNumber: 'DC-202312001',
    },
    // Additional records if needed
  ]);

  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    gender: 'Male',
    address: '',
    maritalStatus: '',
    occupation: '',
    idNumber: '',
    mrn: '',
    dateOfDeath: '',
    timeOfDeath: '',
    placeOfDeath: '',
    witness: '',
    mannerOfDeath: '',
    physician: '',
    certificateNumber: '',
  });

  const filteredReports = deathReports.filter((report) =>
    report.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDeathReports((prevReports) => [
      ...prevReports,
      { ...form, id: prevReports.length + 1 },
    ]);
    setForm({
      fullName: '',
      dob: '',
      gender: 'Male',
      address: '',
      maritalStatus: '',
      occupation: '',
      idNumber: '',
      mrn: '',
      dateOfDeath: '',
      timeOfDeath: '',
      placeOfDeath: '',
      witness: '',
      mannerOfDeath: '',
      physician: '',
      certificateNumber: '',
    });
    setActiveTab('deathReports');
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
                className="w-1/3 px-4 py-2 border rounded-lg"
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
                    <th className="px-4 py-2 border-b border-gray-200">Full Name</th>
                    <th className="px-4 py-2 border-b border-gray-200">Date of Birth</th>
                    <th className="px-4 py-2 border-b border-gray-200">Date of Death</th>
                    <th className="px-4 py-2 border-b border-gray-200">Place of Death</th>
                    <th className="px-4 py-2 border-b border-gray-200">Manner of Death</th>
                    <th className="px-4 py-2 border-b border-gray-200">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReports.map((report, index) => (
                    <tr key={report.id}>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.fullName}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.dob}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.dateOfDeath}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.placeOfDeath}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.mannerOfDeath}</td>
                      <td className="flex gap-2 px-4 py-2 border-b border-gray-200">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">Edit</button>
                        <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {paginatedReports.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                        No death reports found.
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
                className={`w-32 px-2 py-2 rounded-lg transition-all ${
                  currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() => setCurrentPage((prev) => (currentPage < totalPages ? prev + 1 : prev))}
                className={`w-32 px-4 py-2 rounded-lg transition-all ${
                  currentPage === totalPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {activeTab === 'addDeathReport' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Death Report</h2>
            <form onSubmit={handleFormSubmit}>
              {[
                { name: 'fullName', label: 'Full Name', type: 'text' },
                { name: 'dob', label: 'Date of Birth', type: 'date' },
                { name: 'address', label: 'Address', type: 'text' },
                { name: 'maritalStatus', label: 'Marital Status', type: 'text' },
                { name: 'occupation', label: 'Occupation', type: 'text' },
                { name: 'idNumber', label: 'National ID/SSN', type: 'text' },
                { name: 'mrn', label: 'Medical Record Number', type: 'text' },
                { name: 'dateOfDeath', label: 'Date of Death', type: 'date' },
                { name: 'timeOfDeath', label: 'Time of Death', type: 'time' },
                { name: 'witness', label: 'Witness', type: 'text' },
                { name: 'physician', label: 'Attending Physician', type: 'text' },
                { name: 'certificateNumber', label: 'Certificate Number', type: 'text' },
              ].map(({ name, label, type }) => (
                <div className="mb-4" key={name}>
                  <label className="block text-gray-700 mb-2" htmlFor={name}>
                    {label}
                  </label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={form[name]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="placeOfDeath">
                  Place of Death
                </label>
                <select
                  id="placeOfDeath"
                  name="placeOfDeath"
                  value={form.placeOfDeath}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Home">Home</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="mannerOfDeath">
                  Manner of Death
                </label>
                <select
                  id="mannerOfDeath"
                  name="mannerOfDeath"
                  value={form.mannerOfDeath}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="Natural">Natural</option>
                  <option value="Accident">Accident</option>
                  <option value="Suicide">Suicide</option>
                  <option value="Homicide">Homicide</option>
                  <option value="Undetermined">Undetermined</option>
                </select>
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
}

export default AdminDeathReports;
