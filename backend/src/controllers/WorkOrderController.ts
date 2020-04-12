import express, { Request, Response } from 'express';
import { WorkOrderService } from '../services/WorkOrderService';
import { WorkOrderMapper } from '../entity_mappers/WorkOrderMapper';
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';
import { WorkOrderDTO } from 'src/dtos/WorkOrderDTO';
import { getNewLogger } from '../Log4jsConfig';

const workOrderController = express.Router();
const workOrderService = new WorkOrderService();
const workOrderMapper = new WorkOrderMapper();
const workOrderControllerLogger = getNewLogger('WorkOrderController');

workOrderController.get('/', auth, async(req: Request, res: Response) => {
    try {
        workOrderControllerLogger.debug(`Get work orders ${JSON.stringify(req.query)}`);
        const workOrders = await workOrderService.getWorkOrders(new Map(Object.entries(req.query)));
        const workOrderDTOs : WorkOrderDTO[] = [];
        workOrders.map((workOrder) => {
            workOrderDTOs.push(workOrderMapper.toDTO(workOrder));
        });
        return res.status(200).json(workOrderDTOs);
    } catch (err) {
        return handleError(err, res);
    }
});

workOrderController.get('/:id', auth, async(req: Request, res: Response) => {
    try {
        workOrderControllerLogger.debug(`Get work order ${req.params.id}`);
        const workOrder = await workOrderService.getWorkOrder(Number(req.params.id));
        return res.status(200).json(workOrderMapper.toDTO(workOrder));
    } catch (err) {
        return handleError(err, res);
    }
});

workOrderController.patch('/:id', auth, async(req: Request, res: Response) => {
    try {
        workOrderControllerLogger.debug(`Update work order ${req.params.id}`);
        const { decodedToken } = req.body;
        const workOrderDTO : WorkOrderDTO = req.body as WorkOrderDTO;
        await workOrderService.updateWorkOrderById(
            Number(req.params.id), workOrderMapper.fromDTO(workOrderDTO), decodedToken.userId);
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    }
});

export { workOrderController };
