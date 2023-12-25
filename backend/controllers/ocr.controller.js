const Patient = require("../models/patient.model.js");


// Create and Save a new users

// create new users
exports.store = async function (req, res) {
    //title
  
    try {
        const request = req.body.patients;
        console.log(request);
        const patient_id = req.body.patients.patient_id
        const oldPatient = await Patient.findOne({ patient_id : patient_id });  
        if(oldPatient){
            const date_to_hos = oldPatient.date_to_hos; 
            const patient = await Patient.findByIdAndUpdate(oldPatient._id,request);
            console.log(patient);
            res.status(200).json({date_to_hos});

        }
        else{
            const patient = await Patient.create(request);
        }
       

    } catch (err) {
        res.status(500).json({ message: {noti: "Something went wrong!"} });
    }
};
