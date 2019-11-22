import express, {Request, Response} from 'express';
import { WorkOrderService } from '../services/WorkOrderService';
import { WorkOrderMapper } from '../entity_mappers/WorkOrderMapper';
import auth from '../middleware/auth';
import handleError from '../utils/HttpUtils';

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
