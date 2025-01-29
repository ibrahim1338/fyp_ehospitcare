import PatientModel from '../../models/doctorpagemodels/patient_Model.js';

// Add a new patient
export const addPatient = async (req, res) => {
    try {
        const { name, cnic, age, gender, address, phone, email } = req.body;

        if (!name || !cnic || !age || !gender || !address || !phone || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingPatient = await PatientModel.findOne({ $or: [{ cnic }, { email }] });

        if (existingPatient) {
            return res.status(400).json({ message: 'CNIC or Email already exists' });
        }

        const newPatient = new PatientModel({ name, cnic, age, gender, address, phone, email });

        await newPatient.save();

        res.status(201).json({ message: 'Patient added successfully!', patient: newPatient });
    } catch (error) {
        res.status(500).json({ message: 'Error adding patient', error: error.message });
    }
};

// Get all patients
export const getAllPatients = async (req, res) => {
    try {
        const patients = await PatientModel.find({});
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error: error.message });
    }
};

// Update a patient
export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPatient = await PatientModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
    } catch (error) {
        res.status(500).json({ message: 'Error updating patient', error: error.message });
    }
};

// Delete a patient
export const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPatient = await PatientModel.findByIdAndDelete(id);

        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting patient', error: error.message });
    }
};
