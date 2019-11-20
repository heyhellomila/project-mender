import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import Property from '../models/Property';

class PropertyGateway {

    async getPropertiesByUser(user_id: string) {
        const properties = await Property.find({user_id: user_id});
        return properties;
    }

    async getPropertyById(id: string) {
        const property = await Property.findById(id);
        if (!property) {
            throw new ResourceNotFoundError('Property with id ' + id + ' does not exist');
        }
        return property;
    }

    async createProperty(user_id: string, name: string, type: string, address: string, status: string) {
        const property = new Property({
            user_id: user_id,
            name: name,
            type: type,
            address: address,
            status: status
        });
        try {
            return await property.save();
        } catch (err) {
            throw new Error(err);
        }
    }

    // async updatePropertyById(id: number, propertyObj) {
    //     try{
    //     return await Property.update({_id: id},{
    //         $set: propertyObj,
    //     }, { runValidators: true });
    //     }catch(err){
    //         throw new Error(err);
    //     }
    // }
}

export default new PropertyGateway();
