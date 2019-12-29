import { ShoppingItem } from '../entities/ShoppingItem';
import { FindOptions } from 'typeorm';
import { BaseRepository } from './BaseRepository';
import { WorkOrder } from '../entities/WorkOrder';

class ShoppingItemRepository extends BaseRepository<ShoppingItem> {

    async getShoppingItemById(id: number, fieldOptions?: FindOptions<ShoppingItem>) {
        const shoppingItem = await this.getRepositoryConnection(ShoppingItem).findOne(id, fieldOptions);
        return shoppingItem;
    }

    async getShoppingItemsByWorkOrder(workOrder: WorkOrder,fieldOptions?: FindOptions<ShoppingItem> ){
        fieldOptions
            ? fieldOptions.where = {workOrder: workOrder}
            : fieldOptions = { where: {workOrder: workOrder} };
        const shoppingItems = await this.getRepositoryConnection(ShoppingItem).find(fieldOptions);
        return shoppingItems;
    }

    async createShoppingItem(shoppingItem: ShoppingItem){
            const savedShoppingItem : ShoppingItem = await this.getRepositoryConnection(
                ShoppingItem).save(shoppingItem);
            return savedShoppingItem;
    }

    async deleteShoppingItem(id: number) {
        await this.getRepositoryConnection(ShoppingItem).delete(id);
    }

    async updateShoppingItemById(id:number, shoppingItem:ShoppingItem) {
        await this.getRepositoryConnection(ShoppingItem).update({id: id}, shoppingItem);
    }
}

export { ShoppingItemRepository };