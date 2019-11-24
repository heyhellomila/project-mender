import { Property } from '../entities/Property';
import { PropertyDTO } from '../dtos/PropertyDTO';
import { ObjectMapper } from './ObjectMapper';
import { UserMapper } from './UserMapper';
import { ActivityStatusMapper } from './ActivityStatusMapper';
import { PropertyTypeMapper } from './PropertyTypeMapper';

class PropertyMapper implements ObjectMapper<Property, PropertyDTO> {

    private userMapper : UserMapper = new UserMapper();
    private activityStatusMapper : ActivityStatusMapper = new ActivityStatusMapper();
    private propertyTypeMapper : PropertyTypeMapper = new PropertyTypeMapper();

    toDTO(property: Property) : PropertyDTO {
        var propertyDTO : PropertyDTO = new PropertyDTO();
        propertyDTO.id = property.id;
        if (property.user) {
            propertyDTO.user = this.userMapper.toDTO(property.user);
        }
        propertyDTO.name = property.name;
        propertyDTO.address = property.address;
        if (property.activityStatus) {
            propertyDTO.activityStatus = this.activityStatusMapper.toDTO(property.activityStatus);
        }
        if (property.propertyType) {
            propertyDTO.propertyType = this.propertyTypeMapper.toDTO(property.propertyType);
        }
        return propertyDTO;
    }
}

export { PropertyMapper };
