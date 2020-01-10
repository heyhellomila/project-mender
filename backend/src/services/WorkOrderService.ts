import { BadRequestError } from '../errors/BadRequestError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { PropertyService } from './PropertyService';
import { SectorService } from './SectorService';
import { PriorityTypeService } from './PriorityTypeService';
import { WorkOrderTypeService } from './WorkOrderTypeService';
import { WorkOrderStatusService } from './WorkOrderStatusService';
import { WorkOrderRepository } from '../repositories/WorkOrderRepository';
import { Property } from '../entities/Property';
import { WorkOrder } from '../entities/WorkOrder';
import { WorkOrderFields, WorkOrderFieldsNoProperty } from '../constants/FindOptionsFields';
import { User }  from '../entities/User';
import { OrderingByType } from '../enums/OrderingByType';
import { WorkOrderQuery } from '../enums/WorkOrderQueryEnum';
import { WorkOrderStatusEnums } from '../enums/WorkOrderStatusEnums';

class WorkOrderService {

    private propertyService: PropertyService = new PropertyService();
    private sectorService: SectorService = new SectorService();
    private priorityTypeService: PriorityTypeService = new PriorityTypeService();
    private workOrderTypeService: WorkOrderTypeService = new WorkOrderTypeService();
    private workOrderStatusService: WorkOrderStatusService = new WorkOrderStatusService();
    private workOrderRepository: WorkOrderRepository = new WorkOrderRepository();

