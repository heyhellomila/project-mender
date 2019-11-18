const express = require('express');
const ShoppingItemService = require('../services/ShoppingItemService')
const { handleError } = require('../utils/HttpUtils');
const auth = require('../middleware/auth');

const shoppingItemController = express.Router();
const shoppingItemService = new ShoppingItemService();

shoppingItemController.get('/:id', auth, async(req,res) =>{
    try{
        const shoppingItem = await shoppingItemService.getShoppingItem(req.params.id);
        return res.status(200).json(shoppingItem);
    } catch (err) {
        return handleError(err, res);
    }
})

shoppingItemController.patch('/:id', auth, async(req,res) => {
    try {
        const shoppingItem = await shoppingItemService.updateShoppingItem(req.params.id, req.body);
        return res.status(200).json(shoppingItem);
    } catch (err) {
        return handleError(err, res);
    }
})

shoppingItemController.delete('/:id', auth, async(req,res) => {
    try{
        await shoppingItemService.deleteShoppingItem(req.params.id);
        return res.status(204)
    } catch (err) {
        return handleError(err, res);
    }
})



module.exports = shoppingItemController;