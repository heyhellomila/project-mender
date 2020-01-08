import { License } from '../entities/License';
import { User } from '../entities/User';
import { LicenseType } from '../entities/LicenseType'
import { BaseRepository } from './BaseRepository';

class LicenseRepository extends BaseRepository<License> {

    async getLicenseById(id: number) {
        return await this.getRepositoryConnection(License).findOne(id);
    }

    async getLicenseByLicenseNumberAndType(licenseNumber: number, licenseType: LicenseType) {
        const license = await this.getRepositoryConnection(License).findOne({licenseNumber: licenseNumber, licenseType: licenseType});
        return license;
    }

    async getLicenseByUserAndLicenseType(user: User, licenseType: LicenseType) {
        const license = await this.getRepositoryConnection(License).findOne({user: user, licenseType: licenseType});
        return license;
    }

    async getLicensesByUser(user: User) {
        const licenses = await this.getRepositoryConnection(License).find({user: user});
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
