import { BusinessType } from '../entities/BusinessType';
import { BaseRepository } from './BaseRepository';

class BusinessTypeRepository extends BaseRepository<BusinessType> {

    async getBusinessType(type: string) {
        return await this.getRepositoryConnection(BusinessType).findOne({type: type});
    }
}

export { BusinessTypeRepository };
