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
        let finalFieldOptions = fieldOptions;
        finalFieldOptions
            ? finalFieldOptions.where = { user }
            : finalFieldOptions = { where: { user } };
        return await this.getRepositoryConnection(Property).find(finalFieldOptions);
    }

    async getPropertiesByUserAndActivityStatus(user: User, activityStatus: ActivityStatus,
                                               fieldOptions?: FindOptions<Property>) {
        let finalFieldOptions = fieldOptions;
        finalFieldOptions
            ? finalFieldOptions.where = { user, activityStatus }
            : finalFieldOptions = { where: { user, activityStatus } };
        return await this.getRepositoryConnection(Property).find(finalFieldOptions);
    }

    async createProperty(property : Property) {
        return await this.getRepositoryConnection(Property).save(property);
    }

    async updatePropertyById(id: number, property: Property) {
        await this.getRepositoryConnection(Property).update({ id }, property);
    }
}

export { PropertyRepository };
