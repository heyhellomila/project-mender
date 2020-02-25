import 'mocha';
import { equal } from 'assert';
import { anyString, instance, mock, verify, when } from 'ts-mockito';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { WorkOrderTypeService } from '../services/WorkOrderTypeService';
import { WorkOrderTypeRepository } from '../repositories/WorkOrderTypeRepository';
import { WorkOrderTypeDataProvider } from './data_providers/WorkOrderTypeDataProvider';
import { WorkOrderType } from '../enums/WorkOrderType';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Work Order Type Service Test', () => {
    let workOrderTypeService : WorkOrderTypeService;

    let workOrderTypeRepositoryMock : WorkOrderTypeRepository;
    let workOrderTypeRepository : WorkOrderTypeRepository;

    const workOrderType = WorkOrderTypeDataProvider.getWorkOrderType();

    beforeEach(() => {
        workOrderTypeRepositoryMock = mock(WorkOrderTypeRepository);
        workOrderTypeRepository = instance(workOrderTypeRepositoryMock);
        workOrderTypeService = new WorkOrderTypeService(workOrderTypeRepository);
    });

    it(('getWorkOrderType happy path'), async() => {
        when(workOrderTypeRepositoryMock.getWorkOrderType(anyString())).
            thenResolve(workOrderType);
        const fetchedWorkOrderType = await workOrderTypeService.getWorkOrderType(WorkOrderType.CM);
        verify(workOrderTypeRepositoryMock.getWorkOrderType(WorkOrderType.CM)).called();
        equal(fetchedWorkOrderType, workOrderType);
    });

    it(('getWorkOrderType repository error ResourceNotFoundError'), async() => {
        when(workOrderTypeRepositoryMock.getWorkOrderType(anyString())).
            thenResolve(null);
        await expect(workOrderTypeService.getWorkOrderType(WorkOrderType.CM)).to.be.
            rejectedWith(ResourceNotFoundError);
        verify(workOrderTypeRepositoryMock.getWorkOrderType(WorkOrderType.CM)).called();
    });
});
