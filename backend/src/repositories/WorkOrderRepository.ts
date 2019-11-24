import {WorkOrder} from '../entities/WorkOrder';
import {WorkOrderType} from '../entities/WorkOrderType';
import {SectorType} from '../entities/SectorType';
import {PriorityType} from '../entities/PriorityType';
import {OrderingByType} from '../enums/OrderingByType';
import {Property} from '../entities/Property';
import {User} from '../entities/User';
import {BaseRepository} from './BaseRepository';
import enumerate = Reflect.enumerate;
import set = Reflect.set;

class WorkOrderRepository extends BaseRepository<WorkOrder> {


    async getWorkOrders(queries: any) {
        let ordering;
        let filterByQueries = null;
        let filterParameterQueries = null;
        let workOrderSort = null;

        let filterByMapper = new Map();
        filterByMapper.set("sectorType", "work_orders.sectorType = :sectorType")
        filterByMapper.set("propertyId", "work_orders.propertyId = :propertyId")
        filterByMapper.set("workOrderType", "work_orders.workOrderType = :workOrderType")
        filterByMapper.set("serviceNeeded", "work_orders.serviceNeeded = :serviceNeeded")
        filterByMapper.set("priorityType", "work_orders.priorityType = :priorityType")

        let filterParameterMapper = new Map();
        filterParameterMapper.set("sectorType", {sectorType: queries.filterParameter})
        filterParameterMapper.set("propertyId", {propertyId: queries.filterParameter})
        filterParameterMapper.set("workOrderType", {workOrderType: queries.filterParameter})
        filterParameterMapper.set("serviceNeeded", {serviceNeeded: queries.filterParameter})
        filterParameterMapper.set("priorityType", {priorityType: queries.filterParameter})

        let workOrderSortMapper = new Map();
        workOrderSortMapper.set("id", "work_orders.id")
        workOrderSortMapper.set("dueDate", "work_orders.dueDate")
        workOrderSortMapper.set("createdDate", "work_orders.createdDate")
        workOrderSortMapper.set("priceEstimate", "work_orders.priceEstimate")

        if (queries.ordering == "ASC") {
            ordering = OrderingByType.ASC
        } else if (queries.ordering == "DESC") {
            ordering = OrderingByType.DESC
        }
        
        filterByQueries = filterByMapper.get(queries.filterBy)
        filterParameterQueries = filterParameterMapper.get(queries.filterBy)
        workOrderSort = workOrderSortMapper.get(queries.sortBy)

        if (queries.searchTerm == null) {
            if (filterByQueries == null && workOrderSort == null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .getMany();
                return workorders;
            } else if (filterByQueries != null && workOrderSort == null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .where(filterByQueries)
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .setParameters(filterParameterQueries)
                    .getMany();
                return workorders;
            } else if (filterByQueries == null && workOrderSort != null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .orderBy(workOrderSort, ordering)
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .getMany();
                return workorders;
            } else if (filterByQueries != null && workOrderSort != null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .where(filterByQueries)
                    .orderBy(workOrderSort, ordering)
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .setParameters(filterParameterQueries)
                    .getMany();
                return workorders;
            }
        } else if (queries.searchTerm != null) {
            if (filterByQueries == null && workOrderSort == null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .where("concat(cause, title, description) like :searchTerm", {searchTerm: '%' + queries.searchTerm + '%'})
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .getMany();
                return workorders;
            } else if (filterByQueries != null && workOrderSort == null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .where(filterByQueries)
                    .andWhere("concat(cause, title, description) like :searchTerm", {searchTerm: '%' + queries.searchTerm + '%'})
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .setParameters(filterParameterQueries)
                    .getMany();
                return workorders;
            } else if (filterByQueries == null && workOrderSort != null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .where("concat(cause, title, description) like :searchTerm", {searchTerm: '%' + queries.searchTerm + '%'})
                    .orderBy(workOrderSort, ordering)
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .getMany();
                return workorders;
            } else if (filterByQueries != null && workOrderSort != null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .where(filterByQueries)
                    .andWhere("concat(cause, title, description) like :searchTerm", {searchTerm: '%' + queries.searchTerm + '%'})
                    .orderBy(workOrderSort, ordering)
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .setParameters(filterParameterQueries)
                    .getMany();
                return workorders;
            }
        }
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
            const savedWorkOrder: WorkOrder = await this.getRepositoryConnection(
                WorkOrder).save(workOrder);
            return savedWorkOrder;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export {WorkOrderRepository};
