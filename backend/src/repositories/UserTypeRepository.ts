import { UserType } from '../entities/UserType';
import { Connection, getConnection } from 'typeorm';

class UserTypeRepository {

    async getUserType(type: string) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(UserType);
        return await repository.findOne({type: type});
    }
}

export { UserTypeRepository };
