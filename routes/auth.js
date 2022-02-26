const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
let nodemailer = require('nodemailer');


const JWT_SECRET = "Yashisagoodboy";
let otp;

//Create a User using: POST "/api/auth/createuser". No login require
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('phone', 'Enter a valid phone').isLength({ min: 10 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Check wether the user with this email exist already
    let success = false;
    try {

        // let user = await User.findOne({ email: req.body.email });
        let user = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });
        if (user) {
            success = false;
            return res.status(400).json({ success, error: "Sorry a user with this email or phone already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        // res.json(user);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

//Authenticate a user using: POST "/api/auth/login". No login require

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    //If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Check wether the user with this email exist already
    try {
        let success = false;
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please login with correct credentials" })

        }


        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        // res.json(user);
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})


//ROUTE 3:Get logged in user details using: POST "/api/auth/getuser". Login required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }


})


//ROUTE 4: reset password using POST "/api/auth/resetpass". 


router.post('/sendotp', async (req, res) => {

    let success = false;
    try {
        // let user = await User.findOne({ email: req.body.email });
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Sorry no account is associated with this email." })
        }

        otp = Math.floor((Math.random() * 199999) + 100001);

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vorayash0716@gmail.com',
                pass: 'Yash@12345'
            }
        });

        let mailOptions = {
            from: 'vorayash0716@gmail.com',
            to: req.body.email,
            subject: 'iNotes Password Request Otp',
            text: `Your one time password is ${otp}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        success = true;
        res.json({ success, message:`OTP sent to ${req.body.email} successfully.` });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }


})
console.log(otp);
router.post('/resetpass', async (req, res) => {

    let success = false;
    console.log(otp);
    try {
        if (req.body.otp != otp) {
            success = false;
            res.json({ error: "Please Enter Correct Otp.", success });
        }
        // let user = await User.findOne({ email: req.body.email });        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        password = await User.findOneAndUpdate({ email: req.body.email }, { password: secPass })
        success = true;
        res.json({ message:`Password successfully updated for ${req.body.email}.`, success });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error });
    }


})


module.exports = router