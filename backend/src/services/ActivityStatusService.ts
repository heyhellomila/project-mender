import { ActivityStatusRepository } from '../repositories/ActivityStatusRepository';
import { ActivityStatus as ActivityStatusEnum } from '../enums/ActivityStatus';
import { ActivityStatus } from '../entities/ActivityStatus';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

class ActivityStatusService {

    private activityStatusRepository : ActivityStatusRepository;

    constructor(activityStatusRepository?: ActivityStatusRepository) {
        if (activityStatusRepository) {
            this.activityStatusRepository = activityStatusRepository;
        } else {
            this.activityStatusRepository = new ActivityStatusRepository();
        }
    }

    async getActivityStatus(status: string) {
        const activityStatusObj: ActivityStatus = await this.activityStatusRepository
            .getActivityStatus(status);
        if (!activityStatusObj) {
            throw new ResourceNotFoundError('Invalid Status. Allowed Types: [ ' +
                `${Object.keys(ActivityStatusEnum)} ]`);
        }
        return activityStatusObj;
    }
}

export { ActivityStatusService };
