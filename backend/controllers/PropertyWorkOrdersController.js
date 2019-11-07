const express = require('express');
const WorkOrderService = require('../services/WorkOrderService');
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const propertyWorkOrdersController = express.Router({mergeParams: true});
const workOrderService = new WorkOrderService();

const creationFields = ['sector', 'type', 'title', 'cause', 'service_needed', 
    'priority', 'description', 'due_date', 'price_estimate']

propertyWorkOrdersController.post('/', auth, validateBody(creationFields), async (req, res) => {
    try {
        const workOrder = await workOrderService.createWorkOrder(req.params.propertyId, 
            req.body.sector, req.body.type, req.body.title, req.body.cause, 
            req.body.service_needed, req.body.priority, req.body.description, 
            req.body.due_date, req.body.price_estimate);
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
