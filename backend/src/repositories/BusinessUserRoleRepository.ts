import { BusinessUserRole } from '../entities/BusinessUserRole';
import { BaseRepository } from './BaseRepository';

class BusinessUserRoleRepository extends BaseRepository<BusinessUserRole> {

    async getUserRole(role: string) {
        return await this.getRepositoryConnection(BusinessUserRole).findOne({ role });
    }
}

export { BusinessUserRoleRepository };
