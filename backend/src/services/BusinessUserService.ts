import { BusinessUserRepository } from '../repositories/BusinessUserRepository';
import { BusinessUser } from '../entities/BusinessUser';
import { BusinessUserRoleService } from './BusinessUserRoleService';
import { BusinessUserRole as BusinessUserRoleEnum } from '../enums/BusinessUserRole';
import { UserService } from './UserService';
import { User } from '../entities/User';
import { BusinessService } from './BusinessService';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { BadRequestError } from '../errors/BadRequestError';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { Business } from 'src/entities/Business';
import { BUSINESS_USER_FIELDS, BUSINESS_USER_FIELDS_NO_USER, BUSINESS_USER_FIELDS_NO_BUSINESS } from '../constants/FindOptionsFields'

class BusinessUserService {

    private businessUserRepository : BusinessUserRepository = new BusinessUserRepository();
    private businessUserRoleService : BusinessUserRoleService = new BusinessUserRoleService();
    private userService : UserService = new UserService();
    private businessService : BusinessService = new BusinessService();

    async businessUserExists(business: Business, user: User) {
        const businessUser: BusinessUser = await this.businessUserRepository.getBusinessUserByData(business, user);
        if (!businessUser) {
            return false;
        } else {
            return true;
        }
    }

    async getBusinessUserByData(businessId: number, userId: number) {
        const business = await this.businessService.getBusinessById(businessId);
        const user = await this.userService.getUser(userId);

        const businessUser: BusinessUser = await this.businessUserRepository.getBusinessUserByData(business, user, BUSINESS_USER_FIELDS);
        if (!businessUser) {
            throw new ResourceNotFoundError("Business User with user id " + userId + " and business id " + businessId + " does not exist.");
        }
        return businessUser;
    }

    async getBusinessesByUser(userId: number) {
        if (!(await this.userService.getUser(userId))) {
            throw new ResourceNotFoundError("User with id " + userId + " does not exist.");
        }
        const user = await this.userService.getUser(userId);
        const businessUsers = await this.businessUserRepository.getBusinessUsersByUser(user, BUSINESS_USER_FIELDS_NO_USER);    
        const businesses : Business[] = [];
        businessUsers.map((businessUser) => {
            businesses.push(businessUser.business);
        });
        return businesses;
    }

    async getUsersByBusiness(businessId: number) {
        if (!(await this.businessService.getBusinessById(businessId))) {
            throw new ResourceExistsError("Business with id " + businessId + " does not exist.")
        }
        const business = await this.businessService.getBusinessById(businessId);
        const businessUsers =  await this.businessUserRepository.getBusinessUsersByBusiness(business, BUSINESS_USER_FIELDS_NO_BUSINESS);
        const users : User[] = [];
        businessUsers.map((businessUser) => {
            users.push(businessUser.user);
        });
        return users;
    }

    async createBusinessUser(businessId: number, userId: number) {
        const businessUser = new BusinessUser();
        businessUser.business = await this.businessService.getBusinessById(businessId);
        businessUser.user = await this.userService.getUser(userId);

        if (await this.businessUserExists(businessUser.business, businessUser.user)) {
            throw new ResourceExistsError("This business user aready exists.")
        }

        //system will eventually send creation requests to admins to approve user creation (creation_state [PENDING, APPROVED])
        businessUser.businessUserRole = await this.businessUserRoleService.getUserRole(BusinessUserRoleEnum.EMPLOYEE as string);
        
        return await this.businessUserRepository.createBusinessUser(businessUser);
    }
}

export { BusinessUserService };