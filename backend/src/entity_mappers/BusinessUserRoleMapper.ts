import { ObjectMapper } from './ObjectMapper';
import { BusinessUserRole } from '../entities/BusinessUserRole';
import { BusinessUserRoleDTO } from '../dtos/BusinessUserRoleDTO';
import { BusinessUserRole as BusinessUserRoleEnum } from '../enums/BusinessUserRole';
import { BadRequestError } from '../errors/BadRequestError';
import { getNewLogger } from '../Log4jsConfig'

const businessUserRoleMapperLogger = getNewLogger('BusinessUserRoleMapper');

class BusinessUserRoleMapper implements ObjectMapper<BusinessUserRole, BusinessUserRoleDTO> {

    toDTO(businessUserRole: BusinessUserRole) : BusinessUserRoleDTO {
        const businessUserRoleDTO : BusinessUserRoleDTO = new BusinessUserRoleDTO();
        businessUserRoleDTO.role = businessUserRole.role;
        return businessUserRoleDTO;
    }

    fromDTO(businessUserRoleDTO: BusinessUserRoleDTO) : BusinessUserRole {
        const businessUserRole : BusinessUserRole = new BusinessUserRole();
        if (!(businessUserRoleDTO.role in BusinessUserRoleEnum)) {
            businessUserRoleMapperLogger.error('400 BadRequestError - Invalid User Role. Allowed Types: [' +
                `${Object.keys(BusinessUserRoleEnum)}]`);
            throw new BadRequestError('Invalid User Role. Allowed Types: [' +
                `${Object.keys(BusinessUserRoleEnum)}]`);
        }
        businessUserRole.role = businessUserRoleDTO.role;
        return businessUserRole;
    }
}

export { BusinessUserRoleMapper };
