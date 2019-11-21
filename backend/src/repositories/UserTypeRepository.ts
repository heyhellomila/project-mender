import { UserType } from '../entities/UserType';
import { Connection, getConnection } from 'typeorm';
import { BaseRepository } from './BaseRepository';

class UserTypeRepository extends BaseRepository<UserType> {

    async getUserType(type: string) {
        return await this.getRepositoryConnection(UserType).findOne({type: type});
    }
}

export { UserTypeRepository };
