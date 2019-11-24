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
        let whereQueries = null;
        let workOrderSort = null;

        let queryMapper = new Map();
        queryMapper.set("sectorType", "work_orders.sectorType = :sectorType")
        queryMapper.set("propertyId", "work_orders.propertyId = :propertyId")
        queryMapper.set("workOrderType", "work_orders.workOrderType = :workOrderType")
        queryMapper.set("serviceNeeded", "work_orders.serviceNeeded = :serviceNeeded")
        queryMapper.set("priorityType", "work_orders.priorityType = :priorityType")

        let parameterMapper = new Map();
        parameterMapper.set("sectorType", {sectorType: queries.filterParameter})
        parameterMapper.set("propertyId", {propertyId: queries.filterParameter})
        parameterMapper.set("workOrderType", {workOrderType: queries.filterParameter})
        parameterMapper.set("serviceNeeded", {serviceNeeded: queries.filterParameter})
        parameterMapper.set("priorityType", {priorityType: queries.filterParameter})

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
        whereQueries = queryMapper.get(queries.filterBy)
        let parameterQueries = parameterMapper.get(queries.filterBy)
        workOrderSort = workOrderSortMapper.get(queries.sortBy)

        if (queries.searchTerm == null) {
            if (whereQueries == null && workOrderSort == null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .getMany();
                return workorders;
            } else if (whereQueries != null && workOrderSort == null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .where(whereQueries)
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .setParameters(parameterQueries)
                    .getMany();
                return workorders;
            } else if (whereQueries == null && workOrderSort != null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .orderBy(workOrderSort, ordering)
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .getMany();
                return workorders;
            } else if (whereQueries != null && workOrderSort != null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .where(whereQueries)
                    .orderBy(workOrderSort, ordering)
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .setParameters(parameterQueries)
                    .getMany();
                return workorders;
            }
        } else if (queries.searchTerm != null) {
            if (whereQueries == null && workOrderSort == null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .where("concat(cause, title, description) like :searchTerm", {searchTerm: '%' + queries.searchTerm + '%'})
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .getMany();
                return workorders;
            } else if (whereQueries != null && workOrderSort == null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .where(whereQueries)
                    .andWhere("concat(cause, title, description) like :searchTerm", {searchTerm: '%' + queries.searchTerm + '%'})
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .setParameters(parameterQueries)
                    .getMany();
                return workorders;
            } else if (whereQueries == null && workOrderSort != null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .where("concat(cause, title, description) like :searchTerm", {searchTerm: '%' + queries.searchTerm + '%'})
                    .orderBy(workOrderSort, ordering)
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .getMany();
                return workorders;
            } else if (whereQueries != null && workOrderSort != null) {
                const workorders = await this.getRepositoryConnection(WorkOrder)
                    .createQueryBuilder("work_orders")
                    .where(whereQueries)
                    .andWhere("concat(cause, title, description) like :searchTerm", {searchTerm: '%' + queries.searchTerm + '%'})
                    .orderBy(workOrderSort, ordering)
                    .skip(queries.pageSize * (queries.pageNumber - 1))
                    .take(queries.pageSize)
                    .setParameters(parameterQueries)
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
