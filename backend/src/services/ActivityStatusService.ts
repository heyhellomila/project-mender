import { ActivityStatusRepository } from '../repositories/ActivityStatusRepository';
import { ActivityStatus as ActivityStatusEnum } from '../enums/ActivityStatus';
import { ActivityStatus } from '../entities/ActivityStatus';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { getNewLogger } from '../Log4jsConfig'

const activityStatusServiceLogger = getNewLogger('ActivityStatusService');

class ActivityStatusService {

    private activityStatusRepository : ActivityStatusRepository;

    constructor(activityStatusRepository?: ActivityStatusRepository) {
        this.activityStatusRepository = activityStatusRepository
            ? activityStatusRepository : new ActivityStatusRepository();
    }

    async getActivityStatus(status: string) {
        const activityStatusObj: ActivityStatus = await this.activityStatusRepository
            .getActivityStatus(status);
        if (!activityStatusObj) { 
            activityStatusServiceLogger.error('404 ResourceNotFoundError - Invalid Status. Allowed Types: [ ' +
                `${Object.keys(ActivityStatusEnum)} ]`);
            throw new ResourceNotFoundError('Invalid Status. Allowed Types: [ ' +
                `${Object.keys(ActivityStatusEnum)} ]`);
        }
        return activityStatusObj;
    }
}

export { ActivityStatusService };
