import { ObjectMapper } from './ObjectMapper';
import { BusinessType } from '../entities/BusinessType';
import { BusinessTypeDTO } from '../dtos/BusinessTypeDTO';
import { BusinessType as BusinessTypeEnum } from '../enums/BusinessType';
import { BadRequestError } from '../errors/BadRequestError';

class BusinessTypeMapper implements ObjectMapper<BusinessType, BusinessTypeDTO> {

    toDTO(businessType: BusinessType) : BusinessTypeDTO {
        var businessTypeDTO : BusinessTypeDTO = new BusinessTypeDTO();
        businessTypeDTO.type = businessType.type;
        return businessTypeDTO;
    }

    fromDTO(businessTypeDTO: BusinessTypeDTO) : BusinessType {
        var businessType : BusinessType = new BusinessType();
        if (!(businessTypeDTO.type in BusinessTypeEnum)) {
            throw new BadRequestError('Invalid Activity Status. Allowed Types: [' 
                + Object.keys(BusinessTypeEnum) +']');
        }
        businessType.type = businessTypeDTO.type;
        return businessType;
    }
}

export { BusinessTypeMapper };
