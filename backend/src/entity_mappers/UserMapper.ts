import { User } from '../entities/User';
import { UserDTO } from '../dtos/UserDTO';
import { ObjectMapper } from './ObjectMapper';
import { UserTypeMapper } from './UserTypeMapper';

class UserMapper implements ObjectMapper<User, UserDTO> {

    private userTypeMapper : UserTypeMapper = new UserTypeMapper();

    toDTO(user: User) : UserDTO {
        var userDTO : UserDTO = new UserDTO();
        userDTO.id = user.id;
        userDTO.email = user.email;
        userDTO.firstName = user.firstName;
        userDTO.lastName = user.lastName;
        if (user.userType) {
            userDTO.userType = this.userTypeMapper.toDTO(user.userType);
        }
        userDTO.phoneNumber = user.phoneNumber;
        return userDTO;
    }
}

export { UserMapper };
