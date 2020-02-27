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
import { WORK_ORDER_FIELDS, WORK_ORDER_FIELDS_NO_PROPERTY } from '../constants/FindOptionsFields';
import { WorkOrderQueryDataProvider } from './data_providers/WorkOrderQueryDataProvider';
import { WorkOrderQuery } from '../enums/WorkOrderQueryEnum';

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

    const testUserId = 1;
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
        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(anyString())).
            thenResolve(workOrder.sector);
        when(priorityTypeServiceMock.getPriorityType(anyString())).
            thenResolve(workOrder.priorityType);
        when(workOrderTypeServiceMock.getWorkOrderType(anyString())).
            thenResolve(workOrder.workOrderType);
        when(workOrderStatusServiceMock.getWorkOrderStatus(anything())).
            thenResolve(workOrder.workOrderStatus);
        when(workOrderRepositoryMock.createWorkOrder(workOrder)).thenResolve(workOrder);
        const fetchedWorkOrder = await workOrderService.
            createWorkOrder(property.id, workOrder, testUserId);
        verify(propertyServiceMock.getPropertyById(property.id)).called();
        verify(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).called();
        verify(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).called();
        verify(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).called();
        verify(workOrderStatusServiceMock.getWorkOrderStatus(anything())).called();
        verify(workOrderRepositoryMock.createWorkOrder(workOrder)).called();
        equal(fetchedWorkOrder, workOrder);
    });

    it(('createWorkOrder propertyService fails throws ResourceNotFoundError '), async() => {
        when(propertyServiceMock.getPropertyById(anyNumber())).
            thenThrow(new ResourceNotFoundError(propertyDoesNotExistString));
        await expect(workOrderService.createWorkOrder(property.id, workOrder, testUserId)).to.be.
            rejectedWith(ResourceNotFoundError, propertyDoesNotExistString);
        verify(propertyServiceMock.getPropertyById(property.id)).called();
        verify(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).never();
        verify(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).never();
        verify(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).never();
        verify(workOrderStatusServiceMock.getWorkOrderStatus(anything())).never();
        verify(workOrderRepositoryMock.createWorkOrder(workOrder)).never();

    });

    it(('createWorkOrder sectorService throws ResourceNotFound'), async() => {
        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(anyString())).
            thenThrow(new ResourceNotFoundError(invalidSectorString));

        await expect(workOrderService.createWorkOrder(property.id, workOrder, testUserId)).to.be.
            rejectedWith(ResourceNotFoundError, invalidSectorString);
        verify(propertyServiceMock.getPropertyById(property.id)).called();
        verify(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).called();
        verify(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).never();
        verify(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).never();
        verify(workOrderStatusServiceMock.getWorkOrderStatus(anything())).never();
        verify(workOrderRepositoryMock.createWorkOrder(workOrder)).never();
    });

    it(('createWorkOrder sectorService throws ResourceNotFound'), async() => {
        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(anyString())).
            thenResolve(workOrder.sector);
        when(priorityTypeServiceMock.getPriorityType(anyString())).
            thenThrow(new ResourceNotFoundError(invalidPriorityTypeString));
        await expect(workOrderService.createWorkOrder(property.id, workOrder, testUserId)).to.be.
            rejectedWith(ResourceNotFoundError, invalidPriorityTypeString);
        verify(propertyServiceMock.getPropertyById(property.id)).called();
        verify(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).called();
        verify(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).called();
        verify(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).never();
        verify(workOrderStatusServiceMock.getWorkOrderStatus(anything())).never();
        verify(workOrderRepositoryMock.createWorkOrder(workOrder)).never();
    });

    it(('createWorkOrder workOrderTypeServiceMock throws ResourceNotFoundError'), async() => {
        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(anyString())).
            thenResolve(workOrder.sector);
        when(priorityTypeServiceMock.getPriorityType(anyString())).
            thenResolve(workOrder.priorityType);
        when(workOrderTypeServiceMock.getWorkOrderType(anyString())).
            thenThrow(new ResourceNotFoundError(invalidWorkOrderTypeString));
        await expect(workOrderService.createWorkOrder(property.id, workOrder, testUserId)).to.be.
            rejectedWith(ResourceNotFoundError, invalidWorkOrderTypeString);
        verify(propertyServiceMock.getPropertyById(property.id)).called();
        verify(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).called();
        verify(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).called();
        verify(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).called();
        verify(workOrderStatusServiceMock.getWorkOrderStatus(anything())).never();
        verify(workOrderRepositoryMock.createWorkOrder(workOrder)).never();
    });

    it(('createWorkOrder workOrderStatusService throws ResourceNotFound'), async() => {
        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(anyString())).
            thenResolve(workOrder.sector);
        when(priorityTypeServiceMock.getPriorityType(anyString())).
            thenResolve(workOrder.priorityType);
        when(workOrderTypeServiceMock.getWorkOrderType(anyString())).
            thenResolve(workOrder.workOrderType);
        when(workOrderStatusServiceMock.getWorkOrderStatus(anything())).
            thenThrow(new ResourceNotFoundError(invalidWorkOrderStatusString));
        await expect(workOrderService.createWorkOrder(property.id, workOrder, testUserId)).to.be.
            rejectedWith(ResourceNotFoundError, invalidWorkOrderStatusString);
        verify(propertyServiceMock.getPropertyById(property.id)).called();
        verify(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).called();
        verify(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).called();
        verify(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).called();
        verify(workOrderStatusServiceMock.getWorkOrderStatus(anything())).called();
        verify(workOrderRepositoryMock.createWorkOrder(workOrder)).never();
    });

    it(('createWorkOrder workOrderRepository returns null expect Error'), async() => {
        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(anyString())).
            thenResolve(workOrder.sector);
        when(priorityTypeServiceMock.getPriorityType(anyString())).
            thenResolve(workOrder.priorityType);
        when(workOrderTypeServiceMock.getWorkOrderType(anyString())).
            thenResolve(workOrder.workOrderType);
        when(workOrderStatusServiceMock.getWorkOrderStatus(anything())).
            thenResolve(workOrder.workOrderStatus);
        when(workOrderRepositoryMock.createWorkOrder(workOrder)).thenThrow(new Error());
        await expect(workOrderService.createWorkOrder(property.id, workOrder, testUserId)).to.be.
            rejectedWith(BadRequestError);
        verify(propertyServiceMock.getPropertyById(property.id)).called();
        verify(sectorServiceMock.getSectorByKind(workOrder.sector.kind)).called();
        verify(priorityTypeServiceMock.getPriorityType(workOrder.priorityType.type)).called();
        verify(workOrderTypeServiceMock.getWorkOrderType(workOrder.workOrderType.type)).called();
        verify(workOrderStatusServiceMock.getWorkOrderStatus(anything())).called();
        verify(workOrderRepositoryMock.createWorkOrder(workOrder)).called();
    });

    it(('getWorkOrdersByPropertyId happy path'), async() => {
        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
        when(workOrderRepositoryMock.getWorkOrdersByProperty(anyOfClass(Property), anything())).
            thenResolve(workOrders);
        const fetchedWorkOrders = await workOrderService.getWorkOrdersByPropertyId(property.id);
        verify(propertyServiceMock.getPropertyById(property.id)).called();
        verify(workOrderRepositoryMock.
            getWorkOrdersByProperty(property, WORK_ORDER_FIELDS_NO_PROPERTY)).called();
        equal(fetchedWorkOrders, workOrders);
    });

    it(('getWorkOrdersByPropertyId propertyService throws ResourceNotFoundError'), async() => {
        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(null);
        await expect(workOrderService.getWorkOrdersByPropertyId(property.id)).to.be.
            rejectedWith(ResourceNotFoundError);
        verify(propertyServiceMock.getPropertyById(anyNumber())).called();
        verify(workOrderRepositoryMock.getWorkOrdersByProperty(anyOfClass(Property), anything())).
            never();
    });

    it(('getWorkOrdersByPropertyId workOrderRepository throws an error'), async() => {
        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
        when(workOrderRepositoryMock.getWorkOrdersByProperty(property, anything())).
            thenThrow(new Error);
        await expect(workOrderService.getWorkOrdersByPropertyId(property.id)).to.be.
            rejectedWith(Error);
        verify(propertyServiceMock.getPropertyById(property.id)).called();
        verify(workOrderRepositoryMock.getWorkOrdersByProperty(anyOfClass(Property), anything())).
            called();
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
        verify(workOrderRepositoryMock.getWorkOrders(anything(), anything(),
                                                     anything(), anything(),
                                                     anything(), anything())).
        never();
    });
    it(('getWorkOrders pagesize is out of range '), async() => {
        await expect(workOrderService.getWorkOrders(workOrdersQueryUnderflow)).to.be.
        rejectedWith(BadRequestError);
        verify(workOrderRepositoryMock.getWorkOrders(anything(), anything(),
                                                     anything(), anything(),
                                                     anything(), anything())).
        never();
    });

    it(('getWorkOrders pagesize is out of range '), async() => {
        workOrdersQuery.set(WorkOrderQuery.SORTBY, 'haha look at me, invalidString');
        await expect(workOrderService.getWorkOrders(workOrdersQueryUnderflow)).to.be.
        rejectedWith(BadRequestError);
        verify(workOrderRepositoryMock.getWorkOrders(anything(), anything(),
                                                     anything(), anything(),
                                                     anything(), anything())).
        never();
    });

    it(('getWorkOrder happy path'), async() => {
        when(workOrderRepositoryMock.getWorkOrderById(anyNumber(), anything())).
            thenResolve(workOrder);
        const fetchedWorkOrder = await workOrderService.getWorkOrder(workOrder.id);
        verify(workOrderRepositoryMock.getWorkOrderById(workOrder.id, WORK_ORDER_FIELDS)).called();
        equal(fetchedWorkOrder, workOrder);
    });

    it(('getWorkOrder null workOrder expect ResourceNotFoundError'), async() => {
        when(workOrderRepositoryMock.getWorkOrderById(anyNumber(), anything())).
            thenResolve(null);
        await expect(workOrderService.getWorkOrder(workOrder.id)).to.be.
            rejectedWith(ResourceNotFoundError);
        verify(workOrderRepositoryMock.getWorkOrderById(anyNumber(), anything())).called();
    });
});
