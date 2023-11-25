const Doctor = require("../models/doctor.model");

exports.store = async function (req, res) {

    console.log(req.body) ;
    const { name, email, birth, phone, address, sex, spec } = req.body;  
    const doctor = await Doctor.create({ name, email, birth, phone, address, sex, spec });
    res.status(200);
}
exports.index = async function (req, res) {

    const doctors = await Doctor.find({});
    res.status(200).json({ doctors });
}