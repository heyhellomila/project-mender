const ShoppingItem = require('../models/ShoppingItem');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');

const ShoppingItemGateway = {

    async getShoppingItemById(id) {
        const shoppingItem = await ShoppingItem.findById(id);
        if (!shoppingItem) {
            throw new ResourceNotFoundError("Shopping Item with id " + id + " does not exist");
        }
        return shoppingItem;
    },

    async getShoppingItemByWorkOrder(workOrder_id){
        const shoppingItems = await ShoppingItem.find({workOrder_id: workOrder_id});
        if (!shoppingItems) {
            throw new ResourceNotFoundError("Shopping Items belonging to work order id " + workOrder_id + " do not exist");
        }
        return shoppingItems;

    },

    async createShoppingItem(workOrder_id, name, quantity, price){
        const shoppingItem = new ShoppingItem({
            workOrder_id: workOrder_id,
            name: name,
            quantity: quantity,
            price: price
        });
        try{
            return await shoppingItem.save();
        } catch (err) {
            throw new Error(err);
        }
    },

    async deleteShoppingItem(id) {
        try{
           await ShoppingItem.findByIdAndDelete(id);
        } catch (err) {
            throw new Error(err);
        }
    },

    async updateShoppingItemById(id, shoppingItemObj) {
        try{
            return await ShoppingItem.update(
                {_id: id}, 
                {$set: shoppingItemObj},
                {runValidators: true});
        } catch (err) {
            throw new Error (err);
        }
    }
}

module.exports = ShoppingItemGateway