"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PropertyService_1 = __importDefault(require("../services/PropertyService"));
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');
const userPropertiesController = express_1.default.Router({ mergeParams: true });
exports.userPropertiesController = userPropertiesController;
const creationFields = ['name', 'type', 'address', 'status'];
userPropertiesController.post('/', auth, validateBody(creationFields), async (req, res) => {
    try {
        const { name, type, address, status } = req.body;
        const property = await PropertyService_1.default.createProperty(req.params.userId, name, type, address, status);
        return res.status(200).json({ property });
    }
    catch (err) {
        return handleError(err, res);
    }
});
userPropertiesController.get('/', auth, async (req, res) => {
    try {
        const properties = await PropertyService_1.default.getPropertiesByUser(req.params.userId);
        return res.status(200).json(properties);
    }
    catch (err) {
        return handleError(err, res);
    }
});
//# sourceMappingURL=UserPropertiesController.js.map