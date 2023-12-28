const Doctor = require("../models/doctor.model");

exports.store = async function (req, res) {
    try {
        const request = req.body; 
        const doctor = await Doctor.findOne({ email : request.email }); 
        console.log(doctor);
        if(doctor){
            const doctor_id = doctor._id;
            const doctor = await Doctor.findByIdAndUpdate(doctor_id, request);
            res.status(200);
        }
        else{
            await Doctor.create(request);
            res.status(200);
        } 
    } catch (err) {
        res.status(500).json({ message: {noti: "Something went wrong!"} });
    }
}
exports.index = async function (req, res) {

    const doctors = await Doctor.find({});
    res.status(200).json({ doctors });
}