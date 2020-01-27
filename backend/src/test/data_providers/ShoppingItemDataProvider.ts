import { ShoppingItem } from '../../entities/ShoppingItem';
import { WorkOrderDataProvider } from './WorkOrderDataProvider';

class ShoppingItemDataProvider {

    static getShoppingItem(id: number, name: string) : ShoppingItem {
        const shoppingItem : ShoppingItem = new ShoppingItem();
        shoppingItem.id = id;
        shoppingItem.name = name;
        shoppingItem.bought = false;
        shoppingItem.price = 999;
        shoppingItem.quantity = 1;
        shoppingItem.workOrder = WorkOrderDataProvider.getWorkOrder(1);
        return shoppingItem;
    }
}

export { ShoppingItemDataProvider };
