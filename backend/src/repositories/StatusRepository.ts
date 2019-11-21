import { Connection, getConnection } from 'typeorm';
import { Status } from '../entities/Status';

class StatusRepository {

    async getStatus(status: string) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(Status);
        return await repository.findOne({status: status});
    }
}

export { StatusRepository };
