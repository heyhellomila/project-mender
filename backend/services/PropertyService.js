const Property = require('../models/Property');
const PropertyGateway = require('../gateways/PropertyGateway');

class PropertyService {

    async propertyExists(id) {
        try {
            PropertyGateway.getPropertyById(id);
        } catch (err) {
            return false;
        }
        return true;
    }
}

module.exports = PropertyService