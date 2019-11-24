import { ObjectMapper } from './ObjectMapper';
import { PriorityType } from '../entities/PriorityType';
import { PriorityTypeDTO } from '../dtos/PriorityTypeDTO';

class PriorityTypeMapper implements ObjectMapper<PriorityType, PriorityTypeDTO> {

    toDTO(priorityType: PriorityType) : PriorityTypeDTO {
        var priorityTypeDTO : PriorityTypeDTO = new PriorityTypeDTO();
        priorityTypeDTO.type = priorityType.type;
        return priorityTypeDTO;
    }
}

export { PriorityTypeMapper };
