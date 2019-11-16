const Property = require('../models/Property');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError')

const PropertyGateway = {

    async getPropertiesByUser(user_id) {
        const properties = await Property.find({user_id: user_id});
        return properties;
    },

    async getPropertyById(id) {
        const property = await Property.findById(id);
        if (!property) {
            throw new ResourceNotFoundError('Property with id ' + id + ' does not exist');
        }
        return property;
    },
    
    async createProperty(user_id, name, type, address) {
        const property = new Property({
            user_id: user_id,
            name: name,
            type: type,
            address: address
        });
        try {
            return await property.save();
        } catch (err) {
            throw new Error(err);
        }
    },

    async updatePropertyById(id, propertyObj) {
        try{
        return await Property.update({_id: id},{
            $set: propertyObj,
        }, { runValidators: true });
        }catch(err){
            throw new Error(err);
        }
    }
}
module.exports = PropertyGateway
