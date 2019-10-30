const express = require('express');

const userControllerRoute = require('./UserController');
const router = express.Router();

router.use('/users', userControllerRoute);

module.exports = router;
