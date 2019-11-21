import { BadRequestError } from '../errors/BadRequestError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { Status as StatusEnum } from '../enums/Status';
import { PropertyType as PropertyTypeEnum } from '../enums/PropertyType';
import { UserService } from './UserService';
import { PropertyRepository } from '../repositories/PropertyRepository';
import { Property } from '../entities/Property';
import { StatusService } from './StatusService';
import { Status } from '../entities/Status';
import { PropertyType } from '../entities/PropertyType';
import { PropertyTypeService } from './PropertyTypeService';
import { User } from '../entities/User';


class PropertyService {

    private userService : UserService = new UserService();
    private statusService : StatusService = new StatusService();
    private propertyTypeService : PropertyTypeService = new PropertyTypeService();
    private propertyRepository : PropertyRepository = new PropertyRepository();

    async propertyExists(id: number) {
        const property: Property =  await this.propertyRepository.getPropertyById(id);
        if (!property) {
            throw new ResourceNotFoundError("Property with id " + id + " does not exist");
        }
        return property;
    }

    async createProperty(userId: number, name: string, type: string, 
        address: string, status: string) {
        
        if (!await this.userService.userExists(Number(userId)))
            throw new ResourceNotFoundError("User with id " + userId + " does not exist.")

        if (!(status in StatusEnum)) {
            throw new BadRequestError('Invalid Status. Allowed Types: [' 
                + Object.keys(StatusEnum) +']');
        }

        if (!(type in PropertyTypeEnum)) {
            throw new BadRequestError('Invalid Property Type. Allowed Types: [' 
                + Object.keys(PropertyTypeEnum) +']');
        }

        const statusObj : Status = await this.statusService.getStatus(status);
        const propertyType : PropertyType = await this.propertyTypeService.getPropertyType(type);
        const user : User = new User();
        user.id = userId;

        try {
            return await this.propertyRepository.createProperty(user, 
                name, propertyType, address, statusObj);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async getPropertiesByUser(user_id: number) {
        const user: User = await this.userService.getUser(user_id);
        if (!user) {
            throw new ResourceNotFoundError("User with id " + user_id + " does not exist.")
        }
        try {
            return await this.propertyRepository.getPropertiesByUser(user);
        } catch (err) {
            throw err;
        }
    }

    async getPropertyById(id: number) {
        try {
            return await this.propertyRepository.getPropertyById(id);
        } catch (err) {
            throw err;
        }
    }

    async updatePropertyById(id: number, propertyObj: any){
        var property: Property = new Property();

        if(!await this.getPropertyById(id)) {
            throw new ResourceNotFoundError('Property with id ' + id + ' does not exist.')
        }

        if (propertyObj.status != null) {
            if (!(propertyObj.status in StatusEnum)) {
                throw new BadRequestError('Invalid Status. Allowed Types: [' 
                    + Object.keys(StatusEnum) +']');
            }
            property.status = await this.statusService.getStatus(propertyObj.status);
        }

        if (propertyObj.propertyType != null ) {
            if (!(propertyObj.propertyType in PropertyTypeEnum)) {
                throw new BadRequestError('Invalid Property Type. Allowed Types: [' 
                    + Object.keys(PropertyTypeEnum) +']');
            }
            property.propertyType = await this.propertyTypeService
                .getPropertyType(propertyObj.propertyType);
        }

        if (propertyObj.name != null) {
            property.name = propertyObj.name;
        }

        if (propertyObj.address != null) {
            property.address = propertyObj.address;
        }

        try {
            return await this.propertyRepository.updatePropertyById(id, property);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }
}

export { PropertyService };
