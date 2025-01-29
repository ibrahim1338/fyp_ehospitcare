import express from 'express';
import { addPatient, getAllPatients, updatePatient, deletePatient } from '../../controllers/doctorpagecontrollers/patientController.js';

const router = express.Router();

router.post('/add', addPatient);
router.get('/', getAllPatients);
router.put('/update/:id', updatePatient);
router.delete('/delete/:id', deletePatient);

export default router;
