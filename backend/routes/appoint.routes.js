module.exports = app => {
    const appoint = require("../controllers/appoinment.controller.js");
    const router = require("express").Router();
    router.post("/store", appoint.store);
    app.use('/appoint', router);
  };
  