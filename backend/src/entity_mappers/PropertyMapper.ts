import { Property } from '../entities/Property';
import { PropertyDTO } from '../dtos/PropertyDTO';
import { ObjectMapper } from './ObjectMapper';

class PropertyMapper implements ObjectMapper<Property, PropertyDTO> {

    toDTO(property: Property) : PropertyDTO {
        var propertyDTO : PropertyDTO = new PropertyDTO();
        propertyDTO.id = property.id;
        propertyDTO.userId = property.userId;
        propertyDTO.name = property.name;
        propertyDTO.address = property.address;
        propertyDTO.activityStatus = property.activityStatus.status;
        propertyDTO.propertyType = property.propertyType.type;
        return propertyDTO;
    }
}

export { PropertyMapper };
