import { ObjectMapper } from './ObjectMapper';
import { WorkOrderStatus } from '../entities/WorkOrderStatus';
import { WorkOrderStatusDTO } from '../dtos/WorkOrderStatusDTO';
import { WorkOrderStatus as WorkOrderStatusEnum } from '../enums/WorkOrderStatus';
import { BadRequestError } from '../errors/BadRequestError';

class WorkOrderStatusMapper implements ObjectMapper<WorkOrderStatus, WorkOrderStatusDTO> {

    toDTO(workOrderStatus: WorkOrderStatus) : WorkOrderStatusDTO {
        var workOrderStatusDTO : WorkOrderStatusDTO = new WorkOrderStatusDTO();
        workOrderStatusDTO.status = workOrderStatus.status;
        return workOrderStatusDTO;
    }

    fromDTO(workOrderStatusDTO: WorkOrderStatusDTO) : WorkOrderStatus {
        var workOrderStatus : WorkOrderStatus = new WorkOrderStatus();
        if (!(workOrderStatusDTO.status in WorkOrderStatusEnum)) {
            throw new BadRequestError('Invalid Work Order Status. Allowed Statuses: [' 
                + Object.keys(WorkOrderStatusEnum) +']');
        }
        workOrderStatus.status = workOrderStatusDTO.status;
        return workOrderStatus;
    }
}

export { WorkOrderStatusMapper };