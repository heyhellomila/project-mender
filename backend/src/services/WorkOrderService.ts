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

    async getWorkOrders(queriesMapper: Map<string, string>) {
        let ordering = OrderingByType.ASC;
        if (!queriesMapper.get("pageSize") || !queriesMapper.get("pageNumber")) {
            throw new BadRequestError("Missing required parameter. Required parameters: [pageSize, pageNumber]");
        }
        if(parseInt(queriesMapper.get("pageSize")) < 1 || parseInt(queriesMapper.get("pageSize"))  > 10){
            throw new BadRequestError("pageSize parameter must be at least 1 and no greater than 10")
        }
        let pageSize = parseInt(queriesMapper.get("pageSize"));
        let pageNumber = parseInt(queriesMapper.get("pageNumber"));
        let searchTerm = queriesMapper.get("searchTerm");
        if (queriesMapper.get("ordering") == "DESC") {
            ordering = OrderingByType.DESC
        }
        let workOrderSort = this.getWorkOrderSort(queriesMapper);
        let filterQueries = this.getFilterQueries(queriesMapper)

        return await this.workOrderRepository.getWorkOrders(filterQueries, pageSize, pageNumber, searchTerm, workOrderSort, ordering);
    }

    private getWorkOrderSort(queriesMapper: Map<string, string>){
        let workOrderSortMapper = new Map();
        workOrderSortMapper.set("id", "work_orders.id")
        workOrderSortMapper.set("dueDate", "work_orders.dueDate")
        workOrderSortMapper.set("createdDate", "work_orders.createdDate")
        workOrderSortMapper.set("priceEstimate", "work_orders.priceEstimate")
        return workOrderSortMapper.get(queriesMapper.get("sortBy"))
    }

    private getFilterQueries(queriesMapper: Map<string, string>){
        var filterQueries = "";
        if (queriesMapper.get("id")) {
            filterQueries += "work_orders.id = " + queriesMapper.get("id")
        }
        if (queriesMapper.get("propertyId")) {
            if (filterQueries == "") {
                filterQueries += "work_orders.property = " + queriesMapper.get("propertyId")
            } else {
                filterQueries += "&& work_orders.property = " + queriesMapper.get("propertyId")
            }
        }
        if (queriesMapper.get("sectorType")) {
            if (filterQueries == "") {
                filterQueries += "work_orders.sectorType = " + queriesMapper.get("sectorType")
            } else {
                filterQueries += "&& work_orders.sectorType = " + queriesMapper.get("sectorType")
            }
        }
        if (queriesMapper.get("workOrderType")) {
            if (filterQueries == "") {
                filterQueries += "work_orders.workOrderType = " + queriesMapper.get("workOrderType")
            } else {
                filterQueries += "&& work_orders.workOrderType = " + queriesMapper.get("workOrderType")
            }
        }
        if (queriesMapper.get("serviceNeeded")) {
            if (filterQueries == "") {
                filterQueries += "work_orders.serviceNeeded = " + queriesMapper.get("serviceNeeded")
            } else {
                filterQueries += "&& work_orders.serviceNeeded = " + queriesMapper.get("serviceNeeded")
            }
        }
        if (queriesMapper.get("priorityType")) {
            if (filterQueries == "") {
                filterQueries += "work_orders.priorityType = " + queriesMapper.get("priorityType")
            } else {
                filterQueries += "&& work_orders.priorityType = " + queriesMapper.get("priorityType")
            }
        }
        if (queriesMapper.get("priceEstimate")) {
            if (filterQueries == "") {
                filterQueries += "work_orders.priceEstimate = " + queriesMapper.get("priceEstimate")
            } else {
                filterQueries += "&& work_orders.priceEstimate = " + queriesMapper.get("priceEstimate")
            }
        }
        if (queriesMapper.get("greaterThan")) {
            if (filterQueries == "") {
                filterQueries += "work_orders." + queriesMapper.get("greaterThan") + " > " + queriesMapper.get("greaterThanValue")
            } else {
                filterQueries += "&& work_orders." + queriesMapper.get("greaterThan") + " > " + queriesMapper.get("greaterThanValue")
            }
        }
        if (queriesMapper.get("lowerThan")) {
            if (filterQueries == "") {
                filterQueries += "work_orders." + queriesMapper.get("lowerThan") + " < " + queriesMapper.get("lowerThanValue")
            } else {
                filterQueries += "&& work_orders." + queriesMapper.get("lowerThan") + " < " + queriesMapper.get("lowerThanValue")
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
