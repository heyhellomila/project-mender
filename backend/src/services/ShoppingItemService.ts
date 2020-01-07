import { BadRequestError } from '../errors/BadRequestError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ShoppingItem } from '../entities/ShoppingItem';
import { ShoppingItemRepository } from '../repositories/ShoppingItemRepository';
import { SHOPPING_ITEM_FIELDS, SHOPPING_ITEM_FIELDS_NO_WORK_ORDER } from '../constants/FindOptionsFields';
import { WorkOrder } from '../entities/WorkOrder';
import { WorkOrderService } from './WorkOrderService';

class ShoppingItemService {

    private workOrderService: WorkOrderService = new WorkOrderService();
    private shoppingItemRepository: ShoppingItemRepository = new ShoppingItemRepository();

    async createShoppingItem(workOrderId: number, shoppingItem: ShoppingItem) {
        if(!(await this.workOrderService.getWorkOrder(workOrderId))) {
            throw new ResourceNotFoundError('Work Order ' + workOrderId + ' Does not exist');
        }
        const workOrder = new WorkOrder();
        workOrder.id = workOrderId;
        
        shoppingItem.workOrder = workOrder;

        try {
            return await this.shoppingItemRepository.createShoppingItem(shoppingItem);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }

    async getShoppingItemByWorkOrderId(workOrderId: number) {        
        if(!await this.workOrderService.getWorkOrder(workOrderId)) {
            throw new ResourceNotFoundError(`Work Order with id ${workOrderId} does not exist.`);
        }
        try {
            const workOrder_onlyId: WorkOrder = new WorkOrder();
            workOrder_onlyId.id = workOrderId;
            return await this.shoppingItemRepository.getShoppingItemsByWorkOrder(workOrder_onlyId, SHOPPING_ITEM_FIELDS_NO_WORK_ORDER);
        } catch (err) {
            throw err;
        }
    }

    async getShoppingItem(id: number) {
        const shoppingItem: ShoppingItem = await this.shoppingItemRepository.getShoppingItemById(id, SHOPPING_ITEM_FIELDS);
        if (!shoppingItem){
            throw new ResourceNotFoundError(`Shopping Item with id ${id} does not exist.`)
        }
        return shoppingItem;
    }

    async deleteShoppingItem(id: number) {
        try {
            await this.shoppingItemRepository.deleteShoppingItem(id);
        } catch (err) {
            throw new ResourceNotFoundError(`Shopping Item with id ${id} does not exist.`);
        }
    }

    async updateShoppingItem(id: number, shoppingItemObj: ShoppingItem){
        var shoppingItem = new ShoppingItem();

        if(!await this.getShoppingItem(id)) {
            throw new ResourceNotFoundError(`Shopping Item with id ${id} does not exist.`);
        }

        if(shoppingItemObj.name != null){
            shoppingItem.name = shoppingItemObj.name;
        }
        
        if(shoppingItemObj.workOrder != null){
            const workOrderId = shoppingItemObj.workOrder.id;
            try{
                await this.workOrderService.getWorkOrder(workOrderId);
            } catch (err) {
                throw new ResourceNotFoundError(`Work Order with id  ${workOrderId} does not exist.`);
            }
            shoppingItem.workOrder = shoppingItemObj.workOrder;
        }
        
        if(shoppingItemObj.price != null){
            shoppingItem.price = shoppingItemObj.price;
        }
        
        if(shoppingItemObj.quantity != null){
            shoppingItem.quantity = shoppingItemObj.quantity;
        }
        
        if(shoppingItemObj.bought != null){
            shoppingItem.bought = shoppingItemObj.bought;
        }

        try{
            return await this.shoppingItemRepository.updateShoppingItemById(id, shoppingItem);
        } catch (err) {
            throw new BadRequestError(err.message);
        }
    }
}

export { ShoppingItemService };