const express = require('express');
const WorkOrderService = require('../services/WorkOrderService');
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const propertyWorkOrdersController = express.Router({mergeParams: true});
const workOrderService = new WorkOrderService();

const creationFields = ['sector', 'type', 'title', 'cause', 'serviceNeeded', 
    'priority', 'description', 'dueDate', 'priceEstimate']

propertyWorkOrdersController.post('/', auth, validateBody(creationFields), async (req, res) => {
    try {
        const {sector, type, title, cause, serviceNeeded, priority, 
            description, dueDate, priceEstimate } = req.body
        const workOrder = await workOrderService.createWorkOrder(req.params.propertyId, 
            sector, type, title, cause, serviceNeeded, priority, description, dueDate, priceEstimate);
        return res.status(200).json({ workOrder });
    } catch (err) {
        return handleError(err, res);
    }
})

propertyWorkOrdersController.get('/', auth, async(req, res) => {
    try {
        const workOrders = await workOrderService.getWorkOrdersByPropertyId(req.params.propertyId);
        return res.status(200).json(workOrders);
    } catch (err) {
        return handleError(err, res);
    } 
})

module.exports = propertyWorkOrdersController;
