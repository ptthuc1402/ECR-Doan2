const Doctor = require("../models/doctor.model");

exports.store = async function (req, res) {

    try {
      
        console.log(req.body) ;
        const request = req.body; 
        const doctor = await Doctor.findOne({ email : request.email }); 
        const doctor_id = doctor.id
        if(doctor){
            console.log('pass')
            const doctor = await Doctor.findByIdAndUpdate(doctor_id, request);
            console.log(doctor)
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