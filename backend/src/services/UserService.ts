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
import { UserFields } from '../repositories/FindOptionsFields';

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

    async register(email: string, password: string, firstName: string, 
        lastName:string, phoneNumber: number, type: string) {

        if (!passwordValidator.validate(password)) {
            throw new BadRequestError('Password must be at least 8 characters' +
                ' and must include at least one digit.')
        }

        if (!validator.isEmail(email)) {
            throw new BadRequestError('Invalid Email address');
        }

        if (!validator.isMobilePhone(phoneNumber)) {
            throw new BadRequestError('Invalid phone number');
        }

        if (!(type in UserTypeEnum)) {
            throw new BadRequestError('Invalid User Type. Allowed Types: [' 
                + Object.keys(UserTypeEnum) +']');
        } 

        const user = await this.userRepository.getUserByEmail(email);

        if (user) {
            throw new ResourceExistsError("Email " + email + " already in use.");
        }
        
        const hashedPassword = await generateHash(password);
        const userType : UserType = await this.userTypeService.getUserType(type);

        try {
            return await this.userRepository.createUser(email, hashedPassword, 
                firstName, lastName, phoneNumber, userType);
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
        
        if (!await this.getUser(id))
            throw new ResourceNotFoundError('User with id ' + id + ' does not exist.');

        if (userObj.password != null) {
            if (!passwordValidator.validate(userObj.password)) {
                throw new BadRequestError('Password must be at least 8 characters' +
                    ' and must include at least one digit.');
            }
            user.passwordHash = await generateHash(userObj.password);
        }

        if (userObj.email != null) {
            const user = await this.userRepository.getUserByEmail(userObj.email);
            if (user) {
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

        try {
            return await this.userRepository.updateUserById(id, user);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }
}

export { UserService };
