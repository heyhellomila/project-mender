const express = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');

const userController = express.Router();
const userService = new UserService();

// register API
userController.put('/', async (req, res) => {
    try {
        const user = await userService.register(req.body.email, req.body.password, 
            req.body.firstName, req.body.lastName, req.body.type);
        return res.status(200).json(user);
    } catch (err) {
        return handleError(err, res);
    }
})

userController.post('/login', async (req, res) => {
    try {
        const token = await userService.login(req.body.email, req.body.password);
        return res.status(200).json({ token });
    } catch (err) {
        return handleError(err, res);
    }
})

userController.post('/logout', auth, async (req, res) => {
    return res.status(200).json({});
})

userController.get('/:id', auth, async(req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        return res.status(200).json(user);
    } catch (err) {
        return handleError(err, res);
    } 
})

module.exports = userController;