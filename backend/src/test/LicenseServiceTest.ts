import 'mocha';
import { deepStrictEqual, equal }  from 'assert';
import { anyNumber, anyOfClass, anyString, anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { UserService } from '../services/UserService';
import { LicenseRepository } from '../repositories/LicenseRepository';
import { LicenseTypeService } from '../services/LicenseTypeService';
import { LicenseStatusService } from '../services/LicenseStatusService';
import { LicenseService } from '../services/LicenseService';
import { License } from '../entities/License';
import { LicenseDataProvider } from './data_providers/LicenseDataProvider';
import { LicenseType as LicenseTypeEnum } from '../enums/LicenseType';
import { LicenseType } from '../entities/LicenseType';
import { User } from '../entities/User';
import { UserDataProvider } from './data_providers/UserDataProvider';
import { LICENSE_FIELDS_NO_USER } from '../constants/FindOptionsFields';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { UserType as UserTypeEnum } from '../enums/UserType';
import { BadRequestError } from '../errors/BadRequestError';
import { LicenseStatus } from '../entities/LicenseStatus';
import { LicenseStatus as LicenseStatusEnum } from '../enums/LicenseStatus';
import { LicenseStatusDataProvider } from './data_providers/LicenseStatusDataProvider';
import { LicenseTypeDataProvider } from './data_providers/LicenseTypeDataProvider';
import { ResourceExistsError } from '../errors/ResourceExistsError';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Business User Service Test', () => {

    let licenseRepositoryMock : LicenseRepository;
    let licenseRepository : LicenseRepository;
    let licenseTypeServiceMock : LicenseTypeService;
    let licenseTypeService : LicenseTypeService;
    let licenseStatusServiceMock : LicenseStatusService;
    let licenseStatusService : LicenseStatusService;
    let userServiceMock : UserService;
    let userService : UserService;
    let licenseService : LicenseService;
    const licenseStatus : LicenseStatus = LicenseStatusDataProvider
        .getLicenseStatus(1, LicenseStatusEnum.ACTIVE);
    const licenseType : LicenseType = LicenseTypeDataProvider
        .getLicenseType(1, LicenseTypeEnum.RBQ);
    const user : User = UserDataProvider.getUserWithType(1, UserTypeEnum.CONTRACTOR);
    const license : License = LicenseDataProvider
        .getLicense(1, 123, licenseType.type, licenseStatus.status, user);
    const userDoesNotExistString : string = 'User does not exist';
    const licenseTypeDoesNotExistString : string = 'License type does not exist';
    const licenseStatusDoesNotExistString : string = 'License status does not exist';

    beforeEach(() => {
        licenseRepositoryMock = mock(LicenseRepository);
        licenseRepository = instance(licenseRepositoryMock);
        licenseTypeServiceMock = mock(LicenseTypeService);
        licenseTypeService = instance(licenseTypeServiceMock);
        licenseStatusServiceMock = mock(LicenseStatusService);
        licenseStatusService = instance(licenseStatusServiceMock);
        userServiceMock = mock(UserService);
        userService = instance(userServiceMock);
        licenseService = new LicenseService(
            licenseRepository, licenseTypeService, licenseStatusService, userService);
    });

    it(('getLicenseByNumberAndType expect license'), async() => {
        when(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
            anyNumber(), anyOfClass(LicenseType))).thenResolve(license);

        const fetchedLicense : License = await licenseService
            .getLicenseByNumberAndType(license.licenseNumber, license.licenseType);

        verify(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
            license.licenseNumber, license.licenseType)).called();
        equal(fetchedLicense, license);
    });

    it(('getLicensesByUserId expect licenses'), async() => {
        when(userServiceMock.getUser(anyNumber())).thenResolve(license.user);
        when(licenseRepositoryMock.getLicensesByUser(
            anyOfClass(User), anything())).thenResolve([license]);

        const fetchedLicenses : License[] = await licenseService
            .getLicensesByUserId(license.user.id);

        verify(userServiceMock.getUser(license.user.id)).called();
        verify(licenseRepositoryMock.getLicensesByUser(
            license.user, LICENSE_FIELDS_NO_USER)).called();
        deepStrictEqual(fetchedLicenses, [license]);
    });

    it(('getLicensesByUserId user does not exist expect ResourceNotFoundError'), async() => {
        when(userServiceMock.getUser(anyNumber())).thenThrow(
            new ResourceNotFoundError(userDoesNotExistString));

        await expect(licenseService.getLicensesByUserId(license.user.id)).to.be
            .rejectedWith(ResourceNotFoundError, userDoesNotExistString);

        verify(userServiceMock.getUser(license.user.id)).called();
        verify(licenseRepositoryMock.getLicensesByUser(anyOfClass(User), anything())).never();
    });

    it(('getLicensesByUserId homeowner user expect BadRequestError'), async() => {
        const homeowner : User = UserDataProvider.getUserWithType(2, UserTypeEnum.HOMEOWNER);
        when(userServiceMock.getUser(anyNumber())).thenResolve(homeowner);

        await expect(licenseService.getLicensesByUserId(license.user.id)).to.be
            .rejectedWith(BadRequestError);

        verify(userServiceMock.getUser(license.user.id)).called();
        verify(licenseRepositoryMock.getLicensesByUser(anyOfClass(User), anything())).never();
    });

    it(('createLicense expect created license'), async() => {
        const newLicense : License = LicenseDataProvider
            .getLicense(2, 123, licenseType.type, licenseStatus.status, user);
        const expectedLicense : License = LicenseDataProvider
            .getLicense(newLicense.id, 123, licenseType, licenseStatus, user);

        when(userServiceMock.getUser(anyNumber())).thenResolve(newLicense.user);
        when(licenseTypeServiceMock.getLicenseType(anyString())).thenResolve(licenseType);
        when(licenseRepositoryMock.getLicenseByUserAndLicenseType(
            anyOfClass(User), anyOfClass(LicenseType))).thenResolve(null);
        when(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
            anyString(), anyOfClass(LicenseType))).thenResolve(null);
        when(licenseStatusServiceMock.getLicenseStatus(anyString())).thenResolve(licenseStatus);
        when(licenseRepositoryMock.createLicense(anyOfClass(License))).thenResolve(expectedLicense);

        const createdLicense : License = await licenseService
            .createLicense(newLicense.user.id, newLicense);

        verify(userServiceMock.getUser(newLicense.user.id)).called();
        verify(licenseTypeServiceMock.getLicenseType(newLicense.licenseType.type)).called();
        verify(licenseRepositoryMock.getLicenseByUserAndLicenseType(
            newLicense.user, newLicense.licenseType)).called();
        verify(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
            newLicense.licenseNumber, newLicense.licenseType)).called();
        verify(licenseStatusServiceMock.getLicenseStatus(LicenseStatusEnum.ACTIVE)).called();
        verify(licenseRepositoryMock.createLicense(deepEqual(expectedLicense))).called();
        equal(createdLicense, expectedLicense);
    });

    it(('createLicense user does not exist expect ResourceNotFoundError'), async() => {
        const newLicense : License = LicenseDataProvider
            .getLicense(2, 123, licenseType.type, licenseStatus.status, user);

        when(userServiceMock.getUser(anyNumber()))
            .thenThrow(new ResourceNotFoundError(userDoesNotExistString));

        await expect(licenseService.createLicense(newLicense.user.id, newLicense)).to.be
            .rejectedWith(ResourceNotFoundError, userDoesNotExistString);

        verify(userServiceMock.getUser(newLicense.user.id)).called();
        verify(licenseTypeServiceMock.getLicenseType(anyString())).never();
        verify(licenseRepositoryMock.getLicenseByUserAndLicenseType(
            anyOfClass(User), anyOfClass(LicenseType))).never();
        verify(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
            anyNumber(), anyOfClass(LicenseType))).never();
        verify(licenseStatusServiceMock.getLicenseStatus(anyString())).never();
        verify(licenseRepositoryMock.createLicense(anyOfClass(License))).never();
    });

    it(('createLicense license type does not exist expect ResourceNotFoundError'), async() => {
        const newLicense : License = LicenseDataProvider
            .getLicense(2, 123, licenseType.type, licenseStatus.status, user);

        when(userServiceMock.getUser(anyNumber())).thenResolve(newLicense.user);
        when(licenseTypeServiceMock.getLicenseType(anyString()))
            .thenThrow(new ResourceNotFoundError(licenseTypeDoesNotExistString));

        await expect(licenseService.createLicense(newLicense.user.id, newLicense)).to.be
            .rejectedWith(ResourceNotFoundError, licenseTypeDoesNotExistString);

        verify(userServiceMock.getUser(newLicense.user.id)).called();
        verify(licenseTypeServiceMock.getLicenseType(newLicense.licenseType.type)).called();
        verify(licenseRepositoryMock.getLicenseByUserAndLicenseType(
            anyOfClass(User), anyOfClass(LicenseType))).never();
        verify(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
            anyNumber(), anyOfClass(LicenseType))).never();
        verify(licenseStatusServiceMock.getLicenseStatus(anyString())).never();
        verify(licenseRepositoryMock.createLicense(anyOfClass(License))).never();
    });

    it(
        ('createLicense inspector user with invalid license type expect BadRequestError'),
        async() => {
            const inspector : User = UserDataProvider.getUserWithType(2, UserTypeEnum.INSPECTOR);
            const newLicense : License = LicenseDataProvider
                .getLicense(2, 123, licenseType.type, licenseStatus.status, inspector);

            when(userServiceMock.getUser(anyNumber())).thenResolve(newLicense.user);
            when(licenseTypeServiceMock.getLicenseType(anyString())).thenResolve(licenseType);

            await expect(licenseService.createLicense(newLicense.user.id, newLicense)).to.be
                .rejectedWith(BadRequestError);

            verify(userServiceMock.getUser(newLicense.user.id)).called();
            verify(licenseTypeServiceMock.getLicenseType(newLicense.licenseType.type)).called();
            verify(licenseRepositoryMock.getLicenseByUserAndLicenseType(
                anyOfClass(User), anyOfClass(LicenseType))).never();
            verify(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
                anyNumber(), anyOfClass(LicenseType))).never();
            verify(licenseStatusServiceMock.getLicenseStatus(anyString())).never();
            verify(licenseRepositoryMock.createLicense(anyOfClass(License))).never();
        },
    );

    it(
        ('createLicense contractor user with invalid license type expect BadRequestError'),
        async() => {
            const ibqLicenseType : LicenseType = LicenseTypeDataProvider
                .getLicenseType(2, LicenseTypeEnum.IBQ);
            const newLicense : License = LicenseDataProvider
                .getLicense(2, 123, ibqLicenseType.type, licenseStatus.status, user);

            when(userServiceMock.getUser(anyNumber())).thenResolve(newLicense.user);
            when(licenseTypeServiceMock.getLicenseType(anyString())).thenResolve(ibqLicenseType);

            await expect(licenseService.createLicense(newLicense.user.id, newLicense)).to.be
                .rejectedWith(BadRequestError);

            verify(userServiceMock.getUser(newLicense.user.id)).called();
            verify(licenseTypeServiceMock.getLicenseType(newLicense.licenseType.type)).called();
            verify(licenseRepositoryMock.getLicenseByUserAndLicenseType(
                anyOfClass(User), anyOfClass(LicenseType))).never();
            verify(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
                anyNumber(), anyOfClass(LicenseType))).never();
            verify(licenseStatusServiceMock.getLicenseStatus(anyString())).never();
            verify(licenseRepositoryMock.createLicense(anyOfClass(License))).never();
        },
    );

    it(('createLicense homeowner user expect BadRequestError'), async() => {
        const homeowner : User = UserDataProvider.getUserWithType(2, UserTypeEnum.HOMEOWNER);
        const newLicense : License = LicenseDataProvider
            .getLicense(2, 123, licenseType.type, licenseStatus.status, homeowner);

        when(userServiceMock.getUser(anyNumber())).thenResolve(newLicense.user);
        when(licenseTypeServiceMock.getLicenseType(anyString())).thenResolve(licenseType);

        await expect(licenseService.createLicense(newLicense.user.id, newLicense)).to.be
            .rejectedWith(BadRequestError);

        verify(userServiceMock.getUser(newLicense.user.id)).called();
        verify(licenseTypeServiceMock.getLicenseType(newLicense.licenseType.type)).called();
        verify(licenseRepositoryMock.getLicenseByUserAndLicenseType(
            anyOfClass(User), anyOfClass(LicenseType))).never();
        verify(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
            anyNumber(), anyOfClass(LicenseType))).never();
        verify(licenseStatusServiceMock.getLicenseStatus(anyString())).never();
        verify(licenseRepositoryMock.createLicense(anyOfClass(License))).never();
    });

    it(('createLicense user license type exists expect ResourceExistsError'), async() => {
        const newLicense : License = LicenseDataProvider
            .getLicense(2, 123, licenseType.type, licenseStatus.status, user);

        when(userServiceMock.getUser(anyNumber())).thenResolve(newLicense.user);
        when(licenseTypeServiceMock.getLicenseType(anyString())).thenResolve(licenseType);
        when(licenseRepositoryMock.getLicenseByUserAndLicenseType(
            anyOfClass(User), anyOfClass(LicenseType))).thenResolve(license);

        await expect(licenseService.createLicense(newLicense.user.id, newLicense)).to.be
            .rejectedWith(ResourceExistsError);

        verify(userServiceMock.getUser(newLicense.user.id)).called();
        verify(licenseTypeServiceMock.getLicenseType(newLicense.licenseType.type)).called();
        verify(licenseRepositoryMock.getLicenseByUserAndLicenseType(
            newLicense.user, newLicense.licenseType)).called();
        verify(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
            anyNumber(), anyOfClass(LicenseType))).never();
        verify(licenseStatusServiceMock.getLicenseStatus(anyString())).never();
        verify(licenseRepositoryMock.createLicense(anyOfClass(License))).never();
    });

    it(('createLicense license exists expect ResourceExistsError'), async() => {
        const newLicense : License = LicenseDataProvider
            .getLicense(2, 123, licenseType.type, licenseStatus.status, user);

        when(userServiceMock.getUser(anyNumber())).thenResolve(newLicense.user);
        when(licenseTypeServiceMock.getLicenseType(anyString())).thenResolve(licenseType);
        when(licenseRepositoryMock.getLicenseByUserAndLicenseType(
            anyOfClass(User), anyOfClass(LicenseType))).thenResolve(null);
        when(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
            anyNumber(), anyOfClass(LicenseType))).thenResolve(license);

        await expect(licenseService.createLicense(newLicense.user.id, newLicense)).to.be
            .rejectedWith(ResourceExistsError);

        verify(userServiceMock.getUser(newLicense.user.id)).called();
        verify(licenseTypeServiceMock.getLicenseType(newLicense.licenseType.type)).called();
        verify(licenseRepositoryMock.getLicenseByUserAndLicenseType(
            newLicense.user, newLicense.licenseType)).called();
        verify(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
            newLicense.licenseNumber, newLicense.licenseType)).called();
        verify(licenseStatusServiceMock.getLicenseStatus(anyString())).never();
        verify(licenseRepositoryMock.createLicense(anyOfClass(License))).never();
    });

    it(('createLicense license status does not exist expect ResourceNotFoundError'), async() => {
        const newLicense : License = LicenseDataProvider
            .getLicense(2, 123, licenseType.type, licenseStatus.status, user);

        when(userServiceMock.getUser(anyNumber())).thenResolve(newLicense.user);
        when(licenseTypeServiceMock.getLicenseType(anyString())).thenResolve(licenseType);
        when(licenseRepositoryMock.getLicenseByUserAndLicenseType(
            anyOfClass(User), anyOfClass(LicenseType))).thenResolve(null);
        when(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
            anyNumber(), anyOfClass(LicenseType))).thenResolve(null);
        when(licenseStatusServiceMock.getLicenseStatus(anyString())).thenThrow(
            new ResourceNotFoundError(licenseStatusDoesNotExistString));

        await expect(licenseService.createLicense(newLicense.user.id, newLicense)).to.be
            .rejectedWith(ResourceNotFoundError, licenseStatusDoesNotExistString);

        verify(userServiceMock.getUser(newLicense.user.id)).called();
        verify(licenseTypeServiceMock.getLicenseType(newLicense.licenseType.type)).called();
        verify(licenseRepositoryMock.getLicenseByUserAndLicenseType(
            newLicense.user, newLicense.licenseType)).called();
        verify(licenseRepositoryMock.getLicenseByLicenseNumberAndType(
            newLicense.licenseNumber, newLicense.licenseType)).called();
        verify(licenseStatusServiceMock.getLicenseStatus(newLicense.licenseStatus.status)).called();
        verify(licenseRepositoryMock.createLicense(anyOfClass(License))).never();
    });
});
