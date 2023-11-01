const User = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
// Create and Save a new Tutorial
const validateSignUp = (email, password, confirmPassword) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    console.log(regex.test(email))
    console.log(password.length > 3)
    console.log( password === confirmPassword)
    if(regex.test(email) == true && password.length > 3 && password === confirmPassword) return {status: true, mark: 0};
    return {status: false, mark: (password.length < 4 && !regex.test(email)) ? 'both' :
    (password.length < 4 ? 'password' : !regex.test(email) ? 'email' : 'confirmPassword')};
}
const validateSignIn = (email, password) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(regex.test(email) == true && password.length > 3) return {status: true, mark: 0};
    return {status: false, mark: (password.length < 4 && !regex.test(email)) ? 'both' : (password.length < 4 ? 'password' : 'email')};
}
exports.register = async function (req, res) {
    const {name, email, password, firstName, lastName, confirmPassword } = req.body;
    console.log(req.body);
    let message = {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    };
    const validate = validateSignUp(email, password, confirmPassword);
    var status =false;
    console.log(validate);
    try {
        
            if(!validate.status) {
                validate.mark == 'both' ? message = {email: NOTIFICATION.EMAIL_FORMAT, password: NOTIFICATION.PASSWORD_LENGTH} :
                validate.mark == 'password' ? message.password = NOTIFICATION.PASSWORD_LENGTH :
                validate.mark == 'email' ? message.email = NOTIFICATION.EMAIL_FORMAT : message.confirmPassword = NOTIFICATION.PASSWORD_CONFIRM;
                return res.status(400).json({ status});
            }else{
                const oldUser = await User.findOne({ email }).then((result) => console.log(result));

                if (oldUser) return res.status(400).json({ message: "Email ton tai" });

                const hashedPassword = await bcrypt.hash(password, 12);

                const user = await User.create({ email, password: hashedPassword, name: name });
                console.log(user);
            
                status = true;
                console.log(status);
                res.status(201).json({ status });
            }
     
         } catch (error) {
        res.status(500).json({ message: "" });

        console.log(error);
    }
};
exports.signin = async function (req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    let message = {
        email: '',
        password: ''
    };
    const validate = validateSignIn(email, password);
    console.log(validate);
    try {
       
      
            if(!validate.status) {
                validate.mark == 'both' ? message = {email: "Sai định dạng", password: "Sai định dạng"} :
                validate.mark == 'password' ? message.password = "Sai định dạng" : message.email = "Sai định dạng";
                console.log('wrong2')
                // return res.status(400).json({ message: message})
            }
            else{
                const oldUser = await User.findOne({ email });
                
                // if (oldUser.hasOwnProperty('googleId')) return res.status(405).json({ message: "This email was used by Google login" });

                if (!oldUser) return res.status(404).json({ message: {noti: "Không tồn tại"} });

                const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

                if (!isPasswordCorrect) return res.status(400).json({ message: {noti: "Sai tài khoản hoặc mật khẩu"} });

              
                console.log('ok')
                res.status(200).json({  });
            }
    } catch (err) {
        res.status(500).json({ message: {noti: "Something went wrong!"} });
    }
}

