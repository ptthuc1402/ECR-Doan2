const Appoint = require("../models/appoint.model");

exports.store = async function (req, res) {
    const { name, email, birth, phone, address, sex, spec, date, time, sym } = req.body;    
    const appoint = await Appoint.create({ name, email, birth, phone, address, sex, spec, date, time, sym });
}