import 'mocha';
import { equal } from 'assert';
import {anything, instance, mock, verify, when} from 'ts-mockito';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { UserTypeService } from '../services/UserTypeService';
import { UserTypeRepository } from '../repositories/UserTypeRepository';
import { UserTypeDataProvider } from './data_providers/UserTypeDataProvider';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('User Type Service Test', () => {
    let userTypeService : UserTypeService;

    let userTypeRepositoryMock : UserTypeRepository;
    let userTypeRepository : UserTypeRepository;
    const userType = UserTypeDataProvider.getUserType(1, 'HOMEOWNER');

    beforeEach(() => {
        userTypeRepositoryMock = mock(UserTypeRepository);
        userTypeRepository = instance(userTypeRepositoryMock);
        userTypeService = new UserTypeService(userTypeRepository);
    });

    it(('getUserType happy path'), async() => {
        when(userTypeRepositoryMock.getUserType(anything())).thenResolve(userType);
        const fetchedUserType = await userTypeService.getUserType(userType.type);
        verify(userTypeRepositoryMock.getUserType(userType.type)).called();
        equal(fetchedUserType, userType);
    });

    it(('getUserType repository error'), async() => {
        when(userTypeRepositoryMock.getUserType(anything())).thenResolve(null);
        await expect(userTypeService.getUserType(userType.type)).to.be.
            rejectedWith(ResourceNotFoundError);
        verify(userTypeRepositoryMock.getUserType(userType.type)).called();
    });
});
