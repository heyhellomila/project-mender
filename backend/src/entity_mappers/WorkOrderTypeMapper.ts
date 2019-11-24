import { ObjectMapper } from './ObjectMapper';
import { WorkOrderType } from '../entities/WorkOrderType';
import { WorkOrderTypeDTO } from '../dtos/WorkOrderTypeDTO';
import { WorkOrderType as WorkOrderTypeEnum } from '../enums/WorkOrderType';
import { BadRequestError } from '../errors/BadRequestError';

class WorkOrderTypeMapper implements ObjectMapper<WorkOrderType, WorkOrderTypeDTO> {

    toDTO(workOrderType: WorkOrderType) : WorkOrderTypeDTO {
        var workOrderTypeDTO : WorkOrderTypeDTO = new WorkOrderTypeDTO();
        workOrderTypeDTO.type = workOrderType.type;
        return workOrderTypeDTO;
    }

    fromDTO(workOrderTypeDTO: WorkOrderTypeDTO) : WorkOrderType {
        var workOrderType : WorkOrderType = new WorkOrderType();
        if (!(workOrderTypeDTO.type in WorkOrderTypeEnum)) {
            throw new BadRequestError('Invalid Work Order Type. Allowed Types: [' 
                + Object.keys(WorkOrderTypeEnum) +']');
        }
        workOrderType.type = workOrderTypeDTO.type;
        return workOrderType;
    }
}

export { WorkOrderTypeMapper };
