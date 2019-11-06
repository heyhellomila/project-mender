const express = require('express');
const WorkOrder = require('../models/WorkOrder');
const WorkOrderService = require('../services/WorkOrderService');
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const workOrderController = express.Router();
const workOrderService = new WorkOrderService();

const creationFields = ['user_id', 'sector', 'type', 'title', 'cause', 
    'service_needed', 'priority', 'description', 'property_id', 
    'due_date', 'date_completed', 'price_estimate', 'actual_cost']

workOrderController.post('/', auth, validateBody(creationFields), async (req, res) => {
    try {
        const token = await workOrderService.createWorkOrder(req.body.user_id, req.body.sector, 
            req.body.type, req.body.title, req.body.cause, req.body.service_needed, req.body.priority, 
            req.body.description, req.body.property_id, req.body.due_date, req.body.date_completed, 
            req.body.price_estimate, req.body.actual_cost);
        return res.status(200).json({ token });
    } catch (err) {
        return handleError(err, res);
    }
})

workOrderController.get('/:propertyId/workorders', auth, async(req, res) => {
    try {
        const user = await workOrderService.getPropertyWorkOrders(req.params.propertyId);
        return res.status(200).json(user);
    } catch (err) {
        return handleError(err, res);
    } 
})

workOrderController.get('/:id', auth, async(req, res) => {
    try {
        const user = await workOrderService.getWorkOrder(req.params.id);
        return res.status(200).json(user);
    } catch (err) {
        return handleError(err, res);
    } 
})