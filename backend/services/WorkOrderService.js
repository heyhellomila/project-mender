const WorkOrderGateway = require('../gateways/WorkOrderGateway');
const PropertyService = require('./PropertyService');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const propertyService = new PropertyService();

class WorkOrderService {

    async createWorkOrder(propertyID, sector, type, title, cause, 
        serviceNeeded, priority, description, dueDate, priceEstimate) {

        if (!await propertyService.propertyExists(propertyID)) {
            throw new ResourceNotFoundError("Property " + propertyID + 
                " does not exist.");
        }
        try {
            return await WorkOrderGateway.createWorkOrder(propertyID, sector, 
                type, title, cause, serviceNeeded, priority, description, dueDate, priceEstimate);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async getWorkOrdersByPropertyId(propertyID) {
        if (!await propertyService.propertyExists(propertyID))
            throw new ResourceNotFoundError("Property with id " + propertyID + " does not exist.")
        try {
            return await WorkOrderGateway.getWorkOrdersByProperty(propertyID);
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

module.exports = WorkOrderService;