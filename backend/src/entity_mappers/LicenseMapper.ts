import { License } from '../entities/License';
import { LicenseDTO } from '../dtos/LicenseDTO';
import { ObjectMapper } from './ObjectMapper';
import { UserMapper } from './UserMapper';
import { LicenseTypeMapper } from './LicenseTypeMapper';
import { LicenseStatusMapper } from './LicenseStatusMapper';
import { LicenseTypeDTO } from '../dtos/LicenseTypeDTO';
import { LicenseStatusDTO } from '../dtos/LicenseStatusDTO';

class LicenseMapper implements ObjectMapper<License, LicenseDTO> {

    private userMapper : UserMapper = new UserMapper();
    private licenseTypeMapper : LicenseTypeMapper = new LicenseTypeMapper();
    private licenseStatusMapper : LicenseStatusMapper = new LicenseStatusMapper();

    toDTO(license: License) : LicenseDTO {
        const licenseDTO : LicenseDTO = new LicenseDTO();
        licenseDTO.id = license.id;
        if (license.user) {
            licenseDTO.user = this.userMapper.toDTO(license.user);
        }
        licenseDTO.licenseNumber = license.licenseNumber;
        if (license.licenseType) {
            licenseDTO.licenseType = this.licenseTypeMapper.toDTO(license.licenseType);
        }
        if (license.licenseStatus) {
            licenseDTO.licenseStatus = this.licenseStatusMapper.toDTO(license.licenseStatus);
        }
        licenseDTO.expiryDate = license.expiryDate;
        return licenseDTO;
    }

    fromDTO(licenseDTO: LicenseDTO) : License {
        const license : License = new License();
        license.id = licenseDTO.id;
        license.licenseNumber = licenseDTO.licenseNumber;
        if (licenseDTO.licenseType) {
            license.licenseType = this.licenseTypeMapper.fromDTO(
                new LicenseTypeDTO(licenseDTO.licenseType as string));
        }
        if (licenseDTO.licenseStatus) {
            license.licenseStatus = this.licenseStatusMapper.fromDTO(
                new LicenseStatusDTO(licenseDTO.licenseStatus as string));
        }
        license.expiryDate = licenseDTO.expiryDate;
        return license;
    }
}

export { LicenseMapper };
