// server.js
require('dotenv').config();
var express = require('express');
var log = require('morgan')('dev');
var bodyParser = require('body-parser');
var cors = require('cors')
var properties = require('./config/properties');
var db = require('./config/database');
var cookieSession = require('cookie-session');
var app = express();
var bodyParserJSON = bodyParser.json();
var bodyParserURLEncoded = bodyParser.urlencoded({extended:true});
var router = express.Router();
const passport = require('passport');


var whitelist = properties.CORS;

app.use(cors(whitelist));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use(express.json()); 

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



db();
require("./routes/auth.routes")(app);
require("./routes/ocr.routes")(app);
require("./routes/patient.routes")(app);
require("./routes/appoint.routes")(app);



app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

const PORT = process.env.PORT || 8080;


// set port, listen for requests
app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT} port.`);
})
