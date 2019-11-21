import { BadRequestError } from '../errors/BadRequestError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { SectorType as SectorTypeEnum } from '../enums/SectorType';
import { PriorityType as PriorityTypeEnum } from '../enums/PriorityType';
import { WorkOrderType as WorkOrderTypeEnum } from '../enums/WorkOrderType';
import { PropertyService } from './PropertyService';
import { SectorType } from '../entities/SectorType';
import { SectorTypeService } from './SectorTypeService';
import { PriorityTypeService } from './PriorityTypeService';
import { WorkOrderTypeService } from './WorkOrderTypeService';
import { PriorityType } from '../entities/PriorityType';
import { WorkOrderType } from '../entities/WorkOrderType';
import { WorkOrderRepository } from '../repositories/WorkOrderRepository';
import { Property } from '../entities/Property';
import { User } from '../entities/User';

class WorkOrderService {

    private propertyService : PropertyService = new PropertyService();
    private sectorTypeService : SectorTypeService = new SectorTypeService();
    private priorityTypeService : PriorityTypeService = new PriorityTypeService();
    private workOrderTypeService : WorkOrderTypeService = new WorkOrderTypeService();
    private workOrderRepository : WorkOrderRepository = new WorkOrderRepository();

    async createWorkOrder(propertyId: number, sectorType: string, workOrderType: string, 
        title: string, cause: string, serviceNeeded: boolean, priorityType: string, 
        description: string, dueDate: Date, priceEstimate: number, createdBy: User) {

        if (!await this.propertyService.propertyExists(Number(propertyId))) {
            throw new ResourceNotFoundError("Property " + propertyId + 
                " does not exist.");
        }

        if (!(sectorType in SectorTypeEnum)) {
            throw new BadRequestError('Invalid Sector Type. Allowed Types: [' 
                + Object.keys(SectorTypeEnum) +']');
        }

        if (!(priorityType in PriorityTypeEnum)) {
            throw new BadRequestError('Invalid Priority Type. Allowed Types: [' 
                + Object.keys(PriorityTypeEnum) +']');
        }

        if (!(workOrderType in WorkOrderTypeEnum)) {
            throw new BadRequestError('Invalid Work Order Type. Allowed Types: [' 
                + Object.keys(WorkOrderTypeEnum) +']');
        }

        const sectorTypeObj : SectorType = await this.sectorTypeService
            .getSectorType(sectorType);
        const priorityTypeObj : PriorityType = await this.priorityTypeService
            .getPriorityType(priorityType);
        const workOrderTypeObj : WorkOrderType = await this.workOrderTypeService
            .getWorkOrderType(workOrderType);
        var property : Property = new Property();
        property.id = propertyId;
        console.log(createdBy);
        try {
            return await this.workOrderRepository.createWorkOrder(property, sectorTypeObj, 
                workOrderTypeObj, title, cause, serviceNeeded, priorityTypeObj, 
                description, dueDate, priceEstimate, createdBy);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async getWorkOrdersByPropertyId(propertyId: number) {
        const property : Property = await this.propertyService.getPropertyById(propertyId);
        if (!property) {
            throw new ResourceNotFoundError("Property with id " + propertyId + " does not exist.")
        }
        try {
            return await this.workOrderRepository.getWorkOrdersByProperty(property);
        } catch (err) {
            throw err;
        }
    }

    async getWorkOrder(id: number) {
        try {
            return await this.workOrderRepository.getWorkOrderById(id);
        } catch (err) {
            throw err;
        }
    }
}

export { WorkOrderService };
