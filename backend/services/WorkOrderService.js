const WorkOrder = require('../models/WorkOrder');
const WorkOrderGateway = require('../gateways/WorkOrderGateway');
const SectorType = require('../enums/SectorType');
const PriorityType = require('../enums/PriorityType');
const UserService = require('../gateways/UserService');
const PropertyService = require('../gateways/PropertyService');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

class WorkOrderService {

    async createWorkOrder(user_id, sector, type, title, cause, 
        service_needed, priority, description, property_id, 
        due_date, date_completed, price_estimate, actual_cost) {

        if (!UserService.userExists(user_id)) {
            throw new ResourceNotFoundError("User" + user_id + 
            "does not exist. Cannot create work order for nonexistent user.");
        }

        if (!PropertyService.propertyExists(property_id)) {
            throw new ResourceNotFoundError("Property" + property_id + 
            "does not exist. Cannot create work order for nonexistent property.");
        }

        if (!(priority in PriorityType)) {
            throw new TypeError(priority + "is not a valid priority type.");
        }

        if (!(sector in SectorType)) {
            throw new TypeError(sector + "is not a valid sector type.");
        }

        try {
            return await WorkOrderGateway.createWorkOrder(user_id, sector, type, title, cause, 
                service_needed, priority, description, property_id, 
                due_date, date_completed, price_estimate, actual_cost);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async getPropertyWorkOrders(property_id) {
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