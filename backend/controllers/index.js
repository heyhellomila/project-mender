const express = require('express');

const userControllerRoute = require('./UserController');
const workOrderControllerRoute = require('./WorkOrderController')
const router = express.Router();

router.use('/api/users', userControllerRoute);
router.use('/api/properties/:propertyId/workorders', workOrderControllerRoute);

module.exports = router;
