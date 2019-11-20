import express, {Request, Response } from 'express';

import WorkOrderService from '../services/WorkOrderService';
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const propertyWorkOrdersController = express.Router({mergeParams: true});

const creationFields = ['sector', 'type', 'title', 'cause', 'service_needed', 
    'priority', 'description', 'due_date', 'price_estimate']

propertyWorkOrdersController.post('/', auth, validateBody(creationFields), async (req: Request, res: Response) => {
    try {
        const {sector, type, title, cause, service_needed, priority, 
            description, due_date, price_estimate } = req.body
        const workOrder = await WorkOrderService.createWorkOrder(req.params.propertyId, 
            sector, type, title, cause, service_needed, priority, description, due_date, price_estimate);
        return res.status(200).json({ workOrder });
    } catch (err) {
        return handleError(err, res);
    }
})

propertyWorkOrdersController.get('/', auth, async(req: Request, res: Response) => {
    try {
        const workOrders = await WorkOrderService.getWorkOrdersByPropertyId(req.params.propertyId);
        return res.status(200).json(workOrders);
    } catch (err) {
        return handleError(err, res);
    } 
})

export {propertyWorkOrdersController };
