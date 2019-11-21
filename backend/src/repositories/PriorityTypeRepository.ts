import { PriorityType } from '../entities/PriorityType';
import { Connection, getConnection } from 'typeorm';

class PriorityTypeRepository {

    async getPriorityType(type: string) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(PriorityType);
        return await repository.findOne({type: type});
    }
}

export { PriorityTypeRepository };
