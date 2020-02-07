import { License } from '../../entities/License';
import { LicenseTypeDataProvider } from './LicenseTypeDataProvider';
import { User } from '../../entities/User';
import { LicenseStatusDataProvider } from './LicenseStatusDataProvider';
import { LicenseType } from '../../entities/LicenseType';
import { LicenseStatus } from '../../entities/LicenseStatus';

class LicenseDataProvider {

    static getLicense(id: number, licenseNumber: number, licenseType: string,
                      licenseStatus: string, user: User) : License;
    static getLicense(id: number, licenseNumber: number, licenseType: LicenseType,
                      licenseStatus: LicenseStatus, user: User) : License;

    static getLicense(id: number, licenseNumber: number, licenseType: string | LicenseType,
                      licenseStatus: string | LicenseStatus, user: User) : License {
        const license : License = new License();
        license.id = id;
        license.licenseNumber = licenseNumber;
        if (typeof licenseType === 'string') {
            license.licenseType = LicenseTypeDataProvider.getLicenseType(null, licenseType);
        } else {
            license.licenseType = licenseType;
        }
        if (typeof licenseStatus === 'string') {
            license.licenseStatus = LicenseStatusDataProvider.getLicenseStatus(null, licenseStatus);
        } else {
            license.licenseStatus = licenseStatus;
        }
        license.user = user;
        return license;
    }
}

export { LicenseDataProvider };
