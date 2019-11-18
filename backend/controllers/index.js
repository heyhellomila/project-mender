const express = require('express');

const shoppingItemControllerRoute = require('./ShoppingItemController');
const workOrderShoppingItemRoute = require('./WorkOrderShoppingItemController');
const userControllerRoute = require('./UserController');
const userPropertiesControllerRoute = require('./UserPropertiesController');
const propertyControllerRoute = require('./PropertyController');
const propertyWorkOrdersControllerRoute = require('./PropertyWorkOrdersController');
const workOrderControllerRoute = require('./WorkOrderController');
const router = express.Router();

router.use('/api/users', userControllerRoute);
router.use('/api/users/:userId/properties', userPropertiesControllerRoute)
router.use('/api/properties', propertyControllerRoute);
router.use('/api/workOrders', workOrderControllerRoute);
router.use('/api/properties/:propertyId/workorders', propertyWorkOrdersControllerRoute);
router.use('/api/workOrders/:workOrderId/shoppingItems', workOrderShoppingItemRoute);
router.use('/api/shoppingItems', shoppingItemControllerRoute);


module.exports = router;
