const PropertyGateway = require('../gateways/PropertyGateway');
const UserService = require('./UserService');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const userService = new UserService();

class PropertyService {

    async propertyExists(id) {
        try {
            await PropertyGateway.getPropertyById(id);
        } catch (err) {
            return false;
        }
        return true;
    }

    async createProperty(user_id, name, type, address) {
        if (!await userService.userExists(user_id))
            throw new ResourceNotFoundError("User with id " + user_id + " does not exist.")
        try {
            return await PropertyGateway.createProperty(user_id, name, type, address);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async getPropertiesByUser(user_id) {
        if (!await userService.userExists(user_id))
            throw new ResourceNotFoundError("User with id " + user_id + " does not exist.")
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