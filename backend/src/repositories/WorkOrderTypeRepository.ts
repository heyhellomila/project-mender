import { WorkOrderType } from '../entities/WorkOrderType';
import { Connection, getConnection } from 'typeorm';

class WorkOrderTypeRepository {

    async getWorkOrderType(type: string) {
        const connection : Connection = getConnection();
        const repository = connection.getRepository(WorkOrderType);
        return await repository.findOne({type: type});
    }
}

export { WorkOrderTypeRepository };
