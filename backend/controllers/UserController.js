const express = require('express');
const User = require('../models/User');

const userController = express.Router();

// register API
userController.put('/', async (req, res) => {
    console.log(req.body);
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        type: req.body.type
    });
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch(err) {
        res.status(400).json({ message: err})
    }
    
});

module.exports = userController;