import { ObjectMapper } from './ObjectMapper';
import { LicenseStatus } from '../entities/LicenseStatus';
import { LicenseStatusDTO } from '../dtos/LicenseStatusDTO';
import { LicenseStatus as LicenseStatusEnum } from '../enums/LicenseStatus';
import { BadRequestError } from '../errors/BadRequestError';

class LicenseStatusMapper implements ObjectMapper<LicenseStatus, LicenseStatusDTO> {

    toDTO(licenseStatus: LicenseStatus) : LicenseStatusDTO {
        const licenseStatusDTO : LicenseStatusDTO = new LicenseStatusDTO();
        licenseStatusDTO.status = licenseStatus.status;
        return licenseStatusDTO;
    }

    fromDTO(licenseStatusDTO: LicenseStatusDTO) : LicenseStatus {
        const licenseStatus : LicenseStatus = new LicenseStatus();
        if (!(licenseStatusDTO.status in LicenseStatusEnum)) {
            throw new BadRequestError('Invalid License Status. Allowed Types: [' 
                + Object.keys(LicenseStatusEnum) +']');
        }
        licenseStatus.status = licenseStatusDTO.status;
        return licenseStatus;
    }
}

export { LicenseStatusMapper };
