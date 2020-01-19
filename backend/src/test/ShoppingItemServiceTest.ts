import 'mocha';
import { equal } from 'assert';
import { anyOfClass, anything, instance, mock, verify, when } from 'ts-mockito';
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

    const workOrder = WorkOrderDataProvider.getWorkOrder();
    const shoppingItem1 = ShoppingItemDataProvider.getShoppingItem(1, 'test');
    const shoppingItem2 = ShoppingItemDataProvider.getShoppingItem(2, 'test2');
    const shoppingItems : ShoppingItem[] = [shoppingItem1, shoppingItem2] ;

    beforeEach(() => {
        shoppingItemRepositoryMock = mock(ShoppingItemRepository);
        shoppingItemRepository = instance(shoppingItemRepositoryMock);
        workOrderServiceMock = mock(WorkOrderService);
        workOrderService = instance(workOrderServiceMock);
        shoppingItemService = new ShoppingItemService(shoppingItemRepository, workOrderService);
    });

    it(('createShoppingItem happy path'), async() => {
        when(workOrderServiceMock.getWorkOrder(1)).thenResolve(workOrder);
        when(shoppingItemRepositoryMock.createShoppingItem(shoppingItem1))
            .thenResolve(shoppingItem1);

        const fetchedShoppingItem = await shoppingItemService.createShoppingItem(1, shoppingItem1);

        verify(workOrderServiceMock.getWorkOrder(1)).called();
        verify(shoppingItemRepositoryMock.createShoppingItem(shoppingItem1)).called();

        equal(fetchedShoppingItem, shoppingItem1);
    });

    it(('createShoppingItem invalid workorderId should return ResourceNotFoundError'), async() => {
        when(workOrderServiceMock.getWorkOrder(1)).thenResolve(null);

        await expect(shoppingItemService.createShoppingItem(1, shoppingItem1)).to.be
            .rejectedWith(ResourceNotFoundError);
    });

    it(('shoppingItemRepository problems should return BadRequestError'), async() => {
        when(workOrderServiceMock.getWorkOrder(1)).thenResolve(workOrder);
        when(shoppingItemRepositoryMock.createShoppingItem(shoppingItem1))
            .thenThrow(new Error);

        await expect(shoppingItemService.createShoppingItem(1, shoppingItem1)).to.be
            .rejectedWith(BadRequestError);
    });

    it(('getShoppingItemByWorkOrderId happy path'), async() => {
        when(workOrderServiceMock.getWorkOrder(1)).thenResolve(workOrder);
        when(shoppingItemRepositoryMock
            .getShoppingItemsByWorkOrder(anyOfClass(WorkOrder), anything()))
            .thenResolve(shoppingItems);

        const fetchedShoppingItems = await shoppingItemService.getShoppingItemByWorkOrderId(1);
        verify(workOrderServiceMock.getWorkOrder(1)).called();
        verify(shoppingItemRepositoryMock
            .getShoppingItemsByWorkOrder(anyOfClass(WorkOrder), SHOPPING_ITEM_FIELDS_NO_WORK_ORDER))
            .called();

        equal(fetchedShoppingItems, shoppingItems);
    });

    it(('getShoppingItemByWorkOrderId workorder does not exist ResourceNotFoundError'), async() => {
        when(workOrderServiceMock.getWorkOrder(1)).thenResolve(null);

        await expect(shoppingItemService.getShoppingItemByWorkOrderId(1)).to.be
            .rejectedWith(ResourceNotFoundError);
    });

    it(('getShoppingItemByWorkOrderId does not fetch from repository throw error'), async() => {
        when(workOrderServiceMock.getWorkOrder(1)).thenResolve(workOrder);
        when(shoppingItemRepositoryMock
            .getShoppingItemsByWorkOrder(anyOfClass(WorkOrder), anything()))
            .thenThrow(new Error);

        await expect(shoppingItemService.getShoppingItemByWorkOrderId(1)).to.be
            .rejectedWith(Error);
    });

    it(('getShoppingItem happy path'), async() => {
        when(shoppingItemRepositoryMock.getShoppingItemById(1, anything()))
            .thenResolve(shoppingItem1);

        const fetchedShoppingItem = await shoppingItemService.getShoppingItem(1);

        verify(shoppingItemRepositoryMock.getShoppingItemById(1, SHOPPING_ITEM_FIELDS)).called();
        equal(fetchedShoppingItem, shoppingItem1);
    });

    it(('getShoppingItem broken item repository throws ResourceNotFoundError'), async() => {
        when(shoppingItemRepositoryMock.getShoppingItemById(1, anything()))
            .thenResolve(null);
        await expect(shoppingItemService.getShoppingItem(1)).to.be.
            rejectedWith(ResourceNotFoundError);
    });

    it(('deleteShoppingItem happy path'), async() => {
        when(shoppingItemRepositoryMock.deleteShoppingItem(1))
            .thenResolve();

        await expect(shoppingItemService.deleteShoppingItem(1)).to.not.be.
        rejectedWith(ResourceNotFoundError);

        verify(shoppingItemRepositoryMock.deleteShoppingItem(1)).called();
    });

    it(('deleteShoppingItem repository error causes ResourceNotFoundError'), async() => {
        when(shoppingItemRepositoryMock.deleteShoppingItem(1))
            .thenThrow(new Error);

        await expect(shoppingItemService.deleteShoppingItem(1)).to.be.
        rejectedWith(ResourceNotFoundError);

        verify(shoppingItemRepositoryMock.deleteShoppingItem(1)).called();
    });

    it(('updateShoppingItem happy path'), async() => {
        when(shoppingItemRepositoryMock.getShoppingItemById(1, anything()))
            .thenResolve(shoppingItem1);
        when(workOrderServiceMock.getWorkOrder(1)).thenResolve(workOrder);
        when(shoppingItemRepositoryMock.updateShoppingItemById(1, anything())).
            thenResolve();
        await expect(shoppingItemService.updateShoppingItem(1, shoppingItem1)).to.not.be.
            rejectedWith(BadRequestError);
        verify(shoppingItemRepositoryMock.getShoppingItemById(1, SHOPPING_ITEM_FIELDS)).called();
        verify(workOrderServiceMock.getWorkOrder(1)).called();
        verify(shoppingItemRepositoryMock.updateShoppingItemById(1, anything())).called();
    });

    it(('updateShoppingItem shopping Item does not exist'), async() => {
        when(shoppingItemRepositoryMock.getShoppingItemById(1, anything()))
            .thenResolve(null);
        await expect(shoppingItemService.updateShoppingItem(1, shoppingItem1)).to.be.
        rejectedWith(ResourceNotFoundError);
        verify(shoppingItemRepositoryMock.getShoppingItemById(1, SHOPPING_ITEM_FIELDS)).called();
    });

    it(('updateShoppingItem work order id does not exist'), async() => {
        when(shoppingItemRepositoryMock.getShoppingItemById(1, anything()))
            .thenResolve(null);
        when(workOrderServiceMock.getWorkOrder(1)).thenThrow(new Error);
        await expect(shoppingItemService.updateShoppingItem(1, shoppingItem1)).to.be.
        rejectedWith(ResourceNotFoundError);
        verify(shoppingItemRepositoryMock.getShoppingItemById(1, SHOPPING_ITEM_FIELDS)).called();
    });

    it(('updateShoppingItem repository BadRequestError '), async() => {
        when(shoppingItemRepositoryMock.getShoppingItemById(1, anything()))
            .thenResolve(shoppingItem1);
        when(workOrderServiceMock.getWorkOrder(1)).thenResolve(workOrder);
        when(shoppingItemRepositoryMock.updateShoppingItemById(1, anything())).
        thenThrow(new Error);
        await expect(shoppingItemService.updateShoppingItem(1, shoppingItem1)).to.be.
        rejectedWith(BadRequestError);
        verify(shoppingItemRepositoryMock.getShoppingItemById(1, SHOPPING_ITEM_FIELDS)).called();
        verify(workOrderServiceMock.getWorkOrder(1)).called();
        verify(shoppingItemRepositoryMock.updateShoppingItemById(1, anything())).called();
    });
});
