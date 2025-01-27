import express from 'express';
import { addPatient, getAllPatients } from '../../controllers/doctorpagecontrollers/patientController.js';

const router = express.Router();

// Route to add a new patient
router.post('/add', addPatient);

// Route to fetch all patients
router.get('/', getAllPatients);

export default router;
