import { ObjectMapper } from './ObjectMapper';
import { ActivityStatus } from '../entities/ActivityStatus';
import { ActivityStatusDTO } from '../dtos/ActivityStatusDTO';
import { ActivityStatus as ActivityStatusEnum } from '../enums/ActivityStatus';
import { BadRequestError } from '../errors/BadRequestError';

class ActivityStatusMapper implements ObjectMapper<ActivityStatus, ActivityStatusDTO> {

    toDTO(activityStatus: ActivityStatus) : ActivityStatusDTO {
        const activityStatusDTO : ActivityStatusDTO = new ActivityStatusDTO();
        activityStatusDTO.status = activityStatus.status;
        return activityStatusDTO;
    }

    fromDTO(activityStatusDTO: ActivityStatusDTO) : ActivityStatus {
        const activityStatus : ActivityStatus = new ActivityStatus();
        if (!(activityStatusDTO.status in ActivityStatusEnum)) {
            throw new BadRequestError('Invalid Activity Status. Allowed Types: ['
                + `${Object.keys(ActivityStatusEnum)}]`);
        }
        activityStatus.status = activityStatusDTO.status;
        return activityStatus;
    }
}

export { ActivityStatusMapper };
