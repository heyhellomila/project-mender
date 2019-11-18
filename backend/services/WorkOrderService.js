const WorkOrderGateway = require('../gateways/WorkOrderGateway');
const PropertyService = require('./PropertyService');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const propertyService = new PropertyService();

class WorkOrderService {

    async workOrderExists(id) {
        try {
            await WorkOrderGateway.getWorkOrderById(id);
        } catch (err) {
            return false;
        }
        return true;
    }

    async createWorkOrder(property_id, sector, type, title, cause, 
        service_needed, priority, description, due_date, price_estimate) {

        if (!await propertyService.propertyExists(property_id)) {
            throw new ResourceNotFoundError("Property " + property_id + 
                " does not exist.");
        }
        try {
            return await WorkOrderGateway.createWorkOrder(property_id, sector, 
                type, title, cause, service_needed, priority, description, due_date, price_estimate);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async getWorkOrdersByPropertyId(property_id) {
        if (!await propertyService.propertyExists(property_id))
            throw new ResourceNotFoundError("Property with id " + property_id + " does not exist.")
        try {
            return await WorkOrderGateway.getWorkOrdersByProperty(property_id);
        } catch (err) {
            throw err;
        }
    }

    async getWorkOrder(id) {
        try {
            return await WorkOrderGateway.getWorkOrderById(id);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = WorkOrderService