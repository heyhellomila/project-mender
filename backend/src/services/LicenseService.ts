import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { BadRequestError } from '../errors/BadRequestError';
import { LicenseType as LicenseTypeEnum } from '../enums/LicenseType';
import { LicenseType } from '../entities/LicenseType';
import { LicenseTypeService } from './LicenseTypeService';
import { LicenseStatus as LicenseStatusEnum } from '../enums/LicenseStatus';
import { LicenseStatus } from '../entities/LicenseStatus';
import { LicenseStatusService } from './LicenseStatusService';
import { UserService } from './UserService';
import { LicenseRepository } from '../repositories/LicenseRepository';
import { License } from '../entities/License';

class LicenseService {

    private licenseRepository: LicenseRepository = new LicenseRepository();
    private licenseTypeService: LicenseTypeService = new LicenseTypeService();
    private licenseStatusService: LicenseStatusService = new LicenseStatusService();
    private userService: UserService = new UserService();

    async licenseExists(licenseNumber: number, licenseType: LicenseType) {
        const license: License = await this.licenseRepository.getLicenseByLicenseNumberAndType(licenseNumber, licenseType);
        if (!license) {
            return false;
        } else {
            return true;
        }
    }

    async getLicenseById(id: number) {
        const license: License = await this.licenseRepository.getLicenseById(id);
        if (!license) {
            throw new ResourceNotFoundError("License with id " + id + " does not exist");
        } 
        return license;
    }

    async getLicenseByLicenseNumberAndType(licenseNumber: number, licenseType: LicenseType) {
        const license: License = await this.licenseRepository.getLicenseByLicenseNumberAndType(licenseNumber, licenseType);
        if (!license) {
            throw new ResourceNotFoundError("License with number " + licenseNumber + " and type " + licenseType.type + " does not exist");
        } 
        return license;
    }

    async createLicense(license: License) {
        if (!license.licenseNumber) {
            throw new BadRequestError("License number is required.")
        }

        if (!license.licenseType || !license.licenseStatus) {
            throw new BadRequestError("License type and License status are required.")
        }
 
        if (this.licenseExists(license.licenseNumber, license.licenseType)) {
            throw new ResourceExistsError("License with number " + license.licenseNumber + " and type " + license.licenseType.type + " already exists.")
        }

        license.licenseType = await this.licenseTypeService.getLicenseType(license.licenseType.type);
        license.licenseStatus = await this.licenseStatusService.getLicenseStatus(license.licenseStatus.status);
        license.user = await this.userService.getUser(license.user.id);

        try {
            return await this.licenseRepository.createLicense(license);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }
}

export { LicenseService };
