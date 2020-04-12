import { passwordValidator } from '../utils/PasswordUtils';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { BadRequestError } from '../errors/BadRequestError';
import { ConflictError } from '../errors/ConflictError';
import { UserRepository } from '../repositories/UserRepository';
import { UserTypeService } from './UserTypeService';
import { User } from '../entities/User';
import { USER_FIELDS, USER_FOR_UPDATE_FIELDS } from '../constants/FindOptionsFields';
import { HashUtils } from '../utils/HashUtils';
import { AuthUtils } from '../utils/AuthUtils';
import { getNewLogger } from '../Log4jsConfig'

const userServiceLogger = getNewLogger('UserService');

class UserService {

    private userRepository: UserRepository;
    private userTypeService: UserTypeService;
    private hashUtils: HashUtils;
    private authUtils : AuthUtils;

    constructor(userRepository?: UserRepository, userTypeService?: UserTypeService,
                hashUtils?: HashUtils, authUtils?: AuthUtils) {
        this.userRepository = userRepository ? userRepository : new UserRepository();
        this.userTypeService = userTypeService ? userTypeService : new UserTypeService();
        this.hashUtils = hashUtils ? hashUtils : new HashUtils();
        this.authUtils = authUtils ? authUtils : new AuthUtils();
    }

    async register(user: User, password: string) {

        if (!passwordValidator.validate(Buffer.from(password))) {
            userServiceLogger.error('400 BadRequestError - Password must be at least 8 characters' +
                ' and must include at least one digit.');
            throw new BadRequestError('Password must be at least 8 characters' +
                ' and must include at least one digit.');
        }

        await this.verifyEmailAvailability(user.email);

        user.passwordHash = await this.hashUtils.generateHash(password) as string;
        user.userType = await this.userTypeService.getUserType(user.userType.type);

        return await this.userRepository.createUser(user);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            userServiceLogger.error('404 ResourceNotFoundError - No user was found with this email.');
            throw new ResourceNotFoundError('No user was found with this email.');
        }
        const match = await this.hashUtils.compare(password, user.passwordHash);
        if (!match) {
            userServiceLogger.error('401 UnauthorizedError - Password entered is incorrect.');
            throw new UnauthorizedError('Password entered is incorrect.');
        }
        return await this.authUtils.generateAuthToken(user);
    }

    async getUser(id: number) {
        const user: User = await this.userRepository.getUserById(id, USER_FIELDS);
        if (!user) {
            userServiceLogger.error(`404 ResourceNotFoundError - User with id ${id} does not exist.`);
            throw new ResourceNotFoundError(`User with id ${id} does not exist.`);
        }
        return user;
    }

    async updateUserById(id: number, userObj: User) {
        const user: User = new User();
        const existingUser: User = await this.userRepository
            .getUserById(id, USER_FOR_UPDATE_FIELDS);

        if (userObj.password != null) {
            await this.confirmPassword(userObj.confirmPassword, existingUser.passwordHash);
            if (!passwordValidator.validate(Buffer.from(userObj.password))) {
                userServiceLogger.error('400 BadRequestError - Password must be at least 8 characters' +
                    ' and must include at least one digit.');
                throw new BadRequestError('Password must be at least 8 characters' +
                    ' and must include at least one digit.');
            }
            if (await this.hashUtils.compare(userObj.password, existingUser.passwordHash)) {
                userServiceLogger.error('409 ConflictError - Can\'t use previous password.');
                throw new ConflictError('Can\'t use previous password.');
            }
            user.passwordHash = await this.hashUtils.generateHash(userObj.password) as string;
        }
        if (userObj.email != null) {
            await this.confirmPassword(userObj.confirmPassword, existingUser.passwordHash);
            await this.verifyEmailAvailability(userObj.email);
            user.email = userObj.email;
        }
        if (userObj.userType != null) {
            user.userType = await this.userTypeService.getUserType(userObj.userType.type);
        }
        if (userObj.firstName != null) {
            user.firstName = userObj.firstName;
        }
        if (userObj.lastName != null) {
            user.lastName = userObj.lastName;
        }
        if (userObj.phoneNumber != null) {
            user.phoneNumber = userObj.phoneNumber;
        }

        return await this.userRepository.updateUserById(id, user);
    }

    private async confirmPassword(confirmPassword: string, passwordHash: string) {
        if (!confirmPassword) {
            userServiceLogger.error('400 BadRequestError - confirmPassword field is empty.');
            throw new BadRequestError('confirmPassword field is empty.');
        }
        if (!await this.hashUtils.compare(confirmPassword, passwordHash)) {
            userServiceLogger.error('401 UnauthorizedError - Incorrect password.');
            throw new UnauthorizedError('Incorrect password.');
        }
    }

    // Throws an error if email is in used, otherwise returns void.
    private async verifyEmailAvailability(email : string) : Promise<void> {
        if (await this.userRepository.getUserByEmail(email)) {
            userServiceLogger.error(`409 ResourceExistsError - Email ${email} already in use.`);
            throw new ResourceExistsError(`Email ${email} already in use.`);
        }
    }
}

export { UserService };
