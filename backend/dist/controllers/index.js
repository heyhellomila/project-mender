"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("./UserController");
const UserPropertiesController_1 = require("./UserPropertiesController");
const PropertyController_1 = require("./PropertyController");
const PropertyWorkOrdersController_1 = require("./PropertyWorkOrdersController");
const WorkOrderController_1 = require("./WorkOrderController");
const router = express_1.default.Router();
exports.router = router;
router.use('/api/users', UserController_1.userController);
router.use('/api/users/:userId/properties', UserPropertiesController_1.userPropertiesController);
router.use('/api/properties', PropertyController_1.propertyController);
router.use('/api/workOrders', WorkOrderController_1.workOrderController);
router.use('/api/properties/:propertyId/workorders', PropertyWorkOrdersController_1.propertyWorkOrdersController);
//# sourceMappingURL=index.js.map