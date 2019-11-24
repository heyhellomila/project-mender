import { ObjectMapper } from './ObjectMapper';
import { UserType } from '../entities/UserType';
import { UserTypeDTO } from '../dtos/UserTypeDTO';

class UserTypeMapper implements ObjectMapper<UserType, UserTypeDTO> {

    toDTO(userType: UserType) : UserTypeDTO {
        var userTypeDTO : UserTypeDTO = new UserTypeDTO();
        userTypeDTO.type = userType.type;
        return userTypeDTO;
    }
}

export { UserTypeMapper };
