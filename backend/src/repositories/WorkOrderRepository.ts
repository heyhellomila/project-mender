import { WorkOrder } from '../entities/WorkOrder';
import { WorkOrderType } from '../entities/WorkOrderType';
import { SectorType } from '../entities/SectorType';
import { PriorityType } from '../entities/PriorityType';
import { Property } from '../entities/Property';
import { BaseRepository } from './BaseRepository';
import { WorkOrderFields } from '../constants/FindOptionsFields';
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


    async createWorkOrder(workOrder: WorkOrder) {
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
