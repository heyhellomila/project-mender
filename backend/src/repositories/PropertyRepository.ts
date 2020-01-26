import { Property } from '../entities/Property';
import { ActivityStatus } from '../entities/ActivityStatus';
import { User } from '../entities/User';
import { BaseRepository } from './BaseRepository';
import { FindOptions } from 'typeorm';

class PropertyRepository extends BaseRepository<Property> {

    async getPropertyById(id: number, fieldOptions?: FindOptions<Property>) {
        return await this.getRepositoryConnection(Property).findOne(id, fieldOptions);
    }

    async getPropertiesByUser(user: User, fieldOptions?: FindOptions<Property>) {
        fieldOptions
            ? fieldOptions.where = { user }
            : fieldOptions = { where: { user } };
        const properties = await this.getRepositoryConnection(Property).find(fieldOptions);
        return properties;
    }

    async getPropertiesByUserAndActivityStatus(user: User, activityStatus: ActivityStatus,
                                               fieldOptions?: FindOptions<Property>) {
        fieldOptions
            ? fieldOptions.where = { user, activityStatus }
            : fieldOptions = { where: { user, activityStatus } };
        const properties = await this.getRepositoryConnection(Property).find(fieldOptions);
        return properties;
    }

    async createProperty(property : Property) {
        return await this.getRepositoryConnection(Property).save(property);
    }

    async updatePropertyById(id: number, property: Property) {
        await this.getRepositoryConnection(Property).update({ id }, property);
    }
}

export { PropertyRepository };
