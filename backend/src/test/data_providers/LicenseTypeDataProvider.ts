import { LicenseType } from '../../entities/LicenseType';

class LicenseTypeDataProvider {

    static getLicenseType(id: number, type: string) : LicenseType {
        const licenseType : LicenseType = new LicenseType();
        licenseType.id = id;
        licenseType.type = type;
        return licenseType;
    }
}

export { LicenseTypeDataProvider };
