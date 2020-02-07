import 'mocha';
import { equal } from 'assert';
import { BusinessTypeRepository } from '../repositories/BusinessTypeRepository';
import { anyString, instance, mock, verify, when } from 'ts-mockito';
import { BusinessTypeService } from '../services/BusinessTypeService';
import { BusinessType } from '../entities/BusinessType';
import { BusinessType as BusinessTypeEnum } from '../enums/BusinessType';
import { BusinessTypeDataProvider } from './data_providers/BusinessTypeDataProvider';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Business Type Service Test', () => {

    let businessTypeRepositoryMock : BusinessTypeRepository;
    let businessTypeRepository : BusinessTypeRepository;
    let businessTypeService : BusinessTypeService;
    const businessType : BusinessType = BusinessTypeDataProvider
        .getBusinessType(1, BusinessTypeEnum.BUSINESS);

    beforeEach(() => {
        businessTypeRepositoryMock = mock(BusinessTypeRepository);
        businessTypeRepository = instance(businessTypeRepositoryMock);
        businessTypeService = new BusinessTypeService(businessTypeRepository);
    });

    it('getBusinessType with valid string and expect business type', async () => {
        when(businessTypeRepositoryMock.getBusinessType(anyString()))
            .thenResolve(businessType);
        const fetchedBusinessType : BusinessType =
            await businessTypeService.getBusinessType(businessType.type);

        verify(businessTypeRepositoryMock.getBusinessType(businessType.type))
            .called();

        equal(fetchedBusinessType, businessType);
    });

    it('getBusinessType with invalid string expect ResourceNotFoundError', async () => {
        when(businessTypeRepositoryMock.getBusinessType(anyString()))
            .thenResolve(null);
        await expect(businessTypeService.getBusinessType(businessType.type)).to.be
            .rejectedWith(ResourceNotFoundError);
        verify(businessTypeRepositoryMock.getBusinessType(businessType.type)).called();
    });
});
