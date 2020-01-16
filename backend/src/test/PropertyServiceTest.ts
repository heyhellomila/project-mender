import 'mocha';
import { equal, deepEqual } from 'assert';
import { PropertyRepository } from '../repositories/PropertyRepository';
import { anyNumber, anyOfClass, anyString, anything, instance, mock, verify,
    when, deepEqual as mockitoDeepEqual } from 'ts-mockito';
import { Property } from '../entities/Property';
import { PropertyDataProvider } from './data_providers/PropertyDataProvider';
import { PropertyService } from '../services/PropertyService';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { UserService } from '../services/UserService';
import { ActivityStatusService } from '../services/ActivityStatusService';
import { PropertyTypeService } from '../services/PropertyTypeService';
import { PROPERTY_FIELDS, PROPERTY_FIELDS_NO_USER } from '../constants/FindOptionsFields';
import { User } from '../entities/User';
import { UserDataProvider } from './data_providers/UserDataProvider';
import { ActivityStatus } from '../entities/ActivityStatus';
import { ActivityStatusDataProvider } from './data_providers/ActivityStatusDataProvider';
import { ActivityStatus as ActivityStatusEnum } from '../enums/ActivityStatus';
import { PropertyType } from '../entities/PropertyType';
import { PropertyTypeDataProvider } from './data_providers/PropertyTypeDataProvider';
import { PropertyType as PropertyTypeEnum } from '../enums/PropertyType';
import { CountryCode } from '../enums/CountryCode';
import { BadRequestError } from '../errors/BadRequestError';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Property Service Test', () => {

    let userServiceMock : UserService;
    let userService: UserService;
    let activityStatusServiceMock : ActivityStatusService;
    let activityStatusService : ActivityStatusService;
    let propertyTypeServiceMock : PropertyTypeService;
    let propertyTypeService : PropertyTypeService;
    let propertyRepositoryMock : PropertyRepository;
    let propertyRepository : PropertyRepository;
    let propertyService : PropertyService;
    const property : Property = PropertyDataProvider.getProperty(1);
    const activityStatus : ActivityStatus =
        ActivityStatusDataProvider.getActivityStatus(1, ActivityStatusEnum.ACTIVE);
    const propertyType : PropertyType =
        PropertyTypeDataProvider.getPropertyType(1, PropertyTypeEnum.CONDOMINIUM);
    const user : User = UserDataProvider.getUser(1);
    const userDoesNotExistString : string = 'User does not exist';
    const activityStatusDoesNotExistString : string = 'Activity status does not exist';
    const propertyTypeDoesNotExistString : string = 'Property type does not exist';
    const propertyDoesNotExistString : string = 'Property does not exist';

    beforeEach(() => {
        userServiceMock = mock(UserService);
        userService = instance(userServiceMock);
        activityStatusServiceMock = mock(ActivityStatusService);
        activityStatusService = instance(activityStatusServiceMock);
        propertyTypeServiceMock = mock(PropertyTypeService);
        propertyTypeService = instance(propertyTypeServiceMock);
        propertyRepositoryMock = mock(PropertyRepository);
        propertyRepository = instance(propertyRepositoryMock);
        propertyService = new PropertyService(
            userService, activityStatusService, propertyTypeService, propertyRepository);
    });

    it(('getPropertyById successfully'), async() => {
        when(propertyRepositoryMock.getPropertyById(anyNumber(), anything())).thenResolve(property);

        const fetchedProperty : Property = await propertyService.getPropertyById(property.id);

        verify(propertyRepositoryMock.getPropertyById(property.id, PROPERTY_FIELDS)).called();
        equal(fetchedProperty, property);
    });

    it(('getPropertyById property does not exist expect ResourceNotFoundError'), async() => {
        when(propertyRepositoryMock.getPropertyById(anyNumber(), anything())).thenResolve(null);
        await expect(propertyService.getPropertyById(property.id)).to.be
            .rejectedWith(ResourceNotFoundError);
        verify(propertyRepositoryMock.getPropertyById(property.id, PROPERTY_FIELDS)).called();
    });

    it(('getProperties by user id and status successfully'), async() => {
        when(userServiceMock.getUser(anyNumber())).thenResolve(user);
        when(activityStatusServiceMock.getActivityStatus(anyString()))
            .thenResolve(activityStatus);
        when(propertyRepositoryMock.getPropertiesByUserAndActivityStatus(
            anyOfClass(User), anyOfClass(ActivityStatus), anything()))
            .thenResolve([property]);

        const fetchedProperties : Property[] = await propertyService
            .getProperties(user.id, ActivityStatusEnum.ACTIVE);

        verify(userServiceMock.getUser(user.id)).called();
        verify(activityStatusServiceMock.getActivityStatus(ActivityStatusEnum.ACTIVE)).called();
        verify(propertyRepositoryMock.getPropertiesByUserAndActivityStatus(
            user, activityStatus, PROPERTY_FIELDS_NO_USER)).called();
        deepEqual(fetchedProperties, [property]);
    });

    it(('getProperties by user id successfully'), async() => {
        when(userServiceMock.getUser(anyNumber())).thenResolve(user);
        when(propertyRepositoryMock.getPropertiesByUser(
            anyOfClass(User), anything())).thenResolve([property]);

        const fetchedProperties : Property[] = await propertyService
            .getProperties(user.id);

        verify(userServiceMock.getUser(user.id)).called();
        verify(propertyRepositoryMock.getPropertiesByUser(user, PROPERTY_FIELDS_NO_USER)).called();
        deepEqual(fetchedProperties, [property]);
    });

    it(('getProperties user does not exist expect ResourceNotFoundError'), async() => {
        when(userServiceMock.getUser(anyNumber())).thenThrow(
            new ResourceNotFoundError(userDoesNotExistString));

        await expect(propertyService.getProperties(user.id, ActivityStatusEnum.ACTIVE)).to.be
            .rejectedWith(ResourceNotFoundError, userDoesNotExistString);

        verify(userServiceMock.getUser(user.id)).called();
        verify(activityStatusServiceMock.getActivityStatus(anything())).never();
        verify(propertyRepositoryMock.getPropertiesByUserAndActivityStatus(
            anything(), anything(), anything())).never();
        verify(propertyRepositoryMock.getPropertiesByUserAndActivityStatus(
            anything(), anything())).never();
    });

    it(('getProperties activity Status does not exist expect ResourceNotFoundError'), async() => {
        when(userServiceMock.getUser(anyNumber())).thenResolve(user);
        when(activityStatusServiceMock.getActivityStatus(anyString()))
            .thenThrow(new ResourceNotFoundError(activityStatusDoesNotExistString));

        await expect(propertyService.getProperties(user.id, 'invalidStatus')).to.be
            .rejectedWith(ResourceNotFoundError, activityStatusDoesNotExistString);

        verify(userServiceMock.getUser(user.id)).called();
        verify(activityStatusServiceMock.getActivityStatus(anyString())).called();
        verify(propertyRepositoryMock.getPropertiesByUserAndActivityStatus(
            anything(), anything(), anything())).never();
        verify(propertyRepositoryMock.getPropertiesByUserAndActivityStatus(
            anything(), anything())).never();
    });

    it(('createProperty successfully'), async() => {
        const propertyToCreate = PropertyDataProvider.getProperty(
            1, 'A1A 1A1', CountryCode.CA, user, propertyType);
        const expectedProperty = PropertyDataProvider.getProperty(
            1, 'A1A 1A1', CountryCode.CA, user, propertyType, activityStatus);
        when(userServiceMock.getUser(anyNumber())).thenResolve(user);
        when(activityStatusServiceMock.getActivityStatus(anyString())).thenResolve(activityStatus);
        when(propertyTypeServiceMock.getPropertyType(anyString())).thenResolve(propertyType);
        when(propertyRepositoryMock.createProperty(anyOfClass(Property)))
            .thenResolve(expectedProperty);

        const createdProperty = await propertyService.createProperty(user.id, propertyToCreate);

        verify(userServiceMock.getUser(user.id)).called();
        verify(activityStatusServiceMock.getActivityStatus(ActivityStatusEnum.ACTIVE)).called();
        verify(propertyTypeServiceMock.getPropertyType(
            propertyToCreate.propertyType.type)).called();
        verify(propertyRepositoryMock.createProperty(mockitoDeepEqual(expectedProperty))).called();
        equal(expectedProperty, createdProperty);
    });

    it(('createProperty invalid postal code expect BadRequestError'), async() => {
        const propertyToCreate = PropertyDataProvider.getProperty(
            1, 'invalid', CountryCode.CA, user, propertyType);

        await expect(propertyService.createProperty(user.id, propertyToCreate)).to.be
            .rejectedWith(BadRequestError);

        verify(propertyRepositoryMock.createProperty(anything())).never();
    });

    it(('createProperty user does not exist expect ResourceNotFoundError'), async() => {
        const propertyToCreate = PropertyDataProvider.getProperty(
            1, 'A1A 1A1', CountryCode.CA, user, propertyType);
        when(userServiceMock.getUser(anyNumber()))
            .thenThrow(new ResourceNotFoundError(userDoesNotExistString));

        await expect(propertyService.createProperty(user.id, propertyToCreate)).to.be
            .rejectedWith(ResourceNotFoundError, userDoesNotExistString);

        verify(propertyRepositoryMock.createProperty(anything())).never();
    });

    it(('createProperty property type does not exist expect ResourceNotFoundError'), async() => {
        const propertyToCreate = PropertyDataProvider.getProperty(
            1, 'A1A 1A1', CountryCode.CA, user, propertyType);
        when(userServiceMock.getUser(anyNumber())).thenResolve(user);
        when(propertyTypeServiceMock.getPropertyType(anyString()))
            .thenThrow(new ResourceNotFoundError(propertyTypeDoesNotExistString));

        await expect(propertyService.createProperty(user.id, propertyToCreate)).to.be
            .rejectedWith(ResourceNotFoundError, propertyTypeDoesNotExistString);

        verify(propertyRepositoryMock.createProperty(anything())).never();
    });

    it(('updatePropertyById successfully'), async() => {
        const savedProperty = PropertyDataProvider.getProperty(1);
        const propertyToUpdate = PropertyDataProvider.getPropertyForUpdate(
            'A1A 1A1', CountryCode.CA, propertyType, activityStatus);

        when(propertyRepositoryMock.getPropertyById(anyNumber(), anything()))
            .thenResolve(savedProperty);
        when(activityStatusServiceMock.getActivityStatus(anyString())).thenResolve(activityStatus);
        when(propertyTypeServiceMock.getPropertyType(anyString())).thenResolve(propertyType);
        when(propertyRepositoryMock.updatePropertyById(anyNumber(), anyOfClass(Property)))
            .thenResolve(null);

        await propertyService.updatePropertyById(savedProperty.id, propertyToUpdate);

        verify(propertyRepositoryMock.getPropertyById(savedProperty.id, PROPERTY_FIELDS)).called();
        verify(activityStatusServiceMock.getActivityStatus(
            propertyToUpdate.activityStatus.status)).called();
        verify(propertyTypeServiceMock.getPropertyType(
            propertyToUpdate.propertyType.type)).called();
        verify(propertyRepositoryMock.updatePropertyById(
            savedProperty.id, mockitoDeepEqual(propertyToUpdate))).called();
    });

    it(('updatePropertyById property does not exist expect ResourceNotFoundError'), async() => {
        const savedProperty = PropertyDataProvider.getProperty(1);
        const propertyToUpdate = PropertyDataProvider.getPropertyForUpdate(
            'A1A 1A1', CountryCode.CA, propertyType, activityStatus);

        when(propertyRepositoryMock.getPropertyById(anyNumber(), anything()))
            .thenThrow(new ResourceNotFoundError(propertyDoesNotExistString));

        await expect(propertyService.updatePropertyById(savedProperty.id, propertyToUpdate)).to.be
            .rejectedWith(ResourceNotFoundError, propertyDoesNotExistString);

        verify(propertyRepositoryMock.getPropertyById(
            savedProperty.id, PROPERTY_FIELDS)).called();
        verify(activityStatusServiceMock.getActivityStatus(
            propertyToUpdate.activityStatus.status)).never();
        verify(propertyTypeServiceMock.getPropertyType(
            propertyToUpdate.propertyType.type)).never();
        verify(propertyRepositoryMock.updatePropertyById(
            savedProperty.id, mockitoDeepEqual(propertyToUpdate))).never();
    });

    it(
        ('updatePropertyById activity status does not exist expect ResourceNotFoundError'),
        async() => {
            const savedProperty = PropertyDataProvider.getProperty(1);
            const propertyToUpdate = PropertyDataProvider.getPropertyForUpdate(
                'A1A 1A1', CountryCode.CA, propertyType, activityStatus);

            when(propertyRepositoryMock.getPropertyById(anyNumber(), anything()))
                .thenResolve(savedProperty);
            when(activityStatusServiceMock.getActivityStatus(anyString()))
                .thenThrow(new ResourceNotFoundError(activityStatusDoesNotExistString));

            await expect(propertyService.updatePropertyById(savedProperty.id, propertyToUpdate))
                .to.be.rejectedWith(ResourceNotFoundError, activityStatusDoesNotExistString);

            verify(propertyRepositoryMock.getPropertyById(
                savedProperty.id, PROPERTY_FIELDS)).called();
            verify(activityStatusServiceMock.getActivityStatus(
                propertyToUpdate.activityStatus.status)).called();
            verify(propertyTypeServiceMock.getPropertyType(
                propertyToUpdate.propertyType.type)).never();
            verify(propertyRepositoryMock.updatePropertyById(
                savedProperty.id, mockitoDeepEqual(propertyToUpdate))).never();
        },
    );

    it(
        ('updatePropertyById property type does not exist expect ResourceNotFoundError'),
        async() => {
            const savedProperty = PropertyDataProvider.getProperty(1);
            const propertyToUpdate = PropertyDataProvider.getPropertyForUpdate(
                'A1A 1A1', CountryCode.CA, propertyType, activityStatus);

            when(propertyRepositoryMock.getPropertyById(anyNumber(), anything()))
                .thenResolve(savedProperty);
            when(activityStatusServiceMock.getActivityStatus(anyString()))
                .thenResolve(activityStatus);
            when(propertyTypeServiceMock.getPropertyType(anyString()))
                .thenThrow(new ResourceNotFoundError(propertyTypeDoesNotExistString));

            await expect(propertyService.updatePropertyById(savedProperty.id, propertyToUpdate))
                .to.be.rejectedWith(ResourceNotFoundError, propertyTypeDoesNotExistString);

            verify(propertyRepositoryMock.getPropertyById(
                savedProperty.id, PROPERTY_FIELDS)).called();
            verify(activityStatusServiceMock.getActivityStatus(
                propertyToUpdate.activityStatus.status)).called();
            verify(propertyTypeServiceMock.getPropertyType(
                propertyToUpdate.propertyType.type)).called();
            verify(propertyRepositoryMock.updatePropertyById(
                savedProperty.id, mockitoDeepEqual(propertyToUpdate))).never();
        },
    );
});
