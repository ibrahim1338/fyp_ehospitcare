import React, { useState } from "react";

function LaboratoristPatientTests() {
  const [activeTab, setActiveTab] = useState("testResults"); // Track active tab
  const [testResults, setTestResults] = useState([
    {
      id: 1,
      patient: "John Doe",
      testName: "Blood Test",
      date: "2024-12-25",
      results: "Normal",
      notes: "All parameters are within normal range.",
    },
    {
      id: 2,
      patient: "Jane Smith",
      testName: "X-Ray",
      date: "2024-12-20",
      results: "No fractures detected.",
      notes: "Mild inflammation observed.",
    },
  ]);

  const [newTestResult, setNewTestResult] = useState({
    patient: "",
    testName: "",
    date: "",
    results: "",
    notes: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestResult({ ...newTestResult, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedTestResults = [
      ...testResults,
      { id: testResults.length + 1, ...newTestResult },
    ];
    setTestResults(updatedTestResults);
    setNewTestResult({ patient: "", testName: "", date: "", results: "", notes: "" });
    alert("Test result added successfully!");
    setActiveTab("testResults");
  };

  return (
    <div className="w-full p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-6">Laboratory</h1>

      {/* Tabs */}
      <div className="flex border-b-2 mb-4">
        <button
          className={`px-6 py-2 text-lg ${
            activeTab === "testResults" ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("testResults")}
        >
          Test Results
        </button>
        <button
          className={`px-6 py-2 text-lg ${
            activeTab === "addTestResult" ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("addTestResult")}
        >
          Add Test Results
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "testResults" && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-200">#</th>
                <th className="px-4 py-2 border-b border-gray-200">Patient</th>
                <th className="px-4 py-2 border-b border-gray-200">Test Name</th>
                <th className="px-4 py-2 border-b border-gray-200">Date</th>
                <th className="px-4 py-2 border-b border-gray-200">Results</th>
                <th className="px-4 py-2 border-b border-gray-200">Notes</th>
              </tr>
            </thead>
            <tbody>
              {testResults.map((result) => (
                <tr key={result.id}>
                  <td className="px-4 py-2 border-b border-gray-200">{result.id}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{result.patient}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{result.testName}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{result.date}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{result.results}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{result.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "addTestResult" && (
        <div className="p-4 bg-gray-100 rounded-lg w-3/5 mx-auto">
          <h2 className="text-2xl mb-4">Add Test Result</h2>
          <form onSubmit={handleFormSubmit}>
            {/* Patient */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="patient">
                Patient Name
              </label>
              <input
                type="text"
                id="patient"
                name="patient"
                value={newTestResult.patient}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter patient name"
                required
              />
            </div>

            {/* Test Name */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="testName">
                Test Name
              </label>
              <input
                type="text"
                id="testName"
                name="testName"
                value={newTestResult.testName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter test name"
                required
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
                name="date"
                value={newTestResult.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            {/* Results */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="results">
                Results
              </label>
              <textarea
                id="results"
                name="results"
                value={newTestResult.results}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter test results"
                required
              />
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={newTestResult.notes}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter additional notes"
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
              Add Test Result
            </button>
          </form>
        </div>
      )}
    </div>
  );
}


export default LaboratoristPatientTests