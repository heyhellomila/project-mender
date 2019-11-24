import express, {Request, Response} from 'express';
import { WorkOrderService } from '../services/WorkOrderService';
import { WorkOrderMapper } from '../entity_mappers/WorkOrderMapper';
import auth from '../middleware/auth';
import handleError from '../utils/HttpUtils';
import {WorkOrderDTO} from 'src/dtos/WorkOrderDTO';

const workOrderService = new WorkOrderService();
const workOrderMapper = new WorkOrderMapper();

const workOrderController = express.Router();

workOrderController.get('/', auth, async(req: Request, res: Response) => {

    try {
        const workOrders = await workOrderService.getWorkOrders(req.query);
        var workOrderDTOs : WorkOrderDTO[] = [];
        workOrders.map((workOrder) => {
            workOrderDTOs.push(workOrderMapper.toDTO(workOrder));
        });
        return res.status(200).json(workOrderDTOs);
    } catch (err) {
        return handleError(err, res);
    } 
})

export {workOrderController};
