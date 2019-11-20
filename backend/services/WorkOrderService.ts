import { BadRequestError } from '../errors/BadRequestError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { SectorType } from '../enums/SectorType';
import { PriorityType } from '../enums/PriorityType';
import { WorkOrderType } from '../enums/WorkOrderType';
import PropertyService from '../services/PropertyService';
import WorkOrderGateway from '../gateways/WorkOrderGateway';

class WorkOrderService {

    async createWorkOrder(property_id: string, sector: string, type: string, title: string, cause: string, 
        service_needed: boolean, priority: string, description: string, due_date: Date, price_estimate: number) {

        if (!await PropertyService.propertyExists(property_id)) {
            throw new ResourceNotFoundError("Property " + property_id + 
                " does not exist.");
        }

        if (!(sector in SectorType)) {
            throw new BadRequestError('Invalid Sector Type. Allowed Types: [' 
                + Object.keys(SectorType) +']');
        }

        if (!(priority in PriorityType)) {
            throw new BadRequestError('Invalid Priority Type. Allowed Types: [' 
                + Object.keys(PriorityType) +']');
        }

        if (!(type in WorkOrderType)) {
            throw new BadRequestError('Invalid Work Order Type. Allowed Types: [' 
                + Object.keys(WorkOrderType) +']');
        }

        try {
            return await WorkOrderGateway.createWorkOrder(property_id, sector, 
                type, title, cause, service_needed, priority, description, due_date, price_estimate);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async getWorkOrdersByPropertyId(property_id: string) {
        if (!await PropertyService.propertyExists(property_id))
            throw new ResourceNotFoundError("Property with id " + property_id + " does not exist.")
        try {
            return await WorkOrderGateway.getWorkOrdersByProperty(property_id);
        } catch (err) {
            throw err;
        }
    }

    async getWorkOrder(id: string) {
        try {
            return await WorkOrderGateway.getWorkOrderById(id);
        } catch (err) {
            throw err;
        }
    }
}

export default new WorkOrderService();
