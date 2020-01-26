import { ActivityStatus } from '../entities/ActivityStatus';
import { BaseRepository } from './BaseRepository';

class ActivityStatusRepository extends BaseRepository<ActivityStatus> {

    async getActivityStatus(status: string) {
        return await this.getRepositoryConnection(ActivityStatus).findOne({ status });
    }
}

export { ActivityStatusRepository };
