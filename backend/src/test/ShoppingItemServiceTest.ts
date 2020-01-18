import 'mocha';
import { equal } from 'assert';
import { anyNumber, anything, instance, mock, verify, when } from 'ts-mockito';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ShoppingItemService } from '../services/ShoppingItemService';
import { WorkOrderService } from '../services/WorkOrderService';
import { ShoppingItemRepository } from '../repositories/ShoppingItemRepository';
import { WorkOrderDataProvider } from './data_providers/WorkOrderDataProvider';
import { ShoppingItemDataProvider } from './data_providers/ShoppingItemDataProvider';
import { BadRequestError } from '../errors/BadRequestError';
import { ShoppingItem } from '../entities/ShoppingItem';

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

    beforeEach(() => {
        shoppingItemRepositoryMock = mock(ShoppingItemRepository);
        shoppingItemRepository = instance(shoppingItemRepositoryMock);
        workOrderServiceMock = mock(WorkOrderService);
        workOrderService = instance(workOrderServiceMock);
        shoppingItemService = new ShoppingItemService(shoppingItemRepository, workOrderService);
    });

    it(('shopping Item created successfully'), async() => {
        const workOrder = WorkOrderDataProvider.getWorkOrder();
        const shoppingItem = ShoppingItemDataProvider.getShoppingItem(1, 'test');
        when(workOrderServiceMock.getWorkOrder(anyNumber())).thenResolve(workOrder);
        when(shoppingItemRepositoryMock.createShoppingItem(anything())).thenResolve(shoppingItem);

        const fetchedShoppingItem = await shoppingItemService.createShoppingItem(1, shoppingItem);

        verify(workOrderServiceMock.getWorkOrder(anyNumber())).called();
        verify(shoppingItemRepositoryMock.createShoppingItem(anything())).called();

        equal(fetchedShoppingItem, shoppingItem);
    });

    it(('invalid workorderId should return ResourceNotFoundError'), async() => {
        const shoppingItem = ShoppingItemDataProvider.getShoppingItem(1, 'test');
        when(workOrderServiceMock.getWorkOrder(anyNumber())).thenResolve(null);

        await expect(shoppingItemService.createShoppingItem(1, shoppingItem)).to.be
            .rejectedWith(ResourceNotFoundError);
    });

    it(('shoppingItemRepository problems should return BadRequestError'), async() => {
        const workOrder = WorkOrderDataProvider.getWorkOrder();
        const shoppingItem = ShoppingItemDataProvider.getShoppingItem(1, 'test');
        when(workOrderServiceMock.getWorkOrder(anyNumber())).thenResolve(workOrder);
        when(shoppingItemRepositoryMock.createShoppingItem(anything()))
            .thenThrow(new Error);

        await expect(shoppingItemService.createShoppingItem(1, shoppingItem)).to.be
            .rejectedWith(BadRequestError);
    });

    it(('getShoppingItemByWorkOrderId successfully'), async() => {
        const workOrder = WorkOrderDataProvider.getWorkOrder();
        const shoppingItem1 = ShoppingItemDataProvider.getShoppingItem(1, 'test');
        const shoppingItem2 = ShoppingItemDataProvider.getShoppingItem(2, 'test2');
        const shoppingItems : ShoppingItem[] = [shoppingItem1, shoppingItem2] ;

        when(workOrderServiceMock.getWorkOrder(anyNumber())).thenResolve(workOrder);
        when(shoppingItemRepositoryMock.getShoppingItemsByWorkOrder(anyNumber(), anything()))
            .thenResolve(shoppingItems);

        const fetchedShoppingItems = await shoppingItemService.getShoppingItemByWorkOrderId(1);
        verify(workOrderServiceMock.getWorkOrder(anyNumber())).called();
        verify(shoppingItemRepositoryMock
            .getShoppingItemsByWorkOrder(anyNumber(), anything())).called();

        equal(fetchedShoppingItems, shoppingItems);
    });

    it(('getShoppingItemByWorkOrderId workorder doesn\'t exist ResourceNotFoundError'), async() => {
        when(workOrderServiceMock.getWorkOrder(anyNumber())).thenResolve(null);

        await expect(shoppingItemService.getShoppingItemByWorkOrderId(1)).to.be
            .rejectedWith(ResourceNotFoundError);
    });

    it(('getShoppingItemByWorkOrderId workorder doesn\'t exist ResourceNotFoundError'), async() => {
        const workOrder = WorkOrderDataProvider.getWorkOrder();
        const shoppingItem1 = ShoppingItemDataProvider.getShoppingItem(1, 'test');
        const shoppingItem2 = ShoppingItemDataProvider.getShoppingItem(2, 'test2');
        const shoppingItems : ShoppingItem[] = [shoppingItem1, shoppingItem2] ;

        when(workOrderServiceMock.getWorkOrder(anyNumber())).thenResolve(workOrder);
        when(shoppingItemRepositoryMock.getShoppingItemsByWorkOrder(anyNumber(), anything()))
            .thenThrow(new Error);

        await expect(shoppingItemService.getShoppingItemByWorkOrderId(1)).to.be
            .rejected();
    });

});
