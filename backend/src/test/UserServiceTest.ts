import 'mocha';
import { equal } from 'assert';
import { UserRepository } from '../repositories/UserRepository';
import { anyNumber, anyOfClass, anyString, anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { UserService } from '../services/UserService';
import { User } from '../entities/User';
import { UserType as UserTypeEnum } from '../enums/UserType';
import { UserDataProvider } from './data_providers/UserDataProvider';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { UserTypeService } from '../services/UserTypeService';
import { USER_FIELDS, USER_FOR_UPDATE_FIELDS } from '../constants/FindOptionsFields';
import { BadRequestError } from '../errors/BadRequestError';
import { UserType } from '../entities/UserType';
import { UserTypeDataProvider } from './data_providers/UserTypeDataProvider';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { HashUtils } from '../utils/HashUtils';
import { AuthUtils } from '../utils/AuthUtils';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ConflictError } from '../errors/ConflictError';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('User Service Test', () => {

    let userRepositoryMock : UserRepository;
    let userRepository : UserRepository;
    let userTypeServiceMock : UserTypeService;
    let userTypeService : UserTypeService;
    let userService : UserService;
    let hashUtilsMock : HashUtils;
    let hashUtils : HashUtils;
    let authUtilsMock : AuthUtils;
    let authUtils : AuthUtils;
    const user : User = UserDataProvider.getUser(1);
    const userType : UserType = UserTypeDataProvider.getUserType(1, UserTypeEnum.HOMEOWNER);
    const email : string = 'test@gmail.com';
    const userDoesNotExistString : string = 'User does not exist';
    const validPassword : string = 'validPassword123';
    const hashedPassword : string = 'hashed-password';
    const invalidPassword : string = '123';
    const userTypeDoesNotExistString : string = 'User type does not exist';
    const authToken : string = 'auth-token';
    const newHashedPassword : string = 'new-hashed-password';
    const newValidPassword : string = 'new-password123';
    const firstName : string = 'firstName';
    const lastName : string = 'lastName';

    beforeEach(() => {
        userRepositoryMock = mock(UserRepository);
        userRepository = instance(userRepositoryMock);
        userTypeServiceMock = mock(UserTypeService);
        userTypeService = instance(userTypeServiceMock);
        hashUtilsMock = mock(HashUtils);
        hashUtils = instance(hashUtilsMock);
        authUtilsMock = mock(AuthUtils);
        authUtils = instance(authUtilsMock);
        userService = new UserService(userRepository, userTypeService, hashUtils, authUtils);
    });

    it('getUser(id) successfully', async () => {
        when(userRepositoryMock.getUserById(anyNumber(), anything())).thenResolve(user);

        const fetchedUser : User = await userService.getUser(user.id);

        verify(userRepositoryMock.getUserById(user.id, USER_FIELDS));
        equal(fetchedUser, user);
    });

    it('getUser(id) user does not exist expect ResourceNotFoundError', async () => {
        when(userRepositoryMock.getUserById(anyNumber(), anything())).thenResolve(null);

        await expect(userService.getUser(user.id)).to.be
            .rejectedWith(ResourceNotFoundError);

        verify(userRepositoryMock.getUserById(user.id, USER_FIELDS));
    });

    it('register(user, password) successfully', async () => {
        const validUser : User = UserDataProvider.getUser(anyNumber(), email, userType.type);
        const expectedUser : User = UserDataProvider
            .getUser(1, email, userType, hashedPassword);

        when(hashUtilsMock.generateHash(anyString())).thenResolve(hashedPassword);
        when(userRepositoryMock.getUserByEmail(anyString())).thenResolve(null);
        when(userTypeServiceMock.getUserType(anyString())).thenResolve(userType);
        when(userRepositoryMock.createUser(anyOfClass(User))).thenResolve(expectedUser);

        const newUser : User = await userService.register(validUser, validPassword);

        verify(hashUtilsMock.generateHash(validPassword)).called();
        verify(userRepositoryMock.getUserByEmail(validUser.email)).called();
        verify(userTypeServiceMock.getUserType(validUser.userType.type)).called();
        verify(userRepositoryMock.createUser(deepEqual(expectedUser))).called();
        equal(newUser, expectedUser);
    });

    it(
        'register(user, password) user type does not exist expect ResourceNotFoundError',
        async () => {
            const validUser : User = UserDataProvider
                .getUser(1, email, 'invalidType');

            when(hashUtilsMock.generateHash(anyString())).thenResolve(hashedPassword);
            when(userRepositoryMock.getUserByEmail(anyString())).thenResolve(null);
            when(userTypeServiceMock.getUserType(anyString()))
                .thenThrow(new ResourceNotFoundError(userTypeDoesNotExistString));

            await expect(userService.register(validUser, validPassword)).to.be
                .rejectedWith(ResourceNotFoundError, userTypeDoesNotExistString);

            verify(hashUtilsMock.generateHash(validPassword)).called();
            verify(userRepositoryMock.getUserByEmail(validUser.email)).called();
            verify(userTypeServiceMock.getUserType(validUser.userType.type)).called();
            verify(userRepositoryMock.createUser(deepEqual(anyOfClass(User)))).never();
        },
    );

    it('register(user, password) invalid password expect BadRequestError', async () => {
        await expect(userService.register(user, invalidPassword)).to.be
            .rejectedWith(BadRequestError);
        verify(userRepositoryMock.getUserByEmail(anyString())).never();
        verify(userTypeServiceMock.getUserType(anyString())).never();
        verify(userRepositoryMock.createUser(anything())).never();
    });

    it('register(user, password) email in use expect ResourceExistsError', async () => {
        const userWithEmail : User = UserDataProvider.getUserWithEmail(1, email);
        when(userRepositoryMock.getUserByEmail(anyString())).thenResolve(userWithEmail);
        await expect(userService.register(userWithEmail, validPassword)).to.be
            .rejectedWith(ResourceExistsError);
        verify(userTypeServiceMock.getUserType(anyString())).never();
        verify(userRepositoryMock.createUser(anyOfClass(User))).never();
    });

    it('login(email, password) successfully expect auth token', async () => {
        const savedUser : User = UserDataProvider
            .getUserWithEmailAndPasswordHash(1, email, hashedPassword);
        when(userRepositoryMock.getUserByEmail(anyString())).thenResolve(savedUser);
        when(hashUtilsMock.compare(anyString(), anyString())).thenResolve(true);
        when(authUtilsMock.generateAuthToken(anyOfClass(User))).thenResolve(authToken);

        const generatedToken = await userService.login(savedUser.email, validPassword);

        verify(userRepositoryMock.getUserByEmail(savedUser.email)).called();
        verify(hashUtilsMock.compare(validPassword, savedUser.passwordHash)).called();
        verify(authUtilsMock.generateAuthToken(savedUser)).called();
        equal(generatedToken, authToken);
    });

    it('login(email, password) user does not exist expect ResourceNotFoundError', async () => {
        when(userRepositoryMock.getUserByEmail(anyString())).thenResolve(null);

        await expect(userService.login(email, validPassword)).to.be
            .rejectedWith(ResourceNotFoundError);

        verify(userRepositoryMock.getUserByEmail(email)).called();
        verify(hashUtilsMock.compare(anyString(), anyString())).never();
        verify(authUtilsMock.generateAuthToken(anyOfClass(User))).never();
    });

    it('login(email, password) wrong password expect UnauthorizedError', async () => {
        const savedUser : User = UserDataProvider
            .getUserWithEmailAndPasswordHash(1, email, hashedPassword);
        when(userRepositoryMock.getUserByEmail(anyString())).thenResolve(savedUser);
        when(hashUtilsMock.compare(anyString(), anyString())).thenResolve(false);

        await expect(userService.login(savedUser.email, validPassword)).to.be
            .rejectedWith(UnauthorizedError);

        verify(userRepositoryMock.getUserByEmail(savedUser.email)).called();
        verify(hashUtilsMock.compare(validPassword, savedUser.passwordHash)).called();
        verify(authUtilsMock.generateAuthToken(savedUser)).never();
    });

    it('updateUserById(id, userObj) successfully', async () => {
        const savedUser : User = UserDataProvider.getUserWithPasswordHash(1, hashedPassword);
        const userToUpdate : User = UserDataProvider.getUser(
            1, email, userType.type, hashedPassword, firstName,
            lastName, 1234567890, newValidPassword, validPassword);
        const expectedUpdatedUser : User = UserDataProvider.getUpdatedUserWithoutId(
            email, userType, newHashedPassword, firstName,
            lastName, 1234567890);

        when(userRepositoryMock.getUserById(anyNumber(), anything())).thenResolve(savedUser);
        when(hashUtilsMock.compare(anyString(), anyString())).thenResolve(true)
            .thenResolve(false).thenResolve(true);
        when(hashUtilsMock.generateHash(anyString())).thenResolve(newHashedPassword);
        when(userRepositoryMock.getUserByEmail(anyString())).thenResolve(null);
        when(userTypeServiceMock.getUserType(anyString())).thenResolve(userType);
        when(userRepositoryMock.updateUserById(anyNumber(), anyOfClass(User))).thenResolve(null);

        await userService.updateUserById(userToUpdate.id, userToUpdate);

        verify(userRepositoryMock.getUserById(userToUpdate.id, USER_FOR_UPDATE_FIELDS)).called();
        verify(hashUtilsMock.compare(userToUpdate.confirmPassword, savedUser.passwordHash))
            .called();
        verify(hashUtilsMock.compare(userToUpdate.password, savedUser.passwordHash)).called();
        verify(hashUtilsMock.generateHash(userToUpdate.password)).called();
        verify(hashUtilsMock.compare(userToUpdate.confirmPassword, savedUser.passwordHash))
            .called();
        verify(userRepositoryMock.getUserByEmail(userToUpdate.email)).called();
        verify(userTypeServiceMock.getUserType(userToUpdate.userType.type)).called();
        verify(userRepositoryMock.updateUserById(savedUser.id, deepEqual(expectedUpdatedUser)))
            .called();
    });

    it('updateUserById(id, userObj) missing confirmPassword expect BadRequestError', async () => {
        const savedUser : User = UserDataProvider.getUserWithPasswordHash(1, hashedPassword);
        const userToUpdate : User = UserDataProvider.getUser(
            1, email, userType.type, hashedPassword, firstName,
            lastName, 1234567890, newValidPassword, validPassword);
        userToUpdate.confirmPassword = null;

        when(userRepositoryMock.getUserById(anyNumber(), anything())).thenResolve(savedUser);

        await expect(userService.updateUserById(userToUpdate.id, userToUpdate)).to.be
            .rejectedWith(BadRequestError);

        verify(userRepositoryMock.getUserById(userToUpdate.id, USER_FOR_UPDATE_FIELDS)).called();
        verify(hashUtilsMock.compare(anyString(), anyString())).never();
        verify(hashUtilsMock.generateHash(anyString())).never();
        verify(userRepositoryMock.getUserByEmail(anyString())).never();
        verify(userTypeServiceMock.getUserType(anyString())).never();
        verify(userRepositoryMock.updateUserById(anyNumber(), anyOfClass(User)))
            .never();
    });

    it('updateUserById(id, userObj) incorrect password expect UnauthorizedError', async () => {
        const savedUser : User = UserDataProvider.getUserWithPasswordHash(1, hashedPassword);
        const userToUpdate : User = UserDataProvider.getUser(
            1, email, userType.type, hashedPassword, firstName,
            lastName, 1234567890, newValidPassword, validPassword);

        when(userRepositoryMock.getUserById(anyNumber(), anything())).thenResolve(savedUser);
        when(hashUtilsMock.compare(anyString(), anyString())).thenResolve(false);

        await expect(userService.updateUserById(userToUpdate.id, userToUpdate)).to.be
            .rejectedWith(UnauthorizedError);

        verify(userRepositoryMock.getUserById(userToUpdate.id, USER_FOR_UPDATE_FIELDS)).called();
        verify(hashUtilsMock.compare(userToUpdate.confirmPassword, savedUser.passwordHash))
            .once();
        verify(hashUtilsMock.compare(userToUpdate.password, savedUser.passwordHash)).never();
        verify(hashUtilsMock.generateHash(anyString())).never();
        verify(userRepositoryMock.getUserByEmail(anyString())).never();
        verify(userTypeServiceMock.getUserType(anyString())).never();
        verify(userRepositoryMock.updateUserById(anyNumber(), anyOfClass(User))).never();
    });

    it('updateUserById(id, userObj) invalid new password expect BadRequestError', async () => {
        const savedUser : User = UserDataProvider.getUserWithPasswordHash(1, hashedPassword);
        const userToUpdate : User = UserDataProvider.getUser(
            1, email, userType.type, hashedPassword, firstName,
            lastName, 1234567890, invalidPassword, validPassword);

        when(userRepositoryMock.getUserById(anyNumber(), anything())).thenResolve(savedUser);
        when(hashUtilsMock.compare(anyString(), anyString())).thenResolve(true);

        await expect(userService.updateUserById(userToUpdate.id, userToUpdate)).to.be
            .rejectedWith(BadRequestError);

        verify(userRepositoryMock.getUserById(userToUpdate.id, USER_FOR_UPDATE_FIELDS)).called();
        verify(hashUtilsMock.compare(userToUpdate.confirmPassword, savedUser.passwordHash))
            .once();
        verify(hashUtilsMock.compare(userToUpdate.password, savedUser.passwordHash)).never();
        verify(hashUtilsMock.generateHash(anyString())).never();
        verify(userRepositoryMock.getUserByEmail(anyString())).never();
        verify(userTypeServiceMock.getUserType(anyString())).never();
        verify(userRepositoryMock.updateUserById(anyNumber(), anyOfClass(User))).never();
    });

    it('updateUserById(id, userObj) same password expect ConflictError', async () => {
        const savedUser : User = UserDataProvider.getUserWithPasswordHash(1, hashedPassword);
        const userToUpdate : User = UserDataProvider.getUser(
            1, email, userType.type, hashedPassword, firstName,
            lastName, 1234567890, validPassword, validPassword);

        when(userRepositoryMock.getUserById(anyNumber(), anything())).thenResolve(savedUser);
        when(hashUtilsMock.compare(anyString(), anyString())).thenResolve(true)
            .thenResolve(true);

        await expect(userService.updateUserById(userToUpdate.id, userToUpdate)).to.be
            .rejectedWith(ConflictError);

        verify(userRepositoryMock.getUserById(userToUpdate.id, USER_FOR_UPDATE_FIELDS)).called();
        verify(hashUtilsMock.compare(deepEqual(validPassword), savedUser.passwordHash)).twice();
        verify(hashUtilsMock.generateHash(anyString())).never();
        verify(userRepositoryMock.getUserByEmail(anyString())).never();
        verify(userTypeServiceMock.getUserType(anyString())).never();
        verify(userRepositoryMock.updateUserById(anyNumber(), anyOfClass(User))).never();
    });

    it('updateUserById(id, userObj) email in use expect ResourceExistsError', async () => {
        const savedUser : User = UserDataProvider.getUserWithPasswordHash(1, hashedPassword);
        const userToUpdate : User = UserDataProvider.getUser(
            1, email, userType.type, hashedPassword, firstName,
            lastName, 1234567890, validPassword, validPassword);

        when(userRepositoryMock.getUserById(anyNumber(), anything())).thenResolve(savedUser);
        when(hashUtilsMock.compare(anyString(), anyString())).thenResolve(true)
            .thenResolve(false).thenResolve(true);
        when(userRepositoryMock.getUserByEmail(anyString())).thenResolve(user);

        await expect(userService.updateUserById(userToUpdate.id, userToUpdate)).to.be
            .rejectedWith(ResourceExistsError);

        verify(userRepositoryMock.getUserById(userToUpdate.id, USER_FOR_UPDATE_FIELDS)).called();
        verify(hashUtilsMock.compare(userToUpdate.confirmPassword, savedUser.passwordHash))
            .called();
        verify(hashUtilsMock.compare(userToUpdate.password, savedUser.passwordHash)).called();
        verify(hashUtilsMock.generateHash(userToUpdate.password)).called();
        verify(hashUtilsMock.compare(userToUpdate.confirmPassword, savedUser.passwordHash))
            .called();
        verify(userRepositoryMock.getUserByEmail(anyString())).called();
        verify(userTypeServiceMock.getUserType(anyString())).never();
        verify(userRepositoryMock.updateUserById(anyNumber(), anyOfClass(User))).never();
    });
});
