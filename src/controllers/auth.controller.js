const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { sendRegistraionEmail } = require("../services/email.services");



/** 
*- POST /api/auth/register
*- Register a new user
*/
async function userRegisterController(req, res) {
    const { email, name, password } = req.body;
    const isExist=await userModel.findOne({email:email});
    if(isExist){
        return res.status(422).json({
            message:"Email already exists",
            status:"Failed"

        });
    }
    const user = await userModel.create({ email, name, password });

    const token = jwt.sign({userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });

    res.cookie("token",token);
    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name,
        },
        token
    })
    await sendRegistraionEmail(user.email, "Ledger App - Email Verification", "Please verify your email address by clicking the link below.", `<p>Please verify your email address by clicking the link below:</p><a href="http://localhost:3000/verify-email?token=${token}">Verify Email</a>`);

   
};

/** 
*- POST /api/auth/login
*- Login an existing user
*/
async function userLoginController(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({   
            message:"Invalid credentials",
            status:"Failed"
        });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({   
            message:"Invalid credentials",
            status:"Failed"
        });
    }
    const token = jwt.sign({userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
    res.cookie("token",token);
    res.status(200).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name,
        }
    })


   
};

module.exports ={
    userRegisterController,
    userLoginController
}