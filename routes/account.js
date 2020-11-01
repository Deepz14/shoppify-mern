const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {SECRET_KEY} = require('../config/keys');

router.post('/register', async(req, res) => {
    
    //check the user
    const checkUser = await User.findOne({email : req.body.email});

    if(checkUser)
        return res.status(403).json({status : "User is Already exists!"})

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try{

        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashPassword
        })

        const saveUser = await newUser.save();
        res.json({status : 'success'})
    }
    catch(err){
        res.status(401).json({status : 'failure'})
    }


})

router.post('/login', async(req, res) => {

    //check user
    const checkUser = await User.findOne({email : req.body.email})
    
    if(!checkUser)
        return res.status(404).json({status : 'Email or Password is incorrect'})

    //compare password
    const comparePassword = await bcrypt.compare(req.body.password, checkUser.password);

    if(!comparePassword)
        return res.status(403).json({status : 'Email or Password is incorrect'})


    const token = jwt.sign({id : checkUser._id}, SECRET_KEY)

    const {role} = checkUser;
    
    res.header('auth-token', token).json({status : 'success', token, role})

})


module.exports = router;