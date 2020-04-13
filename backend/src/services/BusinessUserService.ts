import { BusinessUserRepository } from '../repositories/BusinessUserRepository';
import { BusinessUser } from '../entities/BusinessUser';
import { BusinessUserRoleService } from './BusinessUserRoleService';
import { BusinessUserRole as BusinessUserRoleEnum } from '../enums/BusinessUserRole';
import { UserService } from './UserService';
import { User } from '../entities/User';
import { BusinessService } from './BusinessService';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { Business } from 'src/entities/Business';
import { BUSINESS_USER_FIELDS, BUSINESS_USER_FIELDS_NO_USER,
    BUSINESS_USER_FIELDS_NO_BUSINESS } from '../constants/FindOptionsFields';
import { getNewLogger } from '../Log4jsConfig'

const businessUserServiceLogger = getNewLogger('BusinessUserService');

class BusinessUserService {

    private businessUserRepository : BusinessUserRepository;
    private businessUserRoleService : BusinessUserRoleService;
    private userService : UserService;
    private businessService : BusinessService;

    constructor(businessUserRepository?: BusinessUserRepository,
                businessUserRoleService?: BusinessUserRoleService, userService?: UserService,
                businessService?: BusinessService) {
        this.businessUserRepository = businessUserRepository
            ? businessUserRepository : new BusinessUserRepository();
        this.businessUserRoleService = businessUserRoleService
            ? businessUserRoleService : new BusinessUserRoleService();
        this.userService = userService
            ? userService : new UserService();
        this.businessService = businessService
            ? businessService : new BusinessService();
    }

    async getBusinessUserByBusinessAndUser(business: Business, user: User) {
        return await this.businessUserRepository.getBusinessUserByBusinessAndUser(business, user);
    }

    async getBusinessUserByBusinessIdAndUserId(businessId: number, userId: number) {
        const business = await this.businessService.getBusinessById(businessId);
        const user = await this.userService.getUser(userId);

        const businessUser: BusinessUser = await this.businessUserRepository
            .getBusinessUserByBusinessAndUser(business, user, BUSINESS_USER_FIELDS);
        if (!businessUser) {
            businessUserServiceLogger.error(`404 ResourceNotFoundError - Business User with user id ${userId} ` +
                `and business id ${businessId} does not exist.`);
            throw new ResourceNotFoundError(`Business User with user id ${userId} ` +
                `and business id ${businessId} does not exist.`);
        }
        return businessUser;
    }

    async getBusinessesByUserId(userId: number) {
        const user = await this.userService.getUser(userId);
        const businessUsers = await this.businessUserRepository
            .getBusinessUsersByUser(user, BUSINESS_USER_FIELDS_NO_USER);
        const businesses : Business[] = [];
        businessUsers.map((businessUser) => {
            businesses.push(businessUser.business);
        });
        return businesses;
    }

    async getUsersByBusinessId(businessId: number) {
        const business = await this.businessService.getBusinessById(businessId);
        const businessUsers =  await this.businessUserRepository
            .getBusinessUsersByBusiness(business, BUSINESS_USER_FIELDS_NO_BUSINESS);
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

        if (await this.getBusinessUserByBusinessAndUser(businessUser.business, businessUser.user)) {
            businessUserServiceLogger.error(`409 ResourceExistsError - Business user with user id ${userId} ` +
                `and business id ${businessId} already exists.`);
            throw new ResourceExistsError(`Business user with user id ${userId} ` +
                `and business id ${businessId} already exists.`);
        }

        // system will eventually send creation requests to admins to approve user creation
        // (creation_state [PENDING, APPROVED])
        businessUser.businessUserRole = await this.businessUserRoleService
            .getBusinessUserRole(BusinessUserRoleEnum.EMPLOYEE as string);

        return await this.businessUserRepository.createBusinessUser(businessUser);
    }
}

export { BusinessUserService };
