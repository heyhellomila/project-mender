import { ActivityStatusRepository } from '../repositories/ActivityStatusRepository';
import { anyString, instance, mock, verify, when } from 'ts-mockito';
import { ActivityStatusService } from '../services/ActivityStatusService';
import { ActivityStatus } from '../entities/ActivityStatus';
import { ActivityStatus as ActivityStatusEnum } from '../enums/ActivityStatus';
import { equal } from 'assert';
import 'mocha';
import { ActivityStatusDataProvider } from './data_providers/ActivityStatusDataProvider';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Activity Status Service Test', () => {

    let activityStatusRepositoryMock : ActivityStatusRepository;
    let activityStatusRepository : ActivityStatusRepository;
    let activityStatusService : ActivityStatusService;
    const activityStatus : ActivityStatus = ActivityStatusDataProvider
        .getActivityStatus(1, ActivityStatusEnum.ACTIVE);

    beforeEach(() => {
        activityStatusRepositoryMock = mock(ActivityStatusRepository);
        activityStatusRepository = instance(activityStatusRepositoryMock);
        activityStatusService = new ActivityStatusService(activityStatusRepository);
    });

    it('getActivityStatus with valid string and expect activity status', async () => {
        when(activityStatusRepositoryMock.getActivityStatus(anyString()))
            .thenResolve(activityStatus);
        const fetchedActivityStatus : ActivityStatus =
            await activityStatusService.getActivityStatus(activityStatus.status);

        verify(activityStatusRepositoryMock.getActivityStatus(activityStatus.status))
            .called();

        equal(fetchedActivityStatus, activityStatus);
    });

    it('Expect resource not found error from invalid string', async () => {
        when(activityStatusRepositoryMock.getActivityStatus(anyString()))
            .thenResolve(null);
        await expect(activityStatusService.getActivityStatus(anyString())).to.be
            .rejectedWith(ResourceNotFoundError);
    });
});
