import { LicenseStatusRepository } from '../repositories/LicenseStatusRepository';
import { LicenseStatus as LicenseStatusEnum } from '../enums/LicenseStatus';
import { LicenseStatus } from '../entities/LicenseStatus';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

class LicenseStatusService {

    private licenseStatusRepository : LicenseStatusRepository = new LicenseStatusRepository();

    async getLicenseStatus(status: string) {
        const licenseStatusObj: LicenseStatus = await this
            .licenseStatusRepository.getLicenseStatus(status);
        if (!licenseStatusObj) {
            throw new ResourceNotFoundError('Invalid Status. Allowed Types: [' +
                `${Object.keys(LicenseStatusEnum)}]`);
        }
        return licenseStatusObj;
    }
}

export { LicenseStatusService };
