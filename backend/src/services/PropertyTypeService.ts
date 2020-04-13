import { PropertyTypeRepository } from '../repositories/PropertyTypeRepository';
import { PropertyType as PropertyTypeEnum } from '../enums/PropertyType';
import { PropertyType } from '../entities/PropertyType';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { getNewLogger } from '../Log4jsConfig'

const propertyTypeServiceLogger = getNewLogger('PropertyTypeService');

class PropertyTypeService {

    private propertyTypeRepository : PropertyTypeRepository;

    constructor(propertyTypeRepository?: PropertyTypeRepository) {
        this.propertyTypeRepository = propertyTypeRepository
            ? propertyTypeRepository : new PropertyTypeRepository();
    }

    async getPropertyType(type: string) {
        const propertyType: PropertyType = await this.propertyTypeRepository.getPropertyType(type);
        if (!propertyType) {
            propertyTypeServiceLogger.error('404 ResourceNotFoundError - Invalid Property Type. Allowed Types: [ ' +
                `${Object.keys(PropertyTypeEnum)} ]`);
            throw new ResourceNotFoundError('Invalid Property Type. Allowed Types: [ ' +
                `${Object.keys(PropertyTypeEnum)} ]`);
        }
        return propertyType;
    }
}

export { PropertyTypeService };
