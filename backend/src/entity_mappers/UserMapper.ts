import { User } from '../entities/User';
import { UserDTO } from '../dtos/UserDTO';
import { ObjectMapper } from './ObjectMapper';
import { UserTypeMapper } from './UserTypeMapper';
import { BadRequestError } from '../errors/BadRequestError';
import { UserTypeDTO } from '../dtos/UserTypeDTO';

const validator = require('validator');

class UserMapper implements ObjectMapper<User, UserDTO> {

    private userTypeMapper : UserTypeMapper = new UserTypeMapper();

    toDTO(user: User) : UserDTO {
        const userDTO : UserDTO = new UserDTO();
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

    fromDTO(userDTO: UserDTO) : User {
        const user : User = new User();

        user.id = userDTO.id;
        user.firstName = userDTO.firstName;
        user.lastName = userDTO.lastName;
        user.password = userDTO.password;
        user.confirmPassword = userDTO.confirmPassword;

        if (userDTO.email) {
            if (!validator.isEmail(userDTO.email)) {
                throw new BadRequestError('Invalid Email address');
            }
            user.email = userDTO.email;
        }
        if (userDTO.phoneNumber) {
            if (!validator.isMobilePhone(userDTO.phoneNumber)) {
                throw new BadRequestError('Invalid phone number');
            }
            user.phoneNumber = userDTO.phoneNumber;
        }
        if (userDTO.userType) {
            user.userType = this.userTypeMapper
                .fromDTO(new UserTypeDTO(userDTO.userType as string));
        }

        return user;
    }
}

export { UserMapper };
