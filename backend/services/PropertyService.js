const Property = require('../models/Property');
const PropertyGateway = require('../gateways/PropertyGateway');
const UserService = require('../gateways/UserService');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

class PropertyService {

    async propertyExists(id) {
        try {
            PropertyGateway.getPropertyById(id);
        } catch (err) {
            return false;
        }
        return true;
    }

    async createProperty(user_id, name, address) {

        if (!UserService.userExists(user_id)) {
            throw new ResourceNotFoundError("User" + user_id + 
            "does not exist. Cannot create property for nonexistent user.");
        }

        try {
            return await PropertyGateway.createProperty(user_id, name, address);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async getPropertiesByUser(user_id) {
        try {
            return await PropertyGateway.getPropertiesByUser(user_id);
        } catch (err) {
            throw err;
        }
    }

    async getPropertyById(id) {
        try {
            return await PropertyGateway.getPropertyById(id);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = PropertyService
