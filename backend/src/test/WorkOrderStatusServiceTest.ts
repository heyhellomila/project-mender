import 'mocha';
import { equal } from 'assert';
import { PropertyTypeRepository } from '../repositories/PropertyTypeRepository';
import { anyNumber, anyString, anything, instance, mock, verify, when } from 'ts-mockito';
import { PropertyTypeService } from '../services/PropertyTypeService';
import { PropertyType } from '../entities/PropertyType';
import { PropertyType as PropertyTypeEnum } from '../enums/PropertyType';
import { PropertyTypeDataProvider } from './data_providers/PropertyTypeDataProvider';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { PropertySector } from '../entities/PropertySector';
import { PropertySectorDataProvider } from './data_providers/PropertySectorDataProvider';
import { ActivityStatus } from '../enums/ActivityStatus';
import { PriorityTypeRepository } from '../repositories/PriorityTypeRepository';
import { PriorityTypeService } from '../services/PriorityTypeService';
import { SectorRepository } from '../repositories/SectorTypeRepository';
import { SectorService } from '../services/SectorService';
import { Sector } from '../entities/Sector';
import { SectorDataProvider } from './data_providers/SectorDataProvider';
import {UserTypeService} from "../services/UserTypeService";
import {UserTypeRepository} from "../repositories/UserTypeRepository";
import {UserType} from "../enums/UserType";
import {UserTypeDataProvider} from "./data_providers/UserTypeDataProvider";
import {WorkOrderStatusRepository} from "../repositories/WorkOrderStatusRepository";
import {WorkOrderStatusService} from "../services/WorkOrderStatusService";
import {WorkOrderStatusEnum} from "../enums/WorkOrderStatusEnum";
import {WorkOrderStatus} from "../entities/WorkOrderStatus";
import {WorkOrderStatusDataProvider} from "./data_providers/WorkOrderStatusDataProvider";

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('User Type Service Test', () => {
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
