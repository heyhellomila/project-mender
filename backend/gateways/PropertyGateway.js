const Property = require('../models/Property');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError')

const PropertyGateway = {

    async getPropertiesByUser(user_id) {
        const properties = await Property.find({user_id: user_id});
        if (!properties) {
            throw new ResourceNotFoundError("Properties belonging to user_id " + user_id + " do not exist");
        }
        return properties;
    },

    async getPropertyById(id) {
        const property = await Property.findById(id);
        if (!property) {
            throw new ResourceNotFoundError("Property with id " + id + " does not exist");
        }
        return property;
    },
    
    async createProperty(user_id, name, address) {
        property = new Property({
            user_id: user_id,
            name: name,
            address: address
        });
        try {
            return await property.save();
        } catch (err) {
            throw new Error(err);
        }
    },

    async updateProperty(id, name, address) {
        property = this.getPropertyById(id);
        try {
            return await Property.updateOne({id: id},
                {
                    $set: {
                        name: name,
                        address: address
                    }
                }
                );
        } catch (err) {
            throw new Error(err);
        } 
    },

    async deleteProperty(id) {
        try {
            return await Property.deleteOne({id: id});
        } catch (err) {
            throw new Error(err);
        }
    }

}
module.exports = PropertyGateway
