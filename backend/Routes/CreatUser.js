const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator'); //obtain from installed express-validator

const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret="HloThisIsMySiteForMernFoodApp$#"

router.post("/creatuser",[
    // must be an email
    body('email').isEmail(),
    // name must be at least 5 chars long
    body('name').isLength({ min: 5 }),
    // password must be at least 5 chars long
    body('password','Incorrect Password').isLength({ min: 5 })], 
    async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: secPassword
        })
        .then(res.json({ success: true }));
    } catch (error) {
        console.log(error)
        res.json({ success: false });
    }
})

router.post("/loginuser",[
    // must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password','Incorrect Password').isLength({ min: 5 })], 
    async (req, res) => {
        
       let email=req.body.email;
       const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    try {
        let userData=await User.findOne({email:email});
        if(!userData)
            {
                res.status(400).json({ errors: "try logging with correct value 1" })
            }

            const pwdCompare = await bcrypt.compare(req.body.password,userData.password);

        if(!pwdCompare)
            {
                res.status(400).json({ errors: "try logging with correct value" })
            }
        const data = {
            user:{
                id:userData.id
            }
        }

        const authToken=jwt.sign(data,jwtSecret)
       return res.json({success:true,authToken:authToken});
    } catch (error) {
        console.log(error)
        res.json({ success: false });
    }
})

module.exports = router;