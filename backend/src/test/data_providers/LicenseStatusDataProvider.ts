import { LicenseStatus } from '../../entities/LicenseStatus';

class LicenseStatusDataProvider {

    static getLicenseStatus(id: number, status: string) : LicenseStatus {
        const licenseStatus : LicenseStatus = new LicenseStatus();
        licenseStatus.id = id;
        licenseStatus.status = status;
        return licenseStatus;
    }
}

export { LicenseStatusDataProvider };
