import { passwordValidator } from '../utils/PasswordUtils';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { BadRequestError } from '../errors/BadRequestError';
import { UserType as UserTypeEnum } from '../enums/UserType';
import { UserRepository } from '../repositories/UserRepository';
import { UserType } from '../entities/UserType';
import { UserTypeService } from './UserTypeService';
import { User } from '../entities/User';
import { UserFields, UserForUpdateFields } from '../constants/FindOptionsFields';

const { generateHash, compare } = require('../utils/HashUtils');
const generateAuthToken = require('../utils/AuthUtils');
const validator = require('validator');

class UserService {

    private userRepository: UserRepository = new UserRepository();
    private userTypeService: UserTypeService = new UserTypeService();

    async userExists(id: number) {
        const user: User = await this.userRepository.getUserById(id);
        if (!user) {
            return false;
        } else {
            return true;
        }
    }

    async register(user: User, password: string) {

        if (!passwordValidator.validate(password)) {
            throw new BadRequestError('Password must be at least 8 characters' +
                ' and must include at least one digit.')
        }

        if (await this.userRepository.getUserByEmail(user.email)) {
            throw new ResourceExistsError("Email " + user.email + " already in use.");
        }
        
        user.passwordHash = await generateHash(password);
        user.userType = await this.userTypeService.getUserType(user.userType.type);

        try {
            return await this.userRepository.createUser(user);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new ResourceNotFoundError("No user was found with this email.");
        }
        const match = await compare(password, user.passwordHash);
        if (!match) {
            throw new UnauthorizedError("Password entered is incorrect.");
        }
        return await generateAuthToken(user);
    }

    async getUser(id: number) {
        const user: User = await this.userRepository.getUserById(id, UserFields);
        if (!user) {
            throw new ResourceNotFoundError("User with id " + id + " does not exist");
        } 
        return user;
    }

    async updateUserById(id: number, userObj: any) {
        var user: User = new User();
        const existingUser: User = await this.userRepository.getUserById(id, UserForUpdateFields);
        if (!existingUser)
            throw new ResourceNotFoundError('User with id ' + id + ' does not exist.');

        if (userObj.password != null) {
            if(userObj.confirmPassword == null){
                throw new UnauthorizedError('Unable to authenticate you. Please enter the correct password.')
            }
            const match = await compare(userObj.confirmPassword, existingUser.passwordHash);
            if(!match)
                throw new UnauthorizedError('Unable to authenticate you. Please enter the correct password.')
            if (!passwordValidator.validate(userObj.password)) {
                throw new BadRequestError('Password must be at least 8 characters' +
                    ' and must include at least one digit.');
            }
            const samePassword = await compare(userObj.password, existingUser.passwordHash);
            if(samePassword)
                throw new ResourceExistsError("Can't use same as previous password.");
            user.passwordHash = await generateHash(userObj.password);
        }
        if (userObj.email != null) {
            if(userObj.confirmPassword == null){
                throw new UnauthorizedError('Unable to authenticate you. Please enter the correct password.')
            }
            const match = await compare(userObj.confirmPassword, existingUser.passwordHash);
            if(!match)
                throw new UnauthorizedError('Unable to authenticate you. Please enter the correct password.')
            if (await this.userRepository.getUserByEmail(userObj.email)) {
                throw new ResourceExistsError("Email " + userObj.email + " already in use.");
            }
            user.email = userObj.email;
        }
        if (userObj.userType != null) {
            if (!(userObj.userType in UserTypeEnum)) {
                throw new BadRequestError('Invalid User Type. Allowed Types: [' 
                    + Object.keys(UserTypeEnum) +']');
            }
            user.userType = await this.userTypeService.getUserType(userObj.userType);
        }
        if (userObj.firstName != null) {
            user.firstName = userObj.firstName;
        }
        
        if (userObj.lastName != null) {
            user.lastName = userObj.lastName;
        }

        if (userObj.phoneNumber != null) {
            if (!validator.isMobilePhone(userObj.phoneNumber)) {
                throw new BadRequestError('Invalid phone number');
            }
            user.phoneNumber = userObj.phoneNumber;
        }
        console.log(user)

        try {
            return await this.userRepository.updateUserById(id, user);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }
}

export { UserService };
