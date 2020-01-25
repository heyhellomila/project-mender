import { ShoppingItem } from '../entities/ShoppingItem';
import { FindOptions } from 'typeorm';
import { BaseRepository } from './BaseRepository';
import { WorkOrder } from '../entities/WorkOrder';

class ShoppingItemRepository extends BaseRepository<ShoppingItem> {

    async getShoppingItemById(id: number, fieldOptions?: FindOptions<ShoppingItem>) {
        return await this.getRepositoryConnection(ShoppingItem)
            .findOne(id, fieldOptions);
    }

    async getShoppingItemsByWorkOrder(workOrder: WorkOrder,
                                      fieldOptions?: FindOptions<ShoppingItem>) {
        let fieldOptionsR = fieldOptions;
        fieldOptionsR
            ? fieldOptionsR.where = { workOrder }
            : fieldOptionsR = { where: { workOrder } };
        return await this.getRepositoryConnection(ShoppingItem)
            .find(fieldOptionsR);
    }

    async createShoppingItem(shoppingItem: ShoppingItem) {
        return await this.getRepositoryConnection(
                ShoppingItem).save(shoppingItem);
    }

    async deleteShoppingItem(id: number) {
        await this.getRepositoryConnection(ShoppingItem).delete(id);
    }

    async updateShoppingItemById(id:number, shoppingItem:ShoppingItem) {
        await this.getRepositoryConnection(ShoppingItem).update({ id }, shoppingItem);
    }
}

export { ShoppingItemRepository };
