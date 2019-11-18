const express = require('express');
const ShoppingItemService = require('../services/ShoppingItemService')
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/requestValidation');

const WorkOrderShoppingItemController = express.Router({mergeParams: true});
const shoppingItemService = new ShoppingItemService();

const creationFields = ['name', 'quantity', 'price']

WorkOrderShoppingItemController.post('/', auth, validateBody(creationFields), async (req, res) =>{
    try{
        const { name, quantity, price } = req.body;
        const shoppingItem = await shoppingItemService.createShoppingItem(req.params.workOrderId, name, quantity, price);
        return res.status(200).json({ shoppingItem });
    } catch (err) {
        return handleError(err, res);
    }
})

WorkOrderShoppingItemController.get('/', auth, async(req,res) =>{
    try{
        const shoppingItems = await shoppingItemService.getShoppingItemByWorkOrderId(req.params.workOrderId);
        return res.status(200).json(shoppingItems);
    } catch (err) {
        return handleError(err, res);
    }
})

module.exports = WorkOrderShoppingItemController;