import express, {Request, Response } from 'express';

import { WorkOrderService } from '../services/WorkOrderService';
import { WorkOrderDTO } from '../dtos/WorkOrderDTO';
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
            priorityType, description, dueDate, priceEstimate, user.id);

        const workOrderDTO : WorkOrderDTO = new WorkOrderDTO(workOrder.sectorType.type, 
            workOrder.workOrderType.type, workOrder.title, workOrder.cause, 
            workOrder.serviceNeeded,  workOrder.description, workOrder.priorityType.type, 
            workOrder.dueDate, workOrder.createdDate, workOrder.createdByUserId, 
            workOrder.lastModifiedDate, workOrder.lastModifiedByUserId, workOrder.dateCompleted, 
            workOrder.priceEstimate, workOrder.actualCost, workOrder.id);
        return res.status(200).json(workOrderDTO);
    } catch (err) {
        return handleError(err, res);
    }
})

propertyWorkOrdersController.get('/', auth, async(req: Request, res: Response) => {
    try {
        const workOrders = await workOrderService
            .getWorkOrdersByPropertyId(Number(req.params.propertyId));
        
        var workOrderDTOs : WorkOrderDTO[] = [];
        workOrders.map((workOrder) => {
            workOrderDTOs.push(new WorkOrderDTO(workOrder.sectorType.type, 
                workOrder.workOrderType.type, workOrder.title, workOrder.cause, 
                workOrder.serviceNeeded,  workOrder.description, workOrder.priorityType.type, 
                workOrder.dueDate, workOrder.createdDate, workOrder.createdByUserId, 
                workOrder.lastModifiedDate, workOrder.lastModifiedByUserId, workOrder.dateCompleted, 
                workOrder.priceEstimate, workOrder.actualCost, workOrder.id));
        });
        return res.status(200).json(workOrderDTOs);
    } catch (err) {
        return handleError(err, res);
    } 
})

export { propertyWorkOrdersController };
