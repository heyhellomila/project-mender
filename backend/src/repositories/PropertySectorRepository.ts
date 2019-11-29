import { PropertySector } from '../entities/PropertySector';
import { BaseRepository } from './BaseRepository';

class PropertySectorRepository extends BaseRepository<PropertySector> {

    async save(propertySectors: PropertySector[]) {
        return await this.getRepositoryConnection(PropertySector).save(propertySectors);
    }
}

export { PropertySectorRepository };
