"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WorkOrderService_1 = __importDefault(require("../services/WorkOrderService"));
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const workOrderController = express_1.default.Router();
exports.workOrderController = workOrderController;
workOrderController.get('/:id', auth, async (req, res) => {
    try {
        const workOrder = await WorkOrderService_1.default.getWorkOrder(req.params.id);
        return res.status(200).json(workOrder);
    }
    catch (err) {
        return handleError(err, res);
    }
});
//# sourceMappingURL=WorkOrderController.js.map