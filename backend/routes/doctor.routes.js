module.exports = app => {
    const Doctor = require("../controllers/doctor.controller.js");
    const router = require("express").Router();
    router.post("/add_doctor", Doctor.store);
    app.use('/doctor', router);
  };
  