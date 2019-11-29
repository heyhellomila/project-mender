import { PropertySectorRepository } from '../repositories/PropertySectorRepository';
import { PropertySector } from '../entities/PropertySector';
import { BadRequestError } from '../errors/BadRequestError';
import { Property } from '../entities/Property';

class PropertySectorService {

    private propertySectorRepository : PropertySectorRepository = new PropertySectorRepository();

    async createPropertySectors(propertyId: number, propertySectors: PropertySector[]) {
        try {
            const property : Property = new Property();
            property.id  = propertyId;
            for (const propertySector of propertySectors) {
                propertySector.property = property;
            }
            return await this.propertySectorRepository.save(propertySectors);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }
}

export { PropertySectorService };
