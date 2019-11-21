import { PropertyType } from '../entities/PropertyType';
import { Connection, getConnection } from 'typeorm';
import { BaseRepository } from './BaseRepository';

class PropertyTypeRepository extends BaseRepository<PropertyType> {

    async getPropertyType(type: string) {
        return await this.getRepositoryConnection(PropertyType).findOne({type: type});
    }
}

export { PropertyTypeRepository };
