import mongoose from 'mongoose';

// Create a schema for the patient model
const patientSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
        unique: true,  // CNIC must be unique for each patient
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Email must be unique
    }
}, {
    timestamps: true
});

// Auto-incrementing patientId function
patientSchema.pre('save', async function(next) {
    const lastPatient = await this.constructor.findOne().sort({ patientId: -1 });
    if (!lastPatient) {
        this.patientId = 1;
    } else {
        this.patientId = lastPatient.patientId + 1;
    }
    next();
});

const PatientModel = mongoose.model('patients', patientSchema);

export default PatientModel;
