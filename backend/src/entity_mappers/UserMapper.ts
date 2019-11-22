import { User } from '../entities/User';
import { UserDTO } from '../dtos/UserDTO';
import { ObjectMapper } from './ObjectMapper';

class UserMapper implements ObjectMapper<User, UserDTO> {

    toDTO(user: User) : UserDTO {
        var userDTO : UserDTO = new UserDTO();
        userDTO.id = user.id;
        userDTO.email = user.email;
        userDTO.firstName = user.firstName;
        userDTO.lastName = user.lastName;
        userDTO.userType = user.userType.type;
        userDTO.phoneNumber = user.phoneNumber;
        return userDTO;
    }
}

export { UserMapper };
