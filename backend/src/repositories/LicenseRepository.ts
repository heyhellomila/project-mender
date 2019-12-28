import { License } from '../entities/License';
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

    async createLicense(license: License) {
        try {
            return await this.getRepositoryConnection(License).save(license);
        } catch (err) {
            throw new Error(err);
        }
    }
}

export { LicenseRepository };
