import { BusinessUserRoleRepository } from '../repositories/BusinessUserRoleRepository';
import { BusinessUserRole as BusinessUserRoleEnum } from '../enums/BusinessUserRole';
import { BusinessUserRole as BusinessUserRole } from '../entities/BusinessUserRole';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { getNewLogger } from '../Log4jsConfig'

const businessUserRoleServiceLogger = getNewLogger('BusinessUserRoleService');

class BusinessUserRoleService {

    private businessUserRoleRepository : BusinessUserRoleRepository;

    constructor(businessUserRoleRepository?: BusinessUserRoleRepository) {
        this.businessUserRoleRepository = businessUserRoleRepository
            ? businessUserRoleRepository : new BusinessUserRoleRepository();
    }

    async getBusinessUserRole(role: string) {
        const businessUserRoleObj: BusinessUserRole = await this.businessUserRoleRepository
            .getBusinessUserRole(role);
        if (!businessUserRoleObj) {
            businessUserRoleServiceLogger.error('404 ResourceNotFoundError - Invalid Role. Allowed Types: [' +
                `${Object.keys(BusinessUserRoleEnum)}]`);
            throw new ResourceNotFoundError('Invalid Role. Allowed Types: [' +
                `${Object.keys(BusinessUserRoleEnum)}]`);
        }
        return businessUserRoleObj;
    }
}

export { BusinessUserRoleService };
