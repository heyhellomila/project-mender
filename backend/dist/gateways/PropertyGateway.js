"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResourceNotFoundError_1 = require("../errors/ResourceNotFoundError");
const Property_1 = __importDefault(require("../models/Property"));
class PropertyGateway {
    async getPropertiesByUser(user_id) {
        const properties = await Property_1.default.find({ user_id: user_id });
        return properties;
    }
    async getPropertyById(id) {
        const property = await Property_1.default.findById(id);
        if (!property) {
            throw new ResourceNotFoundError_1.ResourceNotFoundError('Property with id ' + id + ' does not exist');
        }
        return property;
    }
    async createProperty(user_id, name, type, address, status) {
        const property = new Property_1.default({
            user_id: user_id,
            name: name,
            type: type,
            address: address,
            status: status
        });
        try {
            return await property.save();
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
exports.default = new PropertyGateway();
//# sourceMappingURL=PropertyGateway.js.map