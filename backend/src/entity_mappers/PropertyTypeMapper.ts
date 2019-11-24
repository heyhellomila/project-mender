import { ObjectMapper } from './ObjectMapper';
import { PropertyType } from '../entities/PropertyType';
import { PropertyTypeDTO } from '../dtos/PropertyTypeDTO';

class PropertyTypeMapper implements ObjectMapper<PropertyType, PropertyTypeDTO> {

    toDTO(propertyType: PropertyType) : PropertyTypeDTO {
        var propertyTypeDTO : PropertyTypeDTO = new PropertyTypeDTO();
        propertyTypeDTO.type = propertyType.type;
        return propertyTypeDTO;
    }
}

export { PropertyTypeMapper };
