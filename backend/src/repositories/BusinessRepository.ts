import { Business } from '../entities/Business';
import { BaseRepository } from './BaseRepository';

class BusinessRepository extends BaseRepository<Business> {

    async getBusinessById(id: number) {
        return await this.getRepositoryConnection(Business).findOne(id);
    }

    async getBusinessByNEQ(neq: number) {
        const business = await this.getRepositoryConnection(Business).findOne({NEQ: neq});
        return business;
    }

    async createBusiness(business: Business) {
        try {
            return await this.getRepositoryConnection(Business).save(business);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { BusinessRepository };
