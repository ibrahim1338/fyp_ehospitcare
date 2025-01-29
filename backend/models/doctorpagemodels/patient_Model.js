import mongoose from 'mongoose';

// Create a schema for the patient model
const patientSchema = new mongoose.Schema({
    invoiceNumber: {
        type: Number,
        required: true,
        unique: true,
        default: () => Math.floor(Math.random() * 100000), // Or auto-increment logic
      },
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

// Auto-increment invoiceNumber
// patientSchema.pre('save', async function (next) {
//     if (!this.isNew) return next(); // Only increment on new patient

//     const lastPatient = await mongoose.model('patients').findOne({}, {}, { sort: { invoiceNumber: -1 } });
//     this.invoiceNumber = lastPatient ? lastPatient.invoiceNumber + 1 : 1;
//     next();
// });

const PatientModel = mongoose.model('patients', patientSchema);

export default PatientModel;
