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
import { LICENSE_FIELDS_NO_USER } from '../constants/FindOptionsFields';

class LicenseService {

    private licenseRepository: LicenseRepository;
    private licenseTypeService: LicenseTypeService;
    private licenseStatusService: LicenseStatusService;
    private userService: UserService;

    constructor(licenseRepository?: LicenseRepository, licenseTypeService?: LicenseTypeService,
                licenseStatusService?: LicenseStatusService, userService?: UserService) {
        this.licenseRepository = licenseRepository
            ? licenseRepository : new LicenseRepository();
        this.licenseTypeService = licenseTypeService
            ? licenseTypeService : new LicenseTypeService();
        this.licenseStatusService = licenseStatusService
            ? licenseStatusService : new LicenseStatusService();
        this.userService = userService
            ? userService : new UserService();
    }

    async getLicenseByNumberAndType(licenseNumber: number, licenseType: LicenseType) {
        return await this.licenseRepository
            .getLicenseByLicenseNumberAndType(licenseNumber, licenseType);
    }

    async getLicensesByUserId(userId: number) {
        const user: User = await this.userService.getUser(userId);
        if (user.userType.type === UserTypeEnum.HOMEOWNER) {
            throw new BadRequestError('Cannot provide licenses for user of type \'HOMEOWNER\'.');
        }
        return await this.licenseRepository.getLicensesByUser(user, LICENSE_FIELDS_NO_USER);
    }

    async createLicense(userId: number, license: License) {
        license.user = await this.userService.getUser(userId);
        license.licenseType = await this.licenseTypeService
            .getLicenseType(license.licenseType.type);

        this.validateUserTypeAndLicenseType(
            license.user.userType.type, license.licenseType.type);

        if (await this.licenseRepository.getLicenseByUserAndLicenseType(
            license.user, license.licenseType)) {
            throw new ResourceExistsError(`License of type ${license.licenseType.type} ` +
                `for user ${userId} already exists`);
        }

        if (await this.getLicenseByNumberAndType(license.licenseNumber, license.licenseType)) {
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

    private validateUserTypeAndLicenseType(userType: string, licenseType: string) : void {
        if (userType === UserTypeEnum.INSPECTOR
            && !Object.values(LICENSE_TYPE_CATEGORIES.InspectorTypes)
                .includes(licenseType as LicenseTypeEnum)) {
            throw new BadRequestError(`User of type ${userType} ` +
                `can only have license types [${Object.keys(LICENSE_TYPE_CATEGORIES.InspectorTypes)}].`);
        } else if (userType === UserTypeEnum.CONTRACTOR
            && !Object.values(LICENSE_TYPE_CATEGORIES.ContractorTypes)
                .includes(licenseType as LicenseTypeEnum)) {
            throw new BadRequestError(`User of type ${userType} ` +
                `can only have license types [${Object.keys(LICENSE_TYPE_CATEGORIES.ContractorTypes)}].`);
        } else if (userType === UserTypeEnum.HOMEOWNER) {
            throw new BadRequestError('A Homeowner cannot add a license.');
        }
    }
}

export { LicenseService };
