import { License } from '../entities/License';
import { User } from '../entities/User';
import { LicenseType } from '../entities/LicenseType'
import { BaseRepository } from './BaseRepository';
import { FindOptions } from 'typeorm';

class LicenseRepository extends BaseRepository<License> {

    async getLicenseById(id: number, fieldOptions?: FindOptions<License>) {
        return await this.getRepositoryConnection(License).findOne(id, fieldOptions);
    }

    async getLicenseByLicenseNumberAndType(licenseNumber: number, licenseType: LicenseType, fieldOptions?: FindOptions<License>) {
        fieldOptions 
            ? fieldOptions.where = { licenseNumber: licenseNumber, licenseType: licenseType }
            : fieldOptions = { where: {licenseNumber: licenseNumber, licenseType: licenseType} };
        return await this.getRepositoryConnection(License).findOne(fieldOptions);
    }

    async getLicenseByUserAndLicenseType(user: User, licenseType: LicenseType, fieldOptions?: FindOptions<License>) {
        fieldOptions 
            ? fieldOptions.where = { user: user, licenseType: licenseType }
            : fieldOptions = { where: {user: user, licenseType: licenseType} };
        return await this.getRepositoryConnection(License).findOne(fieldOptions);
    }

    async getLicensesByUser(user: User, fieldOptions?: FindOptions<License>) {
        fieldOptions 
            ? fieldOptions.where = { user: user }
            : fieldOptions = { where: {user: user} };
        return await this.getRepositoryConnection(License).find(fieldOptions);
    }

    async createLicense(license: License) {
        return await this.getRepositoryConnection(License).save(license);
    }
}

export { LicenseRepository };
