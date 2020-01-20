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
import {WorkOrderTypeService} from "../services/WorkOrderTypeService";
import {WorkOrderTypeRepository} from "../repositories/WorkOrderTypeRepository";
import {WorkOrderTypeDataProvider} from "./data_providers/WorkOrderTypeDataProvider";
import {WorkOrderType} from "../enums/WorkOrderType";

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
        when(workOrderTypeRepositoryMock.getWorkOrderType(WorkOrderType.CM)).
        thenResolve(workOrderType);
        const fetchedWorkOrderType = await workOrderTypeService.getWorkOrderType(WorkOrderType.CM);
        verify(workOrderTypeRepositoryMock.getWorkOrderType(WorkOrderType.CM)).called();
        equal(fetchedWorkOrderType, workOrderType);
    });

    it(('getWorkOrderType repository error ResourceNotFoundError'), async() => {
        when(workOrderTypeRepositoryMock.getWorkOrderType(WorkOrderType.CM)).
        thenResolve(null);
        await expect(workOrderTypeService.getWorkOrderType(WorkOrderType.CM)).to.be.
            rejectedWith(ResourceNotFoundError);
        verify(workOrderTypeRepositoryMock.getWorkOrderType(WorkOrderType.CM)).called();
    });
});
