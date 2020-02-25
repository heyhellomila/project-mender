import { ObjectMapper } from './ObjectMapper';
import { UserType } from '../entities/UserType';
import { UserTypeDTO } from '../dtos/UserTypeDTO';
import { UserType as UserTypeEnum } from '../enums/UserType';
import { BadRequestError } from '../errors/BadRequestError';

class UserTypeMapper implements ObjectMapper<UserType, UserTypeDTO> {

    toDTO(userType: UserType) : UserTypeDTO {
        const userTypeDTO : UserTypeDTO = new UserTypeDTO();
        userTypeDTO.type = userType.type;
        return userTypeDTO;
    }

    fromDTO(userTypeDTO: UserTypeDTO) : UserType {
        const userType : UserType = new UserType();
        if (!(userTypeDTO.type in UserTypeEnum)) {
            throw new BadRequestError('Invalid User Type. Allowed Types: ['
                + `${Object.keys(UserTypeEnum)}]`);
        }
        userType.type = userTypeDTO.type;
        return userType;
    }
}

export { UserTypeMapper };
