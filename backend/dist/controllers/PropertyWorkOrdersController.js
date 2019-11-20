"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WorkOrderService_1 = __importDefault(require("../services/WorkOrderService"));
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');
const propertyWorkOrdersController = express_1.default.Router({ mergeParams: true });
exports.propertyWorkOrdersController = propertyWorkOrdersController;
const creationFields = ['sector', 'type', 'title', 'cause', 'service_needed',
    'priority', 'description', 'due_date', 'price_estimate'];
propertyWorkOrdersController.post('/', auth, validateBody(creationFields), async (req, res) => {
    try {
        const { sector, type, title, cause, service_needed, priority, description, due_date, price_estimate } = req.body;
        const workOrder = await WorkOrderService_1.default.createWorkOrder(req.params.propertyId, sector, type, title, cause, service_needed, priority, description, due_date, price_estimate);
        return res.status(200).json({ workOrder });
    }
    catch (err) {
        return handleError(err, res);
    }
});
propertyWorkOrdersController.get('/', auth, async (req, res) => {
    try {
        const workOrders = await WorkOrderService_1.default.getWorkOrdersByPropertyId(req.params.propertyId);
        return res.status(200).json(workOrders);
    }
    catch (err) {
        return handleError(err, res);
    }
});
//# sourceMappingURL=PropertyWorkOrdersController.js.map