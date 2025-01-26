import express from 'express';
import { addDoctor, getAllDoctors } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/add', addDoctor);
router.get('/', getAllDoctors);

export default router;