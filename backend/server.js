import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import DbCon from './utlis/db.js';
import AuthRoutes from './routes/Auth.js';
import AdminRoutes from './routes/AdminRoutes.js';
import DoctorRoutes from './routes/doctorRoutes.js';
import PatientRoutes from './routes/doctorpageroutes/patient_Routes.js';

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

DbCon();

app.use(express.json());
app.use(cookieparser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/doctors', DoctorRoutes);
app.use('/api/patients', PatientRoutes);

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
