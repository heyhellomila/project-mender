import 'mocha';
import { equal } from 'assert';
import { PropertyTypeRepository } from '../repositories/PropertyTypeRepository';
import { anyString, instance, mock, verify, when } from 'ts-mockito';
import { PropertyTypeService } from '../services/PropertyTypeService';
import { PropertyType } from '../entities/PropertyType';
import { PropertyType as PropertyTypeEnum } from '../enums/PropertyType';
import { PropertyTypeDataProvider } from './data_providers/PropertyTypeDataProvider';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Property Type Service Test', () => {

    let propertyTypeRepositoryMock : PropertyTypeRepository;
    let propertyTypeRepository : PropertyTypeRepository;
    let propertyTypeService : PropertyTypeService;
    const propertyType : PropertyType = PropertyTypeDataProvider
        .getPropertyType(1, PropertyTypeEnum.MOBILE_HOME);

    beforeEach(() => {
        propertyTypeRepositoryMock = mock(PropertyTypeRepository);
        propertyTypeRepository = instance(propertyTypeRepositoryMock);
        propertyTypeService = new PropertyTypeService(propertyTypeRepository);
    });

    it('getPropertyType with valid string and expect property type', async () => {
        when(propertyTypeRepositoryMock.getPropertyType(anyString()))
            .thenResolve(propertyType);
        const fetchedPropertyType : PropertyType =
            await propertyTypeService.getPropertyType(propertyType.type);

        verify(propertyTypeRepositoryMock.getPropertyType(propertyType.type))
            .called();

        equal(fetchedPropertyType, propertyType);
    });

    it('Expect resource not found error from invalid string', async () => {
        when(propertyTypeRepositoryMock.getPropertyType(anyString()))
            .thenResolve(null);
        await expect(propertyTypeService.getPropertyType(anyString())).to.be
            .rejectedWith(ResourceNotFoundError);
    });
});
