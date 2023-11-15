const Patient = require("../models/patient.model.js");


// Create and Save a new users

// create new users
exports.store = async function (req, res) {
    //title
    const request = req.body.patients;
    console.log(request);
    const patient = await Patient.create(request);
};
