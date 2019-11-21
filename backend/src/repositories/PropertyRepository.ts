import { Property } from '../entities/Property';
import { PropertyType } from '../entities/PropertyType';
import { Status } from '../entities/Status';
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


    async createProperty(user: User, name: string, propertyType: PropertyType, 
        address: string, status: Status) {

        const property = new Property();
        property.user = user;
        property.name = name;
        property.address = address;
        property.propertyType = propertyType;
        property.status = status;
        try {
            return await this.getRepositoryConnection(Property).save(property);
        } catch (err) {
            throw new Error(err);
        }
    }

    async updatePropertyById(id: number, property: Property) {
        await this.getRepositoryConnection(Property).update({id: id}, property);
    }
}

export { PropertyRepository };
