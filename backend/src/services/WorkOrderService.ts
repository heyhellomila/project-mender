import {BadRequestError} from '../errors/BadRequestError';
import {ResourceNotFoundError} from '../errors/ResourceNotFoundError';
import {SectorType as SectorTypeEnum} from '../enums/SectorType';
import {PriorityType as PriorityTypeEnum} from '../enums/PriorityType';
import {WorkOrderType as WorkOrderTypeEnum} from '../enums/WorkOrderType';
import {PropertyService} from './PropertyService';
import {SectorType} from '../entities/SectorType';
import {SectorTypeService} from './SectorTypeService';
import {PriorityTypeService} from './PriorityTypeService';
import {WorkOrderTypeService} from './WorkOrderTypeService';
import {PriorityType} from '../entities/PriorityType';
import {WorkOrderType} from '../entities/WorkOrderType';
import {WorkOrderRepository} from '../repositories/WorkOrderRepository';
import {Property} from '../entities/Property';
import {WorkOrder} from '../entities/WorkOrder';
import {WorkOrderFields, WorkOrderFieldsNoProperty} from '../constants/FindOptionsFields';
import {User} from '../entities/User';
import {OrderingByType} from '../enums/OrderingByType';
import {WorkOrderQuery} from '../enums/WorkOrderQueryEnum';

class WorkOrderService {

    private propertyService: PropertyService = new PropertyService();
    private sectorTypeService: SectorTypeService = new SectorTypeService();
    private priorityTypeService: PriorityTypeService = new PriorityTypeService();
    private workOrderTypeService: WorkOrderTypeService = new WorkOrderTypeService();
    private workOrderRepository: WorkOrderRepository = new WorkOrderRepository();

    async createWorkOrder(propertyId: number, workOrder: WorkOrder, createdByUserId: number) {

        if (!(await this.propertyService.propertyExists(propertyId))) {
            throw new ResourceNotFoundError("Property " + propertyId +
                " does not exist.");
        }

        var createdBy: User = new User();
        createdBy.id = createdByUserId;
        var property: Property = new Property();
        property.id = propertyId;

        workOrder.sectorType = await this.sectorTypeService
            .getSectorType(workOrder.sectorType.type);
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
            throw new ResourceNotFoundError("Property with id " + propertyId + " does not exist.")
        }
        try {
            return await this.workOrderRepository.getWorkOrdersByProperty(property,
                WorkOrderFieldsNoProperty);
        } catch (err) {
            throw err;
        }
    }

    async getWorkOrders(queryMap: Map<string, string>) {
        let ordering = OrderingByType.ASC;
        let test = WorkOrderQuery.SECTORTYPE
        console.log(test)
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
        return workOrderSortMapper.get(queryMap.get(WorkOrderQuery.SORTBY))
    }

    private getFilterQueries(queryMap: Map<string, string>){
        var filterQueries = "";
        if (queryMap.get(WorkOrderQuery.PROPERTYID)) {
                filterQueries += "work_orders.property = " + queryMap.get(WorkOrderQuery.PROPERTYID)
        }
        if (queryMap.get(WorkOrderQuery.SECTORTYPE)) {
            if (filterQueries == "") {
                filterQueries += "work_orders.sectorType = " + queryMap.get(WorkOrderQuery.SECTORTYPE)
            } else {
                filterQueries += "&& work_orders.sectorType = " + queryMap.get(WorkOrderQuery.SECTORTYPE)
            }
        }
        if (queryMap.get(WorkOrderQuery.WORKORDERTYPE)) {
            if (filterQueries == "") {
                filterQueries += "work_orders.workOrderType = " + queryMap.get(WorkOrderQuery.WORKORDERTYPE)
            } else {
                filterQueries += "&& work_orders.workOrderType = " + queryMap.get(WorkOrderQuery.WORKORDERTYPE)
            }
        }
        if (queryMap.get(WorkOrderQuery.SERVICENEEDED)) {
            if (filterQueries == "") {
                filterQueries += "work_orders.serviceNeeded = " + queryMap.get(WorkOrderQuery.SERVICENEEDED)
            } else {
                filterQueries += "&& work_orders.serviceNeeded = " + queryMap.get(WorkOrderQuery.SERVICENEEDED)
            }
        }
        if (queryMap.get(WorkOrderQuery.PRIORITYTYPE)) {
            if (filterQueries == "") {
                filterQueries += "work_orders.priorityType = " + queryMap.get(WorkOrderQuery.PRIORITYTYPE)
            } else {
                filterQueries += "&& work_orders.priorityType = " + queryMap.get(WorkOrderQuery.PRIORITYTYPE)
            }
        }
        if (queryMap.get(WorkOrderQuery.PRICEESTIMATE)) {
            if (filterQueries == "") {
                filterQueries += "work_orders.priceEstimate = " + queryMap.get(WorkOrderQuery.PRICEESTIMATE)
            } else {
                filterQueries += "&& work_orders.priceEstimate = " + queryMap.get(WorkOrderQuery.PRICEESTIMATE)
            }
        }
        if (queryMap.get(WorkOrderQuery.GREATERTHAN)) {
            if (filterQueries == "") {
                filterQueries += "work_orders." + queryMap.get(WorkOrderQuery.GREATERTHAN) + " > " + queryMap.get(WorkOrderQuery.GREATERTHANVALUE)
            } else {
                filterQueries += "&& work_orders." + queryMap.get(WorkOrderQuery.GREATERTHAN) + " > " + queryMap.get(WorkOrderQuery.GREATERTHANVALUE)
            }
        }
        if (queryMap.get(WorkOrderQuery.LOWERTHAN)) {
            if (filterQueries == "") {
                filterQueries += "work_orders." + queryMap.get(WorkOrderQuery.LOWERTHAN) + " < " + queryMap.get(WorkOrderQuery.LOWERTHANVALUE)
            } else {
                filterQueries += "&& work_orders." + queryMap.get(WorkOrderQuery.LOWERTHAN) + " < " + queryMap.get(WorkOrderQuery.LOWERTHANVALUE)
            }
        }
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
