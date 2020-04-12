import { ObjectMapper } from './ObjectMapper';
import { WorkOrderType } from '../entities/WorkOrderType';
import { WorkOrderTypeDTO } from '../dtos/WorkOrderTypeDTO';
import { WorkOrderType as WorkOrderTypeEnum } from '../enums/WorkOrderType';
import { BadRequestError } from '../errors/BadRequestError';
import { getNewLogger } from '../Log4jsConfig'

const workOrderTypeMapperLogger = getNewLogger('WorkOrderTypeMapper');

class WorkOrderTypeMapper implements ObjectMapper<WorkOrderType, WorkOrderTypeDTO> {

    toDTO(workOrderType: WorkOrderType) : WorkOrderTypeDTO {
        const workOrderTypeDTO : WorkOrderTypeDTO = new WorkOrderTypeDTO();
        workOrderTypeDTO.type = workOrderType.type;
        return workOrderTypeDTO;
    }

    fromDTO(workOrderTypeDTO: WorkOrderTypeDTO) : WorkOrderType {
        const workOrderType : WorkOrderType = new WorkOrderType();
        if (!(workOrderTypeDTO.type in WorkOrderTypeEnum)) {
            workOrderTypeMapperLogger.error('400 BadRequestError - Invalid Work Order Type. Allowed Types: ['
                + `${Object.keys(WorkOrderTypeEnum)}]`);
            throw new BadRequestError('Invalid Work Order Type. Allowed Types: ['
                + `${Object.keys(WorkOrderTypeEnum)}]`);
        }
        workOrderType.type = workOrderTypeDTO.type;
        return workOrderType;
    }
}

export { WorkOrderTypeMapper };
