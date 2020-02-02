import 'mocha';
import { equal } from 'assert';
import { BusinessUserRoleRepository } from '../repositories/BusinessUserRoleRepository';
import { anyString, instance, mock, verify, when } from 'ts-mockito';
import { BusinessUserRoleService } from '../services/BusinessUserRoleService';
import { BusinessUserRole } from '../entities/BusinessUserRole';
import { BusinessUserRole as BusinessUserRoleEnum } from '../enums/BusinessUserRole';
import { BusinessUserRoleDataProvider } from './data_providers/BusinessUserRoleDataProvider';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Business Type Service Test', () => {

    let businessUserRoleRepositoryMock : BusinessUserRoleRepository;
    let businessUserRoleRepository : BusinessUserRoleRepository;
    let businessUserRoleService : BusinessUserRoleService;
    const businessUserRole : BusinessUserRole = BusinessUserRoleDataProvider
        .getBusinessUserRole(1, BusinessUserRoleEnum.EMPLOYEE);

    beforeEach(() => {
        businessUserRoleRepositoryMock = mock(BusinessUserRoleRepository);
        businessUserRoleRepository = instance(businessUserRoleRepositoryMock);
        businessUserRoleService = new BusinessUserRoleService(businessUserRoleRepository);
    });

    it('getBusinessUserRole with valid string and expect business user role', async () => {
        when(businessUserRoleRepositoryMock.getBusinessUserRole(anyString()))
            .thenResolve(businessUserRole);
        const fetchedBusinessUserRole : BusinessUserRole =
            await businessUserRoleService.getBusinessUserRole(businessUserRole.role);

        verify(businessUserRoleRepositoryMock.getBusinessUserRole(businessUserRole.role))
            .called();

        equal(fetchedBusinessUserRole, businessUserRole);
    });

    it('getBusinessUserRole with invalid string expect ResourceNotFoundError', async () => {
        when(businessUserRoleRepositoryMock.getBusinessUserRole(anyString()))
            .thenResolve(null);
        await expect(businessUserRoleService.getBusinessUserRole(businessUserRole.role)).to.be
            .rejectedWith(ResourceNotFoundError);
        verify(businessUserRoleRepositoryMock.getBusinessUserRole(businessUserRole.role)).called();
    });
});
