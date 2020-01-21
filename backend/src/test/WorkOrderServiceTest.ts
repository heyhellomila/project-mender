import 'mocha';
import { anyNumber, anyOfClass, anyString, anything, instance, mock, verify, when } from 'ts-mockito';
import { WorkOrderTypeService } from '../services/WorkOrderTypeService';
import { PropertyService } from '../services/PropertyService';
import { SectorService } from '../services/SectorService';
import { PriorityTypeService } from '../services/PriorityTypeService';
import { WorkOrderStatusService } from '../services/WorkOrderStatusService';
import { WorkOrderRepository } from '../repositories/WorkOrderRepository';
import { WorkOrderService } from '../services/WorkOrderService';
import { PropertyDataProvider } from './data_providers/PropertyDataProvider';
import { Property } from '../entities/Property';
import { WorkOrder } from '../entities/WorkOrder';
import { WorkOrderDataProvider } from './data_providers/WorkOrderDataProvider';
import { equal } from 'assert';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { BadRequestError } from '../errors/BadRequestError';
import { WorkOrderFieldsNoProperty } from '../constants/FindOptionsFields';
import { WorkOrderQueryDataProvider } from './data_providers/WorkOrderQueryDataProvider';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Work Order Service Test', () => {

    let workOrderService : WorkOrderService;

    let propertyServiceMock: PropertyService;
    let propertyService: PropertyService;

    let sectorServiceMock: SectorService;
    let sectorService: SectorService;

    let priorityTypeServiceMock: PriorityTypeService;
    let priorityTypeService: PriorityTypeService;

    let workOrderTypeServiceMock: WorkOrderTypeService;
    let workOrderTypeService: WorkOrderTypeService;

    let workOrderStatusServiceMock: WorkOrderStatusService;
    let workOrderStatusService: WorkOrderStatusService;

    let workOrderRepositoryMock: WorkOrderRepository;
    let workOrderRepository: WorkOrderRepository;

    const workOrder: WorkOrder = WorkOrderDataProvider.getWorkOrderPopulated(1);
    const workOrder2: WorkOrder = WorkOrderDataProvider.getWorkOrderPopulated(2);
    const workOrders : WorkOrder[] = [workOrder, workOrder2];
    const property: Property = PropertyDataProvider.getProperty(1);

    const propertyDoesNotExistString = 'Property does not exist.';
    const invalidSectorString = 'Invalid Sector';
    const invalidPriorityTypeString = 'Invalid PriorityType';
    const invalidWorkOrderTypeString = 'Invalid work order typre';
    const invalidWorkOrderStatusString = 'Invalid work order Status';

    const workOrdersQuery = WorkOrderQueryDataProvider.getWorkOrderQuery('10', '1');
    const workOrdersQueryNullPages = WorkOrderQueryDataProvider.getWorkOrderQuery(null, null);
    const workOrdersQueryUnderflow = WorkOrderQueryDataProvider.getWorkOrderQuery('-1', '1');

    beforeEach(() => {
        propertyServiceMock = mock(PropertyService);
        propertyService = instance(propertyServiceMock);

        sectorServiceMock = mock(SectorService);
        sectorService = instance(sectorServiceMock);

        priorityTypeServiceMock = mock(PriorityTypeService);
        priorityTypeService = instance(priorityTypeServiceMock);

        workOrderTypeServiceMock = mock(WorkOrderTypeService);
        workOrderTypeService = instance(workOrderTypeServiceMock);

        workOrderStatusServiceMock = mock(WorkOrderStatusService);
        workOrderStatusService = instance(workOrderStatusServiceMock);

        workOrderRepositoryMock = mock(WorkOrderRepository);
        workOrderRepository = instance(workOrderRepositoryMock);

        workOrderService = new WorkOrderService(propertyService, sectorService,
                                                priorityTypeService, workOrderTypeService,
                                                workOrderStatusService, workOrderRepository);
    });

    it(('createWorkOrder happy path'), async() => {
        when(propertyServiceMock.getPropertyById(1)).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).
            thenResolve(workOrder.sector);
        when(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).
            thenResolve(workOrder.priorityType);
        when(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).
            thenResolve(workOrder.workOrderType);
        when(workOrderStatusServiceMock.getWorkOrderStatus(anything())).
            thenResolve(workOrder.workOrderStatus);
        when(workOrderRepositoryMock.createWorkOrder(workOrder)).thenResolve(workOrder);
        const fetchedWorkOrder = await workOrderService.createWorkOrder(1, workOrder, 1);
        verify(propertyServiceMock.getPropertyById(1)).called();
        verify(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).called();
        verify(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).called();
        verify(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).called();
        verify(workOrderStatusServiceMock.getWorkOrderStatus(anything())).called();
        verify(workOrderRepositoryMock.createWorkOrder(workOrder)).called();
        equal(fetchedWorkOrder, workOrder);
    });

    it(('createWorkOrder propertyService fails throws ResourceNotFoundError '), async() => {
        when(propertyServiceMock.getPropertyById(1)).
            thenThrow(new ResourceNotFoundError(propertyDoesNotExistString));
        await expect(workOrderService.createWorkOrder(1, workOrder, 1)).to.be.
            rejectedWith(ResourceNotFoundError, propertyDoesNotExistString);
    });

    it(('createWorkOrder sectorService throws ResourceNotFound'), async() => {
        when(propertyServiceMock.getPropertyById(1)).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).
            thenThrow(new ResourceNotFoundError(invalidSectorString));

        await expect(workOrderService.createWorkOrder(1, workOrder, 1)).to.be.
            rejectedWith(ResourceNotFoundError, invalidSectorString);
        verify(propertyServiceMock.getPropertyById(1)).called();
    });

    it(('createWorkOrder sectorService throws ResourceNotFound'), async() => {
        when(propertyServiceMock.getPropertyById(1)).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).
            thenResolve(workOrder.sector);
        when(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).
            thenThrow(new ResourceNotFoundError(invalidPriorityTypeString));
        await expect(workOrderService.createWorkOrder(1, workOrder, 1)).to.be.
            rejectedWith(ResourceNotFoundError, invalidPriorityTypeString);
        verify(propertyServiceMock.getPropertyById(1)).called();
        verify(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).called();
    });

    it(('createWorkOrder workOrderTypeServiceMock throws ResourceNotFoundError'), async() => {
        when(propertyServiceMock.getPropertyById(1)).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).
            thenResolve(workOrder.sector);
        when(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).
            thenResolve(workOrder.priorityType);
        when(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).
            thenThrow(new ResourceNotFoundError(invalidWorkOrderTypeString));
        await expect(workOrderService.createWorkOrder(1, workOrder, 1)).to.be.
            rejectedWith(ResourceNotFoundError, invalidWorkOrderTypeString);
        verify(propertyServiceMock.getPropertyById(1)).called();
        verify(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).called();
        verify(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).called();
    });

    it(('createWorkOrder workOrderStatusService throws ResourceNotFound'), async() => {
        when(propertyServiceMock.getPropertyById(1)).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).
            thenResolve(workOrder.sector);
        when(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).
            thenResolve(workOrder.priorityType);
        when(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).
            thenResolve(workOrder.workOrderType);
        when(workOrderStatusServiceMock.getWorkOrderStatus(anything())).
            thenThrow(new ResourceNotFoundError(invalidWorkOrderStatusString));
        await expect(workOrderService.createWorkOrder(1, workOrder, 1)).to.be.
            rejectedWith(ResourceNotFoundError, invalidWorkOrderStatusString);
        verify(propertyServiceMock.getPropertyById(1)).called();
        verify(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).called();
        verify(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).called();
        verify(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).called();
    });

    it(('createWorkOrder workOrderRepository returns null expect Error'), async() => {
        when(propertyServiceMock.getPropertyById(1)).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).
            thenResolve(workOrder.sector);
        when(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).
            thenResolve(workOrder.priorityType);
        when(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).
            thenResolve(workOrder.workOrderType);
        when(workOrderStatusServiceMock.getWorkOrderStatus(anything())).
            thenResolve(workOrder.workOrderStatus);
        when(workOrderRepositoryMock.createWorkOrder(workOrder)).thenThrow(new Error());
        await expect(workOrderService.createWorkOrder(1, workOrder, 1)).to.be.
            rejectedWith(BadRequestError);
        verify(propertyServiceMock.getPropertyById(1)).called();
        verify(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).called();
        verify(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).called();
        verify(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).called();
        verify(workOrderStatusServiceMock.getWorkOrderStatus(anything())).called();
        verify(workOrderRepositoryMock.createWorkOrder(workOrder)).called();
    });

    it(('getWorkOrdersByPropertyId happy path'), async() => {
        when(propertyServiceMock.getPropertyById(1)).thenResolve(property);
        when(workOrderRepositoryMock.getWorkOrdersByProperty(property, anything())).
            thenResolve(workOrders);
        const fetchedWorkOrders = await workOrderService.getWorkOrdersByPropertyId(1);
        verify(propertyServiceMock.getPropertyById(1)).called();
        verify(workOrderRepositoryMock.
        getWorkOrdersByProperty(property, WorkOrderFieldsNoProperty)).called();
        equal(fetchedWorkOrders, workOrders);
    });

    it(('getWorkOrdersByPropertyId propertyService throws ResourceNotFoundError'), async() => {
        when(propertyServiceMock.getPropertyById(1)).thenResolve(null);
        await expect(workOrderService.getWorkOrdersByPropertyId(1)).to.be.
            rejectedWith(ResourceNotFoundError);
    });

    it(('getWorkOrdersByPropertyId workOrderRepository throws an error'), async() => {
        when(propertyServiceMock.getPropertyById(1)).thenResolve(property);
        when(workOrderRepositoryMock.getWorkOrdersByProperty(property, anything())).
            thenThrow(new Error);
        await expect(workOrderService.getWorkOrdersByPropertyId(1)).to.be.
            rejectedWith(Error);
        verify(propertyServiceMock.getPropertyById(1)).called();
    });

    it(('getWorkOrders happy path'), async() => {
        // also tests getWorkOrderSort and getFilterQueries (and createSQLFilterQuery)
        when(workOrderRepositoryMock.getWorkOrders(anything(), anything(),
                                                   anything(), anything(),
                                                   anything(), anything())).
            thenResolve(workOrders);
        const fetchedWorkOrders = await workOrderService.getWorkOrders(workOrdersQuery);
        verify(workOrderRepositoryMock.getWorkOrders(anything(), anything(),
                                                     anything(), anything(),
                                                     anything(), anything())).
            called();
        equal(fetchedWorkOrders, workOrders);
    });

    it(('getWorkOrders missing pagesize parameter'), async() => {
        await expect(workOrderService.getWorkOrders(workOrdersQueryNullPages)).to.be.
            rejectedWith(BadRequestError);
    });
    it(('getWorkOrders pagesize is out of range '), async() => {
        await expect(workOrderService.getWorkOrders(workOrdersQueryUnderflow)).to.be.
        rejectedWith(BadRequestError);
    });

});
