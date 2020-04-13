import { PriorityTypeRepository } from '../repositories/PriorityTypeRepository';
import { PriorityType as PriorityTypeEnum } from '../enums/PriorityType';
import { PriorityType } from '../entities/PriorityType';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { getNewLogger } from '../Log4jsConfig'

const priorityTypeServiceLogger = getNewLogger('PriorityTypeService');

class PriorityTypeService {

    private priorityTypeRepository : PriorityTypeRepository;

    constructor(priorityTypeRepository?: PriorityTypeRepository) {
        if (priorityTypeRepository) {
            this.priorityTypeRepository = priorityTypeRepository;
        } else {
            this.priorityTypeRepository = new PriorityTypeRepository();
        }
    }

    async getPriorityType(type: string) {
        const priorityType: PriorityType = await this.priorityTypeRepository.getPriorityType(type);
        if (!priorityType) {
            priorityTypeServiceLogger.error('404 ResourceNotFoundError - Invalid Priority type. Allowed Types: [ ' +
            `${Object.keys(PriorityTypeEnum)} ]`);
            throw new ResourceNotFoundError('Invalid Priority type. Allowed Types: [ ' +
                `${Object.keys(PriorityTypeEnum)} ]`);
        }
        return priorityType;
    }
}

export { PriorityTypeService };
