import PatientModel from '../../models/doctorpagemodels/patientmodel.js';

export const addPatient = async (req, res) => {
    try {
        const { name, cnic, age, gender, address, phone, email } = req.body;

        // Validation to ensure all required fields are provided
        if (!name || !cnic || !age || !gender || !address || !phone || !email) {
            return res.status(400).json({
                message: 'Please fill all required fields: name, cnic, age, gender, address, phone, and email.'
            });
        }

        // Check if patient with the same CNIC or email already exists
        const existingPatient = await PatientModel.findOne({ $or: [{ cnic }, { email }] });

        if (existingPatient) {
            return res.status(400).json({
                message: 'A patient with this CNIC or email already exists.'
            });
        }

        const newPatient = new PatientModel({
            name,
            cnic,
            age,
            gender,
            address,
            phone,
            email
        });

        // Save the new patient
        await newPatient.save();

        res.status(201).json({
            message: 'Patient added successfully!',
            patient: newPatient
        });
    } catch (error) {
        console.error('Error adding patient:', error);
        res.status(500).json({
            message: 'Error adding patient',
            error: error.message
        });
    }
};

export const getAllPatients = async (req, res) => {
    try {
        const patients = await PatientModel.find({});
        res.status(200).json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({
            message: 'Error fetching patients',
            error: error.message
        });
    }
};
