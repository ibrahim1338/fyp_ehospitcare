import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    experience: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const DoctorModel = mongoose.model('doctors', doctorSchema);

export default DoctorModel;