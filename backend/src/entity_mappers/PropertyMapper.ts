import { Property } from '../entities/Property';
import { PropertyDTO } from '../dtos/PropertyDTO';
import { ObjectMapper } from './ObjectMapper';
import { UserMapper } from './UserMapper';
import { ActivityStatusMapper } from './ActivityStatusMapper';
import { PropertyTypeMapper } from './PropertyTypeMapper';
import { PropertyTypeDTO } from '../dtos/PropertyTypeDTO';
import { ActivityStatusDTO } from '../dtos/ActivityStatusDTO';
import { BadRequestError } from '../errors/BadRequestError';
import { Province as ProvinceEnum } from '../enums/Province';
import { CountryCode as CountryCodeEnum } from '../enums/CountryCode';

class PropertyMapper implements ObjectMapper<Property, PropertyDTO> {

    private userMapper : UserMapper = new UserMapper();
    private activityStatusMapper : ActivityStatusMapper = new ActivityStatusMapper();
    private propertyTypeMapper : PropertyTypeMapper = new PropertyTypeMapper();

    toDTO(property: Property) : PropertyDTO {
        const propertyDTO : PropertyDTO = new PropertyDTO();
        propertyDTO.id = property.id;
        if (property.user) {
            propertyDTO.user = this.userMapper.toDTO(property.user);
        }
        propertyDTO.name = property.name;
        propertyDTO.address = property.address;
        propertyDTO.city = property.city;
        propertyDTO.province = property.province;
        propertyDTO.postalCode = property.postalCode;
        propertyDTO.countryCode = property.countryCode;
        if (property.activityStatus) {
            propertyDTO.activityStatus = this.activityStatusMapper.toDTO(property.activityStatus);
        }
        if (property.propertyType) {
            propertyDTO.propertyType = this.propertyTypeMapper.toDTO(property.propertyType);
        }
        return propertyDTO;
    }

    fromDTO(propertyDTO: PropertyDTO) : Property {
        const property : Property = new Property();

        property.id = propertyDTO.id;
        property.name = propertyDTO.name;
        property.address = propertyDTO.address;
        property.city = propertyDTO.city;

        if (propertyDTO.postalCode) {
            property.postalCode = propertyDTO.postalCode.replace(/\s/g, '');
        }

        if (propertyDTO.province) {
            if (!(propertyDTO.province in ProvinceEnum)) {
                throw new BadRequestError('Invalid province. Allowed Types: [' +
                    `${Object.keys(ProvinceEnum)}]`);
            }
            property.province = propertyDTO.province;
        }

        if (propertyDTO.countryCode) {
            if (!(propertyDTO.countryCode in CountryCodeEnum)) {
                throw new BadRequestError('Invalid country code. Allowed Types: [' +
                    `${Object.keys(CountryCodeEnum)}]`);
            }
            property.countryCode = propertyDTO.countryCode;
        }

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
