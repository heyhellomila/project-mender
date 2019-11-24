import { WorkOrder } from '../entities/WorkOrder';
import { WorkOrderType } from '../entities/WorkOrderType';
import { SectorType } from '../entities/SectorType';
import { PriorityType } from '../entities/PriorityType';
import { Property } from '../entities/Property';
import { User } from '../entities/User';
import { BaseRepository } from './BaseRepository';

class WorkOrderRepository extends BaseRepository<WorkOrder> {

    async getWorkOrderById(id: number) {
        const workorder = await this.getRepositoryConnection(WorkOrder).findOne({id: id});
        return workorder;
    }

    async getWorkOrdersByProperty(property: Property) {
        const workOrders = await this.getRepositoryConnection(WorkOrder).find({property: property});
        return workOrders;
    }


    async createWorkOrder(propertyId: number, sectorType: SectorType, workOrderType: WorkOrderType, 
        title: string, cause: string, serviceNeeded: boolean, priorityType: PriorityType, 
        description: string, dueDate: Date, priceEstimate: number, createdByUserId: number) {

        const workOrder = new WorkOrder();
        workOrder.propertyId = propertyId;
        workOrder.sectorType = sectorType;
        workOrder.workOrderType = workOrderType;
        workOrder.title = title;
        workOrder.cause = cause;
        workOrder.serviceNeeded = serviceNeeded;
        workOrder.priorityType = priorityType;
        workOrder.description = description;
        workOrder.dueDate = dueDate;
        workOrder.priceEstimate = priceEstimate;
        workOrder.createdByUserId = createdByUserId;
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