const User = require("../models/user.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = process.env.SECRET_KEY

// Create and Save a new users

// validate signUp
const validateSignUp = (email, password, confirmPassword) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(regex.test(email) == true && password.length > 3 && password === confirmPassword) return {status: true, mark: 0};
    return {status: false, mark: (password.length < 4 && !regex.test(email)) ? 'both' :
    (password.length < 4 ? 'password' : !regex.test(email) ? 'email' : 'confirmPassword')};
}

// validate signIn
const validateSignIn = (email, password) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(regex.test(email) == true && password.length > 3) return {status: true, mark: 0};
    return {status: false, mark: (password.length < 4 && !regex.test(email)) ? 'both' : (password.length < 4 ? 'password' : 'email')};
}

// create new users
exports.register = async function (req, res) {
    const {name, email, password, confirmPassword } = req.body;
    let message = {
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    };
    const validate = validateSignUp(email, password, confirmPassword);
    var status =false;
    try {
        
            if(!validate.status) {
                validate.mark == 'both' ? message = {email: "Failed", password:"Failed"} :
                validate.mark == 'password' ? message.password ="Failed":
                validate.mark == 'email' ? message.email = "Failed" : message.confirmPassword = "Failed";
                return res.status(400).json({ status});
            }else{
                
                const oldUser = await User.find({ email: email })

                if (oldUser.length !==0) {
                    return res.status(400).json({ message: "Email ton tai" });
                }
                const hashedPassword = await bcrypt.hash(password, 12);

                // create users and token to login
                const user = await User.create({ email, password: hashedPassword, name: name, role_id:2});
                const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "3h" });
                const role_id = user.role_id;
                
                status = true;
                res.status(201).json({ status,token,role_id });
            }
     
         } catch (error) {
        res.status(500).json({ message: "" });
        console.log(error);
    }
};

// authen users
exports.signin = async function (req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    let message = {
        email: '',
        password: ''
    };
    const validate = validateSignIn(email, password);
    // console.log(validate)
    var status =false;
    try {
            if(!validate.status) {
                validate.mark == 'both' ? message = {email: "Sai định dạng", password: "Sai định dạng"} :
                validate.mark == 'password' ? message.password = "Sai định dạng" : message.email = "Sai định dạng";
                return res.status(400).json({ message: message})
            }
            else{
                
                const oldUser = await User.findOne({ email });

                if (!oldUser) return res.status(404).json({ message: {noti: "Không tồn tại"} });

                const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

                if (!isPasswordCorrect) return res.status(400).json({ message: {noti: "Sai tài khoản hoặc mật khẩu"} });

                
                const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "3h" });
              
                const role_id = oldUser.role_id;

                var status =true;
                res.status(200).json({ status,token,role_id});
            }
    } catch (err) {
        res.status(500).json({ message: {noti: "Something went wrong!"} });
    }
}

