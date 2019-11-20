import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import WorkOrder from '../models/WorkOrder';

class WorkOrderGateway {

    async getWorkOrdersByProperty(property_id: string) {
        const workorders = await WorkOrder.find({property_id: property_id});
        if (!workorders) {
            throw new ResourceNotFoundError("Work Orders belonging to property id " + property_id + " do not exist");
        }
        return workorders;
    }

    async getWorkOrderById(id: string) {
        const workorder = await WorkOrder.findById(id);
        if (!workorder) {
            throw new ResourceNotFoundError("Work Order with id " + id + " does not exist");
        }
        return workorder;
    }
    
    //images are not currently being saved to the DB
    async createWorkOrder(property_id: string, sector: string, type: string, 
        title: string, cause: string, service_needed: boolean, priority: string, 
        description: string, due_date: Date, price_estimate: number) {
        
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
    }
    
}

export default new WorkOrderGateway();
