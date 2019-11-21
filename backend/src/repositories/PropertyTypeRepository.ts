import { PropertyType } from '../entities/PropertyType';
import { Connection, getConnection } from 'typeorm';

class PropertyTypeRepository {

    async getPropertyType(type: string) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(PropertyType);
        return await repository.findOne({type: type});
    }
}

export { PropertyTypeRepository };
