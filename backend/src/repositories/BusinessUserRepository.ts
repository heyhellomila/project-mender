import { BusinessUser } from '../entities/BusinessUser';
import { Business } from '../entities/Business';
import { BaseRepository } from './BaseRepository';
import { User } from 'src/entities/User';
import { FindOptions } from 'typeorm';

class BusinessUserRepository extends BaseRepository<BusinessUser> {

    async getBusinessUserByData(business: Business, user: User,
                                fieldOptions?: FindOptions<BusinessUser>) {
        fieldOptions
            ? fieldOptions.where = { business, user }
            : fieldOptions = { where: { business, user } };
        return await this.getRepositoryConnection(BusinessUser).findOne(fieldOptions);
    }

    async getBusinessUsersByUser(user: User, fieldOptions?: FindOptions<BusinessUser>) {
        fieldOptions
            ? fieldOptions.where = { user }
            : fieldOptions = { where: { user } };
        return await this.getRepositoryConnection(BusinessUser).find(fieldOptions);
    }

    async getBusinessUsersByBusiness(business: Business, fieldOptions?: FindOptions<BusinessUser>) {
        fieldOptions
            ? fieldOptions.where = { business }
            : fieldOptions = { where: { business } };
        return await this.getRepositoryConnection(BusinessUser).find(fieldOptions);
    }

    async createBusinessUser(businessUser: BusinessUser) {
        return await this.getRepositoryConnection(BusinessUser).save(businessUser);
    }
}
export { BusinessUserRepository };
