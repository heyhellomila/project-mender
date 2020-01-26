import { BusinessUser } from '../entities/BusinessUser';
import { Business } from '../entities/Business';
import { BaseRepository } from './BaseRepository';
import { User } from 'src/entities/User';
import { FindOptions } from 'typeorm';

class BusinessUserRepository extends BaseRepository<BusinessUser> {

    async getBusinessUserById(id: number, fieldOptions?: FindOptions<BusinessUser>) {
        return await this.getRepositoryConnection(BusinessUser).findOne(id, fieldOptions);
    }

    async getBusinessUserByData(business: Business, user: User, fieldOptions?: FindOptions<BusinessUser>) {
        fieldOptions 
            ? fieldOptions.where = { business: business, user: user }
            : fieldOptions = { where: {business: business, user: user} };
        return await this.getRepositoryConnection(BusinessUser).findOne(fieldOptions);
    }

    async getBusinessUsersByUser(user: User, fieldOptions?: FindOptions<BusinessUser>) {
        fieldOptions 
            ? fieldOptions.where = { user: user }
            : fieldOptions = { where: {user: user} };
        return await this.getRepositoryConnection(BusinessUser).find(fieldOptions);
    }

    async getBusinessUsersByBusiness(business: Business, fieldOptions?: FindOptions<BusinessUser>) {
        fieldOptions 
            ? fieldOptions.where = { business: business }
            : fieldOptions = { where: {business: business} };
        return await this.getRepositoryConnection(BusinessUser).find(fieldOptions);
    }

    async businessUsersExist(business: Business) {
        return await this.getRepositoryConnection(BusinessUser).findOne({business: business});
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
