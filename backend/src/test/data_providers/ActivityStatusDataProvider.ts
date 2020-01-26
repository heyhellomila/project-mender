import { ActivityStatus } from '../../entities/ActivityStatus';

class ActivityStatusDataProvider {

    static getActivityStatus(id: number, status: string) : ActivityStatus {
        const activityStatus : ActivityStatus = new ActivityStatus();
        activityStatus.id = id;
        activityStatus.status = status;
        return activityStatus;
    }
}

export { ActivityStatusDataProvider };
