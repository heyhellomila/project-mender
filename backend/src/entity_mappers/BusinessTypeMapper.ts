import { ObjectMapper } from './ObjectMapper';
import { BusinessType } from '../entities/BusinessType';
import { BusinessTypeDTO } from '../dtos/BusinessTypeDTO';
import { BusinessType as BusinessTypeEnum } from '../enums/BusinessType';
import { BadRequestError } from '../errors/BadRequestError';
import { getNewLogger } from '../Log4jsConfig'

const businessTypeMapperLogger = getNewLogger('BusinessTypeMapper');

class BusinessTypeMapper implements ObjectMapper<BusinessType, BusinessTypeDTO> {

    toDTO(businessType: BusinessType) : BusinessTypeDTO {
        const businessTypeDTO : BusinessTypeDTO = new BusinessTypeDTO();
        businessTypeDTO.type = businessType.type;
        return businessTypeDTO;
    }

    fromDTO(businessTypeDTO: BusinessTypeDTO) : BusinessType {
        const businessType : BusinessType = new BusinessType();
        if (!(businessTypeDTO.type in BusinessTypeEnum)) {
            businessTypeMapperLogger.error('400 BadRequestError - Invalid Business Type. Allowed Types: [' +
                `${Object.keys(BusinessTypeEnum)}]`);
            throw new BadRequestError('Invalid Business Type. Allowed Types: [' +
                `${Object.keys(BusinessTypeEnum)}]`);
        }
        businessType.type = businessTypeDTO.type;
        return businessType;
    }
}

export { BusinessTypeMapper };
