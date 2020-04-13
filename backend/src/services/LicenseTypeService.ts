import { LicenseTypeRepository } from '../repositories/LicenseTypeRepository';
import { LicenseType as LicenseTypeEnum } from '../enums/LicenseType';
import { LicenseType } from '../entities/LicenseType';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { getNewLogger } from '../Log4jsConfig'

const licenseTypeServiceLogger = getNewLogger('LicenseTypeService');

class LicenseTypeService {

    private licenseTypeRepository : LicenseTypeRepository;

    constructor(licenseTypeRepository?: LicenseTypeRepository) {
        this.licenseTypeRepository = licenseTypeRepository
            ? licenseTypeRepository : new LicenseTypeRepository();
    }

    async getLicenseType(type: string) {
        const licenseTypeObj: LicenseType = await this.licenseTypeRepository.getLicenseType(type);
        if (!licenseTypeObj) {
            licenseTypeServiceLogger.error('404 ResourceNotFoundError - Invalid Type. Allowed Types: [' +
                `${Object.keys(LicenseTypeEnum)}]`);
            throw new ResourceNotFoundError('Invalid Type. Allowed Types: [' +
                `${Object.keys(LicenseTypeEnum)}]`);
        }
        return licenseTypeObj;
    }
}

export { LicenseTypeService };
