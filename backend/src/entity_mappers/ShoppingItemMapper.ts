import { ObjectMapper } from './ObjectMapper';
import { ShoppingItem } from '../entities/ShoppingItem';
import { ShoppingItemDTO } from '../dtos/ShoppingItemDTO';
import { WorkOrderMapper } from './WorkOrderMapper';

class ShoppingItemMapper implements ObjectMapper<ShoppingItem, ShoppingItemDTO> {
    private workOrderMapper : WorkOrderMapper = new WorkOrderMapper();

    toDTO(shoppingItem: ShoppingItem) : ShoppingItemDTO {
        const shoppingItemDTO : ShoppingItemDTO = new ShoppingItemDTO();
        shoppingItemDTO.id = shoppingItem.id;
        if (shoppingItem.workOrder) {
            shoppingItemDTO.workOrder = this.workOrderMapper.toDTO(shoppingItem.workOrder);
        }
        shoppingItemDTO.name = shoppingItem.name;
        shoppingItemDTO.price = shoppingItem.price;
        shoppingItemDTO.quantity = shoppingItem.quantity;
        shoppingItemDTO.bought = shoppingItem.bought;
        return shoppingItemDTO;
    }

    fromDTO(shoppingItemDTO: ShoppingItemDTO) : ShoppingItem {
        const shoppingItem : ShoppingItem = new ShoppingItem();
        shoppingItem.id = shoppingItemDTO.id;
        shoppingItem.name = shoppingItemDTO.name;
        shoppingItem.price = shoppingItemDTO.price;
        shoppingItem.quantity = shoppingItemDTO.quantity;
        shoppingItem.bought = shoppingItemDTO.bought;
        return shoppingItem;
    }
}

export { ShoppingItemMapper };
