import { Property } from '../entities/Property';
import { Connection, getConnection } from 'typeorm';
import { PropertyType } from '../entities/PropertyType';
import { Status } from '../entities/Status';
import { User } from '../entities/User';

class PropertyRepository {

    async getPropertyById(id: number) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(Property);
        const property = await repository.findOne({id: id});
        return property;
    }

    async getPropertiesByUser(user: User) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(Property);
        const properties = await repository.find({user: user});
        return properties;
    }


    async createProperty(user: User, name: string, propertyType: PropertyType, 
        address: string, status: Status) {

        const connection : Connection = getConnection();
        const repository = connection.getRepository(Property);
        const property = new Property();
        property.user = user;
        property.name = name;
        property.address = address;
        property.propertyType = propertyType;
        property.status = status;
        try {
            return await repository.save(property);
        } catch (err) {
            throw new Error(err);
        }
    }

    async updatePropertyById(id: number, property: Property) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(Property);
        await repository.update({id: id}, property);
    }
}

export { PropertyRepository };
