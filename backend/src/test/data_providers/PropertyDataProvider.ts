import { Property } from '../../entities/Property';
import { User } from '../../entities/User';
import { ActivityStatus } from '../../entities/ActivityStatus';
import { PropertyType } from '../../entities/PropertyType';

class PropertyDataProvider {

    static getProperty(id: number): Property;
    static getProperty(id: number, postalCode: string, countryCode: string, user: User,
                       propertyType: PropertyType): Property;
    static getProperty(id: number, postalCode: string, countryCode: string, user: User,
                       propertyType: PropertyType, activityStatus: ActivityStatus): Property;

    static getProperty(id: number, postalCode?: string, countryCode?: string, user?: User,
                       propertyType?: PropertyType, activityStatus?: ActivityStatus): Property {
        const property : Property = new Property();
        property.id = id;
        property.postalCode = postalCode;
        property.countryCode = countryCode;
        property.user = user;
        property.propertyType = propertyType;
        property.activityStatus = activityStatus;
        return property;
    }

    static getPropertyForUpdate(postalCode: string, countryCode: string,
                                propertyType: PropertyType,
                                activityStatus: ActivityStatus): Property {
        const property : Property = new Property();
        property.postalCode = postalCode;
        property.countryCode = countryCode;
        property.propertyType = propertyType;
        property.activityStatus = activityStatus;
        return property;
    }
}

export { PropertyDataProvider };
