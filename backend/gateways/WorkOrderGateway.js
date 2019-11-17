const WorkOrder = require('../models/WorkOrder');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError')

const WorkOrderGateway = {

    async getWorkOrdersByProperty(property_id) {
        const workorders = await WorkOrder.find({property_id: property_id});
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
    async createWorkOrder(property_id, sector, type, title, cause, 
        service_needed, priority, description, due_date, price_estimate) {
        
        const workOrder = new WorkOrder({
            property_id: property_id, 
            sector: sector,
            type: type,
            title: title,
            cause: cause, 
            service_needed: service_needed,
            priority: priority,
            description: description,
            due_date: due_date, 
            price_estimate: price_estimate, 
        });
        try {
            return await workOrder.save();
        } catch (err) {
            throw new Error(err);
        }
    },

    async searchWorkOrder(property_id, sector, type, title, cause, priority, description){
            
        const searchCriteria = {
            property_id: {$regex: property_id, $options: "i" }, 
            sector: {$regex: sector, $options: "i" },
            type: {$regex: type, $options: "i" },
            title: {$regex: title, $options: "i" },
            cause: {$regex: cause, $options: "i" },
            priority: {$regex: priority, $options: "i" },
            description: {$regex: description, $options: "i" }
        }

        const workorders = await WorkOrder.find(searchCriteria);
        
        return workorders;
    }
    
}

module.exports = WorkOrderGateway