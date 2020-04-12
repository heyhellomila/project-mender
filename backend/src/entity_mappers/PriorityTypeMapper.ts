import { ObjectMapper } from './ObjectMapper';
import { PriorityType } from '../entities/PriorityType';
import { PriorityTypeDTO } from '../dtos/PriorityTypeDTO';
import { PriorityType as PriorityTypeEnum } from '../enums/PriorityType';
import { BadRequestError } from '../errors/BadRequestError';
import { getNewLogger } from '../Log4jsConfig'

const priorityTypeMapperLogger = getNewLogger('PriorityTypeMapper');

class PriorityTypeMapper implements ObjectMapper<PriorityType, PriorityTypeDTO> {

    toDTO(priorityType: PriorityType) : PriorityTypeDTO {
        const priorityTypeDTO : PriorityTypeDTO = new PriorityTypeDTO();
        priorityTypeDTO.type = priorityType.type;
        return priorityTypeDTO;
    }

    fromDTO(priorityTypeDTO: PriorityTypeDTO) : PriorityType {
        const priorityType : PriorityType = new PriorityType();
        if (!(priorityTypeDTO.type in PriorityTypeEnum)) {
            priorityTypeMapperLogger.error('400 BadRequestError - Invalid Priority Type. Allowed Types: ['
                + `${Object.keys(PriorityTypeEnum)}]`);
            throw new BadRequestError('Invalid Priority Type. Allowed Types: ['
                + `${Object.keys(PriorityTypeEnum)}]`);
        }
        priorityType.type = priorityTypeDTO.type;
        return priorityType;
    }
}

export { PriorityTypeMapper };
