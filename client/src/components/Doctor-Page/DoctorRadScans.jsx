import React, { useState } from 'react';

function DoctorRadScans() {
  const [activeTab, setActiveTab] = useState('scans');
  const [patientData, setPatientData] = useState([
    { id: 1, name: 'Cameron Stanley', cnic: '3450112345678', age: 23, sex: 'Male', phone: '03000000000', registrationDate: '2022-12-12' },
    { id: 2, name: 'Jessica Green', cnic: '3450112345679', age: 25, sex: 'Female', phone: '03000000001', registrationDate: '2022-11-10' },
    { id: 3, name: 'Michael Black', cnic: '3450112345680', age: 30, sex: 'Male', phone: '03000000002', registrationDate: '2022-10-15' },
    { id: 4, name: 'Sarah White', cnic: '3450112345681', age: 27, sex: 'Female', phone: '03000000003', registrationDate: '2022-09-05' }
  ]);

  const [radiologyScans, setRadiologyScans] = useState([
    'X-ray', 'MRI', 'CT Scan', 'Ultrasound', 'PET Scan'
  ]);

  const [scanReports, setScanReports] = useState([
    {
      id: 1,
      patientId: 1,
      scan: 'X-ray',
      description: 'Chest X-ray to check for pneumonia.',
      date: '2024-12-20',
    },
    {
      id: 2,
      patientId: 2,
      scan: 'MRI',
      description: 'MRI of the brain to investigate headache causes.',
      date: '2024-12-21',
    }
  ]);

  const [viewScanReport, setViewScanReport] = useState(null);

  const handleViewScanReport = (id) => {
    setViewScanReport(id);
  };

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'scans' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('scans')}
        >
          Radiology Scans
        </button>
        <button
          className={`px-6 py-2 text-lg ${activeTab === 'addScan' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('addScan')}
        >
          Add Radiology Scan
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === 'scans' && (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-200">#</th>
                  <th className="px-4 py-2 border-b border-gray-200">Patient Name</th>
                  <th className="px-4 py-2 border-b border-gray-200">Scan</th>
                  <th className="px-4 py-2 border-b border-gray-200">Date</th>
                  <th className="px-4 py-2 border-b border-gray-200">Options</th>
                </tr>
              </thead>
              <tbody>
                {scanReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-4 py-2 border-b border-gray-200">{report.id}</td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {patientData.find(patient => patient.id === report.patientId)?.name}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">{report.scan}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{report.date}</td>
                    <td className="flex gap-5 px-4 py-2 border-b border-gray-200">
                      <button
                        className="bg-blue-500 text-white px-4 py-1 rounded-lg mr-2"
                        onClick={() => handleViewScanReport(report.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'addScan' && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Add Radiology Scan</h2>
            <form>
              {/* Patient Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="patient">
                  Select Patient
                </label>
                <select
                  id="patient"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  {patientData.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Radiology Scan Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="scan">
                  Select Radiology Scan
                </label>
                <select
                  id="scan"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  {radiologyScans.map((scan, index) => (
                    <option key={index} value={scan}>
                      {scan}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter scan description"
                />
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

              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                Add Radiology Scan
              </button>
            </form>
          </div>
        )}

        {/* View Scan Report Data */}
        {viewScanReport && (
          <div className="p-4 bg-white rounded-lg mt-4">
            <h2 className="text-xl mb-4">Radiology Scan Details</h2>
            <p><strong>Patient Name:</strong> {patientData.find(patient => patient.id === scanReports.find(p => p.id === viewScanReport).patientId)?.name}</p>
            <p><strong>Scan:</strong> {scanReports.find(p => p.id === viewScanReport)?.scan}</p>
            <p><strong>Date:</strong> {scanReports.find(p => p.id === viewScanReport)?.date}</p>
            <p><strong>Description:</strong> {scanReports.find(p => p.id === viewScanReport)?.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}


export default DoctorRadScans