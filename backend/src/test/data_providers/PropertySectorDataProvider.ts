import { PropertySector } from '../../entities/PropertySector';
import { Property } from '../../entities/Property';
import { Sector } from '../../entities/Sector';

class PropertySectorDataProvider {

    static getPropertySector(id: number, property: Property, sector: Sector, status: string)
        : PropertySector {
        const propertySector : PropertySector = new PropertySector();
        propertySector.id = id;
        propertySector.property = property;
        propertySector.sector = sector;
        propertySector.status = status;
        return propertySector;
    }
}

export { PropertySectorDataProvider };
