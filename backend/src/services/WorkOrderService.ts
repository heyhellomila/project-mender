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

    async getWorkOrders(queries: any) {
        let ordering = OrderingByType.ASC;
        if (!queries.pageSize || !queries.pageNumber) {
            throw new BadRequestError("Missing required parameter. Required parameters: [pageSize, pageNumber]");
        }
        if(queries.pageSize < 1 || queries.pageSize > 10){
            throw new BadRequestError("pageSize parameter must be at least 1 and no greater than 10")
        }
        if (queries.ordering == "DESC") {
            ordering = OrderingByType.DESC
        }
        let workOrderSort = this.getWorkOrderSort(queries);
        let filterQueries = this.getFilterQueries(queries)

        return await this.workOrderRepository.getWorkOrders(filterQueries, queries, workOrderSort, ordering);
    }

    getWorkOrderSort(queries: any){
        let workOrderSortMapper = new Map();
        workOrderSortMapper.set("id", "work_orders.id")
        workOrderSortMapper.set("dueDate", "work_orders.dueDate")
        workOrderSortMapper.set("createdDate", "work_orders.createdDate")
        workOrderSortMapper.set("priceEstimate", "work_orders.priceEstimate")
        return workOrderSortMapper.get(queries.sortBy)
    }

    getFilterQueries(queries:any){
        var filterQueries = "";
        if (queries.id) {
            filterQueries += "work_orders.id = " + queries.id
        }
        if (queries.propertyId) {
            if (filterQueries == "") {
                filterQueries += "work_orders.property = " + queries.propertyId
            } else {
                filterQueries += "&& work_orders.property = " + queries.propertyId
            }
        }
        if (queries.sectorType) {
            if (filterQueries == "") {
                filterQueries += "work_orders.sectorType = " + queries.sectorType
            } else {
                filterQueries += "&& work_orders.sectorType = " + queries.sectorType
            }
        }
        if (queries.workOrderType) {
            if (filterQueries == "") {
                filterQueries += "work_orders.workOrderType = " + queries.workOrderType
            } else {
                filterQueries += "&& work_orders.workOrderType = " + queries.workOrderType
            }
        }
        if (queries.serviceNeeded) {
            if (filterQueries == "") {
                filterQueries += "work_orders.serviceNeeded = " + queries.serviceNeeded
            } else {
                filterQueries += "&& work_orders.serviceNeeded = " + queries.serviceNeeded
            }
        }
        if (queries.priorityType) {
            if (filterQueries == "") {
                filterQueries += "work_orders.priorityType = " + queries.priorityType
            } else {
                filterQueries += "&& work_orders.priorityType = " + queries.priorityType
            }
        }
        if (queries.priceEstimate) {
            if (filterQueries == "") {
                filterQueries += "work_orders.priceEstimate = " + queries.priceEstimate
            } else {
                filterQueries += "&& work_orders.priceEstimate = " + queries.priceEstimate
            }
        }
        if (queries.greaterThan) {
            if (filterQueries == "") {
                filterQueries += "work_orders." + queries.greaterThan + " > " + queries.greaterThanValue
            } else {
                filterQueries += "&& work_orders." + queries.greaterThan + " > " + queries.greaterThanValue
            }
        }
        if (queries.lowerThan) {
            if (filterQueries == "") {
                filterQueries += "work_orders." + queries.lowerThan + " < " + queries.lowerThanValue
            } else {
                filterQueries += "&& work_orders." + queries.lowerThan + " < " + queries.lowerThanValue
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
