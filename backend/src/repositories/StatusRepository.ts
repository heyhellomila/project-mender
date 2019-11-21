import { Connection, getConnection } from 'typeorm';
import { Status } from '../entities/Status';
import { BaseRepository } from './BaseRepository';

class StatusRepository extends BaseRepository<Status> {

    async getStatus(status: string) {
        return await this.getRepositoryConnection(Status).findOne({status: status});
    }
}

export { StatusRepository };
