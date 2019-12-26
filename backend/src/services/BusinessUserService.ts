import { BusinessUserRepository } from '../repositories/BusinessUserRepository';
import { BusinessUser } from '../entities/BusinessUser';
import { BusinessUserRoleService } from './BusinessUserRoleService';
import { UserService } from './UserService';
import { BusinessService } from './BusinessService';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { BadRequestError } from '../errors/BadRequestError';

class BusinessUserService {

    private businessUserRepository : BusinessUserRepository = new BusinessUserRepository();
    private userRoleService : BusinessUserRoleService = new BusinessUserRoleService();
    private userService : UserService = new UserService();
    private businessService : BusinessService = new BusinessService();

    async businessUserExists(businessUserData: BusinessUser) {
        const businessUser: BusinessUser = await this.businessUserRepository.getBusinessUserByData(businessUserData);
        if (!businessUser) {
            return false;
        } else {
            return true;
        }
    }

    async getBusinessUser(id: number) {
        const businessUser: BusinessUser = await this.businessUserRepository.getBusinessUserById(id);
        if (!businessUser) {
            throw new ResourceNotFoundError("Business User with id " + id + " does not exist.");
        }
        return businessUser;
    }

    async createBusinessUser(businessUser: BusinessUser) {
        if (this.businessUserExists(businessUser)) {
            throw new BadRequestError("This business user aready exists.")
        }
        businessUser.userRole = await this.userRoleService.getUserRole(businessUser.userRole.role);
        businessUser.user = await this.userService.getUser(businessUser.user.id);
        businessUser.business = await this.businessService.getBusinessById(businessUser.business.id);
        try {
            return await this.businessUserRepository.createBusinessUser(businessUser);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }
}

export { BusinessUserService };
