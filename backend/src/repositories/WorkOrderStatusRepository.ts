import { WorkOrderStatus } from '../entities/WorkOrderStatus';
import { BaseRepository } from './BaseRepository';

class WorkOrderStatusRepository extends BaseRepository<WorkOrderStatus> {

    async getWorkOrderStatus(status: string) {
        return await this.getRepositoryConnection(WorkOrderStatus).findOne({ status });
    }
}

export { WorkOrderStatusRepository };
