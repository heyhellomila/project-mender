import { BusinessUserRole } from '../entities/BusinessUserRole';
import { BaseRepository } from './BaseRepository';

class BusinessUserRoleRepository extends BaseRepository<BusinessUserRole> {

    async getBusinessUserRole(role: string) {
        return await this.getRepositoryConnection(BusinessUserRole).findOne({ role });
    }
}

export { BusinessUserRoleRepository };
