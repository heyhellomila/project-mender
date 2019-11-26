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
        if (!queryMap.get("pageSize") || !queryMap.get("pageNumber")) {
            throw new BadRequestError("Missing required parameter. Required parameters: [pageSize, pageNumber]");
        }
        if(parseInt(queryMap.get("pageSize")) < 1 || parseInt(queryMap.get("pageSize"))  > 10){
            throw new BadRequestError("pageSize parameter must be at least 1 and no greater than 10")
        }
        if (queryMap.get("ordering") == "DESC") {
            ordering = OrderingByType.DESC
        }
        let workOrderSort = this.getWorkOrderSort(queryMap);
        let filterQueries = this.getFilterQueries(queryMap)

        return await this.workOrderRepository.getWorkOrders(filterQueries, queryMap, workOrderSort, ordering);
    }

    private getWorkOrderSort(queryMap: Map<string, string>){
        let workOrderSortMapper = new Map();
        workOrderSortMapper.set("id", "work_orders.id")
        workOrderSortMapper.set("dueDate", "work_orders.dueDate")
        workOrderSortMapper.set("createdDate", "work_orders.createdDate")
        workOrderSortMapper.set("priceEstimate", "work_orders.priceEstimate")
        return workOrderSortMapper.get(queryMap.get("sortBy"))
    }

    private getFilterQueries(queryMap: Map<string, string>){
        var filterQueries = "";
        if (queryMap.get("id")) {
            filterQueries += "work_orders.id = " + queryMap.get("id")
        }
        if (queryMap.get("propertyId")) {
            if (filterQueries == "") {
                filterQueries += "work_orders.property = " + queryMap.get("propertyId")
            } else {
                filterQueries += "&& work_orders.property = " + queryMap.get("propertyId")
            }
        }
        if (queryMap.get("sectorType")) {
            if (filterQueries == "") {
                filterQueries += "work_orders.sectorType = " + queryMap.get("sectorType")
            } else {
                filterQueries += "&& work_orders.sectorType = " + queryMap.get("sectorType")
            }
        }
        if (queryMap.get("workOrderType")) {
            if (filterQueries == "") {
                filterQueries += "work_orders.workOrderType = " + queryMap.get("workOrderType")
            } else {
                filterQueries += "&& work_orders.workOrderType = " + queryMap.get("workOrderType")
            }
        }
        if (queryMap.get("serviceNeeded")) {
            if (filterQueries == "") {
                filterQueries += "work_orders.serviceNeeded = " + queryMap.get("serviceNeeded")
            } else {
                filterQueries += "&& work_orders.serviceNeeded = " + queryMap.get("serviceNeeded")
            }
        }
        if (queryMap.get("priorityType")) {
            if (filterQueries == "") {
                filterQueries += "work_orders.priorityType = " + queryMap.get("priorityType")
            } else {
                filterQueries += "&& work_orders.priorityType = " + queryMap.get("priorityType")
            }
        }
        if (queryMap.get("priceEstimate")) {
            if (filterQueries == "") {
                filterQueries += "work_orders.priceEstimate = " + queryMap.get("priceEstimate")
            } else {
                filterQueries += "&& work_orders.priceEstimate = " + queryMap.get("priceEstimate")
            }
        }
        if (queryMap.get("greaterThan")) {
            if (filterQueries == "") {
                filterQueries += "work_orders." + queryMap.get("greaterThan") + " > " + queryMap.get("greaterThanValue")
            } else {
                filterQueries += "&& work_orders." + queryMap.get("greaterThan") + " > " + queryMap.get("greaterThanValue")
            }
        }
        if (queryMap.get("lowerThan")) {
            if (filterQueries == "") {
                filterQueries += "work_orders." + queryMap.get("lowerThan") + " < " + queryMap.get("lowerThanValue")
            } else {
                filterQueries += "&& work_orders." + queryMap.get("lowerThan") + " < " + queryMap.get("lowerThanValue")
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
