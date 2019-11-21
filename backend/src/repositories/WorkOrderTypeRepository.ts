import { WorkOrderType } from '../entities/WorkOrderType';
import { BaseRepository } from './BaseRepository';

class WorkOrderTypeRepository extends BaseRepository<WorkOrderType> {

    async getWorkOrderType(type: string) {
        return await this.getRepositoryConnection(WorkOrderType).findOne({type: type});
    }
}

export { WorkOrderTypeRepository };
