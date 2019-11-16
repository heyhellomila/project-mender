const WorkOrder = require('../models/WorkOrder');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError')

const WorkOrderGateway = {

    async getWorkOrdersByProperty(propertyID) {
        const workorders = await WorkOrder.find({propertyID: propertyID});
        if (!workorders) {
            throw new ResourceNotFoundError("Work Orders belonging to user_id " + user_id + " do not exist");
        }
        return workorders;
    },

    async getWorkOrderById(id) {
        const workorder = await WorkOrder.findById(id);
        if (!workorder) {
            throw new ResourceNotFoundError("Work Order with id " + id + " does not exist");
        }
        return workorder;
    },
    
    //images are not currently being saved to the DB
    async createWorkOrder(propertyID, sector, type, title, cause, 
        serviceNeeded, priority, description, dueDate, priceEstimate) {
        
        const workOrder = new WorkOrder({
            propertyID: propertyID, 
            sector: sector,
            type: type,
            title: title,
            cause: cause, 
            serviceNeeded: serviceNeeded,
            priority: priority,
            description: description,
            dueDate: dueDate, 
            priceEstimate: priceEstimate, 
        });
        try {
            return await workOrder.save();
        } catch (err) {
            throw new Error(err);
        }
    }
    
}

module.exports = WorkOrderGateway;