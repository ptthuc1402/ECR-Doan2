const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./models/user.model');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            includeGrantedScopes: true,
            scope: ["profile", "email"],
            prompt: 'select_account',
        },
        function (accessToken, refreshToken, params, profile, done) {

            // Check if google profile exist.
            // const idToken = params.id_token;
            if (profile.id) {
                User.findOne({ googleId: profile.id })
                    .then((existingUser) => {
                        if (existingUser) {
                            User.findOneAndUpdate({ googleId: profile.id },
                                {
                                    $set: {
                                        accessToken: accessToken, idToken: params.id_token, picture: profile._json.picture,
                                    }
                                }).then();
                            return done(null, profile);
                        } else {
                            new User({
                                googleId: profile.id,
                                email: profile.emails[0].value,
                                name: profile.name.familyName + ' ' + profile.name.givenName,
                                accessToken: accessToken,
                                idToken: params.id_token,
                                picture: profile._json.picture,
                                role_id: '2'
                            }).save();
                            return done(null, profile);
                        }
                    })
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});