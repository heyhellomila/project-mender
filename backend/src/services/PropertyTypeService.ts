import { PropertyTypeRepository } from '../repositories/PropertyTypeRepository';
import { PropertyType as PropertyTypeEnum } from '../enums/PropertyType';
import { PropertyType } from '../entities/PropertyType';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

class PropertyTypeService {

    private propertyTypeRepository : PropertyTypeRepository = new PropertyTypeRepository();

    async getPropertyType(type: string) {
        const propertyType: PropertyType = await this.propertyTypeRepository.getPropertyType(type);
        if (!propertyType) {
            throw new ResourceNotFoundError('Invalid Property Type. Allowed Types: [' 
                + Object.keys(PropertyTypeEnum) +']');
        }
        return propertyType;
    }
}

export { PropertyTypeService };
