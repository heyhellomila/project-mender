import UserGateway from '../gateways/UserGateway';
import { passwordValidator } from '../utils/PasswordUtils';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { BadRequestError } from '../errors/BadRequestError';
import { UserType } from '../enums/UserType';
import { IUser } from 'models/User';

const { generateHash, compare } = require('../utils/HashUtils');
const generateAuthToken = require('../utils/AuthUtils');
const validator = require('validator');

class UserService {

    async userExists(id: string) {
        try {
            await UserGateway.getUserById(id);
        } catch (err) {
            return false;
        }
        return true
    }

    async register(email: string, password: string, first_name: string, 
        last_name:string, phone_number: number, type: string) {

        if (!passwordValidator.validate(password)) {
            throw new BadRequestError('Password must be at least 8 characters' +
                ' and must include at least one digit.')
        }

        if (!validator.isEmail(email)) {
            throw new BadRequestError('Invalid Email address');
        }

        if (!validator.isMobilePhone(phone_number)) {
            throw new BadRequestError('Invalid phone number');
        }

        if (!(type in UserType)) {
            throw new BadRequestError('Invalid User Type. Allowed Types: [' 
                + Object.keys(UserType) +']');
        }

        const hashedPassword = await generateHash(password);
        const user = await UserGateway.getUserByEmail(email);

        if (user) {
            throw new ResourceExistsError("Email " + email + " already in use.");
        }
        try {
            return await UserGateway.createUser(email, hashedPassword, first_name, last_name, phone_number, type);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async login(email: string, password: string) {
        const user = await UserGateway.getUserByEmail(email);
        if (!user) {
            throw new ResourceNotFoundError("No user was found with this email.");
        }
        const match = await compare(password, user.password_hash);
        if (!match) {
            throw new UnauthorizedError("Password entered is incorrect.");
        }
        return await generateAuthToken(user);
    }

    async getUser(id: string) {
        try {
            return await UserGateway.getUserById(id);
        } catch (err) {
            throw err;
        }
    }

    async updateUserById(id: string, userObj: IUser) {
        if (!await this.getUser(id))
            throw new ResourceNotFoundError('User with id ' + id + ' does not exist.');

        if (userObj.password != null) {
            if (!passwordValidator.validate(userObj.password)) {
                throw new BadRequestError('Password must be at least 8 characters' +
                    ' and must include at least one digit.');
            }
            userObj.password_hash = await generateHash(userObj.password);
        }

        if (userObj.email != null) {
            const user = await UserGateway.getUserByEmail(userObj.email);
            if (user) {
                throw new ResourceExistsError("Email " + userObj.email + " already in use.");
            }
        }

        if (userObj.type != null && !(userObj.type in UserType)) {
            throw new BadRequestError('Invalid User Type. Allowed Types: [' 
                + Object.keys(UserType) +']');
        }

        try {
            return await UserGateway.updateUserById(id, userObj);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }
}

export default new UserService();
