import { ObjectMapper } from './ObjectMapper';
import { PropertyType } from '../entities/PropertyType';
import { PropertyTypeDTO } from '../dtos/PropertyTypeDTO';
import { PropertyType as PropertyTypeEnum } from '../enums/PropertyType';
import { BadRequestError } from '../errors/BadRequestError';

class PropertyTypeMapper implements ObjectMapper<PropertyType, PropertyTypeDTO> {

    toDTO(propertyType: PropertyType) : PropertyTypeDTO {
        const propertyTypeDTO : PropertyTypeDTO = new PropertyTypeDTO();
        propertyTypeDTO.type = propertyType.type;
        return propertyTypeDTO;
    }

    fromDTO(propertyTypeDTO: PropertyTypeDTO) : PropertyType {
        const propertyType : PropertyType = new PropertyType();
        if (!(propertyTypeDTO.type in PropertyTypeEnum)) {
            throw new BadRequestError('Invalid Property Type. Allowed Types: ['
                + `${Object.keys(PropertyTypeEnum)}]`);
        }
        propertyType.type = propertyTypeDTO.type;
        return propertyType;
    }
}

export { PropertyTypeMapper };
