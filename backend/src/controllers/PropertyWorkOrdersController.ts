import express, {Request, Response } from 'express';

import { WorkOrderService } from '../services/WorkOrderService';
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const propertyWorkOrdersController = express.Router({mergeParams: true});

const workOrderService = new WorkOrderService();

const creationFields = ['sectorType', 'workOrderType', 'title', 'cause', 'serviceNeeded', 
    'priorityType', 'description', 'dueDate', 'priceEstimate']

propertyWorkOrdersController.post('/', auth, validateBody(creationFields), async (req: Request, res: Response) => {
    try {
        const {sectorType, workOrderType, title, cause, serviceNeeded, priorityType, 
            description, dueDate, priceEstimate, user } = req.body;
        const workOrder = await workOrderService.createWorkOrder(Number(req.params.propertyId), 
            sectorType, workOrderType, title, cause, serviceNeeded, 
            priorityType, description, dueDate, priceEstimate, user);
        return res.status(200).json(workOrder);
    } catch (err) {
        return handleError(err, res);
    }
})

propertyWorkOrdersController.get('/', auth, async(req: Request, res: Response) => {
    try {
        const workOrders = await workOrderService
            .getWorkOrdersByPropertyId(Number(req.params.propertyId));
        return res.status(200).json(workOrders);
    } catch (err) {
        return handleError(err, res);
    } 
})

export { propertyWorkOrdersController };
