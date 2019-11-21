import { WorkOrder } from '../entities/WorkOrder';
import { Connection, getConnection } from 'typeorm';
import { WorkOrderType } from '../entities/WorkOrderType';
import { SectorType } from '../entities/SectorType';
import { PriorityType } from '../entities/PriorityType';
import { Property } from '../entities/Property';
import { User } from '../entities/User';
import { isDate } from 'util';

class WorkOrderRepository {

    async getWorkOrderById(id: number) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(WorkOrder);
        const workorder = await repository.findOne({id: id});
        return workorder;
    }

    async getWorkOrdersByProperty(property: Property) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(WorkOrder);
        const workOrders = await repository.find({property: property});
        return workOrders;
    }


    async createWorkOrder(property: Property, sectorType: SectorType, workOrderType: WorkOrderType, 
        title: string, cause: string, serviceNeeded: boolean, priorityType: PriorityType, 
        description: string, dueDate: Date, priceEstimate: number, createdBy: User) {

        const connection : Connection = getConnection();
        const repository = connection.getRepository(WorkOrder);
        const workOrder = new WorkOrder();
        workOrder.property = property;
        workOrder.sectorType = sectorType;
        workOrder.workOrderType = workOrderType;
        workOrder.title = title;
        workOrder.cause = cause;
        workOrder.serviceNeeded = serviceNeeded;
        workOrder.priorityType = priorityType;
        workOrder.description = description;
        workOrder.dueDate = dueDate;
        workOrder.priceEstimate = priceEstimate;
        workOrder.createdBy = createdBy;
        try {
            return await repository.save(workOrder);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { WorkOrderRepository };
