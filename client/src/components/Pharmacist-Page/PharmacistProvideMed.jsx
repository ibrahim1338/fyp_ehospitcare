import React, { useState } from 'react';

function PharmacistProvideMed() {
  const [medications, setMedications] = useState([
    {
      id: 1,
      patientName: 'Claudia Purity',
      date: '2022-12-12',
      drugAmount: '₦',
      doctor: 'Peter David',
      prescription: 'Paracetamol, Ibuprofen',
      medicalHistory: 'Diabetes',
    },
    {
      id: 2,
      patientName: 'Fejiro Samuel',
      date: '2022-11-07',
      drugAmount: '₦1200',
      doctor: 'Akalezi Kelechi',
      prescription: 'Amoxicillin, Aspirin',
      medicalHistory: 'Hypertension',
    },
    {
      id: 3,
      patientName: 'Sara Lozano',
      date: '2022-11-08',
      drugAmount: '₦1400',
      doctor: 'Akalezi Kelechi',
      prescription: 'Metformin, Vitamin D',
      medicalHistory: 'Obesity',
    },
    {
      id: 4,
      patientName: 'Temisan Oritsejafor',
      date: '2022-11-04',
      drugAmount: '₦3500',
      doctor: 'Akalezi Kelechi',
      prescription: 'Antibiotics, Multivitamins',
      medicalHistory: 'Asthma',
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [updatedAmount, setUpdatedAmount] = useState('');

  const [isViewing, setIsViewing] = useState(false);

  const handleUpdateAmount = (id) => {
    const medication = medications.find((med) => med.id === id);
    setSelectedMedication(medication);
    setUpdatedAmount(medication.drugAmount);
    setIsEditing(true);
  };

  const handleViewMedication = (id) => {
    const medication = medications.find((med) => med.id === id);
    setSelectedMedication(medication);
    setIsViewing(true);
  };

  const handleSaveAmount = () => {
    setMedications((prevMedications) =>
      prevMedications.map((med) =>
        med.id === selectedMedication.id ? { ...med, drugAmount: updatedAmount } : med
      )
    );
    setIsEditing(false);
    setSelectedMedication(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Pharmacist Page</h2>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border px-4 py-2 rounded-lg"
        />
        <span>Total: {medications.length}</span>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-purple-700 text-white">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Patient</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Drugs Amount</th>
            <th className="px-4 py-2">Doctor</th>
            <th className="px-4 py-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication) => (
            <tr key={medication.id}>
              <td className="px-4 py-2">{medication.id}</td>
              <td className="px-4 py-2">{medication.patientName}</td>
              <td className="px-4 py-2">{medication.date}</td>
              <td className="px-4 py-2">{medication.drugAmount}</td>
              <td className="px-4 py-2">{medication.doctor}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded-lg"
                  onClick={() => handleUpdateAmount(medication.id)}
                >
                  Update Amount
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded-lg"
                  onClick={() => handleViewMedication(medication.id)}
                >
                  View Medication
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Amount Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg mb-4">Update Drug Amount</h3>
            <input
              type="text"
              value={updatedAmount}
              onChange={(e) => setUpdatedAmount(e.target.value)}
              className="border px-4 py-2 rounded-lg w-full mb-4"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              onClick={handleSaveAmount}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* View Medication Modal */}
      {isViewing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-lg mb-4">Medical Prescription</h3>
            <p>
              <strong>Patient Name:</strong> {selectedMedication.patientName}
            </p>
            <p>
              <strong>Medical History:</strong> {selectedMedication.medicalHistory}
            </p>
            <p>
              <strong>Prescription:</strong> {selectedMedication.prescription}
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
              onClick={() => setIsViewing(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default PharmacistProvideMed