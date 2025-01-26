import DoctorModel from '../models/doctorModel.js';

export const addDoctor = async (req, res) => {
  try {
    const { doctorId, name, department, phone, email, experience } = req.body;

    const existingDoctor = await DoctorModel.findOne({
      $or: [{ doctorId }, { email }]
    });

    if (existingDoctor) {
      return res.status(400).json({
        message: 'Doctor with this ID or email already exists'
      });
    }

    const newDoctor = new DoctorModel({
      doctorId,
      name,
      department,
      phone,
      email,
      experience
    });

    await newDoctor.save();

    res.status(201).json({
      message: 'Doctor added successfully',
      doctor: newDoctor
    });
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({
      message: 'Error adding doctor',
      error: error.message
    });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find({});
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      message: 'Error fetching doctors',
      error: error.message
    });
  }
};
