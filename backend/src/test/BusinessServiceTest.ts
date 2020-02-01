import 'mocha';
import { equal } from 'assert';
import { anyNumber, anyOfClass, anyString, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { BusinessRepository } from '../repositories/BusinessRepository';
import { BusinessTypeService } from '../services/BusinessTypeService';
import { BusinessService } from '../services/BusinessService';
import { BusinessDataProvider} from './data_providers/BusinessDataProvider';
import { Business } from '../entities/Business';
import { BusinessTypeDataProvider } from './data_providers/BusinessTypeDataProvider';
import { BusinessType as BusinessTypeEnum } from '../enums/BusinessType';
import { BadRequestError } from '../errors/BadRequestError';
import { ResourceExistsError } from '../errors/ResourceExistsError';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Business Service Test', () => {

    let businessRepositoryMock : BusinessRepository;
    let businessRepository : BusinessRepository;
    let businessTypeServiceMock : BusinessTypeService;
    let businessTypeService : BusinessTypeService;
    let businessService : BusinessService;
    const business = BusinessDataProvider.getBusiness(1, 123);
    const businessType = BusinessTypeDataProvider.getBusinessType(1, BusinessTypeEnum.BUSINESS);
    const businessTypeDoesNotExistString : string = 'Business type does not exist';

    beforeEach(() => {
        businessRepositoryMock = mock(BusinessRepository);
        businessRepository = instance(businessRepositoryMock);
        businessTypeServiceMock = mock(BusinessTypeService);
        businessTypeService = instance(businessTypeServiceMock);
        businessService = new BusinessService(businessRepository, businessTypeService);
    });

    it(('businessExists expect business'), async () => {
        when(businessRepositoryMock.getBusinessByNEQ(anyNumber())).thenResolve(business);
        const fetchedBusiness : Business = await businessService.businessExists(business.NEQ);
        verify(businessRepositoryMock.getBusinessByNEQ(business.NEQ)).called();
        equal(fetchedBusiness, business);
    });

    it(('getBusinessById expect business'), async () => {
        when(businessRepositoryMock.getBusinessById(anyNumber())).thenResolve(business);
        const fetchedBusiness : Business = await businessService.getBusinessById(business.id);
        verify(businessRepositoryMock.getBusinessById(business.id)).called();
        equal(fetchedBusiness, business);
    });

    it(('getBusinessById invalid id expect ResourceNotFoundError'), async () => {
        when(businessRepositoryMock.getBusinessById(anyNumber())).thenResolve(null);
        await expect(businessService.getBusinessById(business.id)).to.be
            .rejectedWith(ResourceNotFoundError);
        verify(businessRepositoryMock.getBusinessById(business.id)).called();
    });

    it(('createBusiness expect created business'), async() => {
        const newBusiness : Business = BusinessDataProvider.getBusiness(
            2, 456, businessType.type);
        const expectedBusiness : Business = BusinessDataProvider.getBusiness(
            newBusiness.id, newBusiness.NEQ, businessType);

        when(businessRepositoryMock.getBusinessByNEQ(anyNumber())).thenResolve(null);
        when(businessTypeServiceMock.getBusinessType(anyString())).thenResolve(businessType);
        when(businessRepositoryMock.createBusiness(anyOfClass(Business)))
            .thenResolve(expectedBusiness);

        const createdBusiness : Business = await businessService.createBusiness(newBusiness);

        verify(businessRepositoryMock.getBusinessByNEQ(newBusiness.NEQ)).called();
        verify(businessTypeServiceMock.getBusinessType(newBusiness.businessType.type)).called();
        verify(businessRepositoryMock.createBusiness(deepEqual(expectedBusiness))).called();
        equal(createdBusiness, expectedBusiness);
    });

    it(('createBusiness no NEQ with business type expect BadRequestError'), async() => {
        const newBusiness : Business = BusinessDataProvider.getBusiness(
            2, null, businessType.type);

        await expect(businessService.createBusiness(newBusiness)).to.be
            .rejectedWith(BadRequestError);

        verify(businessRepositoryMock.getBusinessByNEQ(anyNumber())).never();
        verify(businessTypeServiceMock.getBusinessType(anyString())).never();
        verify(businessRepositoryMock.createBusiness(anyOfClass(Business))).never();
    });

    it(('createBusiness NEQ already exists expect ResourceExistsError'), async() => {
        const newBusiness : Business = BusinessDataProvider.getBusiness(
            2, 456, businessType.type);

        when(businessRepositoryMock.getBusinessByNEQ(anyNumber())).thenResolve(newBusiness);

        await expect(businessService.createBusiness(newBusiness)).to.be
            .rejectedWith(ResourceExistsError);

        verify(businessRepositoryMock.getBusinessByNEQ(newBusiness.NEQ)).called();
        verify(businessTypeServiceMock.getBusinessType(anyString())).never();
        verify(businessRepositoryMock.createBusiness(anyOfClass(Business))).never();
    });

    it(('createBusiness invalid business type expect ResourceNotFoundError'), async() => {
        const newBusiness : Business = BusinessDataProvider.getBusiness(
            2, 456, 'invalid');

        when(businessRepositoryMock.getBusinessByNEQ(anyNumber())).thenResolve(null);
        when(businessTypeServiceMock.getBusinessType(anyString()))
            .thenThrow(new ResourceNotFoundError(businessTypeDoesNotExistString));

        await expect(businessService.createBusiness(newBusiness)).to.be
            .rejectedWith(ResourceNotFoundError, businessTypeDoesNotExistString);

        verify(businessRepositoryMock.getBusinessByNEQ(newBusiness.NEQ)).called();
        verify(businessTypeServiceMock.getBusinessType(newBusiness.businessType.type)).called();
        verify(businessRepositoryMock.createBusiness(anyOfClass(Business))).never();
    });
});
