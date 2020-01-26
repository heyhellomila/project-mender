import { Business } from '../entities/Business';
import { BaseRepository } from './BaseRepository';

class BusinessRepository extends BaseRepository<Business> {

    async getBusinessById(id: number) {
        return await this.getRepositoryConnection(Business).findOne(id);
    }

    async getBusinessByNEQ(neq: number) {
        return await this.getRepositoryConnection(Business).findOne({NEQ: neq});
    }

    async createBusiness(business: Business) {
        return await this.getRepositoryConnection(Business).save(business);
    }
}

export { BusinessRepository };
