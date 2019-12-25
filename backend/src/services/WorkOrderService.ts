import { BadRequestError } from '../errors/BadRequestError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { PropertyService } from './PropertyService';
import { SectorService } from './SectorService';
import { PriorityTypeService } from './PriorityTypeService';
import { WorkOrderTypeService } from './WorkOrderTypeService';
import { WorkOrderRepository } from '../repositories/WorkOrderRepository';
import { Property } from '../entities/Property';
import { WorkOrder } from '../entities/WorkOrder';
import { WorkOrderFields, WorkOrderFieldsNoProperty } from '../constants/FindOptionsFields';
import { User }  from '../entities/User';
import { OrderingByType } from '../enums/OrderingByType';
import { WorkOrderQuery } from '../enums/WorkOrderQueryEnum';

class WorkOrderService {

    private propertyService: PropertyService = new PropertyService();
    private sectorService: SectorService = new SectorService();
    private priorityTypeService: PriorityTypeService = new PriorityTypeService();
    private workOrderTypeService: WorkOrderTypeService = new WorkOrderTypeService();
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
        if(parseInt(queryMap.get(WorkOrderQuery.PAGESIZE)) < 1 || parseInt(queryMap.get(WorkOrderQuery.PAGESIZE))  > 10){
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

        if(queryMap.get(WorkOrderQuery.SORTBY) != null && !workOrderSortMapper.has(queryMap.get(WorkOrderQuery.SORTBY))){
            throw new BadRequestError(queryMap.get(WorkOrderQuery.SORTBY) + " is an invalid parameter for sorting. Accepted sorting parameters are: [" + Array.from(workOrderSortMapper.keys()) + "]")
        }

        return workOrderSortMapper.get(queryMap.get(WorkOrderQuery.SORTBY))
    }

    private getFilterQueries(queryMap: Map<string, string>) {
        let filterQueries = '';
        
        queryMap.forEach((value: string, key: string) => {
            if (filterQueries !== '') {
                filterQueries += `&& `;
            }

            if (key == 'propertyId'){
                filterQueries += `work_orders.property = ${value}`;
            }
            else if(key == 'sectorKind') {
                filterQueries += `sector.kind = \'${value}\'`;
            }
            else if (key == 'sectorType'){
                filterQueries += `sector.type = \'${value}\'`;
            }
            else if(key == 'workOrderType' || key == 'serviceNeeded' || key == 'priorityType' || key == 'priceEstimate') {
                filterQueries += `work_orders.${key} = ${value}`;
            }
            else if(key == 'greaterThan'){
                filterQueries += `work_orders.${key} > ${queryMap.get(WorkOrderQuery.GREATERTHANVALUE)}`;
            }
            else if(key == 'lowerThan'){
                filterQueries += `work_orders.${key} < ${queryMap.get(WorkOrderQuery.LOWERTHANVALUE)}`;
            }
        });

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
