import { WorkOrder } from '../entities/WorkOrder';
import { Property } from '../entities/Property';
import { BaseRepository } from './BaseRepository';
import { FindOptions } from 'typeorm';
import { OrderingByType } from '../enums/OrderingByType';

class WorkOrderRepository extends BaseRepository<WorkOrder> {

    async getWorkOrderById(id: number, fieldOptions?: FindOptions<WorkOrder>) {
        return await this.getRepositoryConnection(WorkOrder).findOne(id, fieldOptions);
    }

    async getWorkOrders(filterQueries: string, pageNumber: number, pageSize: number,
                        searchTerm: string, workOrderSort: string, ordering: OrderingByType) {
        return await this.getRepositoryConnection(WorkOrder)
            .createQueryBuilder('work_orders')
            .addSelect(['properties.id', 'createdBy.id', 'lastModifiedBy.id'])
            .leftJoinAndSelect('work_orders.sector', 'sector')
            .leftJoinAndSelect('work_orders.priorityType', 'priorityType')
            .leftJoin('work_orders.property', 'properties')
            .leftJoin('work_orders.createdBy', 'createdBy')
            .leftJoinAndSelect('work_orders.workOrderType', 'workOrderType')
            .leftJoin('work_orders.lastModifiedBy', 'lastModifiedBy')
            .leftJoinAndSelect('work_orders.workOrderStatus', 'workOrderStatus')
            .where(filterQueries)
            .andWhere(searchTerm != null  ? 'concat(cause, title, location, notification) like :searchTerm' : '1=1', { searchTerm: '%' + searchTerm + '%' })
            .orderBy(workOrderSort, ordering)
            .skip(pageSize * (pageNumber - 1))
            .take(pageSize)
            .getMany();
    }

    async getWorkOrdersByProperty(property: Property, fieldOptions?: FindOptions<WorkOrder>) {
        let finalFieldOptions = fieldOptions;
        finalFieldOptions
            ? finalFieldOptions.where = { property }
            : finalFieldOptions = { where: { property } };
        return await this.getRepositoryConnection(WorkOrder).find(finalFieldOptions);
    }

    async createWorkOrder(workOrder: WorkOrder) {
        return await this.getRepositoryConnection(WorkOrder).save(workOrder);
    }

    async updateWorkOrderById(id: number, workOrder: WorkOrder) {
        await this.getRepositoryConnection(WorkOrder).update({ id }, workOrder);
    }
}

export { WorkOrderRepository };
