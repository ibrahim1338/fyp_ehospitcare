import React, { useState, useEffect } from "react";

function DoctorPatients() {
  const [activeTab, setActiveTab] = useState("patients");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    cnic: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
  });

  const [editPatient, setEditPatient] = useState(null); // To handle the patient being edited

  // Fetch patients from API
  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/patients");
      if (response.ok) {
        let data = await response.json();
        data.sort((a, b) => b.invoiceNumber - a.invoiceNumber); // Sort by invoiceNumber (Descending)
        setPatients(data);
      } else {
        console.error("Failed to fetch patients");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Add a new patient
  const handleAddPatient = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/patients/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPatient),
      });

      if (response.ok) {
        setNewPatient({
          name: "",
          cnic: "",
          age: "",
          gender: "",
          address: "",
          phone: "",
          email: "",
        });
        alert("Patient added successfully!");
        fetchPatients();
        setActiveTab("patients");
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Failed to add patient");
    }
  };

  // Update an existing patient
  const handleUpdatePatient = async (e) => {
    e.preventDefault();
    if (!editPatient) return;

    const { invoiceNumber, ...updateData } = editPatient; // Extract invoiceNumber to prevent update

    try {
      const response = await fetch(`http://localhost:4000/api/patients/update/${invoiceNumber}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData), // Send only the fields to update
      });

      if (response.ok) {
        alert("Patient updated successfully!");
        setEditPatient(null); // Reset the form after update
        fetchPatients(); // Refetch patients
        setActiveTab("patients");
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient");
    }
  };

  // Delete a patient
  const handleDeletePatient = async (invoiceNumber) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/patients/delete/${invoiceNumber}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Patient deleted successfully!");
          setPatients(patients.filter(patient => patient.invoiceNumber !== invoiceNumber)); // Remove from local state
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert("Failed to delete patient");
      }
    }
  };

  // Filtered and paginated patients
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(patient.invoiceNumber).includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full p-4">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${activeTab === "patients" ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-600"}`}
          onClick={() => setActiveTab("patients")}
        >
          Patients
        </button>
        <button
          className={`px-6 py-2 text-lg ${activeTab === "addPatient" ? "border-b-4 border-blue-500 text-blue-500" : "text-gray-600"}`}
          onClick={() => setActiveTab("addPatient")}
        >
          Add Patient
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === "patients" && (
          <div className="w-full">
            {/* Search Box */}
            <div className="mb-4">
              <input
                type="text"
                className="w-1/3 px-4 py-2 border rounded-lg"
                placeholder="Search by name or invoice number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Patients Table */}
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-200">Invoice #</th>
                  <th className="px-4 py-2 border-b border-gray-200">Name</th>
                  <th className="px-4 py-2 border-b border-gray-200">CNIC</th>
                  <th className="px-4 py-2 border-b border-gray-200">Phone</th>
                  <th className="px-4 py-2 border-b border-gray-200">Gender</th>
                  <th className="px-4 py-2 border-b border-gray-200">Email</th>
                  <th className="px-4 py-2 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPatients.map((patient) => (
                  <tr key={patient.invoiceNumber}>
                    <td className="px-4 py-2 border-b">{patient.invoiceNumber}</td>
                    <td className="px-4 py-2 border-b">{patient.name}</td>
                    <td className="px-4 py-2 border-b">{patient.cnic}</td>
                    <td className="px-4 py-2 border-b">{patient.phone}</td>
                    <td className="px-4 py-2 border-b">{patient.gender}</td>
                    <td className="px-4 py-2 border-b">{patient.email}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                        onClick={() => {
                          setEditPatient(patient);
                          setActiveTab("addPatient");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2"
                        onClick={() => handleDeletePatient(patient.invoiceNumber)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <div className="flex items-center">
                <span className="mr-4">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "addPatient" && (
          <div className="w-full">
            {/* Add or Edit Patient Form */}
            <form onSubmit={editPatient ? handleUpdatePatient : handleAddPatient}>
              <div className="mb-4">
                <label className="block text-lg">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={editPatient ? editPatient.name : newPatient.name}
                  onChange={(e) =>
                    editPatient
                      ? setEditPatient({ ...editPatient, name: e.target.value })
                      : setNewPatient({ ...newPatient, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg">CNIC</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={editPatient ? editPatient.cnic : newPatient.cnic}
                  onChange={(e) =>
                    editPatient
                      ? setEditPatient({ ...editPatient, cnic: e.target.value })
                      : setNewPatient({ ...newPatient, cnic: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg">Age</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={editPatient ? editPatient.age : newPatient.age}
                  onChange={(e) =>
                    editPatient
                      ? setEditPatient({ ...editPatient, age: e.target.value })
                      : setNewPatient({ ...newPatient, age: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg">Gender</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={editPatient ? editPatient.gender : newPatient.gender}
                  onChange={(e) =>
                    editPatient
                      ? setEditPatient({ ...editPatient, gender: e.target.value })
                      : setNewPatient({ ...newPatient, gender: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg">Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={editPatient ? editPatient.address : newPatient.address}
                  onChange={(e) =>
                    editPatient
                      ? setEditPatient({ ...editPatient, address: e.target.value })
                      : setNewPatient({ ...newPatient, address: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg">Phone</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={editPatient ? editPatient.phone : newPatient.phone}
                  onChange={(e) =>
                    editPatient
                      ? setEditPatient({ ...editPatient, phone: e.target.value })
                      : setNewPatient({ ...newPatient, phone: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={editPatient ? editPatient.email : newPatient.email}
                  onChange={(e) =>
                    editPatient
                      ? setEditPatient({ ...editPatient, email: e.target.value })
                      : setNewPatient({ ...newPatient, email: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg"
              >
                {editPatient ? "Update Patient" : "Add Patient"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorPatients;
