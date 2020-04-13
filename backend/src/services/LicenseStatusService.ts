import { LicenseStatusRepository } from '../repositories/LicenseStatusRepository';
import { LicenseStatus as LicenseStatusEnum } from '../enums/LicenseStatus';
import { LicenseStatus } from '../entities/LicenseStatus';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { getNewLogger } from '../Log4jsConfig'

const licenseStatusServiceLogger = getNewLogger('LicenseStatusService');

class LicenseStatusService {

    private licenseStatusRepository : LicenseStatusRepository;

    constructor(licenseStatusRepository?: LicenseStatusRepository) {
        this.licenseStatusRepository = licenseStatusRepository
            ? licenseStatusRepository : new LicenseStatusRepository();
    }

    async getLicenseStatus(status: string) {
        const licenseStatusObj: LicenseStatus = await this
            .licenseStatusRepository.getLicenseStatus(status);
        if (!licenseStatusObj) {
            licenseStatusServiceLogger.error('404 ResourceNotFoundError - Invalid Status. Allowed Types: [' +
                `${Object.keys(LicenseStatusEnum)}]`);
            throw new ResourceNotFoundError('Invalid Status. Allowed Types: [' +
                `${Object.keys(LicenseStatusEnum)}]`);
        }
        return licenseStatusObj;
    }
}

export { LicenseStatusService };
