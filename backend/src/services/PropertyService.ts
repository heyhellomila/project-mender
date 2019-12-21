import { BadRequestError } from '../errors/BadRequestError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ActivityStatus as ActivityStatusEnum } from '../enums/ActivityStatus';
import { PropertyType as PropertyTypeEnum } from '../enums/PropertyType';
import { UserService } from './UserService';
import { PropertyRepository } from '../repositories/PropertyRepository';
import { Property } from '../entities/Property';
import { ActivityStatusService } from './ActivityStatusService';
import { PropertyTypeService } from './PropertyTypeService';
import { User } from '../entities/User';
import { PropertyFields, PropertyFieldsNoUser } from '../constants/FindOptionsFields';
import { postcodeValidator } from 'postcode-validator';

class PropertyService {

    private userService : UserService = new UserService();
    private activityStatusService : ActivityStatusService = new ActivityStatusService();
    private propertyTypeService : PropertyTypeService = new PropertyTypeService();
    private propertyRepository : PropertyRepository = new PropertyRepository();

    async propertyExists(id: number) {
        const property: Property =  await this.propertyRepository.getPropertyById(id);
        if (!property) {
            throw new ResourceNotFoundError(`Property with id ${id} does not exist`);
        }
        return property;
    }

    async createProperty(userId: number, property: Property) {

        if (!(await this.userService.userExists(userId))) {
            throw new ResourceNotFoundError(`User with id ${userId} does not exist.`);
        }

        if (!postcodeValidator(property.postalCode, property.countryCode)) {
            throw new BadRequestError(`Postal code ${property.postalCode} is invalid for given country ` +
                `${property.countryCode}`);
        }

        const user : User = new User();
        user.id = userId;

        property.activityStatus = await this.activityStatusService.getActivityStatus(
            ActivityStatusEnum.ACTIVE);
        property.propertyType = await this.propertyTypeService.getPropertyType(
            property.propertyType.type);
        property.user = user;

        try {
            return await this.propertyRepository.createProperty(property);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async getPropertiesByUser(userId: number) {
        const user: User = await this.userService.getUser(userId);
        if (!user) {
            throw new ResourceNotFoundError("User with id " + userId + " does not exist.")
        }
        try {
            return await this.propertyRepository.getPropertiesByUser(user, PropertyFieldsNoUser);
        } catch (err) {
            throw err;
        }
    }

    async getPropertyById(id: number) {
        const property : Property = await this.propertyRepository.getPropertyById(
            id, PropertyFields);
        if (!property) {
            throw new ResourceNotFoundError(`Property with id ${id} does not exist.`);
        }
        return property;
    }

    async updatePropertyById(id: number, propertyObj: any){
        var property: Property = new Property();

        if(!await this.getPropertyById(id)) {
            throw new ResourceNotFoundError('Property with id ' + id + ' does not exist.')
        }

        if (propertyObj.activityStatus != null) {
            if (!(propertyObj.activityStatus in ActivityStatusEnum)) {
                throw new BadRequestError('Invalid Status. Allowed Types: [' 
                    + Object.keys(ActivityStatusEnum) +']');
            }
            property.activityStatus = await this.activityStatusService.getActivityStatus(propertyObj.activityStatus);
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
