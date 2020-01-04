import express, {Request, Response} from 'express';
import { ShoppingItemService} from '../services/ShoppingItemService'
import { ShoppingItemMapper } from '../entity_mappers/ShoppingItemMapper'
import auth from '../middleware/auth';
import { handleError } from '../utils/HttpUtils';

const shoppingItemService = new ShoppingItemService();
const shoppingItemMapper = new ShoppingItemMapper();
const shoppingItemController = express.Router({mergeParams: true});

shoppingItemController.get('/:id', auth, async (req: Request, res: Response) => {
    try{
        const shoppingItem = await shoppingItemService
        .getShoppingItem(Number(req.params.id));
        return res.status(200).json(shoppingItemMapper.toDTO(shoppingItem));
    } catch (err) {
        return handleError(err, res);
    } 
})

shoppingItemController.patch('/:id', auth, async (req: Request, res: Response) => {
    try{
        await shoppingItemService.updateShoppingItem(Number(req.params.id), req.body);
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    }
})

shoppingItemController.delete('/:id', auth, async (req: Request, res: Response) => {
    try{
        await shoppingItemService.deleteShoppingItem(Number(req.params.id));
        return res.status(204).end();
    } catch (err) {
        return handleError(err, res);
    }
})

export { shoppingItemController};