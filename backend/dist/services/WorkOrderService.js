"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BadRequestError_1 = require("../errors/BadRequestError");
const ResourceNotFoundError_1 = require("../errors/ResourceNotFoundError");
const SectorType_1 = require("../enums/SectorType");
const PriorityType_1 = require("../enums/PriorityType");
const WorkOrderType_1 = require("../enums/WorkOrderType");
const PropertyService_1 = __importDefault(require("../services/PropertyService"));
const WorkOrderGateway_1 = __importDefault(require("../gateways/WorkOrderGateway"));
class WorkOrderService {
    async createWorkOrder(property_id, sector, type, title, cause, service_needed, priority, description, due_date, price_estimate) {
        if (!await PropertyService_1.default.propertyExists(property_id)) {
            throw new ResourceNotFoundError_1.ResourceNotFoundError("Property " + property_id +
                " does not exist.");
        }
        if (!(sector in SectorType_1.SectorType)) {
            throw new BadRequestError_1.BadRequestError('Invalid Sector Type. Allowed Types: ['
                + Object.keys(SectorType_1.SectorType) + ']');
        }
        if (!(priority in PriorityType_1.PriorityType)) {
            throw new BadRequestError_1.BadRequestError('Invalid Priority Type. Allowed Types: ['
                + Object.keys(PriorityType_1.PriorityType) + ']');
        }
        if (!(type in WorkOrderType_1.WorkOrderType)) {
            throw new BadRequestError_1.BadRequestError('Invalid Work Order Type. Allowed Types: ['
                + Object.keys(WorkOrderType_1.WorkOrderType) + ']');
        }
        try {
            return await WorkOrderGateway_1.default.createWorkOrder(property_id, sector, type, title, cause, service_needed, priority, description, due_date, price_estimate);
        }
        catch (err) {
            throw new BadRequestError_1.BadRequestError(err.message);
        }
    }
    async getWorkOrdersByPropertyId(property_id) {
        if (!await PropertyService_1.default.propertyExists(property_id))
            throw new ResourceNotFoundError_1.ResourceNotFoundError("Property with id " + property_id + " does not exist.");
        try {
            return await WorkOrderGateway_1.default.getWorkOrdersByProperty(property_id);
        }
        catch (err) {
            throw err;
        }
    }
    async getWorkOrder(id) {
        try {
            return await WorkOrderGateway_1.default.getWorkOrderById(id);
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = new WorkOrderService();
//# sourceMappingURL=WorkOrderService.js.map