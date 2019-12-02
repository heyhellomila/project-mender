import { PropertySector } from '../entities/PropertySector';
import { BaseRepository } from './BaseRepository';
import { Property } from '../entities/Property';
import { PROPERTY_SECTOR_FIELDS } from '../constants/FindOptionsFields';
import { FindOptions } from 'typeorm';
import { Sector } from '../entities/Sector';

class PropertySectorRepository extends BaseRepository<PropertySector> {

    async save(propertySectors: PropertySector[]) {
        return await this.getRepositoryConnection(PropertySector).save(propertySectors);
    }

    async update(propertySectors: PropertySector[]) {
        return await this.getRepositoryConnection(PropertySector).save(propertySectors);
    }

    async getSectorsByProperty(property: Property) {
        const findOptions : FindOptions<PropertySector> = PROPERTY_SECTOR_FIELDS;
        findOptions.where = { property };
        return await this.getRepositoryConnection(PropertySector).find(findOptions);
    }

    async getPropertySectorByPropertyAndKind(property: Property, sector: Sector) {
        return await this.getRepositoryConnection(PropertySector).findOne({ property, sector });
    }
}

export { PropertySectorRepository };
