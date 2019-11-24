import { Property } from '../entities/Property';
import { PropertyDTO } from '../dtos/PropertyDTO';
import { ObjectMapper } from './ObjectMapper';
import { UserMapper } from './UserMapper';
import { ActivityStatusMapper } from './ActivityStatusMapper';
import { PropertyTypeMapper } from './PropertyTypeMapper';
import { PropertyTypeDTO } from '../dtos/PropertyTypeDTO';
import { ActivityStatusDTO } from '../dtos/ActivityStatusDTO';

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

    fromDTO(propertyDTO: PropertyDTO) : Property {
        var property : Property = new Property();

        property.id = propertyDTO.id;
        property.name = propertyDTO.name;
        property.address = propertyDTO.address;

        if (propertyDTO.propertyType) {
            property.propertyType = this.propertyTypeMapper.fromDTO(
                new PropertyTypeDTO(propertyDTO.propertyType as string));
        }

        if (propertyDTO.activityStatus) {
            property.activityStatus = this.activityStatusMapper.fromDTO(
                new ActivityStatusDTO(propertyDTO.activityStatus as string));
        }

        return property;
    }
}

export { PropertyMapper };
