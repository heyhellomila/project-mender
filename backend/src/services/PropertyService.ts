import { BadRequestError } from '../errors/BadRequestError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ActivityStatus as ActivityStatusEnum } from '../enums/ActivityStatus';
import { UserService } from './UserService';
import { PropertyRepository } from '../repositories/PropertyRepository';
import { Property } from '../entities/Property';
import { ActivityStatusService } from './ActivityStatusService';
import { PropertyTypeService } from './PropertyTypeService';
import { User } from '../entities/User';
import { PROPERTY_FIELDS, PROPERTY_FIELDS_NO_USER } from '../constants/FindOptionsFields';
import { postcodeValidator } from 'postcode-validator';

class PropertyService {

    private userService : UserService;
    private activityStatusService : ActivityStatusService;
    private propertyTypeService : PropertyTypeService;
    private propertyRepository : PropertyRepository;

    constructor(userService?: UserService, activityStatusService?: ActivityStatusService,
                propertyTypeService?: PropertyTypeService,
                propertyRepository?: PropertyRepository) {

        this.userService = userService
            ? userService : new UserService();
        this.activityStatusService = activityStatusService
            ? activityStatusService : new ActivityStatusService();
        this.propertyTypeService = propertyTypeService
            ? propertyTypeService : new PropertyTypeService();
        this.propertyRepository = propertyRepository
            ? propertyRepository : new PropertyRepository();
    }

    async createProperty(userId: number, property: Property) {
        if (!postcodeValidator(property.postalCode, property.countryCode)) {
            throw new BadRequestError(`Postal code ${property.postalCode} is invalid for given country ` +
                `${property.countryCode}`);
        }

        property.user =  await this.userService.getUser(userId);
        property.propertyType = await this.propertyTypeService.getPropertyType(
            property.propertyType.type);
        property.activityStatus = await this.activityStatusService.getActivityStatus(
            ActivityStatusEnum.ACTIVE);

        return await this.propertyRepository.createProperty(property);
    }

    async getProperties(userId: number, status?: string) {
        const user: User = await this.userService.getUser(userId);
        if (status) {
            return await this.propertyRepository.getPropertiesByUserAndActivityStatus(
                user, await this.activityStatusService.getActivityStatus(status),
                PROPERTY_FIELDS_NO_USER);
        }
        return await this.propertyRepository.getPropertiesByUser(
            user, PROPERTY_FIELDS_NO_USER);
    }

    async getPropertyById(id: number) {
        const property : Property = await this.propertyRepository.getPropertyById(
            id, PROPERTY_FIELDS);
        if (!property) {
            throw new ResourceNotFoundError(`Property with id ${id} does not exist.`);
        }
        return property;
    }

    async updatePropertyById(id: number, propertyObj: Property) {
        const property: Property = new Property();

        await this.getPropertyById(id);

        if (propertyObj.activityStatus != null) {
            property.activityStatus = await this.activityStatusService
                .getActivityStatus(propertyObj.activityStatus.status);
        }

        if (propertyObj.propertyType != null) {
            property.propertyType = await this.propertyTypeService
                .getPropertyType(propertyObj.propertyType.type);
        }

        if (propertyObj.name != null) {
            property.name = propertyObj.name;
        }

        if (propertyObj.address != null) {
            property.address = propertyObj.address;
        }

        if (propertyObj.postalCode != null) {
            property.postalCode = propertyObj.postalCode;
        }

        if (propertyObj.countryCode != null) {
            property.countryCode = propertyObj.countryCode;
        }

        if (propertyObj.province != null) {
            property.province = propertyObj.province;
        }

        return await this.propertyRepository.updatePropertyById(id, property);
    }
}

export { PropertyService };
