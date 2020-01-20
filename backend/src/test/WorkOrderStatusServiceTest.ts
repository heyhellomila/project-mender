import 'mocha';
import { equal } from 'assert';
import { instance, mock, verify, when } from 'ts-mockito';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { WorkOrderStatusRepository } from '../repositories/WorkOrderStatusRepository';
import { WorkOrderStatusService } from '../services/WorkOrderStatusService';
import { WorkOrderStatusEnum } from '../enums/WorkOrderStatusEnum';
import { WorkOrderStatusDataProvider } from './data_providers/WorkOrderStatusDataProvider';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Work Order Status Service Test', () => {
    let workOrderStatusService : WorkOrderStatusService;

    let workOrderStatusRepositoryMock : WorkOrderStatusRepository;
    let workOrderStatusRepository : WorkOrderStatusRepository;
    const workOrderStatus = WorkOrderStatusDataProvider.getWorkOrderStatus();

    beforeEach(() => {
        workOrderStatusRepositoryMock = mock(WorkOrderStatusRepository);
        workOrderStatusRepository = instance(workOrderStatusRepositoryMock);
        workOrderStatusService = new WorkOrderStatusService(workOrderStatusRepository);
    });

    it(('getWorkOrderStatus happy path'), async() => {
        when(workOrderStatusRepositoryMock.getWorkOrderStatus(WorkOrderStatusEnum.ISSUED)).
            thenResolve(workOrderStatus);

        const fetchedWorkOrderStatus = await workOrderStatusService.
            getWorkOrderStatus(WorkOrderStatusEnum.ISSUED);

        verify(workOrderStatusRepositoryMock.getWorkOrderStatus(WorkOrderStatusEnum.ISSUED)).
            called();
        equal(fetchedWorkOrderStatus, workOrderStatus);
    });

    it(('getWorkOrderStatus repository error ResourceNotFoundError'), async() => {
        when(workOrderStatusRepositoryMock.getWorkOrderStatus(WorkOrderStatusEnum.ISSUED)).
        thenResolve(null);

        await expect(workOrderStatusService.getWorkOrderStatus(WorkOrderStatusEnum.ISSUED)).to.be.
            rejectedWith(ResourceNotFoundError);

        verify(workOrderStatusRepositoryMock.getWorkOrderStatus(WorkOrderStatusEnum.ISSUED)).
        called();
    });
});
