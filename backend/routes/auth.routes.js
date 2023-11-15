module.exports = app => {
    const auth = require("../controllers/auth.controller.js");

    const passport = require('passport');

    const User = require('../models/user.model.js');

    const router = require("express").Router();

    require('../passport.js');

    router.post("/register", auth.register);

    router.post("/login", auth.signin);
    
    router.get("/login/failed", (req, res) => {
            res.status(401).json({
                error: true,
                message: "Log in failure",
            });
          });
      
    router.get('/google', passport.authenticate('google',{
        scope: ["profile", "email"]}
        ));
      
    router.get(
            "/google/callback",
            passport.authenticate('google', {
                prompt: 'select_account',
                successRedirect: process.env.CLIENT_URL,
                failureRedirect: "auth/login/failed",
            }),
          );
    app.use('/auth', router);
};
  