import { BusinessUser } from '../entities/BusinessUser';
import { BusinessUserDTO } from '../dtos/BusinessUserDTO';
import { ObjectMapper } from './ObjectMapper';
import { UserRoleMapper } from './BusinessUserRoleMapper';
import { BusinessUserRoleDTO } from '../dtos/BusinessUserRoleDTO';
import { UserMapper } from './UserMapper';
import { BusinessMapper } from './BusinessMapper';
import { BadRequestError } from '../errors/BadRequestError';

class BusinessUserMapper implements ObjectMapper<BusinessUser, BusinessUserDTO> {

    private userRoleMapper : UserRoleMapper = new UserRoleMapper();
    private userMapper : UserMapper = new UserMapper();
    private businessMapper : BusinessMapper = new BusinessMapper();

    toDTO(businessUser: BusinessUser) : BusinessUserDTO {
        var businessUserDTO : BusinessUserDTO = new BusinessUserDTO();
        businessUserDTO.id = businessUser.id;
        if (businessUser.userRole) {
            businessUserDTO.userRole = this.userRoleMapper.toDTO(businessUser.userRole);
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
        var businessUser : BusinessUser = new BusinessUser();
        businessUser.id = businessUserDTO.id;
        if (businessUserDTO.userRole) {
            businessUser.userRole = this.userRoleMapper.fromDTO(new BusinessUserRoleDTO(businessUserDTO.userRole as string));
        }
        return businessUser;
    }
}

export { BusinessUserMapper };
