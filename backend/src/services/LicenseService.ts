import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { BadRequestError } from '../errors/BadRequestError';
import { LicenseType as LicenseTypeEnum } from '../enums/LicenseType';
import { LicenseType } from '../entities/LicenseType';
import { LicenseTypeService } from './LicenseTypeService';
import { LicenseStatus as LicenseStatusEnum } from '../enums/LicenseStatus';
import { LicenseStatusService } from './LicenseStatusService';
import { User } from '../entities/User';
import { UserType as UserTypeEnum } from '../enums/UserType';
import { UserService } from './UserService';
import { LicenseRepository } from '../repositories/LicenseRepository';
import { License } from '../entities/License';
import { LICENSE_TYPE_CATEGORIES } from '../constants/LicenseTypeCategories';
import { LICENSE_FIELDS, LICENSE_FIELDS_NO_USER } from '../constants/FindOptionsFields';

class LicenseService {

    private licenseRepository: LicenseRepository = new LicenseRepository();
    private licenseTypeService: LicenseTypeService = new LicenseTypeService();
    private licenseStatusService: LicenseStatusService = new LicenseStatusService();
    private userService: UserService = new UserService();

    async licenseExists(licenseNumber: number, licenseType: LicenseType) {
        return await this.licenseRepository
            .getLicenseByLicenseNumberAndType(licenseNumber, licenseType);
    }

    async getLicensesByUser(userId: number) {
        const user: User = await this.userService.getUser(userId);
        if (!user) {
            throw new ResourceNotFoundError(`User with id ${userId} does not exist.`);
        }
        if (user.userType.type === UserTypeEnum.HOMEOWNER) {
            throw new BadRequestError('Cannot provide licenses for user of type \'HOMEOWNER\'.');
        }
        try {
            return await this.licenseRepository.getLicensesByUser(user, LICENSE_FIELDS_NO_USER);
        } catch (err) {
            throw err;
        }
    }

    async createLicense(userId: number, license: License) {
        const user: User = await this.userService.getUser(userId);
        license.user = user;
        license.licenseType = await this.licenseTypeService
            .getLicenseType(license.licenseType.type);

        if (user.userType.type === UserTypeEnum.INSPECTOR
            && !Object.values(LICENSE_TYPE_CATEGORIES.InspectorTypes)
                .includes(license.licenseType.type as LicenseTypeEnum)) {
            throw new BadRequestError('License type is required to be an Inspector type.');
        } else if (user.userType.type === UserTypeEnum.CONTRACTOR
            && !Object.values(LICENSE_TYPE_CATEGORIES.ContractorTypes)
                .includes(license.licenseType.type as LicenseTypeEnum)) {
            throw new BadRequestError('License type is required to be a Contractor type.');
        } else if (user.userType.type === UserTypeEnum.HOMEOWNER) {
            throw new BadRequestError('A Homeowner cannot add a license.');
        }

        if (await this.licenseRepository
            .getLicenseByUserAndLicenseType(user, license.licenseType)) {
            throw new ResourceExistsError(`License of type ${license.licenseType.type} ` +
                `for user ${userId} already exists`);
        }

        if (await this.licenseExists(license.licenseNumber, license.licenseType)) {
            throw new ResourceExistsError(`License of type ${license.licenseType.type} ` +
                `with number ${license.licenseNumber} already exists.`);
        }

        // LicenseStatus will have to be obtained via webscraper. For now, by default it is active
        // if (!license.licenseStatus) {
        //     throw new BadRequestError("License status cannot be found.")
        // }

        license.licenseStatus = await this.licenseStatusService
            .getLicenseStatus(LicenseStatusEnum.ACTIVE as string);

        return await this.licenseRepository.createLicense(license);
    }
}

export { LicenseService };
