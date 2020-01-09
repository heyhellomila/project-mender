import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { BadRequestError } from '../errors/BadRequestError';
import { LicenseType as LicenseTypeEnum } from '../enums/LicenseType';
import { LicenseType } from '../entities/LicenseType';
import { LicenseTypeService } from './LicenseTypeService';
import { LicenseStatus as LicenseStatusEnum } from '../enums/LicenseStatus';
import { LicenseStatus } from '../entities/LicenseStatus';
import { LicenseStatusService } from './LicenseStatusService';
import { User } from '../entities/User';
import { UserType as UserTypeEnum } from '../enums/UserType';
import { UserService } from './UserService';
import { LicenseRepository } from '../repositories/LicenseRepository';
import { License } from '../entities/License';
import { LicenseTypeCategories } from '../constants/LicenseTypeCategories'
import { UserType } from 'src/entities/UserType';

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

    async licenseTypeExists(user: User, licenseType: LicenseType) {
        const license: License = await this.licenseRepository.getLicenseByUserAndLicenseType(user, licenseType);
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

    async getLicensesByUser(userId: number) {
        const user: User = await this.userService.getUser(userId);
        if (!user) {
            throw new ResourceNotFoundError("User with id " + userId + " does not exist.")
        }
        if (user.userType.type == UserTypeEnum.HOMEOWNER) {
            throw new BadRequestError("Cannot provide licenses for user of type 'HOMEOWNER'.")
        }
        try {
            return await this.licenseRepository.getLicensesByUser(user);
        } catch (err) {
            throw err;
        }
    }

    async createLicense(userId: number, license: License) {
        if (!(await this.userService.userExists(userId))) {
            throw new ResourceNotFoundError("User with id " + userId + " does not exist.");
        }
        const user: User = await this.userService.getUser(userId);
        user.id = userId;

        if (!license.licenseNumber) {
            throw new BadRequestError("License number is required.")
        }
        license.licenseNumber = license.licenseNumber;

        if (!license.licenseType) {
            throw new BadRequestError("License type is required.")
        }

        if (user.userType.type == UserTypeEnum.INSPECTOR && !Object.keys(LicenseTypeCategories.InspectorTypes).includes(license.licenseType.type)) {
            throw new BadRequestError("License type is required to be an Inspector type.")
        } else if (user.userType.type == UserTypeEnum.CONTRACTOR && !Object.keys(LicenseTypeCategories.ContractorTypes).includes(license.licenseType.type)) {
            throw new BadRequestError("License type is required to be a Contractor type.")
        } else if (user.userType.type == UserTypeEnum.HOMEOWNER) {
            throw new BadRequestError("A Homeowner cannot add a license.")
        }

        if (this.licenseTypeExists(user, license.licenseType)) {
            throw new ResourceExistsError("License of type " + license.licenseType.type + " for user " + userId + " already exists")
        }
 
        if (this.licenseExists(license.licenseNumber, license.licenseType)) {
            throw new ResourceExistsError("License with number " + license.licenseNumber + " and type " + license.licenseType.type + " already exists.")
        }
        license.licenseType = await this.licenseTypeService.getLicenseType(license.licenseType.type);

        // LicenseStatus will have to be obtained via webscraper. For now, by default it is active
        // if (!license.licenseStatus) {
        //     throw new BadRequestError("License status cannot be found.")
        // }

        license.licenseStatus = await this.licenseStatusService.getLicenseStatus(LicenseStatusEnum.ACTIVE);

        license.user = user;

        try {
            return await this.licenseRepository.createLicense(license);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }
}

export { LicenseService };
