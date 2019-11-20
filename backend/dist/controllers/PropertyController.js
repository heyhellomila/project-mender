"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PropertyService_1 = __importDefault(require("../services/PropertyService"));
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const propertyController = express_1.default.Router();
exports.propertyController = propertyController;
propertyController.get('/:id', auth, async (req, res) => {
    try {
        const property = await PropertyService_1.default.getPropertyById(req.params.id);
        return res.status(200).json(property);
    }
    catch (err) {
        return handleError(err, res);
    }
});
//# sourceMappingURL=PropertyController.js.map