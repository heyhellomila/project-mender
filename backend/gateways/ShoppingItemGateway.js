const ShoppingItem = require('../models/ShoppingItem');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

const ShoppingItemGateway = {

    async getShoppingItemById(id) {
        const shoppingItem = await ShoppingItem.findById(id);
        if (!shoppingItem) {
            throw new ResourceNotFoundError("Shopping Item with id " + id + " does not exist");
        }
        return shoppingItem;
    }
}

module.exports = ShoppingItemGateway