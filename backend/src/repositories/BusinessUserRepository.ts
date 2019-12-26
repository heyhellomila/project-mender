import { BusinessUser } from '../entities/BusinessUser';
import { BaseRepository } from './BaseRepository';

class BusinessUserRepository extends BaseRepository<BusinessUser> {

    async getBusinessUserById(id: number) {
        return await this.getRepositoryConnection(BusinessUser).findOne(id);
    }

    async getBusinessUserByData(businessUser: BusinessUser) {
        return await this.getRepositoryConnection(BusinessUser).findOne({business: businessUser.business, user: businessUser.user});
    }

    async createBusinessUser(businessUser: BusinessUser) {
        try {
            return await this.getRepositoryConnection(BusinessUser).save(businessUser);
        } catch (err) {
            throw new Error(err);
        }
    }
}
export { BusinessUserRepository };
