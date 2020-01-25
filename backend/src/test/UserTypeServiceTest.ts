import 'mocha';
import { equal } from 'assert';
import {anything, instance, mock, verify, when} from 'ts-mockito';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { UserTypeService } from '../services/UserTypeService';
import { UserTypeRepository } from '../repositories/UserTypeRepository';
import { UserType } from '../enums/UserType';
import { UserTypeDataProvider } from './data_providers/UserTypeDataProvider';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('User Type Service Test', () => {
    let userTypeService : UserTypeService;

    let userTypeRepositoryMock : UserTypeRepository;
    let userTypeRepository : UserTypeRepository;
    const usertype = UserTypeDataProvider.getUserType(1, 'HOMEOWNER');

    beforeEach(() => {
        userTypeRepositoryMock = mock(UserTypeRepository);
        userTypeRepository = instance(userTypeRepositoryMock);
        userTypeService = new UserTypeService(userTypeRepository);
    });

    it(('getUserType happy path'), async() => {
        when(userTypeRepositoryMock.getUserType(anything())).thenResolve(usertype);
        const fetchedUserType = await userTypeService.getUserType('HOMEOWNER');
        verify(userTypeRepositoryMock.getUserType(UserType.HOMEOWNER)).called();
        equal(fetchedUserType, usertype);
    });

    it(('getUserType repository error'), async() => {
        when(userTypeRepositoryMock.getUserType(anything())).thenResolve(null);
        await expect(userTypeService.getUserType('HOMEOWNER')).to.be.
            rejectedWith(ResourceNotFoundError);
        verify(userTypeRepositoryMock.getUserType(UserType.HOMEOWNER)).called();
    });
});
