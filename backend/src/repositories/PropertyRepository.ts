import { Property } from '../entities/Property';
import { PropertyType } from '../entities/PropertyType';
import { ActivityStatus } from '../entities/ActivityStatus';
import { User } from '../entities/User';
import { BaseRepository } from './BaseRepository';

class PropertyRepository extends BaseRepository<Property> {

    async getPropertyById(id: number) {
        const property = await this.getRepositoryConnection(Property).findOne({id: id});
        return property;
    }

    async getPropertiesByUser(user: User) {
        const properties = await this.getRepositoryConnection(Property).find({user: user});
        return properties;
    }


    async createProperty(userId: number, name: string, propertyType: PropertyType, 
        address: string, activityStatus: ActivityStatus) {

        const property = new Property();
        property.userId = userId;
        property.name = name;
        property.address = address;
        property.propertyType = propertyType;
        property.activityStatus = activityStatus;
        try {
            const savedProperty : Property = await this.getRepositoryConnection(Property).save(property);
            return savedProperty;
        } catch (err) {
            throw new Error(err);
        }
    }

    async updatePropertyById(id: number, property: Property) {
        await this.getRepositoryConnection(Property).update({id: id}, property);
    }
}

export { PropertyRepository };
