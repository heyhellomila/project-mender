import { ObjectMapper } from './ObjectMapper';
import { WorkOrderType } from '../entities/WorkOrderType';
import { WorkOrderTypeDTO } from '../dtos/WorkOrderTypeDTO';

class WorkOrderTypeMapper implements ObjectMapper<WorkOrderType, WorkOrderTypeDTO> {

    toDTO(workOrderType: WorkOrderType) : WorkOrderTypeDTO {
        var workOrderTypeDTO : WorkOrderTypeDTO = new WorkOrderTypeDTO();
        workOrderTypeDTO.type = workOrderType.type;
        return workOrderTypeDTO;
    }
}

export { WorkOrderTypeMapper };
