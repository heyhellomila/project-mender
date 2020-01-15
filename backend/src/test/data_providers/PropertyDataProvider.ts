import { Property } from '../../entities/Property';

class PropertyDataProvider {

    static getProperty(id: number) : Property {
        const property : Property = new Property();
        property.id = id;
        return property;
    }
}

export { PropertyDataProvider };
