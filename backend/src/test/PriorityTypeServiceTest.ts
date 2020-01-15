import 'mocha';
import { equal } from 'assert';
import { PriorityTypeRepository } from '../repositories/PriorityTypeRepository';
import { anyString, instance, mock, verify, when } from 'ts-mockito';
import { PriorityTypeService } from '../services/PriorityTypeService';
import { PriorityType } from '../entities/PriorityType';
import { PriorityType as PriorityTypeEnum } from '../enums/PriorityType';
import { PriorityTypeDataProvider } from './data_providers/PriorityTypeDataProvider';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Priority Type Service Test', () => {

    let priorityTypeRepositoryMock : PriorityTypeRepository;
    let priorityTypeRepository : PriorityTypeRepository;
    let priorityTypeService : PriorityTypeService;
    const priorityType : PriorityType = PriorityTypeDataProvider
        .getPriorityType(1, PriorityTypeEnum.HIGH);

    beforeEach(() => {
        priorityTypeRepositoryMock = mock(PriorityTypeRepository);
        priorityTypeRepository = instance(priorityTypeRepositoryMock);
        priorityTypeService = new PriorityTypeService(priorityTypeRepository);
    });

    it('getPriorityType with valid string and expect priority type', async () => {
        when(priorityTypeRepositoryMock.getPriorityType(anyString()))
            .thenResolve(priorityType);
        const fetchedPriorityType : PriorityType =
            await priorityTypeService.getPriorityType(priorityType.type);

        verify(priorityTypeRepositoryMock.getPriorityType(priorityType.type))
            .called();

        equal(fetchedPriorityType, priorityType);
    });

    it('Expect resource not found error from invalid string', async () => {
        when(priorityTypeRepositoryMock.getPriorityType(anyString()))
            .thenResolve(null);
        await expect(priorityTypeService.getPriorityType(anyString())).to.be
            .rejectedWith(ResourceNotFoundError);
    });
});
