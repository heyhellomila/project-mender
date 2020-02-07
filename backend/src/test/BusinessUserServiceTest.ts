import 'mocha';
import { deepStrictEqual, equal }  from 'assert';
import { anyNumber, anyOfClass, anyString, anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { BusinessService } from '../services/BusinessService';
import { BusinessDataProvider } from './data_providers/BusinessDataProvider';
import { Business } from '../entities/Business';
import { BusinessUserRepository } from '../repositories/BusinessUserRepository';
import { BusinessUserRoleService } from '../services/BusinessUserRoleService';
import { UserService } from '../services/UserService';
import { BusinessUserService } from '../services/BusinessUserService';
import { User } from '../entities/User';
import { UserDataProvider } from './data_providers/UserDataProvider';
import { BusinessUser } from '../entities/BusinessUser';
import { BusinessUserDataProvider } from './data_providers/BusinessUserDataProvider';
import { BusinessUserRoleDataProvider } from './data_providers/BusinessUserRoleDataProvider';
import { BusinessUserRole } from '../entities/BusinessUserRole';
import { BusinessUserRole as BusinessUserRoleEnum } from '../enums/BusinessUserRole';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import {
    BUSINESS_USER_FIELDS,
    BUSINESS_USER_FIELDS_NO_BUSINESS,
    BUSINESS_USER_FIELDS_NO_USER } from '../constants/FindOptionsFields';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Business User Service Test', () => {

    let businessUserRepositoryMock : BusinessUserRepository;
    let businessUserRepository : BusinessUserRepository;
    let businessUserRoleServiceMock : BusinessUserRoleService;
    let businessUserRoleService : BusinessUserRoleService;
    let userServiceMock : UserService;
    let userService : UserService;
    let businessServiceMock : BusinessService;
    let businessService : BusinessService;
    let businessUserService : BusinessUserService;
    const user : User = UserDataProvider.getUser(1);
    const business : Business = BusinessDataProvider.getBusiness(1, 123);
    const businessUserRole : BusinessUserRole = BusinessUserRoleDataProvider
        .getBusinessUserRole(1, BusinessUserRoleEnum.EMPLOYEE);
    const businessUser : BusinessUser = BusinessUserDataProvider.getBusinessUser(1, business, user);
    const businessDoesNotExistString : string = 'Business does not exist';
    const userDoesNotExistString : string = 'User does not exist';
    const businessUserRoleDoesNotExistString : string = 'Business user role does not exist';

    beforeEach(() => {
        businessUserRepositoryMock = mock(BusinessUserRepository);
        businessUserRepository = instance(businessUserRepositoryMock);
        businessUserRoleServiceMock = mock(BusinessUserRoleService);
        businessUserRoleService = instance(businessUserRoleServiceMock);
        userServiceMock = mock(UserService);
        userService = instance(userServiceMock);
        businessServiceMock = mock(BusinessService);
        businessService = instance(businessServiceMock);
        businessUserService = new BusinessUserService(
            businessUserRepository, businessUserRoleService, userService, businessService);
    });

    it(('getBusinessUserByBusinessAndUser expect businessUser'), async () => {
        when(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
            anyOfClass(Business), anyOfClass(User))).thenResolve(businessUser);
        const fetchedBusinessUser : BusinessUser = await businessUserService
            .getBusinessUserByBusinessAndUser(business, user);
        verify(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
            business, user)).called();
        equal(fetchedBusinessUser, businessUser);
    });

    it(('getBusinessUserByBusinessIdAndUserId expect businessUser'), async () => {
        when(businessServiceMock.getBusinessById(anyNumber())).thenResolve(business);
        when(userServiceMock.getUser(anyNumber())).thenResolve(user);
        when(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
            anyOfClass(Business), anyOfClass(User), anything())).thenResolve(businessUser);

        const fetchedBusinessUser : BusinessUser = await businessUserService
            .getBusinessUserByBusinessIdAndUserId(business.id, user.id);

        verify(businessServiceMock.getBusinessById(business.id)).called();
        verify(userServiceMock.getUser(user.id)).called();
        verify(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
            business, user, BUSINESS_USER_FIELDS)).called();
        equal(fetchedBusinessUser, businessUser);
    });

    it(
        ('getBusinessUserByBusinessIdAndUserId business does not exist expect ' +
            'ResourceNotFoundError'),
        async () => {
            when(businessServiceMock.getBusinessById(anyNumber()))
                .thenThrow(new ResourceNotFoundError(businessDoesNotExistString));

            await expect(businessUserService.getBusinessUserByBusinessIdAndUserId(
                business.id, user.id)).to.be.rejectedWith(
                    ResourceNotFoundError, businessDoesNotExistString);

            verify(businessServiceMock.getBusinessById(business.id)).called();
            verify(userServiceMock.getUser(anyNumber())).never();
            verify(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
                anyOfClass(Business), anyOfClass(User))).never();
        },
    );

    it(
        ('getBusinessUserByBusinessIdAndUserId user does not exist expect ' +
            'ResourceNotFoundError'),
        async () => {
            when(businessServiceMock.getBusinessById(anyNumber())).thenResolve(business);
            when(userServiceMock.getUser(anyNumber()))
                .thenThrow(new ResourceNotFoundError(userDoesNotExistString));

            await expect(businessUserService.getBusinessUserByBusinessIdAndUserId(
                business.id, user.id)).to.be.rejectedWith(
                ResourceNotFoundError, userDoesNotExistString);

            verify(businessServiceMock.getBusinessById(business.id)).called();
            verify(userServiceMock.getUser(user.id)).called();
            verify(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
                anyOfClass(Business), anyOfClass(User))).never();
        },
    );

    it(
        ('getBusinessUserByBusinessIdAndUserId business user does not exist expect ' +
            'ResourceNotFoundError'),
        async () => {
            when(businessServiceMock.getBusinessById(anyNumber())).thenResolve(business);
            when(userServiceMock.getUser(anyNumber())).thenResolve(user);
            when(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
                anyOfClass(Business), anyOfClass(User), anything())).thenResolve(null);

            await expect(businessUserService.getBusinessUserByBusinessIdAndUserId(
                business.id, user.id)).to.be.rejectedWith(ResourceNotFoundError);

            verify(businessServiceMock.getBusinessById(business.id)).called();
            verify(userServiceMock.getUser(user.id)).called();
            verify(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
                business, user, BUSINESS_USER_FIELDS)).called();
        },
    );

    it(('getBusinessesByUserId expect businesses'), async () => {
        when(userServiceMock.getUser(anyNumber())).thenResolve(user);
        when(businessUserRepositoryMock.getBusinessUsersByUser(anyOfClass(User), anything()))
            .thenResolve([businessUser]);

        const fetchedBusinesses : Business[] = await businessUserService
            .getBusinessesByUserId(user.id);

        verify(userServiceMock.getUser(user.id)).called();
        verify(businessUserRepositoryMock.getBusinessUsersByUser(
            user, BUSINESS_USER_FIELDS_NO_USER)).called();
        deepStrictEqual(fetchedBusinesses, [businessUser.business]);
    });

    it(('getBusinessesByUserId user does not exist expect ResourceNotFoundError'), async () => {
        when(userServiceMock.getUser(anyNumber()))
            .thenThrow(new ResourceNotFoundError(userDoesNotExistString));

        await expect(businessUserService.getBusinessesByUserId(user.id)).to.be
            .rejectedWith(ResourceNotFoundError, userDoesNotExistString);

        verify(userServiceMock.getUser(user.id)).called();
        verify(businessUserRepositoryMock.getBusinessUsersByUser(anyOfClass(User))).never();
    });

    it(('getUsersByBusinessId expect users'), async () => {
        when(businessServiceMock.getBusinessById(anyNumber())).thenResolve(business);
        when(businessUserRepositoryMock.getBusinessUsersByBusiness(
            anyOfClass(Business), anything())).thenResolve([businessUser]);

        const fetchedUsers : User[] = await businessUserService
            .getUsersByBusinessId(business.id);

        verify(businessServiceMock.getBusinessById(business.id)).called();
        verify(businessUserRepositoryMock.getBusinessUsersByBusiness(
            business, BUSINESS_USER_FIELDS_NO_BUSINESS)).called();
        deepStrictEqual(fetchedUsers, [user]);
    });

    it(('getUsersByBusinessId business does not exist expect ResourceNotFoundError'), async () => {
        when(businessServiceMock.getBusinessById(anyNumber()))
            .thenThrow(new ResourceNotFoundError(businessDoesNotExistString));

        await expect(businessUserService.getUsersByBusinessId(business.id)).to.be
            .rejectedWith(ResourceNotFoundError, businessDoesNotExistString);

        verify(businessServiceMock.getBusinessById(business.id)).called();
        verify(businessUserRepositoryMock.getBusinessUsersByBusiness(anyOfClass(Business))).never();
    });

    it(('createBusinessUser expect created business user'), async () => {
        const expectedBusinessUser : BusinessUser = BusinessUserDataProvider
            .getBusinessUserWithoutId(business, user, businessUserRole);

        when(businessServiceMock.getBusinessById(anyNumber())).thenResolve(business);
        when(userServiceMock.getUser(anyNumber())).thenResolve(user);
        when(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
            anyOfClass(Business), anyOfClass(User))).thenResolve(null);
        when(businessUserRoleServiceMock.getBusinessUserRole(anyString()))
            .thenResolve(businessUserRole);
        when(businessUserRepositoryMock.createBusinessUser(anyOfClass(BusinessUser)))
            .thenResolve(expectedBusinessUser);

        const createdBusinessUser : BusinessUser = await businessUserService
            .createBusinessUser(business.id, user.id);

        verify(businessServiceMock.getBusinessById(business.id)).called();
        verify(userServiceMock.getUser(user.id)).called();
        verify(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
            business, user)).called();
        verify(businessUserRoleServiceMock.getBusinessUserRole(
            BusinessUserRoleEnum.EMPLOYEE)).called();
        verify(businessUserRepositoryMock.createBusinessUser(
            deepEqual(expectedBusinessUser))).called();
        equal(createdBusinessUser, expectedBusinessUser);
    });

    it(('createBusinessUser business does not exist expect ResourceNotFoundError'), async () => {
        when(businessServiceMock.getBusinessById(anyNumber()))
            .thenThrow(new ResourceNotFoundError(businessDoesNotExistString));

        await expect(businessUserService.createBusinessUser(business.id, user.id)).to.be
            .rejectedWith(ResourceNotFoundError, businessDoesNotExistString);

        verify(businessServiceMock.getBusinessById(business.id)).called();
        verify(userServiceMock.getUser(anyNumber())).never();
        verify(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
            anyOfClass(Business), anyOfClass(User))).never();
        verify(businessUserRoleServiceMock.getBusinessUserRole(anyString())).never();
        verify(businessUserRepositoryMock.createBusinessUser(anyOfClass(BusinessUser))).never();
    });

    it(('createBusinessUser user does not exist expect ResourceNotFoundError'), async () => {
        when(businessServiceMock.getBusinessById(anyNumber())).thenResolve(business);
        when(userServiceMock.getUser(anyNumber()))
            .thenThrow(new ResourceNotFoundError(userDoesNotExistString));

        await expect(businessUserService.createBusinessUser(business.id, user.id)).to.be
            .rejectedWith(ResourceNotFoundError, userDoesNotExistString);

        verify(businessServiceMock.getBusinessById(business.id)).called();
        verify(userServiceMock.getUser(user.id)).called();
        verify(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
            anyOfClass(Business), anyOfClass(User))).never();
        verify(businessUserRoleServiceMock.getBusinessUserRole(anyString())).never();
        verify(businessUserRepositoryMock.createBusinessUser(anyOfClass(BusinessUser))).never();
    });

    it(('createBusinessUser business user exists expect ResourceExistsError'), async () => {
        when(businessServiceMock.getBusinessById(anyNumber())).thenResolve(business);
        when(userServiceMock.getUser(anyNumber())).thenResolve(user);
        when(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
            anyOfClass(Business), anyOfClass(User))).thenResolve(businessUser);

        await expect(businessUserService.createBusinessUser(business.id, user.id)).to.be
            .rejectedWith(ResourceExistsError);

        verify(businessServiceMock.getBusinessById(business.id)).called();
        verify(userServiceMock.getUser(user.id)).called();
        verify(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
            business, user)).called();
        verify(businessUserRoleServiceMock.getBusinessUserRole(anyString())).never();
        verify(businessUserRepositoryMock.createBusinessUser(anyOfClass(BusinessUser))).never();
    });

    it(
        ('createBusinessUser business user role does not exist expect ResourceNotFoundError'),
        async () => {
            when(businessServiceMock.getBusinessById(anyNumber())).thenResolve(business);
            when(userServiceMock.getUser(anyNumber())).thenResolve(user);
            when(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
                anyOfClass(Business), anyOfClass(User))).thenResolve(null);
            when(businessUserRoleServiceMock.getBusinessUserRole(anyString()))
                .thenThrow(new ResourceNotFoundError(businessUserRoleDoesNotExistString));

            await expect(businessUserService.createBusinessUser(business.id, user.id)).to.be
                .rejectedWith(ResourceNotFoundError, businessUserRoleDoesNotExistString);

            verify(businessServiceMock.getBusinessById(business.id)).called();
            verify(userServiceMock.getUser(user.id)).called();
            verify(businessUserRepositoryMock.getBusinessUserByBusinessAndUser(
                business, user)).called();
            verify(businessUserRoleServiceMock.getBusinessUserRole(anyString())).called();
            verify(businessUserRepositoryMock.createBusinessUser(anyOfClass(BusinessUser))).never();
        },
    );
});
