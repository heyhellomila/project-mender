"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BadRequestError_1 = require("../errors/BadRequestError");
const ResourceNotFoundError_1 = require("../errors/ResourceNotFoundError");
const Status_1 = require("../enums/Status");
const PropertyType_1 = require("../enums/PropertyType");
const UserService_1 = __importDefault(require("../services/UserService"));
const PropertyGateway_1 = __importDefault(require("../gateways/PropertyGateway"));
class PropertyService {
    async propertyExists(id) {
        try {
            await PropertyGateway_1.default.getPropertyById(id);
        }
        catch (err) {
            return false;
        }
        return true;
    }
    async createProperty(user_id, name, type, address, status) {
        if (!await UserService_1.default.userExists(user_id))
            throw new ResourceNotFoundError_1.ResourceNotFoundError("User with id " + user_id + " does not exist.");
        if (!(status in Status_1.Status)) {
            throw new BadRequestError_1.BadRequestError('Invalid Status. Allowed Types: ['
                + Object.keys(Status_1.Status) + ']');
        }
        if (!(type in PropertyType_1.PropertyType)) {
            throw new BadRequestError_1.BadRequestError('Invalid Property Type. Allowed Types: ['
                + Object.keys(PropertyType_1.PropertyType) + ']');
        }
        try {
            return await PropertyGateway_1.default.createProperty(user_id, name, type, address, status);
        }
        catch (err) {
            throw new BadRequestError_1.BadRequestError(err.message);
        }
    }
    async getPropertiesByUser(user_id) {
        if (!await UserService_1.default.userExists(user_id)) {
            throw new ResourceNotFoundError_1.ResourceNotFoundError("User with id " + user_id + " does not exist.");
        }
        try {
            return await PropertyGateway_1.default.getPropertiesByUser(user_id);
        }
        catch (err) {
            throw err;
        }
    }
    async getPropertyById(id) {
        try {
            return await PropertyGateway_1.default.getPropertyById(id);
        }
        catch (err) {
            throw err;
        }
    }
}
exports.default = new PropertyService();
//# sourceMappingURL=PropertyService.js.map