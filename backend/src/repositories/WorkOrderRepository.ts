import { WorkOrder } from '../entities/WorkOrder';
import { WorkOrderType } from '../entities/WorkOrderType';
import { SectorType } from '../entities/SectorType';
import { PriorityType } from '../entities/PriorityType';
import { Property } from '../entities/Property';
import { BaseRepository } from './BaseRepository';
import { WorkOrderFields } from './FindOptionsFields';
import { FindOptions } from 'typeorm';
import { User } from '../entities/User';

class WorkOrderRepository extends BaseRepository<WorkOrder> {

    async getWorkOrderById(id: number, fieldOptions?: FindOptions<WorkOrder>) {
        const workorder = await this.getRepositoryConnection(WorkOrder).findOne(id, fieldOptions);
        return workorder;
    }

    async getWorkOrdersByProperty(property: Property, fieldOptions?: FindOptions<WorkOrder>) {
        fieldOptions 
            ? fieldOptions.where = { property: property }
            : fieldOptions = { where: {property: property} };
        const workOrders = await this.getRepositoryConnection(WorkOrder).find(fieldOptions);
        return workOrders;
    }


    async createWorkOrder(property: Property, sectorType: SectorType, workOrderType: WorkOrderType, 
        title: string, cause: string, serviceNeeded: boolean, priorityType: PriorityType, 
        description: string, dueDate: Date, priceEstimate: number, createdBy: User) {

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
            const savedWorkOrder : WorkOrder = await this.getRepositoryConnection(
                WorkOrder).save(workOrder);
            return savedWorkOrder;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { WorkOrderRepository };
