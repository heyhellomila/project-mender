import { BadRequestError } from '../errors/BadRequestError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { Status } from '../enums/Status';
import { PropertyType } from '../enums/PropertyType';
import UserService from '../services/UserService';
import PropertyGateway from '../gateways/PropertyGateway';


class PropertyService {

    async propertyExists(id: string) {
        try {
            await PropertyGateway.getPropertyById(id);
        } catch (err) {
            return false;
        }
        return true;
    }

    async createProperty(user_id: string, name: string, type: string, address: string, status: string) {
        if (!await UserService.userExists(user_id))
            throw new ResourceNotFoundError("User with id " + user_id + " does not exist.")

        if (!(status in Status)) {
            throw new BadRequestError('Invalid Status. Allowed Types: [' 
                + Object.keys(Status) +']');
        }

        if (!(type in PropertyType)) {
            throw new BadRequestError('Invalid Property Type. Allowed Types: [' 
                + Object.keys(PropertyType) +']');
        }
        
        try {
            return await PropertyGateway.createProperty(user_id, name, type, address, status);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async getPropertiesByUser(user_id: string) {
        if (!await UserService.userExists(user_id)) {
            throw new ResourceNotFoundError("User with id " + user_id + " does not exist.")
        }
        try {
            return await PropertyGateway.getPropertiesByUser(user_id);
        } catch (err) {
            throw err;
        }
    }

    async getPropertyById(id: string) {
        try {
            return await PropertyGateway.getPropertyById(id);
        } catch (err) {
            throw err;
        }
    }

    // async updatePropertyById(id: string, propertyObj){
    //     if(!await this.getPropertyById(id))
    //         throw new ResourceNotFoundError('Property with id ' + id + ' does not exist.')
    //     try {
    //         return await PropertyGateway.updatePropertyById(id, propertyObj);
    //     } catch (err) {
    //         throw new BadRequestError(err.message);
    //     }
    // }
}

export default new PropertyService();
