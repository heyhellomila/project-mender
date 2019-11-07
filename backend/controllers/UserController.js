const express = require('express');
const UserService = require('../services/UserService');
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const userController = express.Router();
const userService = new UserService();

const loginFields = ['email', 'password']
const registerFields = ['email', 'password', 'firstName', 'lastName', 'type']

// register API
userController.put('/', validateBody(registerFields), async (req, res) => {
    try {
        const user = await userService.register(req.body.email, req.body.password, 
            req.body.firstName, req.body.lastName, req.body.type);
        return res.status(200).json(user);
    } catch (err) {
        return handleError(err, res);
    }
})

userController.post('/login', validateBody(loginFields), async (req, res) => {
    try {
        const token = await userService.login(req.body.email, req.body.password);
        return res.status(200).json({ token });
    } catch (err) {
        return handleError(err, res);
    }
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
