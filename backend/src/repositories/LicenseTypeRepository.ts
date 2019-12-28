import { LicenseType } from '../entities/LicenseType';
import { BaseRepository } from './BaseRepository';

class LicenseTypeRepository extends BaseRepository<LicenseType> {

    async getLicenseType(type: string) {
        return await this.getRepositoryConnection(LicenseType).findOne({type: type});
    }
}

export { LicenseTypeRepository };
