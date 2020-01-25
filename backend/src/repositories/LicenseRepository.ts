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
        const license = await this.getRepositoryConnection(License).findOne(fieldOptions);
        return license;
    }

    async getLicenseByUserAndLicenseType(user: User, licenseType: LicenseType, fieldOptions?: FindOptions<License>) {
        fieldOptions 
            ? fieldOptions.where = { user: user, licenseType: licenseType }
            : fieldOptions = { where: {user: user, licenseType: licenseType} };
        const license = await this.getRepositoryConnection(License).findOne(fieldOptions);
        return license;
    }

    async getLicensesByUser(user: User, fieldOptions?: FindOptions<License>) {
        fieldOptions 
            ? fieldOptions.where = { user: user }
            : fieldOptions = { where: {user: user} };
        const licenses = await this.getRepositoryConnection(License).find(fieldOptions);
        return licenses;
    }

    async createLicense(license: License) {
        try {
            return await this.getRepositoryConnection(License).save(license);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { LicenseRepository };
