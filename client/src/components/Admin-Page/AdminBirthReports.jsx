import React, { useState } from 'react';

function AdminBirthReports() {
  const [activeTab, setActiveTab] = useState('birthReports');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [birthReports, setBirthReports] = useState([
    {
      id: 1,
      patient: 'Sarah Johnson',
      birthType: 'Vaginal',
      doctor: 'Dr. Emily Clark',
      date: '2024-01-15',
      babyWeight: '3.2 kg',
      attending: 'Midwife Laura Green',
      entryDate: '2024-01-16',
      status: 'Final',
      dischargeDateMother: '2024-01-20',
      dischargeDateBaby: '2024-01-20',
    },
    {
      id: 2,
      patient: 'Maria Rodriguez',
      birthType: 'C-Section',
      doctor: 'Dr. Michael Brown',
      date: '2024-02-10',
      babyWeight: '3.5 kg',
      attending: 'Dr. Michael Brown',
      entryDate: '2024-02-11',
      status: 'Verified',
      dischargeDateMother: '2024-02-15',
      dischargeDateBaby: '2024-02-15',
    },
    // Add more sample data as needed
  ]);

  const [formData, setFormData] = useState({
    patient: '',
    birthType: '',
    doctor: '',
    date: '',
    babyWeight: '',
    attending: '',
    entryDate: '',
    status: 'Draft',
    dischargeDateMother: '',
    dischargeDateBaby: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editReportId, setEditReportId] = useState(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredReports = birthReports.filter((report) =>
    report.patient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setBirthReports(
        birthReports.map((report) =>
          report.id === editReportId ? { ...report, ...formData } : report
        )
      );
      setIsEditing(false);
      setEditReportId(null);
    } else {
      const newReport = {
        id: birthReports.length + 1,
        ...formData,
      };
      setBirthReports([...birthReports, newReport]);
    }
    setFormData({
      patient: '',
      birthType: '',
      doctor: '',
      date: '',
      babyWeight: '',
      attending: '',
      entryDate: '',
      status: 'Draft',
      dischargeDateMother: '',
      dischargeDateBaby: '',
    });
  };

  const handleEdit = (report) => {
    setIsEditing(true);
    setEditReportId(report.id);
    setFormData({
      patient: report.patient,
      birthType: report.birthType,
      doctor: report.doctor,
      date: report.date,
      babyWeight: report.babyWeight,
      attending: report.attending,
      entryDate: report.entryDate,
      status: report.status,
      dischargeDateMother: report.dischargeDateMother,
      dischargeDateBaby: report.dischargeDateBaby,
    });
    setActiveTab('addBirthReport');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setBirthReports(birthReports.filter((report) => report.id !== id));
    }
  };

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${
            activeTab === 'birthReports'
              ? 'border-b-4 border-blue-500 text-blue-500'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('birthReports')}
        >
          Birth Reports
        </button>
        <button
          className={`px-6 py-2 text-lg ${
            activeTab === 'addBirthReport'
              ? 'border-b-4 border-blue-500 text-blue-500'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('addBirthReport')}
        >
          {isEditing ? 'Edit Birth Report' : 'Add Birth Report'}
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === 'birthReports' && (
          <div className="w-full">
            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                className="w-1/3 px-4 py-2 border rounded-lg"
                placeholder="Search by patient name..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            {/* Birth Reports Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">#</th>
                    <th className="px-4 py-2 border-b border-gray-200">Patient</th>
                    <th className="px-4 py-2 border-b border-gray-200">Birth Type</th>
                    <th className="px-4 py-2 border-b border-gray-200">Doctor</th>
                    <th className="px-4 py-2 border-b border-gray-200">Date</th>
                    <th className="px-4 py-2 border-b border-gray-200">Baby Weight</th>
                    <th className="px-4 py-2 border-b border-gray-200">Attending</th>
                    <th className="px-4 py-2 border-b border-gray-200">Entry/Update Date</th>
                    <th className="px-4 py-2 border-b border-gray-200">Status</th>
                    <th className="px-4 py-2 border-b border-gray-200">Discharge Date (Mother)</th>
                    <th className="px-4 py-2 border-b border-gray-200">Discharge Date (Baby)</th>
                    <th className="px-4 py-2 border-b border-gray-200">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedReports.map((report, index) => (
                    <tr key={report.id}>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.patient}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.birthType}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.doctor}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.date}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.babyWeight}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.attending}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.entryDate}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{report.status}</td>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {report.dischargeDateMother}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {report.dischargeDateBaby}
                      </td>
                      <td className="flex gap-2 px-4 py-2 border-b border-gray-200">
                        <button
                          className="bg-blue-500 text-white px-4 py-1 rounded-lg"
                          onClick={() => handleEdit(report)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded-lg"
                          onClick={() => handleDelete(report.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedReports.length === 0 && (
                    <tr>
                      <td colSpan="12" className="px-4 py-2 text-center text-gray-500">
                        No birth reports found.
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
                  currentPage === 1
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
                className={`w-32 px-4 py-2 rounded-lg transition-all ${
                  currentPage === totalPages
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

        {activeTab === 'addBirthReport' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">
              {isEditing ? 'Edit Birth Report' : 'Add Birth Report'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="patient">
                    Patient
                  </label>
                  <input
                    type="text"
                    id="patient"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter patient name"
                    value={formData.patient}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="birthType">
                    Birth Type
                  </label>
                  <select
                    id="birthType"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.birthType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select birth type</option>
                    <option value="Vaginal">Vaginal</option>
                    <option value="C-Section">C-Section</option>
                    <option value="Assisted">Assisted</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="doctor">
                    Doctor
                  </label>
                  <input
                    type="text"
                    id="doctor"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter doctor's name"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="attending">
                    Attending Physician/Midwife
                  </label>
                  <input
                    type="text"
                    id="attending"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter attending physician/midwife name"
                    value={formData.attending}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="date">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="babyWeight">
                    Baby Weight
                  </label>
                  <input
                    type="text"
                    id="babyWeight"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="e.g., 3.2 kg"
                    value={formData.babyWeight}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="entryDate">
                    Date of Entry/Update
                  </label>
                  <input
                    type="date"
                    id="entryDate"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.entryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Draft">Draft</option>
                    <option value="Verified">Verified</option>
                    <option value="Final">Final</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="dischargeDateMother">
                    Discharge Date (Mother)
                  </label>
                  <input
                    type="date"
                    id="dischargeDateMother"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.dischargeDateMother}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="dischargeDateBaby">
                    Discharge Date (Baby)
                  </label>
                  <input
                    type="date"
                    id="dischargeDateBaby"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.dischargeDateBaby}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg"
              >
                {isEditing ? 'Update Birth Report' : 'Add Birth Report'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBirthReports;