    async createWorkOrder(propertyId: number, workOrder: WorkOrder, createdByUserId: number) {

        if (!(await this.propertyService.propertyExists(propertyId))) {
            throw new ResourceNotFoundError(`Property ${propertyId} does not exist.`);
        }

        const createdBy: User = new User();
        createdBy.id = createdByUserId;
        const property: Property = new Property();
        property.id = propertyId;

        workOrder.sector = await this.sectorService
            .getSectorByKind(workOrder.sector.kind);
        workOrder.priorityType = await this.priorityTypeService
            .getPriorityType(workOrder.priorityType.type);
        workOrder.workOrderType = await this.workOrderTypeService
            .getWorkOrderType(workOrder.workOrderType.type);
         
        workOrder.property = property;
        workOrder.createdBy = createdBy;

        if (!(workOrder.bookmarked)) {
            workOrder.bookmarked = false;
        }

        if (!(workOrder.workOrderStatus)) {
            workOrder.workOrderStatus = await this.workOrderStatusService.getWorkOrderStatus(WorkOrderStatusEnums.OPEN_FOR_QUOTE);
        } else {
            workOrder.workOrderStatus = await this.workOrderStatusService.getWorkOrderStatus(workOrder.workOrderStatus.status);
        }

        try {
            return await this.workOrderRepository.createWorkOrder(workOrder);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async getWorkOrdersByPropertyId(propertyId: number) {
        const property: Property = await this.propertyService.getPropertyById(propertyId);
        if (!property) {
            throw new ResourceNotFoundError(`Property with id ${propertyId} does not exist.`);
        }
        try {
            return await this.workOrderRepository.getWorkOrdersByProperty(
                property, WorkOrderFieldsNoProperty);
        } catch (err) {
            throw err;
        }
    }

    async getWorkOrders(queryMap: Map<string, string>) {
        let ordering = OrderingByType.ASC;
        if (!queryMap.get(WorkOrderQuery.PAGESIZE) || !queryMap.get(WorkOrderQuery.PAGENUMBER)) {
            throw new BadRequestError("Missing required parameter. Required parameters: [pageSize, pageNumber]");
        }
        if(parseInt(queryMap.get(WorkOrderQuery.PAGESIZE)) < 1 || parseInt(queryMap.get(WorkOrderQuery.PAGESIZE)) > 10){
            throw new BadRequestError("pageSize parameter must be at least 1 and no greater than 10")
        }
        if (queryMap.get(WorkOrderQuery.ORDERING) == "DESC") {
            ordering = OrderingByType.DESC
        }

        let pageNumber = parseInt(queryMap.get(WorkOrderQuery.PAGENUMBER))
        let pageSize = parseInt(queryMap.get(WorkOrderQuery.PAGESIZE))
        let searchTerm = queryMap.get(WorkOrderQuery.SEARCHTERM)
        let workOrderSort = this.getWorkOrderSort(queryMap);
        let filterQueries = this.getFilterQueries(queryMap);

       
        return await this.workOrderRepository.getWorkOrders(filterQueries, pageNumber, pageSize, searchTerm, workOrderSort, ordering);
    }

    private getWorkOrderSort(queryMap: Map<string, string>){
        let workOrderSortMapper = new Map();
        workOrderSortMapper.set(WorkOrderQuery.ID, "work_orders.id")
        workOrderSortMapper.set(WorkOrderQuery.DUEDATE, "work_orders.dueDate")
        workOrderSortMapper.set(WorkOrderQuery.CREATEDDATE, "work_orders.createdDate")
        workOrderSortMapper.set(WorkOrderQuery.PRICEESTIMATE, "work_orders.priceEstimate")
        workOrderSortMapper.set(WorkOrderQuery.PRIORITYTYPE, "work_orders.priorityType")
        workOrderSortMapper.set(WorkOrderQuery.WORKORDERTYPE, "work_orders.workOrderType")
        workOrderSortMapper.set(WorkOrderQuery.SECTORTYPE, "sector.type")
        workOrderSortMapper.set(WorkOrderQuery.WORKORDERSTATUS, "work_orders.workOrderStatus")

        if(queryMap.get(WorkOrderQuery.SORTBY) != null && !workOrderSortMapper.has(queryMap.get(WorkOrderQuery.SORTBY))){
            throw new BadRequestError(queryMap.get(WorkOrderQuery.SORTBY) + " is an invalid parameter for sorting. Accepted sorting parameters are: [" + Array.from(workOrderSortMapper.keys()) + "]")
        }

        return workOrderSortMapper.get(queryMap.get(WorkOrderQuery.SORTBY))
    }

    private getFilterQueries(queryMap: Map<string, string>) {
        let filterQueries = '';
        
        if (queryMap.get(WorkOrderQuery.PROPERTYID)) {
            this.createSQLFilterQuery(filterQueries, 'work_orders', 'property', '=', queryMap.get(WorkOrderQuery.PROPERTYID));
        }
        if (queryMap.get(WorkOrderQuery.SECTORTYPE)) {
            this.createSQLFilterQuery(filterQueries, 'sector','type', '=', `\'${queryMap.get(WorkOrderQuery.SECTORTYPE)}\'`);
        }
        if (queryMap.get(WorkOrderQuery.SECTORKIND)) {
            this.createSQLFilterQuery(filterQueries, 'sector', 'kind', '=', `\'${queryMap.get(WorkOrderQuery.SECTORKIND)}\'`);
        }
        if (queryMap.get(WorkOrderQuery.WORKORDERTYPE)) {
            this.createSQLFilterQuery(filterQueries, 'work_orders', 'workOrderType','=', queryMap.get(WorkOrderQuery.WORKORDERTYPE));
        }
        if (queryMap.get(WorkOrderQuery.SERVICENEEDED)) {
            this.createSQLFilterQuery(filterQueries, 'work_orders', 'serviceNeeded', '=', queryMap.get(WorkOrderQuery.SERVICENEEDED));
        }
        if (queryMap.get(WorkOrderQuery.PRIORITYTYPE)) {
            this.createSQLFilterQuery(filterQueries, 'work_orders', 'priorityType', '=', queryMap.get(WorkOrderQuery.PRIORITYTYPE));
        }
        if (queryMap.get(WorkOrderQuery.PRICEESTIMATE)) {
            this.createSQLFilterQuery(filterQueries, 'work_orders', 'priceEstimate', '=', queryMap.get(WorkOrderQuery.PRICEESTIMATE));
        }
        if (queryMap.get(WorkOrderQuery.BOOKMARKED)) {
            this.createSQLFilterQuery(filterQueries, 'work_orders', 'bookmarked', '=', queryMap.get(WorkOrderQuery.BOOKMARKED));
        }
        if (queryMap.get(WorkOrderQuery.WORKORDERSTATUS)) {
            this.createSQLFilterQuery(filterQueries, 'work_orders', 'workOrderStatus', '=', queryMap.get(WorkOrderQuery.WORKORDERSTATUS));
        }
        if (queryMap.get(WorkOrderQuery.GREATERTHAN)) {
            this.createSQLFilterQuery(filterQueries, 'work_orders', queryMap.get(WorkOrderQuery.GREATERTHAN), '>', queryMap.get(WorkOrderQuery.GREATERTHANVALUE));
        }
        if (queryMap.get(WorkOrderQuery.LOWERTHAN)) {
            this.createSQLFilterQuery(filterQueries, 'work_orders', queryMap.get(WorkOrderQuery.LOWERTHAN), '<', queryMap.get(WorkOrderQuery.LOWERTHANVALUE));
        }
        return filterQueries;
    }

    private createSQLFilterQuery(filterQueries: string, table: string, column:string, operator: string , queryMapString: string){
        if (filterQueries !== '') {
            filterQueries += `&& `;
        }
        filterQueries += `${table}.${column} ${operator} ${queryMapString}`;
        return filterQueries;
    }

    async getWorkOrder(id: number) {
        const workOrder: WorkOrder = await this.workOrderRepository.getWorkOrderById(id,
            WorkOrderFields);
        if (!workOrder) {
            throw new ResourceNotFoundError("Work Order with id " + id + " does not exist.")
        }
        return workOrder;
    }
}

export {WorkOrderService};
