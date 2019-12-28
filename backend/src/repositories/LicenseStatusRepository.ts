import { LicenseStatus } from '../entities/LicenseStatus';
import { BaseRepository } from './BaseRepository';

class LicenseStatusRepository extends BaseRepository<LicenseStatus> {

    async getLicenseStatus(status: string) {
        return await this.getRepositoryConnection(LicenseStatus).findOne({status: status});
    }
}

export { LicenseStatusRepository };
