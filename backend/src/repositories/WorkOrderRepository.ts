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


    async getWorkOrders(queries: any) {
        let ordering;
        let workOrderSort = null;

        let workOrderSortMapper = new Map();
        workOrderSortMapper.set("id", "work_orders.id")
        workOrderSortMapper.set("dueDate", "work_orders.dueDate")
        workOrderSortMapper.set("createdDate", "work_orders.createdDate")
        workOrderSortMapper.set("priceEstimate", "work_orders.priceEstimate")

        workOrderSort = workOrderSortMapper.get(queries.sortBy)
        if (queries.ordering == "ASC") {
            ordering = OrderingByType.ASC
        } else if (queries.ordering == "DESC") {
            ordering = OrderingByType.DESC
        }
        var filterQueries = "";
        var filterQueriesFirst = false;
        if (queries.id) {
            filterQueries += "work_orders.id = " + queries.id
            filterQueriesFirst = true;
        }
        if (queries.propertyId) {
            if (!filterQueriesFirst) {
                filterQueries += "work_orders.propertyId = " + queries.propertyId
                filterQueriesFirst = true;
            } else {
                filterQueries += "&& work_orders.propertyId = " + queries.propertyId
            }
        }
        if (queries.workOrderType) {
            if (!filterQueriesFirst) {
                filterQueries += "work_orders.workOrderType = " + queries.workOrderType
                filterQueriesFirst = true
            } else {
                filterQueries += "&& work_orders.workOrderType = " + queries.workOrderType
            }
        }
        if (queries.serviceNeeded) {
            if (!filterQueriesFirst) {
                filterQueries += "work_orders.serviceNeeded = " + queries.serviceNeeded
                filterQueriesFirst = true
            } else {
                filterQueries += "&& work_orders.serviceNeeded = " + queries.serviceNeeded
            }
        }
        if (queries.priorityType) {
            if (!filterQueriesFirst) {
                filterQueries += "work_orders.priorityType = " + queries.priorityType
                filterQueriesFirst = true
            } else {
                filterQueries += "&& work_orders.priorityType = " + queries.priorityType
            }
        }
        if (queries.priceEstimate) {
            if (!filterQueriesFirst) {
                filterQueries += "work_orders.priceEstimate = " + queries.priceEstimate
                filterQueriesFirst = true
            } else {
                filterQueries += "&& work_orders.priceEstimate = " + queries.priceEstimate
            }
        }
        if(queries.greaterThan){
            if (!filterQueriesFirst) {
                filterQueries += "work_orders."+queries.greaterThan+" > " + queries.greaterThanValue
                filterQueriesFirst = true
            } else {
                filterQueries += "&& work_orders."+queries.greaterThan+" > " + queries.greaterThanValue
            }
        }
        if(queries.lowerThan){
            if (!filterQueriesFirst) {
                filterQueries += "work_orders."+queries.lowerThan+" < " + queries.lowerThanValue
                filterQueriesFirst = true
            } else {
                filterQueries += "&& work_orders."+queries.lowerThan+" < " + queries.lowerThanValue
            }
        }

        if (queries.searchTerm == null) {
            const workorders = await this.getRepositoryConnection(WorkOrder)
                .createQueryBuilder("work_orders")
                .where(filterQueries)
                .orderBy(workOrderSort, ordering)
                .skip(queries.pageSize * (queries.pageNumber - 1))
                .take(queries.pageSize)
                .getMany();
            return workorders;
        } else if (queries.searchTerm != null) {
            const workorders = await this.getRepositoryConnection(WorkOrder)
                .createQueryBuilder("work_orders")
                .where(filterQueries)
                .andWhere("concat(cause, title, description) like :searchTerm", {searchTerm: '%' + queries.searchTerm + '%'})
                .orderBy(workOrderSort, ordering)
                .skip(queries.pageSize * (queries.pageNumber - 1))
                .take(queries.pageSize)
                .getMany();
            return workorders;
        }
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
