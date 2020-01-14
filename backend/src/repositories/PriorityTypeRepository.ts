import { PriorityType } from '../entities/PriorityType';
import { BaseRepository } from './BaseRepository';

class PriorityTypeRepository extends BaseRepository<PriorityType> {

    async getPriorityType(type: string) {
        return await this.getRepositoryConnection(PriorityType).findOne({ type });
    }
}

export { PriorityTypeRepository };
