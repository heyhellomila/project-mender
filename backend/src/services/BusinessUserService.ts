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
import { BUSINESS_USER_FIELDS, BUSINESS_USER_FIELDS_NO_USER } from '../constants/FindOptionsFields'

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

    async getBusinessUser(id: number) {
        const businessUser: BusinessUser = await this.businessUserRepository.getBusinessUserById(id, BUSINESS_USER_FIELDS);
        if (!businessUser) {
            throw new ResourceNotFoundError("Business User with id " + id + " does not exist.");
        }
        return businessUser;
    }

    async getBusinessUsersByUser(userId: number) {
        if (!(await this.userService.userExists(userId))) {
            throw new ResourceNotFoundError("User with id " + userId + " does not exist.");
        }
        const user = await this.userService.getUser(userId);
        return await this.businessUserRepository.getBusinessUsersByUser(user, BUSINESS_USER_FIELDS_NO_USER);
    }



    async createBusinessUser(userId: number, businessUser: BusinessUser) {
        if (!(await this.businessService.getBusinessById(businessUser.business.id))) {
            throw new ResourceExistsError("This business does not exist.")
        }
        businessUser.business = await this.businessService.getBusinessById(businessUser.business.id);
        
        if (!(await this.userService.userExists(userId))) {
            throw new ResourceNotFoundError("User with id " + userId + " does not exist.");
        }
        businessUser.user = await this.userService.getUser(userId);

        if (await this.businessUserExists(businessUser.business, businessUser.user)) {
            throw new ResourceExistsError("This business user aready exists.")
        }

        //system will eventually send creation requests to admins to approve user creation (creation_state [PENDING, APPROVED])
        if (await this.businessUserRepository.businessUsersExist(businessUser.business)) {
            businessUser.businessUserRole = await this.businessUserRoleService.getUserRole(BusinessUserRoleEnum.ADMIN as string);
        }
        else {
            businessUser.businessUserRole = await this.businessUserRoleService.getUserRole(BusinessUserRoleEnum.EMPLOYEE as string);
        }

        try {
            return await this.businessUserRepository.createBusinessUser(businessUser);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }
}

export { BusinessUserService };
