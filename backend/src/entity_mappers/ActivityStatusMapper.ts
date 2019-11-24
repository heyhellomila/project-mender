import { ObjectMapper } from './ObjectMapper';
import { ActivityStatus } from '../entities/ActivityStatus';
import { ActivityStatusDTO } from '../dtos/ActivityStatusDTO';

class ActivityStatusMapper implements ObjectMapper<ActivityStatus, ActivityStatusDTO> {

    toDTO(activityStatus: ActivityStatus) : ActivityStatusDTO {
        var activityStatusDTO : ActivityStatusDTO = new ActivityStatusDTO();
        activityStatusDTO.status = activityStatus.status;
        return activityStatusDTO;
    }
}

export { ActivityStatusMapper };
