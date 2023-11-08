const mongoose = require('mongoose');

const { Schema } = mongoose;

// create table users
const appointSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    birth: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    sex: {
        type: String,
    },
    spec: {
        type: String,
    },
    date: {
        type: String,
    },
    time:
    {
        type: String,
    },
    sym:
    {
        type: String,
    },

}, { timestamps: true });


const Appoint = mongoose.model('appoint', appointSchema);

module.exports =Appoint;