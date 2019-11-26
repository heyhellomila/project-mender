import { WorkOrder } from '../entities/WorkOrder';
import { WorkOrderType } from '../entities/WorkOrderType';
import { SectorType } from '../entities/SectorType';
import { PriorityType } from '../entities/PriorityType';
import { Property } from '../entities/Property';
import { BaseRepository } from './BaseRepository';
import { WorkOrderFields } from '../constants/FindOptionsFields';
import { FindOptions } from 'typeorm';
import { User } from '../entities/User';
import {OrderingByType} from '../enums/OrderingByType';

import enumerate = Reflect.enumerate;
import set = Reflect.set;

class WorkOrderRepository extends BaseRepository<WorkOrder> {

    async getWorkOrderById(id: number, fieldOptions?: FindOptions<WorkOrder>) {
        const workorder = await this.getRepositoryConnection(WorkOrder).findOne(id, fieldOptions);
        return workorder;
    }

    async getWorkOrders(filterQueries: string, queryMap: Map<string, string>, workOrderSort: string, ordering: OrderingByType) {

        const workorders = await this.getRepositoryConnection(WorkOrder)
            .createQueryBuilder("work_orders")
            .addSelect(["properties.id", "createdBy.id", "lastModifiedBy.id"])
            .leftJoinAndSelect("work_orders.sectorType", "sectorType")
            .leftJoinAndSelect("work_orders.priorityType", "priorityType")
            .leftJoin("work_orders.property", "properties",)
            .leftJoin("work_orders.createdBy", "createdBy")
            .leftJoinAndSelect("work_orders.workOrderType", "workOrderType")
            .leftJoin("work_orders.lastModifiedBy", "lastModifiedBy")
            .where(filterQueries)
            .andWhere(queryMap.get("searchTerm") !=null  ? "concat(cause, title, description) like :searchTerm" : '1=1',{searchTerm: '%' + queryMap.get("searchTerm") + '%'})
            .orderBy(workOrderSort, ordering)
            .skip(parseInt(queryMap.get("pageSize")) * (parseInt(queryMap.get("pageNumber")) - 1))
            .take(parseInt(queryMap.get("pageSize")))
            .getMany();
        return workorders;
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
