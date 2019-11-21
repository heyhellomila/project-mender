import { PriorityTypeRepository } from '../repositories/PriorityTypeRepository';
import { PriorityType as PriorityTypeEnum } from '../enums/PriorityType';
import { PriorityType } from '../entities/PriorityType';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

class PriorityTypeService {

    private priorityTypeRepository : PriorityTypeRepository = new PriorityTypeRepository();

    async getPriorityType(type: string) {
        const priorityType: PriorityType = await this.priorityTypeRepository.getPriorityType(type);
        if (!priorityType) {
            throw new ResourceNotFoundError('Invalid Priority type. Allowed Types: [' 
                + Object.keys(PriorityTypeEnum) +']');
        }
        return priorityType;
    }
}

export { PriorityTypeService };
