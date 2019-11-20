"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceNotFoundError_1 = require("../errors/ResourceNotFoundError");
const WorkOrder_1 = __importDefault(require("../models/WorkOrder"));
class WorkOrderGateway {
    async getWorkOrdersByProperty(property_id) {
        const workorders = await WorkOrder_1.default.find({ property_id: property_id });
        if (!workorders) {
            throw new ResourceNotFoundError_1.ResourceNotFoundError("Work Orders belonging to property id " + property_id + " do not exist");
        }
        return workorders;
    }
    async getWorkOrderById(id) {
        const workorder = await WorkOrder_1.default.findById(id);
        if (!workorder) {
            throw new ResourceNotFoundError_1.ResourceNotFoundError("Work Order with id " + id + " does not exist");
        }
        return workorder;
    }
    //images are not currently being saved to the DB
    async createWorkOrder(property_id, sector, type, title, cause, service_needed, priority, description, due_date, price_estimate) {
        const workOrder = new WorkOrder_1.default({
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
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
exports.default = new WorkOrderGateway();
//# sourceMappingURL=WorkOrderGateway.js.map