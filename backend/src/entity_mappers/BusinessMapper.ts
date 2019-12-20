import { Business } from '../entities/Business';
import { BusinessDTO } from '../dtos/BusinessDTO';
import { ObjectMapper } from './ObjectMapper';
import { BusinessTypeMapper } from './BusinessTypeMapper';
import { BadRequestError } from '../errors/BadRequestError';
import { BusinessTypeDTO } from '../dtos/BusinessTypeDTO';

class BusinessMapper implements ObjectMapper<Business, BusinessDTO> {

    private businessTypeMapper : BusinessTypeMapper = new BusinessTypeMapper();

    toDTO(business: Business) : BusinessDTO {
        var businessDTO : BusinessDTO = new BusinessDTO();
        businessDTO.id = business.id;
        businessDTO.NEQ = business.NEQ;
        businessDTO.name = business.name;
        if (business.businessType) {
            businessDTO.businessType = this.businessTypeMapper.toDTO(business.businessType);
        }
        return businessDTO;
    }

    fromDTO(businessDTO: BusinessDTO) : Business {
        var business : Business = new Business();
        business.id = businessDTO.id;
        business.NEQ = businessDTO.NEQ;
        business.name = businessDTO.name;
        if (businessDTO.businessType) {
            business.businessType = this.businessTypeMapper.fromDTO(new BusinessTypeDTO(businessDTO.businessType as string));
        }
        return business;
    }
}

export { BusinessMapper };
