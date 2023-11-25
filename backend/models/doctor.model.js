const mongoose = require('mongoose');

const { Schema } = mongoose;

// create table users
const doctorSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    birth: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    sex: {
        type: String,
        require: true
    },
    spec: {
        type: String,
        require: true
    }

}, { timestamps: true });


const Doctor = mongoose.model('doctor', doctorSchema);

module.exports = Doctor;