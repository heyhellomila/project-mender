import { License } from '../entities/License';
import { User } from '../entities/User';
import { LicenseType } from '../entities/LicenseType';
import { BaseRepository } from './BaseRepository';
import { FindOptions } from 'typeorm';

class LicenseRepository extends BaseRepository<License> {

    async getLicenseByLicenseNumberAndType(licenseNumber: number, licenseType: LicenseType,
                                           fieldOptions?: FindOptions<License>) {
        let finalFieldOptions = fieldOptions;
        finalFieldOptions
            ? finalFieldOptions.where = { licenseNumber, licenseType }
            : finalFieldOptions = { where: { licenseNumber, licenseType } };
        return await this.getRepositoryConnection(License).findOne(finalFieldOptions);
    }

    async getLicenseByUserAndLicenseType(user: User, licenseType: LicenseType,
                                         fieldOptions?: FindOptions<License>) {
        let finalFieldOptions = fieldOptions;
        finalFieldOptions
            ? finalFieldOptions.where = { user, licenseType }
            : finalFieldOptions = { where: { user, licenseType } };
        return await this.getRepositoryConnection(License).findOne(finalFieldOptions);
    }

    async getLicensesByUser(user: User, fieldOptions?: FindOptions<License>) {
        let finalFieldOptions = fieldOptions;
        finalFieldOptions
            ? finalFieldOptions.where = { user }
            : finalFieldOptions = { where: { user } };
        return await this.getRepositoryConnection(License).find(finalFieldOptions);
    }

    async createLicense(license: License) {
        return await this.getRepositoryConnection(License).save(license);
    }
}

export { LicenseRepository };
