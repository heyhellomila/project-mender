import { BusinessUser } from '../entities/BusinessUser';
import { BusinessUserDTO } from '../dtos/BusinessUserDTO';
import { ObjectMapper } from './ObjectMapper';
import { UserRoleMapper } from './BusinessUserRoleMapper';
import { BusinessUserRoleDTO } from '../dtos/BusinessUserRoleDTO';
import { UserMapper } from './UserMapper';
import { BusinessMapper } from './BusinessMapper';
import { BadRequestError } from '../errors/BadRequestError';

class BusinessUserMapper implements ObjectMapper<BusinessUser, BusinessUserDTO> {

    private businessUserRoleMapper : UserRoleMapper = new UserRoleMapper();
    private userMapper : UserMapper = new UserMapper();
    private businessMapper : BusinessMapper = new BusinessMapper();

    toDTO(businessUser: BusinessUser) : BusinessUserDTO {
        const businessUserDTO : BusinessUserDTO = new BusinessUserDTO();
        businessUserDTO.id = businessUser.id;
        if (businessUser.businessUserRole) {
            businessUserDTO.businessUserRole = this.businessUserRoleMapper.toDTO(businessUser.businessUserRole);
        }
        if (businessUser.user) {
            businessUserDTO.user = this.userMapper.toDTO(businessUser.user);
        }
        if (businessUser.business) {
            businessUserDTO.business = this.businessMapper.toDTO(businessUser.business);
        }

        return businessUserDTO;
    }

    fromDTO(businessUserDTO: BusinessUserDTO) : BusinessUser {
        const businessUser : BusinessUser = new BusinessUser();
        businessUser.id = businessUserDTO.id;
        if (businessUserDTO.businessUserRole) {
            businessUser.businessUserRole = this.businessUserRoleMapper.fromDTO(new BusinessUserRoleDTO(businessUserDTO.businessUserRole as string));
        }
        return businessUser;
    }
}

export { BusinessUserMapper };
