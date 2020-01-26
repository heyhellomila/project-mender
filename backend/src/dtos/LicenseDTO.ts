import { LicenseTypeDTO } from './LicenseTypeDTO';
import { LicenseStatusDTO } from './LicenseStatusDTO';
import { UserDTO } from './USerDTO';

export class LicenseDTO {

    id: number;
    user: UserDTO;
    licenseNumber: number;
    licenseType: LicenseTypeDTO | string;
    licenseStatus: LicenseStatusDTO | string;
    expiryDate: Date;
}
