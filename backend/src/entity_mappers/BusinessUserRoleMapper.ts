import { ObjectMapper } from './ObjectMapper';
import { BusinessUserRole } from '../entities/BusinessUserRole';
import { BusinessUserRoleDTO } from '../dtos/BusinessUserRoleDTO';
import { BusinessUserRole as BusinessUserRoleEnum } from '../enums/BusinessUserRole';
import { BadRequestError } from '../errors/BadRequestError';

class UserRoleMapper implements ObjectMapper<BusinessUserRole, BusinessUserRoleDTO> {

    toDTO(userRole: BusinessUserRole) : BusinessUserRoleDTO {
        const userRoleDTO : BusinessUserRoleDTO = new BusinessUserRoleDTO();
        userRoleDTO.role = userRole.role;
        return userRoleDTO;
    }

    fromDTO(userRoleDTO: BusinessUserRoleDTO) : BusinessUserRole {
        const userRole : BusinessUserRole = new BusinessUserRole();
        if (!(userRoleDTO.role in BusinessUserRoleEnum)) {
            throw new BadRequestError('Invalid User Role. Allowed Types: [' +
                `${Object.keys(BusinessUserRoleEnum)}]`);
        }
        userRole.role = userRoleDTO.role;
        return userRole;
    }
}

export { UserRoleMapper };
