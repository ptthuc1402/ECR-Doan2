const Doctor = require("../models/doctor.model");

exports.store = async function (req, res) {
    const { name, email, birth, phone, address, sex, spec } = req.body;    
    const doctor = await Doctor.create({ name, email, birth, phone, address, sex, spec });
    res.status(200);
}