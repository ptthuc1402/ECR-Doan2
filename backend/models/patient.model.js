const mongoose = require('mongoose');

const { Schema } = mongoose;

// create table users
const patientSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    date_to_hos: {
        type: String,
    },
    age: {
        type: String,
    },
    job: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    reason_to_hos: {
        type: String,
    },
    status: {
        type: String,
    },
    symptom: {
        type: String,
    },
    temperature:
    {
        type: String,
    },
    oxygen:
    {
        type: String,
    },
    pulse:
    {
        type: String,
    },
    heart_beat:
    {
        type: String,
    },
    diagnose:
    {
        type: String,
    },
    drug:
    {
        type: String,
    },
    patient_id: {
        type: String
    }

}, { timestamps: true });


const Patient = mongoose.model('patients', patientSchema);

module.exports = Patient;