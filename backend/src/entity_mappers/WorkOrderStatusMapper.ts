import { ObjectMapper } from './ObjectMapper';
import { WorkOrderStatus } from '../entities/WorkOrderStatus';
import { WorkOrderStatusDTO } from '../dtos/WorkOrderStatusDTO';
import { WorkOrderStatus as WorkOrderStatusEnum } from '../enums/WorkOrderStatusEnum';
import { BadRequestError } from '../errors/BadRequestError';
import { getNewLogger } from '../Log4jsConfig'

const workOrderStatusMapperLogger = getNewLogger('WorkOrderStatusMapper');

class WorkOrderStatusMapper implements ObjectMapper<WorkOrderStatus, WorkOrderStatusDTO> {

    toDTO(workOrderStatus: WorkOrderStatus) : WorkOrderStatusDTO {
        const workOrderStatusDTO : WorkOrderStatusDTO = new WorkOrderStatusDTO();
        workOrderStatusDTO.status = workOrderStatus.status;
        return workOrderStatusDTO;
    }

    fromDTO(workOrderStatusDTO: WorkOrderStatusDTO) : WorkOrderStatus {
        const workOrderStatus : WorkOrderStatus = new WorkOrderStatus();
        if (!(workOrderStatusDTO.status in WorkOrderStatusEnum)) {
            workOrderStatusMapperLogger.error('400 BadRequestError - Invalid Work Order Status. Allowed Statuses: ['
                + `${Object.keys(WorkOrderStatusEnum)}]`);
            throw new BadRequestError('Invalid Work Order Status. Allowed Statuses: ['
                + `${Object.keys(WorkOrderStatusEnum)}]`);
        }
        workOrderStatus.status = workOrderStatusDTO.status;
        return workOrderStatus;
    }
}

export { WorkOrderStatusMapper };
