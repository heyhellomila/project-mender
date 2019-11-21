import express, {Request, Response} from 'express';

import { WorkOrderService } from '../services/WorkOrderService';
import { WorkOrderDTO } from '../dtos/WorkOrderDTO';
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');

const workOrderService = new WorkOrderService();

const workOrderController = express.Router();

workOrderController.get('/:id', auth, async(req: Request, res: Response) => {
    try {
        const workOrder = await workOrderService.getWorkOrder(Number(req.params.id));
        const workOrderDTO : WorkOrderDTO = new WorkOrderDTO(workOrder.sectorType.type, 
            workOrder.workOrderType.type, workOrder.title, workOrder.cause, 
            workOrder.serviceNeeded,  workOrder.description, workOrder.priorityType.type, 
            workOrder.dueDate, workOrder.createdDate, workOrder.createdByUserId, 
            workOrder.lastModifiedDate, workOrder.lastModifiedByUserId, workOrder.dateCompleted, 
            workOrder.priceEstimate, workOrder.actualCost, undefined, workOrder.propertyId);
        return res.status(200).json(workOrderDTO);
    } catch (err) {
        return handleError(err, res);
    } 
})

export {workOrderController};
