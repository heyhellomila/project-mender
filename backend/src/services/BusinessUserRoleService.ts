import { BusinessUserRoleRepository } from '../repositories/BusinessUserRoleRepository';
import { BusinessUserRole as BusinessUserRoleEnum } from '../enums/BusinessUserRole';
import { BusinessUserRole as BusinessUserRole } from '../entities/BusinessUserRole';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

class BusinessUserRoleService {

    private userRoleRepository : BusinessUserRoleRepository = new BusinessUserRoleRepository();

    async getUserRole(role: string) {
        const userRoleObj: BusinessUserRole = await this.userRoleRepository.getUserRole(role);
        if (!userRoleObj) {
            throw new ResourceNotFoundError('Invalid Role. Allowed Types: [' +
                `${Object.keys(BusinessUserRoleEnum)}]`);
        }
        return userRoleObj;
    }
}

export { BusinessUserRoleService };
