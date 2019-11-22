import express, {Request, Response} from 'express';

import { WorkOrderService } from '../services/WorkOrderService';
import { WorkOrderDTO } from '../dtos/WorkOrderDTO';
import { WorkOrderMapper } from '../entity_mappers/WorkOrderMapper';
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');

const workOrderService = new WorkOrderService();
const workOrderMapper = new WorkOrderMapper();

const workOrderController = express.Router();

workOrderController.get('/:id', auth, async(req: Request, res: Response) => {
    try {
        const workOrder = await workOrderService.getWorkOrder(Number(req.params.id));
        return res.status(200).json(workOrderMapper.toDTO(workOrder));
    } catch (err) {
        return handleError(err, res);
    } 
})

export {workOrderController};
