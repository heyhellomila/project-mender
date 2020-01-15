import { PropertyType } from '../../entities/PropertyType';

class PropertyTypeDataProvider {

    static getPropertyType(id: number, type: string) : PropertyType {
        const propertyType : PropertyType = new PropertyType();
        propertyType.id = id;
        propertyType.type = type;
        return propertyType;
    }
}

export { PropertyTypeDataProvider };
