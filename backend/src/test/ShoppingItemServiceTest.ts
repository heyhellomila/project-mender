import 'mocha';
import { equal } from 'assert';
import { anyNumber, anyOfClass, anything, instance, mock, verify, when } from 'ts-mockito';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ShoppingItemService } from '../services/ShoppingItemService';
import { WorkOrderService } from '../services/WorkOrderService';
import { ShoppingItemRepository } from '../repositories/ShoppingItemRepository';
import { WorkOrderDataProvider } from './data_providers/WorkOrderDataProvider';
import { ShoppingItemDataProvider } from './data_providers/ShoppingItemDataProvider';
import { BadRequestError } from '../errors/BadRequestError';
import { ShoppingItem } from '../entities/ShoppingItem';
import { SHOPPING_ITEM_FIELDS, SHOPPING_ITEM_FIELDS_NO_WORK_ORDER } from '../constants/FindOptionsFields';
import { WorkOrder } from '../entities/WorkOrder';
import {FindOptions} from "typeorm/find-options/FindOptions";

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Shopping Item Service Test', () => {

    let shoppingItemService : ShoppingItemService;

    let workOrderServiceMock : WorkOrderService;
    let workOrderService : WorkOrderService;
    let shoppingItemRepositoryMock : ShoppingItemRepository;
    let shoppingItemRepository : ShoppingItemRepository;

    const workOrder = WorkOrderDataProvider.getWorkOrder(1);
    const shoppingItem1 = ShoppingItemDataProvider.getShoppingItem(1, 'test');
    const shoppingItem2 = ShoppingItemDataProvider.getShoppingItem(2, 'test2');
    const shoppingItems : ShoppingItem[] = [shoppingItem1, shoppingItem2] ;
    const workOrderNotFoundString = 'Work Order not found';

    beforeEach(() => {
        shoppingItemRepositoryMock = mock(ShoppingItemRepository);
        shoppingItemRepository = instance(shoppingItemRepositoryMock);
        workOrderServiceMock = mock(WorkOrderService);
        workOrderService = instance(workOrderServiceMock);
        shoppingItemService = new ShoppingItemService(shoppingItemRepository, workOrderService);
    });

    it(('createShoppingItem happy path'), async() => {
        when(workOrderServiceMock.getWorkOrder(anyNumber())).thenResolve(workOrder);
        when(shoppingItemRepositoryMock.createShoppingItem(anyOfClass(ShoppingItem)))
            .thenResolve(shoppingItem1);

        const fetchedShoppingItem = await shoppingItemService.
            createShoppingItem(workOrder.id, shoppingItem1);

        verify(workOrderServiceMock.getWorkOrder(workOrder.id)).called();
        verify(shoppingItemRepositoryMock.createShoppingItem(shoppingItem1)).called();

        equal(fetchedShoppingItem, shoppingItem1);
    });

    it(('createShoppingItem invalid workorderId should return ResourceNotFoundError'), async() => {
        when(workOrderServiceMock.getWorkOrder(anyNumber())).thenResolve(null);

        await expect(shoppingItemService.createShoppingItem(workOrder.id, shoppingItem1)).to.be
            .rejectedWith(ResourceNotFoundError);
        verify(workOrderServiceMock.getWorkOrder(workOrder.id)).called();
        verify(shoppingItemRepositoryMock.createShoppingItem(shoppingItem1)).never();
    });

    it(('shoppingItemRepository problems should return BadRequestError'), async() => {
        when(workOrderServiceMock.getWorkOrder(anyNumber())).thenResolve(workOrder);
        when(shoppingItemRepositoryMock.createShoppingItem(anyOfClass(ShoppingItem)))
            .thenThrow(new Error);

        await expect(shoppingItemService.createShoppingItem(workOrder.id, shoppingItem1)).to.be
            .rejectedWith(BadRequestError);

        verify(workOrderServiceMock.getWorkOrder(workOrder.id)).called();
        verify(shoppingItemRepositoryMock.createShoppingItem(shoppingItem1)).called();
    });

    it(('getShoppingItemByWorkOrderId happy path'), async() => {
        when(workOrderServiceMock.getWorkOrder(anyNumber())).thenResolve(workOrder);
        when(shoppingItemRepositoryMock
            .getShoppingItemsByWorkOrder(anyOfClass(WorkOrder), anything()))
            .thenResolve(shoppingItems);

        const fetchedShoppingItems = await shoppingItemService.
            getShoppingItemByWorkOrderId(workOrder.id);
        verify(workOrderServiceMock.getWorkOrder(workOrder.id)).called();
        verify(shoppingItemRepositoryMock
            .getShoppingItemsByWorkOrder(anyOfClass(WorkOrder), SHOPPING_ITEM_FIELDS_NO_WORK_ORDER))
            .called();

        equal(fetchedShoppingItems, shoppingItems);
    });

    it(('getShoppingItemByWorkOrderId workorder does not exist ResourceNotFoundError'), async() => {
        when(workOrderServiceMock.getWorkOrder(anyNumber())).thenResolve(null);

        await expect(shoppingItemService.getShoppingItemByWorkOrderId(workOrder.id)).to.be
            .rejectedWith(ResourceNotFoundError);

        verify(workOrderServiceMock.getWorkOrder(workOrder.id)).called();
        verify(shoppingItemRepositoryMock.getShoppingItemsByWorkOrder(anyOfClass(WorkOrder))).
            never();
    });

    it(('getShoppingItemByWorkOrderId does not fetch from repository throw error'), async() => {
        when(workOrderServiceMock.getWorkOrder(anyNumber())).thenResolve(workOrder);
        when(shoppingItemRepositoryMock
            .getShoppingItemsByWorkOrder(anyOfClass(WorkOrder), anything()))
            .thenThrow(new Error);

        await expect(shoppingItemService.getShoppingItemByWorkOrderId(workOrder.id)).to.be
            .rejectedWith(Error);

        verify(workOrderServiceMock.getWorkOrder(workOrder.id)).called();
        verify(shoppingItemRepositoryMock.
            getShoppingItemsByWorkOrder(anyOfClass(WorkOrder), SHOPPING_ITEM_FIELDS_NO_WORK_ORDER)).
            called();
    });

    it(('getShoppingItem happy path'), async() => {
        when(shoppingItemRepositoryMock.getShoppingItemById(anyNumber(), anything()))
            .thenResolve(shoppingItem1);

        const fetchedShoppingItem = await shoppingItemService.getShoppingItem(workOrder.id);

        verify(shoppingItemRepositoryMock.
            getShoppingItemById(workOrder.id, SHOPPING_ITEM_FIELDS)).called();
        equal(fetchedShoppingItem, shoppingItem1);
    });

    it(('getShoppingItem broken item repository throws ResourceNotFoundError'), async() => {
        when(shoppingItemRepositoryMock.getShoppingItemById(anyNumber(), anything()))
            .thenResolve(null);
        await expect(shoppingItemService.getShoppingItem(workOrder.id)).to.be.
            rejectedWith(ResourceNotFoundError);
        verify(shoppingItemRepositoryMock.getShoppingItemById(workOrder.id, SHOPPING_ITEM_FIELDS)).
            called();
    });

    it(('deleteShoppingItem happy path'), async() => {
        when(shoppingItemRepositoryMock.deleteShoppingItem(anyNumber()))
            .thenResolve();

        await expect(shoppingItemService.deleteShoppingItem(workOrder.id)).to.not.be.
            rejectedWith(ResourceNotFoundError);

        verify(shoppingItemRepositoryMock.deleteShoppingItem(workOrder.id)).called();
    });

    it(('deleteShoppingItem repository error causes ResourceNotFoundError'), async() => {
        when(shoppingItemRepositoryMock.deleteShoppingItem(anyNumber()))
            .thenThrow(new Error);

        await expect(shoppingItemService.deleteShoppingItem(workOrder.id)).to.be.
            rejectedWith(ResourceNotFoundError);

        verify(shoppingItemRepositoryMock.deleteShoppingItem(workOrder.id)).called();
    });

    it(('updateShoppingItem happy path'), async() => {
        when(shoppingItemRepositoryMock.getShoppingItemById(anyNumber(), anything()))
            .thenResolve(shoppingItem1);
        when(workOrderServiceMock.getWorkOrder(workOrder.id)).thenResolve(workOrder);
        when(shoppingItemRepositoryMock.updateShoppingItemById(anyNumber(), anything())).
            thenResolve();
        await expect(shoppingItemService.updateShoppingItem(workOrder.id, shoppingItem1)).to.not.be.
            rejectedWith(BadRequestError);
        verify(shoppingItemRepositoryMock.getShoppingItemById(workOrder.id, SHOPPING_ITEM_FIELDS)).
            called();
        verify(workOrderServiceMock.getWorkOrder(workOrder.id)).called();
        verify(shoppingItemRepositoryMock.
            updateShoppingItemById(workOrder.id, anyOfClass(ShoppingItem))).called();
    });

    it(('updateShoppingItem shopping Item does not exist'), async() => {
        when(shoppingItemRepositoryMock.getShoppingItemById(anyNumber(), anything()))
            .thenResolve(null);
        await expect(shoppingItemService.updateShoppingItem(workOrder.id, shoppingItem1)).to.be.
            rejectedWith(ResourceNotFoundError);
        verify(shoppingItemRepositoryMock.getShoppingItemById(workOrder.id, SHOPPING_ITEM_FIELDS)).
            called();
        verify(workOrderServiceMock.getWorkOrder(workOrder.id)).never();
    });

    it(('updateShoppingItem work order id does not exist'), async() => {
        when(shoppingItemRepositoryMock.getShoppingItemById(anyNumber(), anything()))
            .thenResolve(shoppingItem1);
        when(workOrderServiceMock.getWorkOrder(workOrder.id)).
            thenThrow(new ResourceNotFoundError(workOrderNotFoundString));
        await expect(shoppingItemService.updateShoppingItem(workOrder.id, shoppingItem1)).to.be.
            rejectedWith(ResourceNotFoundError, workOrderNotFoundString);
        verify(shoppingItemRepositoryMock.getShoppingItemById(workOrder.id, SHOPPING_ITEM_FIELDS)).
            called();
        verify(workOrderServiceMock.getWorkOrder(workOrder.id)).called();
        verify(shoppingItemRepositoryMock.
            updateShoppingItemById(workOrder.id, anyOfClass(ShoppingItem))).never();
    });
});
